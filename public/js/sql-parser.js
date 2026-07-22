/**
 * SQL Parser Utility for Database Diagram & Admin Management
 * Supports T-SQL / MS SQL Server & Standard DDL syntax (CREATE TABLE, ALTER TABLE ADD CONSTRAINT PK/FK)
 */

window.SqlParser = (function () {

  /**
   * Helper to clean names from brackets [dbo].[Name] or quotes "Name" -> Name
   */
  function cleanName(raw) {
    if (!raw) return '';
    return raw.trim()
      .replace(/^\[|\]$/g, '')
      .replace(/^"|"$/g, '')
      .replace(/^`|`$/g, '')
      .replace(/.*?\./, ''); // Strip schema prefix if any (e.g. dbo.Table -> Table)
  }

  /**
   * Extract datatype from column definition string
   * e.g. "[nvarchar] (200) COLLATE SQL_Latin1_General_CP1_CI_AS NULL" -> "nvarchar(200)"
   * e.g. "[decimal] (3, 1) NULL" -> "decimal(3, 1)"
   * e.g. "[int] NOT NULL IDENTITY(1, 1)" -> "int"
   */
  function cleanDataType(strAfterColName) {
    let s = strAfterColName.trim();

    // Match type with optional (length/precision, scale)
    // e.g. [nvarchar] (200), nvarchar(200), decimal(3, 1), int, datetime, bit
    const typeMatch = s.match(/^(?:\[?([a-zA-Z0-9_]+)\]?)\s*(?:\(\s*(\d+(?:\s*,\s*\d+)?|\bmax\b)\s*\))?/i);
    if (!typeMatch) return 'nvarchar(255)';

    const baseType = typeMatch[1].toLowerCase();
    const lengthOrPrec = typeMatch[2];

    if (lengthOrPrec) {
      // Clean up whitespace inside precision, e.g. (3, 1)
      const cleanLen = lengthOrPrec.replace(/\s+/g, ' ');
      return `${baseType}(${cleanLen})`;
    }
    return baseType;
  }

  /**
   * Parse a batch SQL script containing CREATE TABLE and ALTER TABLE statements
   * @param {string} sqlText 
   * @param {Array} existingTables Array of existing table objects
   * @returns {Object} { tables: Array, summary: Object }
   */
  function parseSqlScript(sqlText, existingTables = []) {
    if (!sqlText || !sqlText.trim()) {
      return { tables: existingTables, summary: { created: 0, updated: 0, errors: [] } };
    }

    // Clone existing tables map for mutation (by lowercase id)
    const tablesMap = new Map();
    existingTables.forEach(t => {
      // Clone table object
      tablesMap.set(t.id.toLowerCase(), {
        id: t.id,
        name: t.name || t.id,
        title: t.title || t.id,
        group: t.group || 'general',
        x: t.x !== undefined ? t.x : 150,
        y: t.y !== undefined ? t.y : 150,
        columns: (t.columns || []).map(c => ({ ...c })),
        relations: (t.relations || []).map(r => ({ ...r }))
      });
    });

    let createdCount = 0;
    let updatedCount = 0;
    const errors = [];

    // Remove SQL comments (-- line comment, /* block comment */)
    let cleanSql = sqlText
      .replace(/--.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '');

    // Split statements by GO or semicolon (case insensitive on standalone line GO)
    const statements = cleanSql.split(/(?:\r?\n\s*GO\s*|\s*;\s*)/i);

    statements.forEach(stmt => {
      const trimmed = stmt.trim();
      if (!trimmed) return;

      // -------------------------------------------------------------
      // 1. MATCH CREATE TABLE [schema].[TableName] ( ... )
      // -------------------------------------------------------------
      const createTableRegex = /^CREATE\s+TABLE\s+(?:\[?[a-zA-Z0-9_]+\]?\.)?\[?([a-zA-Z0-9_]+)\]?\s*\(([\s\S]+)\)(?:[\s\S]*)$/i;
      const createMatch = trimmed.match(createTableRegex);

      if (createMatch) {
        const rawTableName = createMatch[1];
        const tableId = cleanName(rawTableName);
        const body = createMatch[2];

        let isNew = false;
        let tableObj = tablesMap.get(tableId.toLowerCase());
        if (!tableObj) {
          isNew = true;
          tableObj = {
            id: tableId,
            name: tableId,
            title: tableId,
            group: 'general',
            x: 100 + (tablesMap.size % 4) * 280,
            y: 100 + Math.floor(tablesMap.size / 4) * 320,
            columns: [],
            relations: []
          };
          tablesMap.set(tableId.toLowerCase(), tableObj);
          createdCount++;
        } else {
          updatedCount++;
        }

        // Parse Table Body lines
        parseTableBody(body, tableObj, tablesMap);
        return;
      }

      // -------------------------------------------------------------
      // 2. MATCH ALTER TABLE [TableName] ADD CONSTRAINT [PK_Name] PRIMARY KEY ... ([Col1], [Col2])
      // -------------------------------------------------------------
      const alterPkRegex = /ALTER\s+TABLE\s+(?:\[?[a-zA-Z0-9_]+\]?\.)?\[?([a-zA-Z0-9_]+)\]?\s+ADD\s+(?:CONSTRAINT\s+\[?[a-zA-Z0-9_]+\]?\s+)?PRIMARY\s+KEY(?:\s+CLUSTERED|\s+NONCLUSTERED)?\s*\(([^)]+)\)/i;
      const alterPkMatch = trimmed.match(alterPkRegex);

      if (alterPkMatch) {
        const tableId = cleanName(alterPkMatch[1]);
        const pkColsRaw = alterPkMatch[2];
        const pkCols = pkColsRaw.split(',').map(c => cleanName(c));

        const tableObj = tablesMap.get(tableId.toLowerCase());
        if (tableObj) {
          pkCols.forEach(pkColName => {
            const col = tableObj.columns.find(c => c.name.toLowerCase() === pkColName.toLowerCase());
            if (col) {
              col.key = 'PK';
            } else {
              tableObj.columns.push({ name: pkColName, type: 'int', key: 'PK' });
            }
          });
        }
        return;
      }

      // -------------------------------------------------------------
      // 3. MATCH ALTER TABLE [TableName] ADD CONSTRAINT [FK_Name] FOREIGN KEY ([FromCol]) REFERENCES [TargetTable] ([ToCol])
      // -------------------------------------------------------------
      const alterFkRegex = /ALTER\s+TABLE\s+(?:\[?[a-zA-Z0-9_]+\]?\.)?\[?([a-zA-Z0-9_]+)\]?\s+ADD\s+(?:CONSTRAINT\s+\[?[a-zA-Z0-9_]+\]?\s+)?FOREIGN\s+KEY\s*\(([^)]+)\)\s*REFERENCES\s+(?:\[?[a-zA-Z0-9_]+\]?\.)?\[?([a-zA-Z0-9_]+)\]?\s*\(([^)]+)\)/i;
      const alterFkMatch = trimmed.match(alterFkRegex);

      if (alterFkMatch) {
        const fromTableId = cleanName(alterFkMatch[1]);
        const fromCol = cleanName(alterFkMatch[2]);
        const toTableId = cleanName(alterFkMatch[3]);
        const toCol = cleanName(alterFkMatch[4]);

        const tableObj = tablesMap.get(fromTableId.toLowerCase());
        if (tableObj) {
          // Set column key to FK if not PK
          const col = tableObj.columns.find(c => c.name.toLowerCase() === fromCol.toLowerCase());
          if (col && col.key !== 'PK') {
            col.key = 'FK';
          }

          // Add relation if not exists
          const hasRel = tableObj.relations.some(r =>
            r.toTable.toLowerCase() === toTableId.toLowerCase() &&
            r.fromCol.toLowerCase() === fromCol.toLowerCase() &&
            r.toCol.toLowerCase() === toCol.toLowerCase()
          );

          if (!hasRel) {
            tableObj.relations.push({
              toTable: toTableId,
              fromCol: fromCol,
              toCol: toCol
            });
          }
        }
        return;
      }
    });

    const resultTables = Array.from(tablesMap.values());
    return {
      tables: resultTables,
      summary: {
        created: createdCount,
        updated: updatedCount,
        total: resultTables.length
      }
    };
  }

  /**
   * Helper to parse inside CREATE TABLE body lines
   */
  function parseTableBody(bodyText, tableObj, tablesMap) {
    // Split by commas, considering parenthesis nesting (e.g. decimal(3, 1), IDENTITY(1, 1))
    const lines = splitBodyItems(bodyText);

    lines.forEach(line => {
      const item = line.trim();
      if (!item) return;

      // Check if line is a table-level CONSTRAINT PRIMARY KEY
      const pkMatch = item.match(/^(?:CONSTRAINT\s+\[?[a-zA-Z0-9_]+\]?\s+)?PRIMARY\s+KEY(?:\s+CLUSTERED|\s+NONCLUSTERED)?\s*\(([^)]+)\)/i);
      if (pkMatch) {
        const pkCols = pkMatch[1].split(',').map(c => cleanName(c));
        pkCols.forEach(colName => {
          const col = tableObj.columns.find(c => c.name.toLowerCase() === colName.toLowerCase());
          if (col) col.key = 'PK';
        });
        return;
      }

      // Check if line is a table-level CONSTRAINT FOREIGN KEY
      const fkMatch = item.match(/^(?:CONSTRAINT\s+\[?[a-zA-Z0-9_]+\]?\s+)?FOREIGN\s+KEY\s*\(([^)]+)\)\s*REFERENCES\s+(?:\[?[a-zA-Z0-9_]+\]?\.)?\[?([a-zA-Z0-9_]+)\]?\s*\(([^)]+)\)/i);
      if (fkMatch) {
        const fromCol = cleanName(fkMatch[1]);
        const toTableId = cleanName(fkMatch[2]);
        const toCol = cleanName(fkMatch[3]);

        const col = tableObj.columns.find(c => c.name.toLowerCase() === fromCol.toLowerCase());
        if (col && col.key !== 'PK') col.key = 'FK';

        const hasRel = tableObj.relations.some(r =>
          r.toTable.toLowerCase() === toTableId.toLowerCase() &&
          r.fromCol.toLowerCase() === fromCol.toLowerCase() &&
          r.toCol.toLowerCase() === toCol.toLowerCase()
        );
        if (!hasRel) {
          tableObj.relations.push({ toTable: toTableId, fromCol, toCol });
        }
        return;
      }

      // Ignore INDEX, UNIQUE INDEX, ON [PRIMARY] lines
      if (/^(?:UNIQUE\s+|NONCLUSTERED\s+|CLUSTERED\s+)?INDEX/i.test(item) || /^CONSTRAINT\s+\[?[a-zA-Z0-9_]+\]?\s+UNIQUE/i.test(item)) {
        return;
      }

      // Standard Column Definition line: e.g. [Id] [int] NOT NULL IDENTITY(1, 1),
      // or "Id int PRIMARY KEY"
      const colRegex = /^(?:\[?([a-zA-Z0-9_]+)\]?)\s+(.+)$/;
      const colMatch = item.match(colRegex);

      if (colMatch) {
        const colName = cleanName(colMatch[1]);
        const rest = colMatch[2];

        // Skip keywords if matched as column name by mistake
        if (['CONSTRAINT', 'PRIMARY', 'FOREIGN', 'UNIQUE', 'CHECK', 'INDEX', 'KEY'].includes(colName.toUpperCase())) {
          return;
        }

        // Ignore standard system audit columns
        const IGNORED_COLUMNS = [
          'ISDELETED', 'NGUOITAO', 'NGAYTAO', 'NGUOICAPNHAT',
          'NGAYCAPNHAT', 'ISDELETE', 'NGAYXOA', 'NGUOIXOA'
        ];
        if (IGNORED_COLUMNS.includes(colName.toUpperCase())) {
          return;
        }

        const dataType = cleanDataType(rest);
        const isInlinePk = /PRIMARY\s+KEY/i.test(rest);
        const isInlineFk = /REFERENCES/i.test(rest);

        let keyVal = '';
        if (isInlinePk) keyVal = 'PK';
        else if (isInlineFk) keyVal = 'FK';

        // Update or insert column
        const existingCol = tableObj.columns.find(c => c.name.toLowerCase() === colName.toLowerCase());
        if (existingCol) {
          existingCol.type = dataType;
          if (keyVal) existingCol.key = keyVal;
        } else {
          tableObj.columns.push({
            name: colName,
            type: dataType,
            key: keyVal
          });
        }
      }
    });
  }

  /**
   * Split CREATE TABLE body by comma while ignoring commas inside parentheses ()
   */
  function splitBodyItems(text) {
    const items = [];
    let current = '';
    let parenDepth = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '(') {
        parenDepth++;
        current += char;
      } else if (char === ')') {
        if (parenDepth > 0) parenDepth--;
        current += char;
      } else if (char === ',' && parenDepth === 0) {
        items.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    if (current.trim()) {
      items.push(current);
    }
    return items;
  }

  return {
    parseSqlScript: parseSqlScript
  };

})();
