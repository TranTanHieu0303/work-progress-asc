// ADMIN MANAGEMENT MODULE (MODULES, SCREENS, DATABASE SCHEMAS, STATUSES, DIFFICULTIES, & QUILL NOTE EDITOR)

let activeAdminTab = 'modules';

window.openAdminSettings = function () {
  const modal = document.getElementById('admin-modal');
  if (modal) {
    modal.classList.add('active');
    switchAdminTab(activeAdminTab);
  }
};

window.closeAdminSettings = function () {
  const modal = document.getElementById('admin-modal');
  if (modal) {
    modal.classList.remove('active');
  }
};

window.switchAdminTab = function (tabId) {
  activeAdminTab = tabId;
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.getElementById(`tab-btn-${tabId}`);
  if (activeBtn) activeBtn.classList.add('active');
  renderAdminTabContent();
};

function renderAdminTabContent() {
  const container = document.getElementById('admin-tab-content');
  if (!container) return;
  container.innerHTML = "";

  if (activeAdminTab === 'modules') {
    renderModulesAdmin(container);
  } else if (activeAdminTab === 'screens') {
    renderScreensAdmin(container);
  } else if (activeAdminTab === 'database') {
    renderDatabaseAdmin(container);
  } else if (activeAdminTab === 'statuses') {
    renderStatusesAdmin(container);
  } else if (activeAdminTab === 'difficulties') {
    renderDifficultiesAdmin(container);
  }
}

function renderModulesAdmin(container) {
  let modulesListHtml = MODULES_LIST.map(mod => `
    <div class="admin-list-card" style="margin-bottom:8px; border: 1px solid ${mod.isActive ? 'var(--accent-color)' : 'var(--card-border)'}; background: ${mod.isActive ? 'rgba(99, 102, 241, 0.05)' : 'var(--card-bg)'};">
      <div>
        <div style="display:flex; align-items:center; gap:8px;">
          <strong style="color:var(--text-main); font-size:14px;">${mod.name}</strong>
          ${mod.isActive ? '<span style="font-size:10px; background:var(--accent-color); color:#fff; padding:2px 6px; border-radius:4px; font-weight:700;">ĐANG KÍCH HOẠT</span>' : ''}
        </div>
        <div style="font-size:11px; color:var(--text-muted);">ID: ${mod.id}</div>
      </div>
      <div style="display:flex; gap:8px; align-items:center;">
        ${!mod.isActive ? `<button class="admin-btn primary" style="padding:4px 8px; font-size:11px;" onclick="setActiveModuleInCloud('${mod.id}')">Đặt Kích hoạt</button>` : ''}
        <button class="admin-btn secondary" style="padding:4px 8px; font-size:11px;" onclick="renameModulePrompt('${mod.id}', '${mod.name}')">Sửa tên</button>
        <button class="admin-btn danger" style="padding:4px 8px; font-size:11px;" onclick="deleteModulePrompt('${mod.id}')">Xóa</button>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="admin-panel-title">Quản lý Phân hệ (Modules)</div>
    <div style="display:grid; grid-template-columns: 1fr; gap:16px;">
      <div>
        <h4 style="font-size:12px; font-weight:700; margin-bottom:12px; color:var(--text-muted); text-transform:uppercase;">Danh sách Phân hệ</h4>
        <div style="max-height: 220px; overflow-y:auto; padding-right:4px;">
          ${modulesListHtml || '<div style="color:var(--text-muted); font-size:12px;">Chưa có phân hệ nào.</div>'}
        </div>
      </div>
      <div style="border-top: 1px solid var(--card-border); padding-top:16px;">
        <h4 style="font-size:12px; font-weight:700; margin-bottom:12px; color:var(--text-muted); text-transform:uppercase;">Thêm Phân hệ Mới</h4>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-bottom:12px;">
          <div class="admin-input-group">
            <label>Mã Phân hệ (ID)</label>
            <input type="text" id="new-mod-id" class="admin-input" placeholder="Ví dụ: khao_thi (chữ thường, gạch dưới)">
          </div>
          <div class="admin-input-group">
            <label>Tên Phân hệ</label>
            <input type="text" id="new-mod-name" class="admin-input" placeholder="Ví dụ: Khảo thí & Điểm thi">
          </div>
        </div>
        <button class="admin-btn primary" onclick="addModule()">Thêm phân hệ</button>
      </div>
    </div>
  `;
}

window.addModule = function () {
  const id = document.getElementById('new-mod-id').value.trim();
  const name = document.getElementById('new-mod-name').value.trim();

  if (!id || !name) {
    alert("Vui lòng điền đầy đủ Mã ID và Tên phân hệ!");
    return;
  }
  if (!/^[a-z0-9_]+$/.test(id)) {
    alert("Mã phân hệ chỉ chứa chữ thường, số và gạch dưới (không chứa khoảng trắng hay ký tự đặc biệt)!");
    return;
  }
  if (MODULES_LIST.some(m => m.id === id)) {
    alert("Mã phân hệ này đã tồn tại!");
    return;
  }

  const newMod = { id, name, order: MODULES_LIST.length + 1, isActive: false };
  MODULES_LIST.push(newMod);

  if (isFirebaseEnabled && firestoreDb) {
    firestoreDb.collection('modules').doc(id).set(newMod);
    firestoreDb.collection('menu_structures').doc(id).set({
      moduleId: id,
      structure: []
    });
  } else {
    localStorage.setItem(STORAGE_KEY + '_modules_list', JSON.stringify(MODULES_LIST));
  }

  repopulateModuleDropdown();
  switchModule(id);
  renderAdminTabContent();
  showToast(`Đã thêm phân hệ ${name}`);
};

window.renameModulePrompt = function (moduleId, oldName) {
  const newName = prompt(`Nhập tên mới cho phân hệ ${oldName}:`, oldName);
  if (newName && newName.trim() && newName !== oldName) {
    const mod = MODULES_LIST.find(m => m.id === moduleId);
    if (mod) {
      mod.name = newName.trim();
      if (isFirebaseEnabled && firestoreDb) {
        firestoreDb.collection('modules').doc(moduleId).update({
          name: newName.trim()
        });
      } else {
        localStorage.setItem(STORAGE_KEY + '_modules_list', JSON.stringify(MODULES_LIST));
      }
      repopulateModuleDropdown();
      renderAdminTabContent();
      showToast("Đã đổi tên phân hệ thành công!");
    }
  }
};

window.deleteModulePrompt = function (moduleId) {
  if (MODULES_LIST.length <= 1) {
    alert("Không thể xóa phân hệ duy nhất còn lại!");
    return;
  }

  if (confirm(`⚠️ CẢNH BÁO QUAN TRỌNG:\nXóa phân hệ này sẽ xóa vĩnh viễn toàn bộ menu cấu trúc và toàn bộ tiến độ xử lý của các màn hình thuộc phân hệ này.\nHành động này không thể hoàn tác!\n\nBạn có thực sự chắc chắn muốn tiếp tục không?`)) {
    MODULES_LIST = MODULES_LIST.filter(m => m.id !== moduleId);

    if (isFirebaseEnabled && firestoreDb) {
      firestoreDb.collection('modules').doc(moduleId).delete();
      firestoreDb.collection('menu_structures').doc(moduleId).delete();
      firestoreDb.collection('screens').where('moduleId', '==', moduleId).get().then(snap => {
        const batch = firestoreDb.batch();
        snap.forEach(doc => {
          batch.delete(doc.ref);
        });
        batch.commit();
      });
    } else {
      localStorage.setItem(STORAGE_KEY + '_modules_list', JSON.stringify(MODULES_LIST));
      localStorage.removeItem(STORAGE_KEY + '_' + moduleId);
      localStorage.removeItem(STORAGE_KEY + '_structure_' + moduleId);
    }

    repopulateModuleDropdown();
    switchModule(MODULES_LIST[0].id);
    renderAdminTabContent();
    showToast("Đã xóa phân hệ thành công!");
  }
};

function repopulateModuleDropdown() {
  const select = document.getElementById('module-select');
  if (select) {
    select.innerHTML = MODULES_LIST.map(mod => `
      <option value="${mod.id}" ${mod.id === selectedModuleId ? 'selected' : ''}>
        ${mod.name} ${mod.isActive ? '★' : ''}
      </option>
    `).join('');
    if (selectedModuleId) {
      select.value = selectedModuleId;
    }
  }
}

function renderScreensAdmin(container) {
  const currentScreen = activeEditScreenId ? screensMap[activeEditScreenId] : null;

  const tablesCheckboxHtml = tables.map(t => {
    const isChecked = currentScreen && currentScreen.tables && currentScreen.tables.includes(t.id);
    return `
      <label style="display:flex; align-items:center; gap:6px; font-size:12px; color:var(--text-main);">
        <input type="checkbox" name="screen-tables" value="${t.id}" ${isChecked ? 'checked' : ''}>
        ${t.id}
      </label>
    `;
  }).join('');

  const allGroupsList = [];
  activeMenuStructure.forEach((modNode, mIdx) => {
    modNode.items.forEach((grpOrDash, gIdx) => {
      if (grpOrDash.type === 'group') {
        allGroupsList.push({
          key: `${mIdx}-${gIdx}`,
          moduleTitle: modNode.title,
          groupTitle: grpOrDash.title
        });
      }
    });
  });

  let currentGroupKey = '';
  if (activeEditScreenId) {
    activeMenuStructure.forEach((modNode, mIdx) => {
      modNode.items.forEach((grpNode, gIdx) => {
        if (grpNode.items && grpNode.items.some(item => item.id === activeEditScreenId)) {
          currentGroupKey = `${mIdx}-${gIdx}`;
        }
      });
    });
  }

  const groupSelectOptions = allGroupsList.map(g => `
    <option value="${g.key}" ${g.key === currentGroupKey ? 'selected' : ''}>[${g.moduleTitle}] ${g.groupTitle}</option>
  `).join('');

  const filteredScreens = Object.values(screensMap).filter(scr => {
    const q = adminScreenQuery.trim().toLowerCase();
    if (!q) return true;
    return scr.id.toLowerCase().includes(q) ||
      scr.name.toLowerCase().includes(q) ||
      (scr.eduCode && scr.eduCode.toLowerCase().includes(q)) ||
      (scr.tables && scr.tables.some(t => t.toLowerCase().includes(q)));
  });

  const screensListHtml = filteredScreens.map(scr => `
    <div class="admin-list-card" style="margin-bottom:6px; padding:6px 12px; border: 1px solid ${scr.id === activeEditScreenId ? 'var(--accent-color)' : 'var(--card-border)'}; background: ${scr.id === activeEditScreenId ? 'rgba(99, 102, 241, 0.05)' : 'var(--card-bg)'};">
      <div style="font-size:12px;">
        <strong style="color:var(--text-main);">${scr.id}</strong> - ${scr.name}
        <div style="font-size:10px; color:var(--text-muted);">EDU: ${scr.eduCode || '-'} | DB: ${scr.tables.join(', ') || 'Không'}</div>
      </div>
      <div style="display:flex; gap:6px;">
        <button class="admin-btn secondary" style="padding:2px 6px; font-size:10px;" onclick="editScreenPrompt('${scr.id}')">Sửa</button>
        <button class="admin-btn danger" style="padding:2px 6px; font-size:10px;" onclick="deleteScreenPrompt('${scr.id}')">Xóa</button>
      </div>
    </div>
  `).join('');

  let leftPanelHtml = '';
  if (activeEditScreenId && currentScreen) {
    leftPanelHtml = `
      <div style="border:1px solid var(--accent-color); padding:16px; border-radius:12px; background:rgba(99, 102, 241, 0.02);">
        <h4 style="font-size:11px; font-weight:700; margin-bottom:12px; color:var(--accent-color); text-transform:uppercase;">✏️ Cập nhật Màn hình</h4>
        <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:12px;">
          <div class="admin-input-group">
            <label>Mã Màn hình (ID)</label>
            <input type="text" id="edit-scr-id" class="admin-input" value="${currentScreen.id}" disabled style="opacity:0.6; cursor:not-allowed;">
          </div>
          <div class="admin-input-group">
            <label>Chọn Nhóm Menu</label>
            <select id="edit-screen-group-select" class="admin-input">
              ${groupSelectOptions || '<option value="">(Không có nhóm menu)</option>'}
            </select>
          </div>
          <div class="admin-input-group">
            <label>Tên Màn hình</label>
            <input type="text" id="edit-scr-name" class="admin-input" placeholder="Tên màn hình..." value="${currentScreen.name}">
          </div>
          <div class="admin-input-group">
            <label>Mã EDU cũ</label>
            <input type="text" id="edit-scr-educode" class="admin-input" placeholder="Mã EDU..." value="${currentScreen.eduCode || '-'}">
          </div>
          <div class="admin-input-group">
            <label>Bảng DB liên quan</label>
            <div style="max-height:140px; overflow-y:auto; border:1px solid var(--card-border); padding:6px; border-radius:6px; background:var(--card-bg); display:flex; flex-direction:column; gap:4px;">
              ${tablesCheckboxHtml || '<div style="font-size:11px; color:var(--text-muted);">Không có bảng nào.</div>'}
            </div>
          </div>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="admin-btn primary" style="flex:1;" onclick="saveEditScreen()">Lưu Thay Đổi</button>
          <button class="admin-btn secondary" style="flex:1;" onclick="cancelEditScreen()">Hủy</button>
        </div>
      </div>
    `;
  } else {
    leftPanelHtml = `
      <div>
        <h4 style="font-size:11px; font-weight:700; margin-bottom:8px; color:var(--text-muted); text-transform:uppercase;">Thêm Nhóm Menu</h4>
        <div class="admin-input-group" style="margin-bottom:8px;">
          <label>Tên Nhóm (Ví dụ: Nhóm 1.6 - Thiết lập thi)</label>
          <input type="text" id="new-group-title" class="admin-input" placeholder="Tên nhóm mới...">
        </div>
        <button class="admin-btn secondary" style="width:100%;" onclick="addNewGroup()">Tạo nhóm mới</button>
      </div>
      
      <div style="border-top:1px solid var(--card-border); padding-top:16px;">
        <h4 style="font-size:11px; font-weight:700; margin-bottom:8px; color:var(--text-muted); text-transform:uppercase;">Thêm Màn hình vào Nhóm</h4>
        <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:12px;">
          <div class="admin-input-group">
            <label>Chọn Nhóm</label>
            <select id="screen-group-select" class="admin-input">
              ${groupSelectOptions || '<option value="">(Không có nhóm menu)</option>'}
            </select>
          </div>
          <div class="admin-input-group">
            <label>Mã Màn hình (ID)</label>
            <input type="text" id="new-scr-id" class="admin-input" placeholder="Ví dụ: B.6.3.20">
          </div>
          <div class="admin-input-group">
            <label>Tên Màn hình</label>
            <input type="text" id="new-scr-name" class="admin-input" placeholder="Ví dụ: Thiết lập thi">
          </div>
          <div class="admin-input-group">
            <label>Mã EDU cũ</label>
            <input type="text" id="new-scr-educode" class="admin-input" placeholder="Ví dụ: E041005 (hoặc -)">
          </div>
          <div class="admin-input-group">
            <label>Bảng DB liên quan</label>
            <div style="max-height:90px; overflow-y:auto; border:1px solid var(--card-border); padding:6px; border-radius:6px; background:var(--card-bg); display:flex; flex-direction:column; gap:4px;">
              ${tablesCheckboxHtml || '<div style="font-size:11px; color:var(--text-muted);">Không có bảng nào.</div>'}
            </div>
          </div>
        </div>
        <button class="admin-btn primary" style="width:100%;" onclick="addNewScreen()">Thêm màn hình</button>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="admin-panel-title">Quản lý Màn hình (Screens)</div>
    <div style="display:grid; grid-template-columns: 1.2fr 1.8fr; gap:20px; height: calc(100% - 40px); overflow:hidden;">
      <div style="overflow-y:auto; padding-right:12px; display:flex; flex-direction:column; gap:16px; border-right:1px solid var(--card-border);">
        ${leftPanelHtml}
      </div>

      <div style="overflow-y:auto; padding-right:4px; display:flex; flex-direction:column; gap:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
          <h4 style="font-size:11px; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin:0;">Danh sách màn hình</h4>
          <span style="font-size:11px; color:var(--text-muted); font-weight:600;">${filteredScreens.length}/${Object.keys(screensMap).length} Màn hình</span>
        </div>
        
        <input type="text" id="admin-screen-search" class="admin-input" style="padding:6px; font-size:12px; margin-bottom:4px;" placeholder="Tìm nhanh màn hình (Tên, ID, bảng DB)..." oninput="filterAdminScreens(this.value)" value="${adminScreenQuery}">

        <div style="max-height:380px; overflow-y:auto; display:flex; flex-direction:column; gap:6px; padding-right:4px;">
          ${screensListHtml || '<div style="color:var(--text-muted); font-size:12px;">Chưa có hoặc không tìm thấy màn hình nào.</div>'}
        </div>
      </div>
    </div>
  `;
}

window.filterAdminScreens = function (val) {
  adminScreenQuery = val;
  renderAdminTabContent();
  const searchInput = document.getElementById('admin-screen-search');
  if (searchInput) {
    searchInput.focus();
    const len = searchInput.value.length;
    searchInput.setSelectionRange(len, len);
  }
};

window.editScreenPrompt = function (screenId) {
  activeEditScreenId = screenId;
  renderAdminTabContent();
};

window.cancelEditScreen = function () {
  activeEditScreenId = null;
  renderAdminTabContent();
};

window.saveEditScreen = function () {
  if (!activeEditScreenId) return;
  const name = document.getElementById('edit-scr-name').value.trim();
  const newGroupKey = document.getElementById('edit-screen-group-select').value;
  const eduCode = document.getElementById('edit-scr-educode').value.trim() || '-';

  if (!name) {
    alert("Tên màn hình không được để trống!");
    return;
  }
  if (!newGroupKey) {
    alert("Vui lòng chọn nhóm menu cho màn hình!");
    return;
  }

  const selectedTables = [];
  document.querySelectorAll('input[name="screen-tables"]:checked').forEach(cb => {
    selectedTables.push(cb.value);
  });

  const scr = screensMap[activeEditScreenId];
  if (!scr) return;

  scr.name = name;
  scr.eduCode = eduCode;
  scr.tables = selectedTables;

  let oldGroupInfo = null;
  activeMenuStructure.forEach((modNode, mIdx) => {
    modNode.items.forEach((grpNode, gIdx) => {
      if (grpNode.items && grpNode.items.some(item => item.id === activeEditScreenId)) {
        oldGroupInfo = { mIdx, gIdx };
      }
    });
  });

  const targetParts = newGroupKey.split('-');
  const newMIdx = parseInt(targetParts[0]);
  const newGIdx = parseInt(targetParts[1]);

  if (oldGroupInfo) {
    activeMenuStructure[oldGroupInfo.mIdx].items[oldGroupInfo.gIdx].items =
      activeMenuStructure[oldGroupInfo.mIdx].items[oldGroupInfo.gIdx].items.filter(item => item.id !== activeEditScreenId);
  }

  if (!activeMenuStructure[newMIdx].items[newGIdx].items) {
    activeMenuStructure[newMIdx].items[newGIdx].items = [];
  }
  activeMenuStructure[newMIdx].items[newGIdx].items.push({ id: activeEditScreenId, name: name });

  saveMenuStructure();
  saveProgress(activeEditScreenId);

  activeEditScreenId = null;
  renderAdminTabContent();
  showToast("Cập nhật thông tin màn hình thành công!");
};

window.addNewGroup = function () {
  const title = document.getElementById('new-group-title').value.trim();
  if (!title) {
    alert("Vui lòng nhập tên nhóm!");
    return;
  }

  if (activeMenuStructure.length === 0) {
    activeMenuStructure.push({
      title: "Tổng quan",
      type: "module",
      items: []
    });
  }

  activeMenuStructure[0].items.push({
    title: title,
    type: "group",
    items: []
  });

  saveMenuStructure();
  renderAdminTabContent();
  showToast(`Đã thêm nhóm: ${title}`);
};

window.addNewScreen = function () {
  const groupKey = document.getElementById('screen-group-select').value;
  const id = document.getElementById('new-scr-id').value.trim();
  const name = document.getElementById('new-scr-name').value.trim();
  const eduCode = document.getElementById('new-scr-educode').value.trim() || '-';

  if (!groupKey) {
    alert("Vui lòng chọn nhóm menu!");
    return;
  }
  if (!id || !name) {
    alert("Vui lòng điền Mã ID và Tên màn hình!");
    return;
  }
  if (screensMap[id]) {
    alert("Mã màn hình này đã tồn tại trong phân hệ!");
    return;
  }

  const selectedTables = [];
  document.querySelectorAll('input[name="screen-tables"]:checked').forEach(cb => {
    selectedTables.push(cb.value);
  });

  const newScreen = {
    id: id,
    moduleId: selectedModuleId,
    name: name,
    eduCode: eduCode,
    tables: selectedTables,
    description: '',
    status: 'Chưa xử lý',
    jiraUrl: '',
    actualUrl: ''
  };

  screensMap[id] = newScreen;

  const parts = groupKey.split('-');
  const mIdx = parseInt(parts[0]);
  const gIdx = parseInt(parts[1]);
  activeMenuStructure[mIdx].items[gIdx].items.push({ id, name });

  saveMenuStructure();

  if (isFirebaseEnabled && firestoreDb) {
    const docId = `${selectedModuleId}_${id}`;
    firestoreDb.collection('screens').doc(docId).set({
      ...newScreen,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } else {
    localStorage.setItem(STORAGE_KEY + '_' + selectedModuleId, JSON.stringify(screensMap));
  }

  renderAdminTabContent();
  showToast(`Đã thêm màn hình ${id}`);
};

window.deleteScreenPrompt = function (screenId) {
  if (confirm(`CẢNH BÁO: Bạn có chắc chắn muốn xóa màn hình [${screenId}] và mọi ghi chú tiến trình không?`)) {
    activeMenuStructure.forEach(modNode => {
      modNode.items.forEach(grpNode => {
        if (grpNode.items) {
          grpNode.items = grpNode.items.filter(item => item.id !== screenId);
        }
      });
    });

    if (isFirebaseEnabled && firestoreDb) {
      const docId = `${selectedModuleId}_${screenId}`;
      firestoreDb.collection('screens').doc(docId).delete();
    }

    delete screensMap[screenId];
    localStorage.setItem(STORAGE_KEY + '_' + selectedModuleId, JSON.stringify(screensMap));

    saveMenuStructure();
    renderAdminTabContent();
    showToast(`Đã xóa màn hình ${screenId}`);
  }
};

function saveMenuStructure() {
  if (isFirebaseEnabled && firestoreDb) {
    firestoreDb.collection('menu_structures').doc(selectedModuleId).set({
      moduleId: selectedModuleId,
      structure: activeMenuStructure
    });
  } else {
    localStorage.setItem(STORAGE_KEY + '_structure_' + selectedModuleId, JSON.stringify(activeMenuStructure));
  }
  updateProgressMetrics();
  renderContent();
}

function renderDatabaseAdmin(container) {
  container.innerHTML = `
    <div class="admin-panel-title" style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px;">
      <span>Quản lý Bảng Cơ sở dữ liệu (Tables & Schema)</span>
      <div style="display:flex; gap:8px;">
        <button class="admin-btn primary" style="padding:4px 10px; font-size:11px;" onclick="exportTableSchemaJSON()" title="Xuất cấu trúc bảng ra file JSON">📤 Export Schema</button>
        <button class="admin-btn secondary" style="padding:4px 10px; font-size:11px;" onclick="triggerImportTableSchema()" title="Nhập cấu trúc bảng từ file JSON">📥 Import Schema</button>
        <button class="admin-btn primary" style="padding:4px 10px; font-size:11px;display: none;" onclick="syncSqlSchemaFromJSON()">⚡ Đồng bộ SQL Schema</button>
        <input type="file" id="import-schema-file-input" style="display:none;" accept=".json" onchange="importTableSchemaJSON(event)">
      </div>
    </div>
    <div style="display:grid; grid-template-columns: 1.2fr 1.8fr; gap:20px; height: calc(100% - 40px); overflow:hidden;">
      <div style="overflow-y:auto; padding-right:12px; border-right:1px solid var(--card-border); display:flex; flex-direction:column; gap:12px;">
        <div style="background:var(--item-hover); padding:10px; border-radius:8px; border:1px solid var(--card-border);">
          <h4 style="font-size:11px; font-weight:700; margin:0; color:var(--text-main); text-transform:uppercase; display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="toggleAddTableForm()">
            <span>➕ Tạo Bảng mới (Table)</span>
            <span id="add-table-toggle-icon">▼</span>
          </h4>
          <div id="add-table-form-fields" class="hidden" style="display:flex; flex-direction:column; gap:8px; margin-top:8px;">
            <div class="admin-input-group">
              <label style="font-size:10px; margin-bottom:2px;">Mã Bảng (Ví dụ: DM_ChungChi)</label>
              <input type="text" id="new-tbl-id" class="admin-input" style="padding:4px 8px; font-size:11px;" placeholder="Mã vật lý...">
            </div>
            <div class="admin-input-group">
              <label style="font-size:10px; margin-bottom:2px;">Tên/Mô tả bảng</label>
              <input type="text" id="new-tbl-title" class="admin-input" style="padding:4px 8px; font-size:11px;" placeholder="Ví dụ: Danh mục Chứng chỉ...">
            </div>
            <div class="admin-input-group">
              <label style="font-size:10px; margin-bottom:2px;">Nhóm sơ đồ (Group)</label>
              <select id="new-tbl-group" class="admin-input" style="padding:4px 8px; font-size:11px;">
                <option value="general">Chung (Master)</option>
                <option value="majors">Ngành / Khóa</option>
                <option value="subjects">Môn học / ĐK</option>
                <option value="curriculum">Khung CTK</option>
                <option value="classes">Lớp & Phân môn</option>
                <option value="schedule">Lịch / Giảng dạy</option>
              </select>
            </div>
            <button class="admin-btn primary" style="width:100%; padding:5px; font-size:11px;" onclick="addTable()">Thêm Bảng</button>
          </div>
        </div>
        
        <div style="display:flex; flex-direction:column; gap:8px; flex:1; overflow:hidden;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h4 style="font-size:11px; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Danh sách Table (${tables.length})</h4>
          </div>
          <input type="text" id="admin-table-search" class="admin-input" style="padding:6px; font-size:12px;" placeholder="Tìm nhanh bảng..." oninput="filterAdminTables(this.value)">
          
          <div id="admin-tables-list-container" style="flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:6px; padding-right:4px;">
          </div>
        </div>
      </div>
      
      <div id="admin-table-details-panel" style="overflow-y:auto; padding-right:4px; display:flex; flex-direction:column; gap:16px;">
        <div style="display:flex; height:100%; justify-content:center; align-items:center; color:var(--text-muted); font-size:12px; border: 2px dashed var(--card-border); border-radius:12px; background:rgba(0,0,0,0.01);">
          👈 Chọn một bảng từ danh sách bên trái để xem cấu trúc và chỉnh sửa cột
        </div>
      </div>
    </div>
  `;

  renderAdminTablesList();

  if (activeEditTableId) {
    editTableColumnsPrompt(activeEditTableId);
  }
}

window.toggleAddTableForm = function () {
  const fields = document.getElementById('add-table-form-fields');
  const icon = document.getElementById('add-table-toggle-icon');
  if (!fields) return;
  if (fields.classList.contains('hidden')) {
    fields.classList.remove('hidden');
    if (icon) icon.innerText = '▲';
  } else {
    fields.classList.add('hidden');
    if (icon) icon.innerText = '▼';
  }
};

window.filterAdminTables = function (val) {
  renderAdminTablesList(val.trim().toLowerCase());
};

window.renderAdminTablesList = function (query = '') {
  const container = document.getElementById('admin-tables-list-container');
  if (!container) return;

  const filtered = tables.filter(t => {
    return t.id.toLowerCase().includes(query) || t.title.toLowerCase().includes(query);
  });

  container.innerHTML = filtered.map(t => {
    const isActive = t.id === activeEditTableId;
    const activeStyles = isActive ? 'border:1px solid var(--accent-color); background:rgba(99,102,241,0.05);' : 'border:1px solid var(--card-border);';

    return `
      <div class="admin-list-card" style="margin-bottom:2px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; border-radius:8px; transition:all 0.15s; ${activeStyles}" onclick="editTableColumnsPrompt('${t.id}')">
        <div>
          <strong style="color:${isActive ? 'var(--accent-color)' : 'var(--text-main)'}; font-size:12px;">${t.id}</strong>
          <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">${t.title}</div>
          <div style="font-size:10px; color:var(--text-muted); margin-top:2px;">Cột: ${t.columns ? t.columns.length : 0} | FK: ${t.relations ? t.relations.length : 0}</div>
        </div>
        <svg style="width:14px; height:14px; fill:var(--text-muted);" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
      </div>
    `;
  }).join('') || '<div style="color:var(--text-muted); font-size:11px; text-align:center; padding:12px;">Không tìm thấy bảng nào.</div>';
};

window.toggleColumnVisibility = function (tableId, columnName, isChecked) {
  const t = tables.find(tbl => tbl.id === tableId);
  if (!t) return;

  const col = t.columns.find(c => c.name === columnName);
  if (!col) return;

  col.visible = isChecked;
  saveTableSchemaToCloud(t);
  showToast(`Đã ${isChecked ? 'hiện' : 'ẩn'} cột ${columnName} trên sơ đồ`);
};

let activeEditTableId = null;

window.addTable = function () {
  const id = document.getElementById('new-tbl-id').value.trim();
  const title = document.getElementById('new-tbl-title').value.trim();
  const group = document.getElementById('new-tbl-group').value;

  if (!id || !title) {
    alert("Vui lòng nhập Mã Bảng và Tiêu đề bảng!");
    return;
  }
  if (!/^[a-zA-Z0-9_]+$/.test(id)) {
    alert("Mã bảng chỉ chứa chữ, số và gạch dưới!");
    return;
  }
  if (tables.some(t => t.id === id)) {
    alert("Bảng này đã tồn tại!");
    return;
  }

  const newTable = {
    id: id,
    name: id,
    title: title,
    group: group,
    x: 150,
    y: 150,
    columns: [{ name: "Id", type: "int", key: "PK" }],
    relations: []
  };

  tables.push(newTable);

  saveTableSchemaToCloud(newTable);
  renderAdminTabContent();
  showToast(`Đã thêm bảng ${id}`);
};

window.deleteTablePrompt = function (tableId) {
  if (confirm(`⚠️ CẢNH BÁO QUAN TRỌNG:\nXóa bảng [${tableId}] sẽ:\n1. Gỡ liên kết bảng này khỏi tất cả các màn hình đang tham chiếu.\n2. Xóa bảng vĩnh viễn khỏi sơ đồ quan hệ cơ sở dữ liệu.\n\nBạn có chắc chắn muốn xóa bảng này không?`)) {
    tables = tables.filter(t => t.id !== tableId);

    Object.keys(screensMap).forEach(scrId => {
      if (screensMap[scrId].tables) {
        const beforeLen = screensMap[scrId].tables.length;
        screensMap[scrId].tables = screensMap[scrId].tables.filter(t => t !== tableId);
        if (screensMap[scrId].tables.length !== beforeLen) {
          saveProgress(scrId);
        }
      }
    });

    if (isFirebaseEnabled && firestoreDb) {
      firestoreDb.collection('tables').doc(tableId).delete();
    } else {
      localStorage.setItem(STORAGE_KEY + '_tables_schema', JSON.stringify(tables));
    }

    renderAdminTabContent();
    showToast(`Đã xóa bảng ${tableId} thành công!`);
  }
};

window.onRelationTargetTableChange = function (targetTableId) {
  const toColSelect = document.getElementById('rel-to-col');
  if (!toColSelect) return;

  if (!targetTableId) {
    toColSelect.innerHTML = '<option value="">-- Chọn cột đích --</option>';
    return;
  }

  const targetTable = tables.find(tbl => tbl.id === targetTableId);
  if (targetTable && targetTable.columns && targetTable.columns.length > 0) {
    toColSelect.innerHTML = '<option value="">-- Chọn cột đích --</option>' + targetTable.columns.map(c => `
      <option value="${c.name}">${c.name} (${c.type}${c.key ? ' - ' + c.key : ''})</option>
    `).join('');
  } else {
    toColSelect.innerHTML = '<option value="">(Bảng đích chưa có cột)</option>';
  }
};

window.editTableColumnsPrompt = function (tableId) {
  activeEditTableId = tableId;
  const t = tables.find(tbl => tbl.id === tableId);
  if (!t) return;

  renderAdminTablesList(document.getElementById('admin-table-search')?.value?.trim()?.toLowerCase() || '');

  const detailPanel = document.getElementById('admin-table-details-panel');
  if (!detailPanel) return;

  const tablesSelectOptionsHtml = `<option value="">-- Chọn bảng đích --</option>` + tables.map(tbl => `
    <option value="${tbl.id}">${tbl.id} - ${tbl.title}</option>
  `).join('');

  const currentTableColsHtml = `<option value="">-- Chọn cột nguồn --</option>` + t.columns.map(c => `
    <option value="${c.name}">${c.name} (${c.type}${c.key ? ' - ' + c.key : ''})</option>
  `).join('');

  detailPanel.innerHTML = `
    <div style="border: 1px solid var(--card-border); padding:16px; border-radius:12px; background:var(--card-bg); display:flex; flex-direction:column; gap:16px;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:1px solid var(--card-border); padding-bottom:12px;">
        <div>
          <span class="table-badge badge-${t.group}" style="font-size:9px; font-weight:700; text-transform:uppercase; padding:2px 6px; border-radius:4px;">${t.group}</span>
          <h3 style="font-family:monospace; font-size:16px; margin:4px 0 2px 0; color:var(--text-main);">${t.id}</h3>
          <p style="font-size:12px; color:var(--text-muted); margin:0 0 8px 0;">${t.title}</p>
          <div style="display:flex; align-items:center; gap:6px;">
            <label style="font-size:11px; color:var(--text-muted); font-weight:600;">Nhóm sơ đồ:</label>
            <select onchange="updateTableGroup('${t.id}', this.value)" style="padding:4px; font-size:11px; border-radius:6px; background:var(--sidebar-bg); color:var(--text-main); border:1px solid var(--card-border);">
              <option value="general" ${t.group === 'general' ? 'selected' : ''}>Chung (Master)</option>
              <option value="majors" ${t.group === 'majors' ? 'selected' : ''}>Ngành / Khóa</option>
              <option value="subjects" ${t.group === 'subjects' ? 'selected' : ''}>Môn học / ĐK</option>
              <option value="curriculum" ${t.group === 'curriculum' ? 'selected' : ''}>Khung CTK</option>
              <option value="classes" ${t.group === 'classes' ? 'selected' : ''}>Lớp & Phân môn</option>
              <option value="schedule" ${t.group === 'schedule' ? 'selected' : ''}>Lịch / Giảng dạy</option>
            </select>
          </div>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="admin-btn secondary" style="padding:4px 10px; font-size:11px;" onclick="hideSchemaEditor()">Đóng</button>
          <button class="admin-btn danger" style="padding:4px 10px; font-size:11px;" onclick="deleteTablePrompt('${t.id}')">Xóa Bảng</button>
        </div>
      </div>

      <div style="display:grid; grid-template-columns: 1.2fr 1fr; gap:16px;">
        <div style="display:flex; flex-direction:column; gap:8px;">
          <h4 style="font-size:11px; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin:0 0 4px 0;">Cột dữ liệu (${t.columns.length})</h4>
          
          <div style="max-height: 240px; overflow-y:auto; display:flex; flex-direction:column; gap:4px; padding-right:4px;">
            ${t.columns.map(col => {
    const isPk = col.key === 'PK';
    const isFk = col.key === 'FK';
    const keyText = isPk ? '[PK]' : (isFk ? '[FK]' : '');
    const keyColor = isPk ? '#ef4444' : (isFk ? '#3b82f6' : 'transparent');

    return `
                <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; padding:6px 8px; background:rgba(0,0,0,0.02); border:1px solid var(--card-border); border-radius:6px;">
                  <div style="display:flex; align-items:center; gap:6px; flex:1; min-width:0;">
                    <span style="color:${keyColor}; font-weight:bold; font-family:monospace; font-size:9px; width:24px; flex-shrink:0;">${keyText}</span>
                    <span style="font-family:monospace; color:var(--text-main); font-weight:600; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;" title="${col.name}">${col.name}</span>
                    <span style="color:var(--text-muted); font-size:10px; font-family:monospace; flex-shrink:0;">(${col.type})</span>
                  </div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <label style="display:flex; align-items:center; gap:3px; font-size:10px; cursor:pointer;" title="Hiện cột trên diagram">
                      <input type="checkbox" ${col.visible !== false ? 'checked' : ''} onchange="toggleColumnVisibility('${t.id}', '${col.name}', this.checked)">
                      👁️
                    </label>
                    <button class="close-modal-btn" style="font-size:12px; color:#ef4444; width:16px; height:16px; margin:0;" onclick="deleteColumnFromTable('${col.name}')">&times;</button>
                  </div>
                </div>
              `;
  }).join('')}
          </div>

          <div style="background:var(--item-hover); padding:10px; border-radius:8px; border:1px solid var(--card-border); margin-top:8px;">
            <h5 style="font-size:10px; font-weight:700; color:var(--text-muted); margin:0 0 6px 0; text-transform:uppercase;">Thêm Cột mới</h5>
            <div style="display:grid; grid-template-columns: 1.2fr 1fr; gap:6px; margin-bottom:6px;">
              <input type="text" id="new-col-name" class="admin-input" style="padding:4px 6px; font-size:11px;" placeholder="Tên cột...">
              <input type="text" id="new-col-type" class="admin-input" style="padding:4px 6px; font-size:11px;" placeholder="Kiểu (int)...">
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <label style="font-size:10px; color:var(--text-main); display:flex; align-items:center; gap:3px;">
                <input type="checkbox" id="new-col-pk"> Khóa chính PK
              </label>
              <label style="font-size:10px; color:var(--text-main); display:flex; align-items:center; gap:3px;">
                <input type="checkbox" id="new-col-fk"> Khóa ngoại FK
              </label>
            </div>
            <button class="admin-btn secondary" style="width:100%; padding:4px; font-size:11px;" onclick="addColumnToTable()">Thêm Cột</button>
          </div>
        </div>

        <div style="display:flex; flex-direction:column; gap:8px;">
          <h4 style="font-size:11px; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin:0 0 4px 0;">Liên kết quan hệ (FK)</h4>
          
          <div style="max-height: 120px; overflow-y:auto; display:flex; flex-direction:column; gap:4px; padding-right:4px;">
            ${t.relations.map((rel, rIdx) => `
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; padding:6px; background:rgba(0,0,0,0.02); border:1px solid var(--card-border); border-radius:6px;">
                <span style="font-family:monospace; color:var(--text-main); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">
                  ${rel.fromCol} → <strong style="color:var(--accent-color);">${rel.toTable}</strong>(${rel.toCol})
                </span>
                <button class="close-modal-btn" style="font-size:12px; color:#ef4444; width:16px; height:16px; margin:0;" onclick="deleteRelationFromTable(${rIdx})">&times;</button>
              </div>
            `).join('') || '<div style="font-size:10px; color:var(--text-muted); text-align:center; padding:8px;">Không có liên kết ngoại.</div>'}
          </div>

          <div style="background:var(--item-hover); padding:10px; border-radius:8px; border:1px solid var(--card-border); margin-top:8px;">
            <h5 style="font-size:10px; font-weight:700; color:var(--text-muted); margin:0 0 6px 0; text-transform:uppercase;">Thêm liên kết quan hệ</h5>
            <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:6px;">
              <div class="admin-input-group">
                <label style="font-size:10px; color:var(--text-muted); margin-bottom:2px;">Bảng đích (Target Table)</label>
                <select id="rel-target-table" class="admin-input" style="padding:4px; font-size:11px;" onchange="onRelationTargetTableChange(this.value)">
                  ${tablesSelectOptionsHtml}
                </select>
              </div>
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:6px;">
                <div class="admin-input-group">
                  <label style="font-size:10px; color:var(--text-muted); margin-bottom:2px;">Cột nguồn (Nguồn)</label>
                  <select id="rel-from-col" class="admin-input" style="padding:4px; font-size:11px;">
                    ${currentTableColsHtml}
                  </select>
                </div>
                <div class="admin-input-group">
                  <label style="font-size:10px; color:var(--text-muted); margin-bottom:2px;">Cột đích (Đích)</label>
                  <select id="rel-to-col" class="admin-input" style="padding:4px; font-size:11px;">
                    <option value="">-- Chọn cột đích --</option>
                  </select>
                </div>
              </div>
            </div>
            <button class="admin-btn secondary" style="width:100%; padding:4px; font-size:11px;" onclick="addRelationToTable()">Thêm Liên Kết</button>
          </div>
        </div>
      </div>
    </div>
  `;
};

window.hideSchemaEditor = function () {
  activeEditTableId = null;
  renderAdminTablesList();
  const detailPanel = document.getElementById('admin-table-details-panel');
  if (detailPanel) {
    detailPanel.innerHTML = `
      <div style="display:flex; height:100%; justify-content:center; align-items:center; color:var(--text-muted); font-size:12px; border: 2px dashed var(--card-border); border-radius:12px; background:rgba(0,0,0,0.01);">
        👈 Chọn một bảng từ danh sách bên trái để xem cấu trúc và chỉnh sửa cột
      </div>
    `;
  }
};

window.addColumnToTable = function () {
  if (!activeEditTableId) return;
  const name = document.getElementById('new-col-name').value.trim();
  const type = document.getElementById('new-col-type').value.trim();
  const isPk = document.getElementById('new-col-pk').checked;
  const isFk = document.getElementById('new-col-fk').checked;

  if (!name || !type) {
    alert("Vui lòng điền tên cột và kiểu dữ liệu!");
    return;
  }

  const t = tables.find(tbl => tbl.id === activeEditTableId);
  if (!t) return;

  if (t.columns.some(col => col.name === name)) {
    alert("Cột này đã tồn tại!");
    return;
  }

  let key = "";
  if (isPk) key = "PK";
  else if (isFk) key = "FK";

  t.columns.push({ name, type, key });

  saveTableSchemaToCloud(t);
  editTableColumnsPrompt(activeEditTableId);
  showToast(`Đã thêm cột ${name}`);

  document.getElementById('new-col-name').value = '';
  document.getElementById('new-col-type').value = '';
  document.getElementById('new-col-pk').checked = false;
  document.getElementById('new-col-fk').checked = false;
};

window.deleteColumnFromTable = function (colName) {
  if (!activeEditTableId) return;
  const t = tables.find(tbl => tbl.id === activeEditTableId);
  if (!t) return;

  if (confirm(`Bạn có muốn xóa cột [${colName}] khỏi bảng [${activeEditTableId}] không?`)) {
    t.columns = t.columns.filter(col => col.name !== colName);
    saveTableSchemaToCloud(t);
    editTableColumnsPrompt(activeEditTableId);
    showToast("Đã xóa cột thành công.");
  }
};

window.addRelationToTable = function () {
  if (!activeEditTableId) return;
  const targetTable = document.getElementById('rel-target-table').value;
  const fromCol = document.getElementById('rel-from-col').value.trim();
  const toCol = document.getElementById('rel-to-col').value.trim();

  if (!targetTable) {
    alert("Vui lòng chọn Bảng đích!");
    return;
  }
  if (!fromCol) {
    alert("Vui lòng chọn Cột nguồn!");
    return;
  }
  if (!toCol) {
    alert("Vui lòng chọn Cột đích!");
    return;
  }

  const t = tables.find(tbl => tbl.id === activeEditTableId);
  if (!t) return;

  const isDuplicate = t.relations.some(r => r.toTable === targetTable && r.fromCol === fromCol && r.toCol === toCol);
  if (isDuplicate) {
    alert("Liên kết quan hệ này đã tồn tại!");
    return;
  }

  t.relations.push({
    toTable: targetTable,
    fromCol: fromCol,
    toCol: toCol
  });

  saveTableSchemaToCloud(t);
  editTableColumnsPrompt(activeEditTableId);
  showToast(`Đã thêm liên kết quan hệ ${fromCol} → ${targetTable}(${toCol}) thành công!`);
};

window.deleteRelationFromTable = function (index) {
  if (!activeEditTableId) return;
  const t = tables.find(tbl => tbl.id === activeEditTableId);
  if (!t) return;

  if (confirm("Bạn có chắc chắn muốn xóa liên kết này không?")) {
    t.relations.splice(index, 1);
    saveTableSchemaToCloud(t);
    editTableColumnsPrompt(activeEditTableId);
    showToast("Đã gỡ liên kết thành công.");
  }
};

function saveTableSchemaToCloud(t) {
  if (isFirebaseEnabled && firestoreDb) {
    firestoreDb.collection('tables').doc(t.id).set({
      tableId: t.id,
      tableName: t.title,
      group: t.group,
      x: t.x !== undefined ? t.x : 150,
      y: t.y !== undefined ? t.y : 150,
      columns: t.columns || [],
      relations: t.relations || []
    });
  } else {
    localStorage.setItem(STORAGE_KEY + '_tables_schema', JSON.stringify(tables));
  }
  renderContent();
}

window.updateTableGroup = function (tableId, newGroup) {
  const t = tables.find(tbl => tbl.id === tableId);
  if (!t) return;
  t.group = newGroup;
  saveTableSchemaToCloud(t);
  renderAdminTabContent();
  showToast(`Đã cập nhật nhóm cho bảng ${tableId} thành công!`);
};

window.exportTableSchemaJSON = function () {
  try {
    const blob = new Blob([JSON.stringify(tables, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = "database_tables_schema_backup.json";
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    URL.revokeObjectURL(url);
    showToast("Đã xuất file cấu trúc bảng (Schema JSON) thành công!");
  } catch (err) {
    console.error("Lỗi xuất file Schema:", err);
    alert("Lỗi khi xuất file: " + err.message);
  }
};

window.triggerImportTableSchema = function () {
  document.getElementById('import-schema-file-input').click();
};

window.importTableSchemaJSON = function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async function (e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error("Dữ liệu cấu trúc bảng phải là một mảng JSON hợp lệ.");
      }

      const isValid = parsed.every(t => t.id && Array.isArray(t.columns));
      if (!isValid) {
        throw new Error("Định dạng file Schema JSON không đúng (mỗi bảng phải có trường id và mảng columns).");
      }

      if (confirm(`Bạn có chắc chắn muốn nhập ${parsed.length} bảng từ file JSON không? Việc này sẽ ghi đè và đồng bộ toàn bộ cấu trúc lên Firestore (nếu có kết nối Cloud).`)) {
        tables = parsed;

        if (isFirebaseEnabled && firestoreDb) {
          showToast("Đang đồng bộ Schema mới lên Cloud...");
          const batch = firestoreDb.batch();

          tables.forEach(t => {
            const docRef = firestoreDb.collection('tables').doc(t.id);
            batch.set(docRef, {
              tableId: t.id,
              tableName: t.title || t.id,
              group: t.group || 'general',
              x: t.x !== undefined ? t.x : 150,
              y: t.y !== undefined ? t.y : 150,
              columns: t.columns || [],
              relations: t.relations || []
            });
          });

          await batch.commit();
          showToast("Đã đồng bộ thành công cấu trúc Schema mới lên Cloud!");
        } else {
          localStorage.setItem(STORAGE_KEY + '_tables_schema', JSON.stringify(tables));
          showToast("Đã cập nhật cấu trúc Schema cục bộ thành công!");
        }

        renderContent();
        renderAdminTabContent();
      }
    } catch (err) {
      console.error("Lỗi đọc file Schema:", err);
      alert("Lỗi khi đọc file cấu trúc: " + err.message);
    } finally {
      event.target.value = '';
    }
  };
  reader.readAsText(file);
};

window.persistStatusConfigs = function () {
  STATUS_CONFIGS.sort((a, b) => a.order - b.order);

  localStorage.setItem('asc_status_configs', JSON.stringify(STATUS_CONFIGS));
  applyStatusStyles();
  renderSidebarChips();
  renderContent();

  if (isFirebaseEnabled && firestoreDb) {
    const batch = firestoreDb.batch();
    STATUS_CONFIGS.forEach(status => {
      const docRef = firestoreDb.collection('status_configs').doc(status.id);
      batch.set(docRef, {
        label: status.label,
        bg: status.bg,
        text: status.text,
        border: status.border,
        isCompleted: status.isCompleted,
        order: status.order
      });
    });
    batch.commit().catch(err => console.error("Firestore batch commit failed:", err));
  }
};

window.saveStatusConfig = function () {
  const label = document.getElementById('status-admin-label').value.trim();
  const bg = document.getElementById('status-admin-bg').value.trim();
  const text = document.getElementById('status-admin-text').value.trim();
  const border = document.getElementById('status-admin-border').value.trim();
  const order = parseInt(document.getElementById('status-admin-order').value) || (STATUS_CONFIGS.length + 1);
  const isCompleted = document.getElementById('status-admin-completed').checked;

  if (!label) {
    alert("Vui lòng nhập tên trạng thái!");
    return;
  }

  const editId = document.getElementById('status-admin-edit-id').value;

  if (editId) {
    const item = STATUS_CONFIGS.find(cfg => cfg.id === editId);
    if (item) {
      const oldLabel = item.label;
      item.label = label;
      item.bg = bg;
      item.text = text;
      item.border = border;
      item.order = order;
      item.isCompleted = isCompleted;

      if (oldLabel !== label) {
        Object.keys(screensMap).forEach(scrId => {
          if (screensMap[scrId].status === oldLabel) {
            screensMap[scrId].status = label;
            saveProgress(scrId);
          }
        });
      }

      persistStatusConfigs();
      showToast("Đã cập nhật cấu hình trạng thái!");
    }
  } else {
    const newId = 'status_' + Date.now();
    const newStatus = { id: newId, label, bg, text, border, order, isCompleted };
    STATUS_CONFIGS.push(newStatus);

    persistStatusConfigs();
    showToast("Đã thêm trạng thái mới thành công!");
  }

  renderAdminTabContent();
};

window.deleteStatusPrompt = function (statusId) {
  const item = STATUS_CONFIGS.find(cfg => cfg.id === statusId);
  if (!item) return;

  const inUseScreens = Object.values(screensMap).filter(s => s.status === item.label);
  if (inUseScreens.length > 0) {
    alert(`Không thể xóa trạng thái này vì đang có ${inUseScreens.length} màn hình sử dụng. Vui lòng chuyển các màn hình này sang trạng thái khác trước!`);
    return;
  }

  if (STATUS_CONFIGS.length <= 1) {
    alert("Dự án phải có ít nhất một trạng thái!");
    return;
  }

  if (confirm(`Bạn có chắc chắn muốn xóa trạng thái "${item.label}"?`)) {
    STATUS_CONFIGS = STATUS_CONFIGS.filter(cfg => cfg.id !== statusId);

    if (isFirebaseEnabled && firestoreDb) {
      firestoreDb.collection('status_configs').doc(statusId).delete()
        .then(() => console.log("Deleted status from cloud:", statusId))
        .catch(err => console.error("Failed to delete status from cloud:", err));
    }

    persistStatusConfigs();
    showToast(`Đã xóa trạng thái "${item.label}"`);
    renderAdminTabContent();
  }
};

window.editStatusPrompt = function (statusId) {
  const item = STATUS_CONFIGS.find(cfg => cfg.id === statusId);
  if (!item) return;

  document.getElementById('status-admin-edit-id').value = item.id;
  document.getElementById('status-admin-label').value = item.label;
  document.getElementById('status-admin-bg').value = item.bg;
  document.getElementById('status-admin-text').value = item.text;
  document.getElementById('status-admin-border').value = item.border;
  document.getElementById('status-admin-order').value = item.order;
  document.getElementById('status-admin-completed').checked = item.isCompleted;

  document.getElementById('status-form-title').innerText = "Chỉnh sửa Trạng thái";
  document.getElementById('cancel-edit-status-btn').style.display = 'inline-block';
};

window.cancelEditStatus = function () {
  document.getElementById('status-admin-edit-id').value = '';
  document.getElementById('status-admin-label').value = '';
  document.getElementById('status-admin-bg').value = '#f1f5f9';
  document.getElementById('status-admin-text').value = '#475569';
  document.getElementById('status-admin-border').value = '#cbd5e1';
  document.getElementById('status-admin-order').value = STATUS_CONFIGS.length + 1;
  document.getElementById('status-admin-completed').checked = false;
  document.getElementById('status-admin-preset').value = '';

  document.getElementById('status-form-title').innerText = "Thêm Trạng thái mới";
  document.getElementById('cancel-edit-status-btn').style.display = 'none';
};

window.applyPresetColors = function (presetValue) {
  const PRESETS = {
    gray: { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' },
    green: { bg: '#ecfdf5', text: '#047857', border: '#a7f3d0' },
    yellow: { bg: '#fffbeb', text: '#b45309', border: '#fde68a' },
    blue: { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
    red: { bg: '#fef2f2', text: '#b91c1c', border: '#fecaca' },
    purple: { bg: '#faf5ff', text: '#6b21a8', border: '#e9d5ff' },
    pink: { bg: '#fdf2f8', text: '#be185d', border: '#fbcfe8' }
  };

  const colors = PRESETS[presetValue];
  if (colors) {
    document.getElementById('status-admin-bg').value = colors.bg;
    document.getElementById('status-admin-text').value = colors.text;
    document.getElementById('status-admin-border').value = colors.border;
  }
};

function renderStatusesAdmin(container) {
  const listHtml = STATUS_CONFIGS.map(s => {
    const clsName = `status-custom-${s.id}`;
    return `
      <div class="admin-list-card" style="margin-bottom:8px;">
        <div style="display:flex; flex-direction:column; gap:4px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="status-badge ${clsName}" style="padding:2px 8px; font-size:11px; border-radius:4px; font-weight:600;">
              ${s.label}
            </span>
            <span style="font-size:11px; color:var(--text-muted);">Thứ tự: ${s.order}</span>
            ${s.isCompleted ? '<span style="font-size:9px; background:#ecfdf5; color:#047857; padding:1px 4px; border-radius:4px; font-weight:600; border:1px solid #a7f3d0;">Hoàn thành</span>' : ''}
          </div>
          <div style="font-size:10px; color:var(--text-muted);">
            BG: ${s.bg} | Chữ: ${s.text} | Viền: ${s.border}
          </div>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="admin-btn secondary" style="padding:4px 8px; font-size:11px;" onclick="editStatusPrompt('${s.id}')">Sửa</button>
          <button class="admin-btn danger" style="padding:4px 8px; font-size:11px;" onclick="deleteStatusPrompt('${s.id}')">Xóa</button>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="admin-panel-title">Quản lý Trạng thái & Màu sắc</div>
    <div style="display:grid; grid-template-columns: 1.2fr 1fr; gap:20px;">
      <div>
        <h4 style="font-size:12px; font-weight:700; margin-bottom:12px; color:var(--text-muted); text-transform:uppercase;">Danh sách Trạng thái</h4>
        <div style="max-height: 380px; overflow-y:auto; padding-right:4px;">
          ${listHtml || '<div style="color:var(--text-muted); font-size:12px;">Chưa có trạng thái nào.</div>'}
        </div>
      </div>
      <div style="border-left: 1px solid var(--card-border); padding-left:20px;">
        <h4 id="status-form-title" style="font-size:12px; font-weight:700; margin-bottom:12px; color:var(--text-muted); text-transform:uppercase;">Thêm Trạng thái mới</h4>
        <input type="hidden" id="status-admin-edit-id" value="">
        
        <div class="admin-input-group" style="margin-bottom:10px;">
          <label>Tên Trạng thái</label>
          <input type="text" id="status-admin-label" class="admin-input" placeholder="Ví dụ: Đang review">
        </div>
        
        <div class="admin-input-group" style="margin-bottom:10px;">
          <label>Bảng màu mẫu (Preset)</label>
          <select id="status-admin-preset" class="admin-input" onchange="applyPresetColors(this.value)">
            <option value="">-- Chọn bảng màu mẫu --</option>
            <option value="gray">Màu Xám (Mặc định / Chưa làm)</option>
            <option value="blue">Màu Xanh Dương (Đang phát triển)</option>
            <option value="yellow">Màu Vàng / Cam (Đang review / test)</option>
            <option value="green">Màu Xanh Lá (Đã xong)</option>
            <option value="red">Màu Đỏ (Bị lỗi / Hold)</option>
            <option value="purple">Màu Tím (Review bổ sung)</option>
            <option value="pink">Màu Hồng (Đặc biệt)</option>
          </select>
        </div>
        
        <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:8px; margin-bottom:10px;">
          <div class="admin-input-group">
            <label>Màu nền (BG)</label>
            <input type="color" id="status-admin-bg" class="admin-input" style="height:32px; padding:2px;" value="#f1f5f9">
          </div>
          <div class="admin-input-group">
            <label>Màu chữ</label>
            <input type="color" id="status-admin-text" class="admin-input" style="height:32px; padding:2px;" value="#475569">
          </div>
          <div class="admin-input-group">
            <label>Màu viền</label>
            <input type="color" id="status-admin-border" class="admin-input" style="height:32px; padding:2px;" value="#cbd5e1">
          </div>
        </div>
        
        <div style="display:grid; grid-template-columns: 1.2fr 1fr; gap:12px; margin-bottom:12px;">
          <div class="admin-input-group">
            <label>Thứ tự hiển thị (Order)</label>
            <input type="number" id="status-admin-order" class="admin-input" style="padding:4px 8px;" value="${STATUS_CONFIGS.length + 1}">
          </div>
          <div style="display:flex; align-items:center; gap:6px; padding-top:16px;">
            <input type="checkbox" id="status-admin-completed" style="width:16px; height:16px; cursor:pointer;">
            <label for="status-admin-completed" style="font-size:11px; font-weight:600; cursor:pointer; user-select:none;">Tính Hoàn thành</label>
          </div>
        </div>
        
        <div style="display:flex; gap:8px;">
          <button class="admin-btn primary" onclick="saveStatusConfig()">Lưu cấu hình</button>
          <button id="cancel-edit-status-btn" class="admin-btn secondary" style="display:none;" onclick="cancelEditStatus()">Hủy</button>
        </div>
      </div>
    </div>
  `;
}

function renderDifficultiesAdmin(container) {
  const listHtml = DIFFICULTY_CONFIGS.map(d => {
    return `
      <div class="admin-list-card" style="margin-bottom:8px;">
        <div style="display:flex; flex-direction:column; gap:4px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="difficulty-badge" style="background:${d.bg}; color:${d.text}; border:1px solid ${d.border}; padding:2px 8px; font-size:11px; border-radius:4px; font-weight:600; cursor:default;">
              ${d.label}
            </span>
            <span style="font-size:11px; color:var(--text-muted);">Trọng số: <strong>${d.weight}</strong></span>
            <span style="font-size:11px; color:var(--text-muted);">| Thứ tự: ${d.order}</span>
          </div>
          <div style="font-size:10px; color:var(--text-muted);">
            BG: ${d.bg} | Chữ: ${d.text} | Viền: ${d.border}
          </div>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="admin-btn secondary" style="padding:4px 8px; font-size:11px;" onclick="editDifficultyPrompt('${d.id}')">Sửa</button>
          <button class="admin-btn danger" style="padding:4px 8px; font-size:11px;" onclick="deleteDifficultyPrompt('${d.id}')">Xóa</button>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="admin-panel-title">Quản lý Cấu hình Độ khó & Trọng số</div>
    <div style="display:grid; grid-template-columns: 1.2fr 1fr; gap:20px;">
      <div>
        <h4 style="font-size:12px; font-weight:700; margin-bottom:12px; color:var(--text-muted); text-transform:uppercase;">Danh sách Độ khó</h4>
        <div style="max-height: 380px; overflow-y:auto; padding-right:4px;">
          ${listHtml || '<div style="color:var(--text-muted); font-size:12px;">Chưa có độ khó nào.</div>'}
        </div>
      </div>
      <div style="border-left: 1px solid var(--card-border); padding-left:20px;">
        <h4 id="diff-form-title" style="font-size:12px; font-weight:700; margin-bottom:12px; color:var(--text-muted); text-transform:uppercase;">Thêm Độ khó mới</h4>
        <input type="hidden" id="diff-admin-edit-id" value="">
        
        <div class="admin-input-group" style="margin-bottom:10px;">
          <label>Tên Độ khó</label>
          <input type="text" id="diff-admin-label" class="admin-input" placeholder="Ví dụ: Rất khó">
        </div>

        <div class="admin-input-group" style="margin-bottom:10px;">
          <label>Màu sắc mẫu (Preset)</label>
          <select id="diff-admin-preset" class="admin-input" onchange="applyDifficultyPresetColors(this.value)">
            <option value="">-- Chọn bảng màu mẫu --</option>
            <option value="blue">Màu Xanh Dương (Google Rất Dễ)</option>
            <option value="green">Màu Xanh Lá (Google Dễ)</option>
            <option value="yellow">Màu Vàng (Google Trung Bình)</option>
            <option value="red">Màu Đỏ (Google Khó)</option>
            <option value="purple">Màu Tím (Google Cực Khó)</option>
          </select>
        </div>
        
        <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:8px; margin-bottom:10px;">
          <div class="admin-input-group">
            <label>Màu nền (BG)</label>
            <input type="color" id="diff-admin-bg" class="admin-input" style="height:32px; padding:2px;" value="#e8f0fe">
          </div>
          <div class="admin-input-group">
            <label>Màu chữ</label>
            <input type="color" id="diff-admin-text" class="admin-input" style="height:32px; padding:2px;" value="#1a73e8">
          </div>
          <div class="admin-input-group">
            <label>Màu viền</label>
            <input type="color" id="diff-admin-border" class="admin-input" style="height:32px; padding:2px;" value="#d2e3fc">
          </div>
        </div>
        
        <div style="display:grid; grid-template-columns: 1.2fr 1fr; gap:12px; margin-bottom:12px;">
          <div class="admin-input-group">
            <label>Trọng số (Weight)</label>
            <input type="number" id="diff-admin-weight" class="admin-input" style="padding:4px 8px;" value="1" min="1" max="100">
          </div>
          <div class="admin-input-group">
            <label>Thứ tự hiển thị (Order)</label>
            <input type="number" id="diff-admin-order" class="admin-input" style="padding:4px 8px;" value="${DIFFICULTY_CONFIGS.length + 1}">
          </div>
        </div>
        
        <div style="display:flex; gap:8px;">
          <button class="admin-btn primary" onclick="saveDifficultyConfig()">Lưu cấu hình</button>
          <button id="cancel-edit-diff-btn" class="admin-btn secondary" style="display:none;" onclick="cancelEditDifficulty()">Hủy</button>
        </div>
      </div>
    </div>
  `;
}

window.applyDifficultyPresetColors = function (val) {
  const bgInput = document.getElementById('diff-admin-bg');
  const txtInput = document.getElementById('diff-admin-text');
  const bdrInput = document.getElementById('diff-admin-border');
  if (!bgInput || !txtInput || !bdrInput) return;

  if (val === 'blue') {
    bgInput.value = '#e8f0fe'; txtInput.value = '#1a73e8'; bdrInput.value = '#d2e3fc';
  } else if (val === 'green') {
    bgInput.value = '#e6f4ea'; txtInput.value = '#137333'; bdrInput.value = '#ceead6';
  } else if (val === 'yellow') {
    bgInput.value = '#fef7e0'; txtInput.value = '#b06000'; bdrInput.value = '#feebc8';
  } else if (val === 'red') {
    bgInput.value = '#fce8e6'; txtInput.value = '#c5221f'; bdrInput.value = '#fad2cf';
  } else if (val === 'purple') {
    bgInput.value = '#f3e8ff'; txtInput.value = '#6b21a8'; bdrInput.value = '#e9d5ff';
  }
};

window.editDifficultyPrompt = function (id) {
  const diff = DIFFICULTY_CONFIGS.find(d => d.id === id);
  if (!diff) return;

  document.getElementById('diff-form-title').innerText = 'Chỉnh sửa Độ khó';
  document.getElementById('diff-admin-edit-id').value = diff.id;
  document.getElementById('diff-admin-label').value = diff.label;
  document.getElementById('diff-admin-bg').value = diff.bg;
  document.getElementById('diff-admin-text').value = diff.text;
  document.getElementById('diff-admin-border').value = diff.border;
  document.getElementById('diff-admin-weight').value = diff.weight;
  document.getElementById('diff-admin-order').value = diff.order;
  document.getElementById('cancel-edit-diff-btn').style.display = 'inline-block';
};

window.cancelEditDifficulty = function () {
  document.getElementById('diff-form-title').innerText = 'Thêm Độ khó mới';
  document.getElementById('diff-admin-edit-id').value = '';
  document.getElementById('diff-admin-label').value = '';
  document.getElementById('diff-admin-bg').value = '#e8f0fe';
  document.getElementById('diff-admin-text').value = '#1a73e8';
  document.getElementById('diff-admin-border').value = '#d2e3fc';
  document.getElementById('diff-admin-weight').value = '1';
  document.getElementById('diff-admin-order').value = DIFFICULTY_CONFIGS.length + 1;
  document.getElementById('cancel-edit-diff-btn').style.display = 'none';
};

window.saveDifficultyConfig = function () {
  const editId = document.getElementById('diff-admin-edit-id').value.trim();
  const labelVal = document.getElementById('diff-admin-label').value.trim();
  const bgVal = document.getElementById('diff-admin-bg').value;
  const textVal = document.getElementById('diff-admin-text').value;
  const borderVal = document.getElementById('diff-admin-border').value;
  const weightVal = parseInt(document.getElementById('diff-admin-weight').value) || 1;
  const orderVal = parseInt(document.getElementById('diff-admin-order').value) || (DIFFICULTY_CONFIGS.length + 1);

  if (!labelVal) {
    alert("Vui lòng nhập tên độ khó!");
    return;
  }

  const id = editId || 'diff_' + Date.now();
  const data = {
    label: labelVal,
    bg: bgVal,
    text: textVal,
    border: borderVal,
    weight: weightVal,
    order: orderVal
  };

  if (isFirebaseEnabled && firestoreDb) {
    firestoreDb.collection('difficulty_configs').doc(id).set(data)
      .then(() => {
        showToast("Đã lưu cấu hình độ khó lên Cloud Firestore!");
        cancelEditDifficulty();
        renderAdminTabContent();
      })
      .catch(err => {
        console.error("Failed to save difficulty config to Cloud:", err);
        showToast("Lỗi đồng bộ lên Cloud", "error");
      });
  } else {
    const idx = DIFFICULTY_CONFIGS.findIndex(d => d.id === id);
    if (idx >= 0) {
      DIFFICULTY_CONFIGS[idx] = { id, ...data };
    } else {
      DIFFICULTY_CONFIGS.push({ id, ...data });
    }
    DIFFICULTY_CONFIGS.sort((a, b) => a.order - b.order);
    localStorage.setItem('asc_difficulty_configs', JSON.stringify(DIFFICULTY_CONFIGS));
    showToast("Đã lưu cấu hình độ khó cục bộ!");
    cancelEditDifficulty();
    renderAdminTabContent();
    renderContent();
  }
};

window.deleteDifficultyPrompt = function (id) {
  if (!confirm("Bạn có chắc chắn muốn xóa độ khó này không? Các màn hình cũ sẽ giữ nhãn nhưng mất cấu hình trọng số.")) return;

  if (isFirebaseEnabled && firestoreDb) {
    firestoreDb.collection('difficulty_configs').doc(id).delete()
      .then(() => {
        showToast("Đã xóa cấu hình độ khó khỏi Cloud Firestore!");
        renderAdminTabContent();
      })
      .catch(err => {
        console.error("Failed to delete difficulty config:", err);
        showToast("Lỗi khi xóa cấu hình", "error");
      });
  } else {
    DIFFICULTY_CONFIGS = DIFFICULTY_CONFIGS.filter(d => d.id !== id);
    localStorage.setItem('asc_difficulty_configs', JSON.stringify(DIFFICULTY_CONFIGS));
    showToast("Đã xóa cấu hình độ khó cục bộ!");
    renderAdminTabContent();
    renderContent();
  }
};

// RICH TEXT NOTE EDITOR MODAL
window.openNoteEditorModal = function (itemId) {
  const screen = screensMap[itemId] || { id: itemId, name: 'Không xác định', description: '' };
  currentEditingItemId = itemId;

  const modal = document.getElementById('note-editor-modal');
  const titleEl = document.getElementById('note-editor-title');
  const saveBtn = document.getElementById('note-save-btn');

  if (!modal) return;

  if (titleEl) {
    titleEl.innerText = isEditMode
      ? `📝 Xem & Chỉnh sửa Ghi chú: ${screen.name} (${itemId})`
      : `🔍 Xem chi tiết Ghi chú: ${screen.name} (${itemId})`;
  }

  if (saveBtn) {
    saveBtn.style.display = isEditMode ? 'inline-block' : 'none';
  }

  modal.style.display = 'flex';
  modal.classList.add('active');

  if (!quillEditorInstance) {
    quillEditorInstance = new Quill('#note-quill-editor', {
      theme: 'snow',
      placeholder: 'Gõ nội dung mô tả, ghi chú cho màn hình này...',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['link', 'clean']
        ]
      },
      readOnly: !isEditMode
    });
  } else {
    quillEditorInstance.enable(isEditMode);
  }

  quillEditorInstance.clipboard.dangerouslyPasteHTML(screen.description || '');
};

window.closeNoteEditorModal = function () {
  const modal = document.getElementById('note-editor-modal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => {
      if (!modal.classList.contains('active')) {
        modal.style.display = 'none';
      }
    }, 200);
  }
  currentEditingItemId = null;
};

window.saveNoteEditorContent = function () {
  if (!isEditMode || !currentEditingItemId) return;

  const htmlContent = quillEditorInstance.root.innerHTML;
  const isEmpty = htmlContent === '<p><br></p>' || htmlContent.trim() === '';
  const finalVal = isEmpty ? '' : htmlContent;

  if (screensMap[currentEditingItemId]) {
    screensMap[currentEditingItemId].description = finalVal;

    const previewBox = document.getElementById(`note-preview-${currentEditingItemId}`);
    if (previewBox) {
      previewBox.innerHTML = finalVal ? finalVal : '<em style="color:var(--text-muted);">Chưa có ghi chú, mô tả...</em>';
    }

    saveProgress(currentEditingItemId);
    showSaveIndicator(currentEditingItemId);
  }

  closeNoteEditorModal();
};
