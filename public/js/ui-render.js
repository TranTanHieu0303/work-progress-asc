// UI RENDER MODULE (TREE VIEW, CARD VIEW, FILTERS, METRICS & THEME)

function applyStatusStyles() {
  let styleEl = document.getElementById('dynamic-status-styles');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'dynamic-status-styles';
    document.head.appendChild(styleEl);
  }

  let css = '';
  STATUS_CONFIGS.forEach(status => {
    const clsName = `status-custom-${status.id}`;
    css += `
      .status-dropdown.${clsName} {
        background-color: ${status.bg} !important;
        color: ${status.text} !important;
        border-color: ${status.border} !important;
      }
      .filter-chip.${clsName}.active {
        background-color: ${status.bg} !important;
        color: ${status.text} !important;
        border-color: ${status.border} !important;
      }
      .status-badge.${clsName} {
        background-color: ${status.bg};
        color: ${status.text};
        border: 1px solid ${status.border};
      }
    `;
  });
  styleEl.textContent = css;
}

function updateProgressMetrics() {
  const screensList = Object.values(screensMap);
  const total = screensList.length;

  const counts = {};
  STATUS_CONFIGS.forEach(s => {
    counts[s.label] = 0;
  });

  let completedCount = 0;
  let totalWeight = 0;
  let completedWeight = 0;

  screensList.forEach(s => {
    if (counts[s.status] !== undefined) {
      counts[s.status]++;
    } else {
      const defaultLabel = STATUS_CONFIGS[0] ? STATUS_CONFIGS[0].label : 'Chưa xử lý';
      if (counts[defaultLabel] !== undefined) {
        counts[defaultLabel]++;
      }
    }

    const diffCfg = DIFFICULTY_CONFIGS.find(cfg => cfg.label === s.difficulty) || DIFFICULTY_CONFIGS.find(cfg => cfg.id === 'medium') || { weight: 3 };
    const weight = diffCfg.weight || 3;
    totalWeight += weight;

    const config = STATUS_CONFIGS.find(cfg => cfg.label === s.status);
    if (config && config.isCompleted) {
      completedCount++;
      completedWeight += weight;
    }
  });

  const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;
  const weightedPct = totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0;

  const globalProgressPct = document.getElementById('global-progress-pct');
  if (globalProgressPct) globalProgressPct.innerText = pct + '%';
  const globalProgressBar = document.getElementById('global-progress-bar');
  if (globalProgressBar) globalProgressBar.style.width = pct + '%';

  const globalWeightedProgressPct = document.getElementById('global-weighted-progress-pct');
  if (globalWeightedProgressPct) {
    globalWeightedProgressPct.innerText = `${weightedPct}% (${completedWeight}/${totalWeight}đ)`;
  }
  const globalWeightedProgressBar = document.getElementById('global-weighted-progress-bar');
  if (globalWeightedProgressBar) {
    globalWeightedProgressBar.style.width = weightedPct + '%';
  }

  const statTotal = document.getElementById('stat-total');
  if (statTotal) statTotal.innerText = total;

  let progressCount = 0;
  STATUS_CONFIGS.forEach(cfg => {
    if (!cfg.isCompleted && cfg.id !== 'todo') {
      progressCount += counts[cfg.label] || 0;
    }
  });

  const statProgress = document.getElementById('stat-progress');
  if (statProgress) statProgress.innerText = progressCount;
  const statDone = document.getElementById('stat-done');
  if (statDone) statDone.innerText = completedCount;

  const chipAllCount = document.getElementById('chip-all-count');
  if (chipAllCount) chipAllCount.innerText = total;

  STATUS_CONFIGS.forEach(s => {
    const el = document.getElementById(`chip-${s.id}-count`);
    if (el) {
      el.innerText = counts[s.label] || 0;
    }
  });

  const diffStatsContainer = document.getElementById('difficulty-stats-list');
  if (diffStatsContainer) {
    const diffCounts = {};
    const diffDoneCounts = {};

    DIFFICULTY_CONFIGS.forEach(d => {
      diffCounts[d.label] = 0;
      diffDoneCounts[d.label] = 0;
    });

    screensList.forEach(s => {
      const diffLabel = s.difficulty || 'Trung bình';
      if (diffCounts[diffLabel] !== undefined) {
        diffCounts[diffLabel]++;
      } else {
        diffCounts['Trung bình'] = (diffCounts['Trung bình'] || 0) + 1;
      }

      const statusCfg = STATUS_CONFIGS.find(cfg => cfg.label === s.status);
      if (statusCfg && statusCfg.isCompleted) {
        if (diffDoneCounts[diffLabel] !== undefined) {
          diffDoneCounts[diffLabel]++;
        } else {
          diffDoneCounts['Trung bình'] = (diffDoneCounts['Trung bình'] || 0) + 1;
        }
      }
    });

    const diffHtml = DIFFICULTY_CONFIGS.map(d => {
      const total = diffCounts[d.label] || 0;
      const done = diffDoneCounts[d.label] || 0;
      const pct = total > 0 ? Math.round((done / total) * 100) : 0;
      return `
        <div style="padding: 6px 8px; border-radius: 7px; border: 1px solid var(--card-border); background: var(--card-bg);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px;">
            <div style="display: flex; align-items: center; gap: 5px;">
              <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${d.text}; flex-shrink:0;"></span>
              <span style="font-size: 11px; font-weight: 600; color: var(--text-main);">${d.label}</span>
              <span style="font-size: 10px; color: ${d.text}; background: ${d.bg}; border: 1px solid ${d.border}; padding: 0 4px; border-radius: 3px; line-height: 1.6;">${d.weight}đ</span>
            </div>
            <div style="font-size: 11px; font-weight: 700; color: ${d.text};">
              ${done}/${total} <span style="font-weight:400; color: var(--text-muted); font-size:10px;">(${pct}%)</span>
            </div>
          </div>
          <div style="height: 4px; background: ${d.bg}; border-radius: 99px; overflow: hidden; border: 1px solid ${d.border};">
            <div style="height: 100%; width: ${pct}%; background: ${d.text}; border-radius: 99px; transition: width 0.4s ease;"></div>
          </div>
        </div>
      `;
    }).join('');

    diffStatsContainer.innerHTML = diffHtml;
  }
}

function isMatched(item) {
  if (!item) return false;
  if (activeFilter !== 'ALL' && item.status !== activeFilter) {
    return false;
  }
  if (activeDifficultyFilter !== 'ALL') {
    const diff = item.difficulty || 'Trung bình';
    if (diff !== activeDifficultyFilter) return false;
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase().trim();
    const idMatch = item.id.toLowerCase().includes(q);
    const nameMatch = item.name.toLowerCase().includes(q);
    const eduMatch = item.eduCode.toLowerCase().includes(q);
    const tableMatch = item.tables.some(t => t.toLowerCase().includes(q));
    const descMatch = (item.description || '').toLowerCase().includes(q);

    return idMatch || nameMatch || eduMatch || tableMatch || descMatch;
  }

  return true;
}

function getTableTagsHtml(tables) {
  if (!tables || tables.length === 0) return '<span style="color: var(--text-muted); font-size:11px;">Không có bảng liên quan</span>';
  return tables.map(t => `
    <a href="db_diagram.html#${t}" target="_blank" class="table-tag-link" title="Xem sơ đồ bảng ${t}">
      ${t}
      <svg style="width: 10px; height: 10px; fill: currentColor;" viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
    </a>
  `).join('');
}

function getStatusDropdownHtml(itemId, status) {
  let config = STATUS_CONFIGS.find(cfg => cfg.label === status);
  if (!config) {
    config = STATUS_CONFIGS[0] || { id: 'todo', label: 'Chưa xử lý' };
  }

  const cls = `status-custom-${config.id}`;
  const isDisabled = isEditMode ? '' : 'disabled';

  const optionsHtml = STATUS_CONFIGS.map(cfg => `
    <option value="${cfg.label}" ${status === cfg.label ? 'selected' : ''}>${cfg.label}</option>
  `).join('');

  return `
    <select class="status-dropdown ${cls}" onchange="changeItemStatus('${itemId}', this.value)" ${isDisabled}>
      ${optionsHtml}
    </select>
  `;
}

window.changeItemStatus = function (itemId, newStatus) {
  if (!isEditMode) {
    alert("Vui lòng mở khóa cấu hình để thay đổi trạng thái!");
    return;
  }
  if (screensMap[itemId]) {
    screensMap[itemId].status = newStatus;
    saveProgress(itemId);
    renderContent();
  }
};

function getDifficultyDropdownHtml(itemId, difficulty) {
  const isDisabled = isEditMode ? '' : 'disabled';
  const optionsHtml = DIFFICULTY_CONFIGS.map(cfg => `
    <option value="${cfg.label}" ${difficulty === cfg.label ? 'selected' : ''}>${cfg.label}</option>
  `).join('');

  return `
    <select class="status-dropdown" onchange="changeItemDifficulty('${itemId}', this.value)" ${isDisabled} style="width:100%; padding:6px 10px; border-radius:6px; border:1px solid var(--card-border); background:${isEditMode ? 'var(--card-bg)' : 'var(--item-hover)'}; color:var(--text-main); font-size:12px; outline:none; height:30px;">
      ${optionsHtml}
    </select>
  `;
}

window.changeItemDifficulty = function (itemId, newDifficulty) {
  if (!isEditMode) {
    alert("Vui lòng mở khóa cấu hình để thay đổi độ khó!");
    return;
  }
  if (screensMap[itemId]) {
    screensMap[itemId].difficulty = newDifficulty;
    saveProgress(itemId);
    renderContent();
    if (typeof showToast === 'function') {
      showToast(`Đã cập nhật độ khó [${screensMap[itemId].id}] thành "${newDifficulty}"`);
    }
  }
};

function getBusinessLinksHtml(screen) {
  let html = '';
  if (screen.jiraUrl) {
    html += `
      <a href="${screen.jiraUrl}" target="_blank" class="table-tag-link" style="color: #3b82f6; border-color: rgba(59,130,246,0.2); background: rgba(59,130,246,0.05); font-size:10px; padding:2px 6px;" title="Mở Jira User Story">
        Jira US ↗
      </a>
    `;
  }
  if (screen.actualUrl) {
    html += `
      <a href="${screen.actualUrl}" target="_blank" class="table-tag-link" style="color: #10b981; border-color: rgba(16,185,129,0.2); background: rgba(16,185,129,0.05); font-size:10px; padding:2px 6px;" title="Mở Màn hình Web thực tế">
        Web UI ↗
      </a>
    `;
  }
  return html;
}

window.updateItemDescription = function (itemId, value) {
  if (!isEditMode) return;
  if (screensMap[itemId]) {
    screensMap[itemId].description = value;
    saveProgress(itemId);
    showSaveIndicator(itemId);
  }
};

window.updateItemJira = function (itemId, value) {
  if (!isEditMode) return;
  if (screensMap[itemId]) {
    screensMap[itemId].jiraUrl = value;
    saveProgress(itemId);
    showSaveIndicator(itemId);
    renderContent();
  }
};

window.updateItemActualUrl = function (itemId, value) {
  if (!isEditMode) return;
  if (screensMap[itemId]) {
    screensMap[itemId].actualUrl = value;
    saveProgress(itemId);
    showSaveIndicator(itemId);
    renderContent();
  }
};

function showSaveIndicator(itemId) {
  const indicator = document.getElementById(`save-indicator-${itemId}`);
  if (indicator) {
    indicator.classList.add('visible');
    setTimeout(() => {
      indicator.classList.remove('visible');
    }, 1500);
  }
}

window.toggleNode = function (nodeKey) {
  collapsedNodes[nodeKey] = !collapsedNodes[nodeKey];
  const body = document.getElementById(`node-body-${nodeKey}`);
  const header = document.getElementById(`node-header-${nodeKey}`);
  if (body) {
    if (collapsedNodes[nodeKey]) {
      body.classList.add('hidden');
      header.classList.remove('expanded');
    } else {
      body.classList.remove('hidden');
      header.classList.add('expanded');
    }
  }
};

function renderTreeView() {
  const container = document.createElement('div');
  container.className = 'tree-container';

  if (!activeMenuStructure || !Array.isArray(activeMenuStructure) || activeMenuStructure.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:48px 20px; color:var(--text-muted);">
        <p style="font-size:14px; margin-bottom:6px; font-weight:600;">Chưa có dữ liệu màn hình / menu cho phân hệ này.</p>
        <p style="font-size:12px;">Vui lòng mở ⚙️ <strong>Cấu hình Hệ thống & Quản trị</strong> (hoặc nhấn Bật Mở khóa) để thêm nhóm & màn hình mới.</p>
      </div>
    `;
    return container.outerHTML;
  }

  let matchedCount = 0;

  activeMenuStructure.forEach((module, mIdx) => {
    const mKey = `module-${mIdx}`;
    const isModuleCollapsed = collapsedNodes[mKey] || false;

    let moduleScreensCount = 0;
    let moduleDoneCount = 0;

    const moduleItemsHtml = module.items.map((groupOrDash, gIdx) => {
      if (groupOrDash.type === 'dashboard') {
        const screen = screensMap[groupOrDash.id] || { id: groupOrDash.id, name: groupOrDash.name, eduCode: '-', tables: [], description: '', status: 'Chưa xử lý' };
        const visible = isMatched(screen);
        if (visible) {
          matchedCount++;
          moduleScreensCount++;
          if (screen.status === 'Đã xử lý') moduleDoneCount++;
        }

        return `
          <div class="screen-item ${visible ? '' : 'hidden'}">
            <div class="screen-main-row" onclick="toggleNodeDetails('${screen.id}')">
              <div class="screen-info-block">
                <svg class="chevron-icon" id="chev-${screen.id}" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
                <span class="screen-id-badge" style="background:var(--accent-light); color:var(--accent-color); border-color:transparent;">DASHBOARD</span>
                <span class="screen-title-text" style="font-weight: 600;">${screen.name}</span>
                ${getDifficultyBadgeHtml(screen.difficulty || 'Trung bình')}
              </div>
              <div class="screen-controls" onclick="event.stopPropagation()">
                ${getStatusDropdownHtml(screen.id, screen.status)}
              </div>
            </div>
            <div class="screen-detail-panel hidden" id="detail-${screen.id}">
              <div style="display: grid; grid-template-columns: 1.2fr 1.2fr 1fr; gap: 12px; margin-bottom: 8px;">
                <div class="details-row">
                  <div class="details-label">Link User Story (Jira)</div>
                  <input type="text" placeholder="Dán link Jira US..." value="${screen.jiraUrl || ''}" onblur="updateItemJira('${screen.id}', this.value)" style="width:100%; padding:6px 10px; border-radius:6px; border:1px solid var(--card-border); background:var(--card-bg); color:var(--text-main); font-size:12px; outline:none;">
                </div>
                <div class="details-row">
                  <div class="details-label">Link Màn hình Web thực tế</div>
                  <input type="text" placeholder="Dán link web chạy thực tế..." value="${screen.actualUrl || ''}" onblur="updateItemActualUrl('${screen.id}', this.value)" style="width:100%; padding:6px 10px; border-radius:6px; border:1px solid var(--card-border); background:var(--card-bg); color:var(--text-main); font-size:12px; outline:none;">
                </div>
                <div class="details-row">
                  <div class="details-label">Độ khó màn hình</div>
                  ${getDifficultyDropdownHtml(screen.id, screen.difficulty)}
                </div>
              </div>
              <div class="details-row">
                <div class="details-label">Bảng Database liên quan</div>
                <div class="table-tags">${getTableTagsHtml(screen.tables)}</div>
              </div>
              <div class="details-row" style="margin-top: 8px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <div class="details-label">Ghi chú / Mô tả màn hình</div>
                  <span class="auto-save-indicator" id="save-indicator-${screen.id}">
                    <svg class="icon-svg" viewBox="0 0 24 24" style="width:12px;height:12px;fill:#10b981;"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
                    Đã lưu
                  </span>
                </div>
                <div class="note-preview-box ql-editor" id="note-preview-${screen.id}">
                  ${screen.description ? screen.description : '<em style="color:var(--text-muted);">Chưa có ghi chú, mô tả...</em>'}
                </div>
                <button onclick="openNoteEditorModal('${screen.id}')" style="margin-top: 6px; padding: 5px 11px; font-size: 11px; font-weight: 600; display: inline-flex; align-items: center; gap: 5px; border-radius: 20px; border: none; cursor: pointer; background: ${isEditMode ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'linear-gradient(135deg,#0ea5e9,#06b6d4)'}; color: #fff; box-shadow: 0 2px 8px ${isEditMode ? 'rgba(99,102,241,0.35)' : 'rgba(6,182,212,0.3)'}; transition: opacity 0.15s, transform 0.15s;" onmouseover="this.style.opacity='0.82'; this.style.transform='translateY(-1px)'" onmouseout="this.style.opacity='1'; this.style.transform='translateY(0)'">
                  <svg style="width:11px; height:11px; fill:#fff; flex-shrink:0;" viewBox="0 0 24 24"><path d="${isEditMode ? 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' : 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'}"/></svg>
                  ${isEditMode ? 'Chỉnh sửa Ghi chú' : 'Xem Ghi chú'}
                </button>
              </div>
            </div>
          </div>
        `;
      }

      const gKey = `group-${mIdx}-${gIdx}`;
      const isGroupCollapsed = collapsedNodes[gKey] || false;

      let groupMatchedCount = 0;
      let groupDoneCount = 0;

      const screenItemsHtml = groupOrDash.items.map(item => {
        const screen = screensMap[item.id] || { id: item.id, name: item.name, eduCode: '-', tables: [], description: '', status: 'Chưa xử lý' };
        const visible = isMatched(screen);

        if (visible) {
          matchedCount++;
          groupMatchedCount++;
          moduleScreensCount++;
          if (screen.status === 'Đã xử lý') {
            groupDoneCount++;
            moduleDoneCount++;
          }
        }

        return `
          <div class="screen-item ${visible ? '' : 'hidden'}">
            <div class="screen-main-row" onclick="toggleNodeDetails('${screen.id}')">
              <div class="screen-info-block">
                <svg class="chevron-icon" id="chev-${screen.id}" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
                <span class="screen-id-badge">${screen.id}</span>
                <span class="screen-title-text">${screen.name}</span>
                ${getDifficultyBadgeHtml(screen.difficulty || 'Trung bình')}
                ${screen.eduCode && screen.eduCode !== '-' ? `<span class="screen-edu-code">${screen.eduCode}</span>` : ''}
                <div style="display:inline-flex; gap:6px; margin-left:8px;" onclick="event.stopPropagation()">
                  ${getBusinessLinksHtml(screen)}
                </div>
              </div>
              <div class="screen-controls" onclick="event.stopPropagation()">
                ${getStatusDropdownHtml(screen.id, screen.status)}
              </div>
            </div>
            
            <div class="screen-detail-panel hidden" id="detail-${screen.id}">
              <div style="display: grid; grid-template-columns: 1.2fr 1.2fr 1fr; gap: 12px; margin-bottom: 8px;">
                <div class="details-row">
                  <div class="details-label">Link User Story (Jira)</div>
                  <input type="text" placeholder="Dán link Jira US..." value="${screen.jiraUrl || ''}" onblur="updateItemJira('${screen.id}', this.value)" ${isEditMode ? '' : 'readonly'} style="width:100%; padding:6px 10px; border-radius:6px; border:1px solid var(--card-border); background:${isEditMode ? 'var(--card-bg)' : 'var(--item-hover)'}; color:var(--text-main); font-size:12px; outline:none; ${isEditMode ? '' : 'cursor: default;'}">
                </div>
                <div class="details-row">
                  <div class="details-label">Link Màn hình Web thực tế</div>
                  <input type="text" placeholder="Dán link web chạy thực tế..." value="${screen.actualUrl || ''}" onblur="updateItemActualUrl('${screen.id}', this.value)" ${isEditMode ? '' : 'readonly'} style="width:100%; padding:6px 10px; border-radius:6px; border:1px solid var(--card-border); background:${isEditMode ? 'var(--card-bg)' : 'var(--item-hover)'}; color:var(--text-main); font-size:12px; outline:none; ${isEditMode ? '' : 'cursor: default;'}">
                </div>
                <div class="details-row">
                  <div class="details-label">Độ khó màn hình</div>
                  ${getDifficultyDropdownHtml(screen.id, screen.difficulty)}
                </div>
              </div>
              <div class="details-row">
                <div class="details-label">Bảng Database liên quan</div>
                <div class="table-tags">${getTableTagsHtml(screen.tables)}</div>
              </div>
              <div class="details-row" style="margin-top: 8px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <div class="details-label">Ghi chú / Mô tả màn hình</div>
                  <span class="auto-save-indicator" id="save-indicator-${screen.id}">
                    <svg class="icon-svg" viewBox="0 0 24 24" style="width:12px;height:12px;fill:#10b981;"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
                    Đã lưu
                  </span>
                </div>
                <div class="note-preview-box ql-editor" id="note-preview-${screen.id}">
                  ${screen.description ? screen.description : '<em style="color:var(--text-muted);">Chưa có ghi chú, mô tả...</em>'}
                </div>
                <button onclick="openNoteEditorModal('${screen.id}')" style="margin-top: 6px; padding: 5px 11px; font-size: 11px; font-weight: 600; display: inline-flex; align-items: center; gap: 5px; border-radius: 20px; border: none; cursor: pointer; background: ${isEditMode ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'linear-gradient(135deg,#0ea5e9,#06b6d4)'}; color: #fff; box-shadow: 0 2px 8px ${isEditMode ? 'rgba(99,102,241,0.35)' : 'rgba(6,182,212,0.3)'}; transition: opacity 0.15s, transform 0.15s;" onmouseover="this.style.opacity='0.82'; this.style.transform='translateY(-1px)'" onmouseout="this.style.opacity='1'; this.style.transform='translateY(0)'">
                  <svg style="width:11px; height:11px; fill:#fff; flex-shrink:0;" viewBox="0 0 24 24"><path d="${isEditMode ? 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' : 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'}"/></svg>
                  ${isEditMode ? 'Chỉnh sửa Ghi chú' : 'Xem Ghi chú'}
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');

      const isGroupVisible = groupMatchedCount > 0;

      return `
        <div class="group-node ${isGroupVisible ? '' : 'hidden'}" id="group-node-${gKey}">
          <div class="group-header ${isGroupCollapsed ? '' : 'expanded'}" id="node-header-${gKey}" onclick="toggleNode('${gKey}')">
            <span class="group-title">
              <svg class="chevron-icon" viewBox="0 0 24 24" style="transform: ${isGroupCollapsed ? 'rotate(0deg)' : 'rotate(90deg)'}"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
              ${groupOrDash.title}
            </span>
            <span class="module-progress-pill" style="background: rgba(0,0,0,0.03); color: var(--text-muted)">
              ${groupDoneCount}/${groupMatchedCount} Đã xong
            </span>
          </div>
          <div class="group-body ${isGroupCollapsed ? 'hidden' : ''}" id="node-body-${gKey}">
            ${screenItemsHtml}
          </div>
        </div>
      `;
    }).join('');

    const isModuleVisible = moduleScreensCount > 0;

    const moduleHtml = `
      <div class="module-node ${isModuleVisible ? '' : 'hidden'}" id="module-node-${mKey}">
        <div class="module-header ${isModuleCollapsed ? '' : 'expanded'}" id="node-header-${mKey}" onclick="toggleNode('${mKey}')">
          <div class="module-header-left">
            <svg class="chevron-icon" viewBox="0 0 24 24" style="transform: ${isModuleCollapsed ? 'rotate(0deg)' : 'rotate(90deg)'}"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
            <span class="module-title">${module.title}</span>
          </div>
          <span class="module-progress-pill">
            ${moduleDoneCount}/${moduleScreensCount} Hoàn thành
          </span>
        </div>
        <div class="module-body ${isModuleCollapsed ? 'hidden' : ''}" id="node-body-${mKey}">
          ${moduleItemsHtml}
        </div>
      </div>
    `;

    container.innerHTML += moduleHtml;
  });

  if (matchedCount === 0) {
    return `<div style="text-align:center; padding: 48px; color: var(--text-muted);">Không tìm thấy màn hình nào phù hợp với bộ lọc/tìm kiếm.</div>`;
  }

  return container.outerHTML;
}

window.toggleNodeDetails = function (screenId) {
  const panel = document.getElementById(`detail-${screenId}`);
  const chev = document.getElementById(`chev-${screenId}`);
  if (panel) {
    const isHidden = panel.classList.contains('hidden');
    if (isHidden) {
      panel.classList.remove('hidden');
      if (chev) chev.classList.add('rotated-180');
    } else {
      panel.classList.add('hidden');
      if (chev) chev.classList.remove('rotated-180');
    }
  }
};

function renderCardView() {
  const container = document.createElement('div');
  container.className = 'card-grid-container';

  if (!activeMenuStructure || !Array.isArray(activeMenuStructure) || activeMenuStructure.length === 0) {
    return `<div style="text-align:center; padding: 48px; color: var(--text-muted);">Chưa có dữ liệu màn hình / menu cho phân hệ này.</div>`;
  }

  let totalMatched = 0;

  activeMenuStructure.forEach((module, mIdx) => {
    let moduleMatched = 0;
    const groupCardsHtml = module.items.map((groupOrDash) => {

      let cardsHtml = '';

      if (groupOrDash.type === 'dashboard') {
        const screen = screensMap[groupOrDash.id] || { id: groupOrDash.id, name: groupOrDash.name, eduCode: '-', tables: [], description: '', status: 'Chưa xử lý', jiraUrl: '', actualUrl: '' };
        if (isMatched(screen)) {
          totalMatched++;
          moduleMatched++;
          cardsHtml += `
            <div class="screen-card">
              <div class="card-header">
                <span class="screen-id-badge" style="background:var(--accent-light); color:var(--accent-color); border-color:transparent;">DASHBOARD</span>
                ${getStatusDropdownHtml(screen.id, screen.status)}
              </div>
              <div class="card-title" style="font-weight: 700;">
                ${screen.name}
                ${getDifficultyBadgeHtml(screen.difficulty || 'Trung bình')}
              </div>
              
              <div style="display: grid; grid-template-columns: 1.2fr 1.2fr 1fr; gap: 8px; margin-top: 8px;">
                <div class="details-row">
                  <div class="details-label">Jira Link</div>
                  <input type="text" placeholder="Jira URL..." value="${screen.jiraUrl || ''}" onblur="updateItemJira('${screen.id}', this.value)" ${isEditMode ? '' : 'readonly'} style="width:100%; padding:4px 8px; border-radius:4px; border:1px solid var(--card-border); background:${isEditMode ? 'var(--sidebar-bg)' : 'var(--item-hover)'}; color:var(--text-main); font-size:11px; outline:none; ${isEditMode ? '' : 'cursor: default;'}">
                </div>
                <div class="details-row">
                  <div class="details-label">Web URL</div>
                  <input type="text" placeholder="Actual URL..." value="${screen.actualUrl || ''}" onblur="updateItemActualUrl('${screen.id}', this.value)" ${isEditMode ? '' : 'readonly'} style="width:100%; padding:4px 8px; border-radius:4px; border:1px solid var(--card-border); background:${isEditMode ? 'var(--sidebar-bg)' : 'var(--item-hover)'}; color:var(--text-main); font-size:11px; outline:none; ${isEditMode ? '' : 'cursor: default;'}">
                </div>
                <div class="details-row">
                  <div class="details-label">Độ khó</div>
                  ${getDifficultyDropdownHtml(screen.id, screen.difficulty)}
                </div>
              </div>

              <div class="details-row">
                <div class="details-label">Bảng Database liên quan</div>
                <div class="table-tags">${getTableTagsHtml(screen.tables)}</div>
              </div>
              <div class="details-row">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span class="details-label">Mô tả / Ghi chú</span>
                  <span class="auto-save-indicator" id="save-indicator-${screen.id}">
                    <svg class="icon-svg" viewBox="0 0 24 24" style="width:12px;height:12px;fill:#10b981;"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
                    Đã lưu
                  </span>
                </div>
                <div class="note-preview-box ql-editor" id="note-preview-${screen.id}">
                  ${screen.description ? screen.description : '<em style="color:var(--text-muted);">Chưa có ghi chú, mô tả...</em>'}
                </div>
                <button onclick="openNoteEditorModal('${screen.id}')" style="margin-top: 6px; padding: 5px 11px; font-size: 11px; font-weight: 600; display: inline-flex; align-items: center; gap: 5px; border-radius: 20px; border: none; cursor: pointer; background: ${isEditMode ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'linear-gradient(135deg,#0ea5e9,#06b6d4)'}; color: #fff; box-shadow: 0 2px 8px ${isEditMode ? 'rgba(99,102,241,0.35)' : 'rgba(6,182,212,0.3)'}; transition: opacity 0.15s, transform 0.15s;" onmouseover="this.style.opacity='0.82'; this.style.transform='translateY(-1px)'" onmouseout="this.style.opacity='1'; this.style.transform='translateY(0)'">
                  <svg style="width:11px; height:11px; fill:#fff; flex-shrink:0;" viewBox="0 0 24 24"><path d="${isEditMode ? 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' : 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'}"/></svg>
                  ${isEditMode ? 'Chỉnh sửa Ghi chú' : 'Xem Ghi chú'}
                </button>
              </div>
            </div>
          `;
        }
      } else {
        groupOrDash.items.forEach(item => {
          const screen = screensMap[item.id] || { id: item.id, name: item.name, eduCode: '-', tables: [], description: '', status: 'Chưa xử lý', jiraUrl: '', actualUrl: '' };
          if (isMatched(screen)) {
            totalMatched++;
            moduleMatched++;
            cardsHtml += `
              <div class="screen-card">
                <div class="card-header">
                  <span class="screen-id-badge">${screen.id}</span>
                  ${getStatusDropdownHtml(screen.id, screen.status)}
                </div>
                <div class="card-title">
                  ${screen.name}
                  ${getDifficultyBadgeHtml(screen.difficulty || 'Trung bình')}
                </div>
                
                <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span class="details-label">Mã EDU:</span>
                    <span class="screen-edu-code">${screen.eduCode || '-'}</span>
                  </div>
                  <div style="display:flex; gap:6px;">
                    ${getBusinessLinksHtml(screen)}
                  </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1.2fr 1.2fr 1fr; gap: 8px;">
                  <div class="details-row">
                    <div class="details-label">Jira Link</div>
                    <input type="text" placeholder="Jira URL..." value="${screen.jiraUrl || ''}" onblur="updateItemJira('${screen.id}', this.value)" ${isEditMode ? '' : 'readonly'} style="width:100%; padding:4px 8px; border-radius:4px; border:1px solid var(--card-border); background:${isEditMode ? 'var(--sidebar-bg)' : 'var(--item-hover)'}; color:var(--text-main); font-size:11px; outline:none; ${isEditMode ? '' : 'cursor: default;'}">
                  </div>
                  <div class="details-row">
                    <div class="details-label">Web URL</div>
                    <input type="text" placeholder="Actual URL..." value="${screen.actualUrl || ''}" onblur="updateItemActualUrl('${screen.id}', this.value)" ${isEditMode ? '' : 'readonly'} style="width:100%; padding:4px 8px; border-radius:4px; border:1px solid var(--card-border); background:${isEditMode ? 'var(--sidebar-bg)' : 'var(--item-hover)'}; color:var(--text-main); font-size:11px; outline:none; ${isEditMode ? '' : 'cursor: default;'}">
                  </div>
                  <div class="details-row">
                    <div class="details-label">Độ khó</div>
                    ${getDifficultyDropdownHtml(screen.id, screen.difficulty)}
                  </div>
                </div>

                <div class="details-row">
                  <span class="details-label">Bảng Database liên quan</span>
                  <div class="table-tags">${getTableTagsHtml(screen.tables)}</div>
                </div>
                
                <div class="details-row">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span class="details-label">Ghi chú tiến trình</span>
                    <span class="auto-save-indicator" id="save-indicator-${screen.id}">
                      <svg class="icon-svg" viewBox="0 0 24 24" style="width:12px;height:12px;fill:#10b981;"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
                      Đã lưu
                    </span>
                  </div>
                  <div class="note-preview-box ql-editor" id="note-preview-${screen.id}">
                    ${screen.description ? screen.description : '<em style="color:var(--text-muted);">Chưa có ghi chú, mô tả...</em>'}
                  </div>
                  <button onclick="openNoteEditorModal('${screen.id}')" style="margin-top: 6px; padding: 5px 11px; font-size: 11px; font-weight: 600; display: inline-flex; align-items: center; gap: 5px; border-radius: 20px; border: none; cursor: pointer; background: ${isEditMode ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'linear-gradient(135deg,#0ea5e9,#06b6d4)'}; color: #fff; box-shadow: 0 2px 8px ${isEditMode ? 'rgba(99,102,241,0.35)' : 'rgba(6,182,212,0.3)'}; transition: opacity 0.15s, transform 0.15s;" onmouseover="this.style.opacity='0.82'; this.style.transform='translateY(-1px)'" onmouseout="this.style.opacity='1'; this.style.transform='translateY(0)'">
                    <svg style="width:11px; height:11px; fill:#fff; flex-shrink:0;" viewBox="0 0 24 24"><path d="${isEditMode ? 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' : 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'}"/></svg>
                    ${isEditMode ? 'Chỉnh sửa Ghi chú' : 'Xem Ghi chú'}
                  </button>
                </div>
              </div>
            `;
          }
        });
      }

      if (cardsHtml) {
        return `
          <div class="card-group-section">
            <h2>${groupOrDash.title || 'Tổng quan'}</h2>
            <div class="grid-layout">${cardsHtml}</div>
          </div>
        `;
      }
      return '';
    }).join('');

    if (moduleMatched > 0) {
      const modSec = `
        <div class="module-card-section" style="margin-bottom: 30px;">
          <h1 style="font-family:'Outfit'; font-size:20px; font-weight:700; margin-bottom:16px; color:var(--accent-color)">${module.title}</h1>
          ${groupCardsHtml}
        </div>
      `;
      container.innerHTML += modSec;
    }
  });

  if (totalMatched === 0) {
    return `<div style="text-align:center; padding: 48px; color: var(--text-muted);">Không tìm thấy màn hình nào phù hợp với bộ lọc.</div>`;
  }

  return container.outerHTML;
}

function renderSidebarChips() {
  const container = document.getElementById('status-filter-container');
  if (!container) return;

  let html = `
    <button class="filter-chip ${activeFilter === 'ALL' ? 'active' : ''}" onclick="changeFilter('ALL')">
      <span>Tất cả</span>
      <span class="chip-count" id="chip-all-count">0</span>
    </button>
  `;

  STATUS_CONFIGS.forEach(status => {
    const clsName = `status-custom-${status.id}`;
    html += `
      <button class="filter-chip ${clsName} ${activeFilter === status.label ? 'active' : ''}" onclick="changeFilter('${status.label}')">
        <span>${status.label}</span>
        <span class="chip-count" id="chip-${status.id}-count">0</span>
      </button>
    `;
  });

  container.innerHTML = html;
  updateProgressMetrics();
  renderDifficultyChips();
}

window.changeFilter = function (statusLabel) {
  activeFilter = statusLabel;
  renderSidebarChips();
  renderContent();
};

function renderDifficultyChips() {
  const container = document.getElementById('difficulty-filter-container');
  if (!container) return;
  const screensList = Object.values(screensMap);
  const counts = {};
  DIFFICULTY_CONFIGS.forEach(d => { counts[d.label] = 0; });
  screensList.forEach(s => {
    const dl = s.difficulty || 'Trung bình';
    if (counts[dl] !== undefined) counts[dl]++;
  });

  let html = `
    <button class="filter-chip ${activeDifficultyFilter === 'ALL' ? 'active' : ''}" onclick="changeDifficultyFilter('ALL')">
      <span>Tất cả</span>
      <span class="chip-count">${screensList.length}</span>
    </button>
  `;
  DIFFICULTY_CONFIGS.forEach(d => {
    const isActive = activeDifficultyFilter === d.label;
    html += `
      <button class="filter-chip ${isActive ? 'active' : ''}" onclick="changeDifficultyFilter('${d.label}')"
        style="${isActive ? `background:${d.bg}; color:${d.text}; border-color:${d.border};` : ''}">
        <span>${d.label}</span>
        <span class="chip-count">${counts[d.label] || 0}</span>
      </button>
    `;
  });
  container.innerHTML = html;
}

window.changeDifficultyFilter = function (label) {
  activeDifficultyFilter = label;
  renderDifficultyChips();
  renderContent();
};

window.toggleDiffStats = function () {
  const list = document.getElementById('difficulty-stats-list');
  const chevron = document.getElementById('diff-stats-chevron');
  if (!list) return;
  const isOpen = list.style.display === 'flex';
  list.style.display = isOpen ? 'none' : 'flex';
  if (chevron) chevron.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
};

window.toggleSidebarSection = function (containerId, chevronId) {
  const el = document.getElementById(containerId);
  const chevron = document.getElementById(chevronId);
  if (!el) return;
  const isOpen = el.style.display !== 'none';
  el.style.display = isOpen ? 'none' : 'flex';
  if (chevron) chevron.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
};

function renderContent() {
  const titleEl = document.getElementById('view-title');
  if (titleEl) {
    const currentMod = MODULES_LIST.find(m => m.id === selectedModuleId);
    const modName = currentMod ? currentMod.name : 'Chương trình Đào tạo';
    titleEl.innerText = viewMode === 'tree' ? modName : `${modName} (Dạng thẻ)`;
  }

  const target = document.getElementById('content-renderer');
  if (!target) return;
  if (viewMode === 'tree') {
    target.innerHTML = renderTreeView();
  } else {
    target.innerHTML = renderCardView();
  }
  updateProgressMetrics();
}

function toggleTheme() {
  const htmlEl = document.documentElement;
  const themeBtn = document.getElementById('theme-btn');
  if (!themeBtn) return;
  const darkIcon = themeBtn.querySelector('.dark-icon');
  const lightIcon = themeBtn.querySelector('.light-icon');

  if (htmlEl.classList.contains('dark')) {
    htmlEl.classList.remove('dark');
    if (darkIcon) darkIcon.style.display = 'block';
    if (lightIcon) lightIcon.style.display = 'none';
    localStorage.setItem('menu_theme', 'light');
  } else {
    htmlEl.classList.add('dark');
    if (darkIcon) darkIcon.style.display = 'none';
    if (lightIcon) lightIcon.style.display = 'block';
    localStorage.setItem('menu_theme', 'dark');
  }
}

function closeMobileSidebar() {
  const sidebar = document.querySelector('aside');
  const overlay = document.getElementById('mobile-overlay');
  if (sidebar) sidebar.classList.remove('mobile-open');
  if (overlay) overlay.classList.remove('active');
}

function toggleMobileSidebar() {
  const sidebar = document.querySelector('aside');
  const overlay = document.getElementById('mobile-overlay');
  if (sidebar) sidebar.classList.toggle('mobile-open');
  if (overlay) overlay.classList.toggle('active');
}
