// FIREBASE SERVICE & CLOUD SYNC MODULE

function updateCloudStatus(status) {
  const badge = document.getElementById('cloud-status-badge');
  if (!badge) return;

  badge.className = `cloud-status-badge ${status}`;
  const text = badge.querySelector('.status-text');

  if (status === 'connected') {
    if (text) text.innerText = 'Cloud Syncing';
    badge.title = 'Đã kết nối Firebase Firestore. Tiến độ đồng bộ tự động.';
  } else if (status === 'connecting') {
    if (text) text.innerText = 'Connecting...';
    badge.title = 'Đang tải Firebase SDK và kết nối database...';
  } else if (status === 'error') {
    if (text) text.innerText = 'Cloud Error';
    badge.title = 'Lỗi kết nối Firebase database.';
  } else {
    if (text) text.innerText = 'Local Sync';
    badge.title = 'Chạy ở chế độ ngoại tuyến. Tiến độ lưu ở trình duyệt này.';
  }
}

function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <svg class="icon-svg" style="width:14px;height:14px;" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px) scale(0.95)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

function fetchFirebaseConfig() {
  updateCloudStatus('connecting');
  if (typeof FIREBASE_CONFIG !== 'undefined' && FIREBASE_CONFIG && FIREBASE_CONFIG.apiKey) {
    if (FIREBASE_CONFIG.apiKey !== 'YOUR_API_KEY') {
      initFirebase(FIREBASE_CONFIG);
    } else {
      console.log("Firebase config is placeholder, running in Offline mode.");
      updateCloudStatus('offline');
      switchModule(selectedModuleId);
    }
  } else {
    console.log("firebase_config.js not loaded or FIREBASE_CONFIG is undefined, running in Offline mode.");
    updateCloudStatus('offline');
    switchModule(selectedModuleId);
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function initFirebase(config) {
  try {
    await loadScript('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
    await loadScript('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js');

    firebase.initializeApp(config);
    firestoreDb = firebase.firestore();
    isFirebaseEnabled = true;

    updateCloudStatus('connected');
    showToast('Đồng bộ Cloud Sync đã sẵn sàng!');

    await loadModulesListFromFirestore();
    setupStatusesListener();
    setupDifficultiesListener();
    setupTablesListener();

    switchModule(selectedModuleId);
  } catch (err) {
    console.error("Firebase init failed:", err);
    updateCloudStatus('error');
    showToast('Lỗi tải SDK. Chuyển sang lưu cục bộ.', 'error');
    switchModule(selectedModuleId);
  }
}

function initData() {
  // Logic handled in switchModule and initDataForModule
}

function saveProgress(itemId) {
  localStorage.setItem(STORAGE_KEY + '_' + selectedModuleId, JSON.stringify(screensMap));
  updateProgressMetrics();

  if (isFirebaseEnabled && firestoreDb && itemId) {
    const docId = `${selectedModuleId}_${itemId}`;
    const item = screensMap[itemId];
    if (item) {
      firestoreDb.collection('screens').doc(docId).set({
        id: item.id,
        moduleId: selectedModuleId,
        name: item.name,
        eduCode: item.eduCode || '-',
        tables: item.tables || [],
        status: item.status || 'Chưa xử lý',
        description: item.description || '',
        jiraUrl: item.jiraUrl || '',
        actualUrl: item.actualUrl || '',
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true })
        .then(() => {
          console.log(`Cloud sync successful for screen ${itemId}`);
        })
        .catch(err => {
          console.error("Firestore update failed:", err);
        });
    }
  }
}

window.switchModule = function (moduleId) {
  if (!moduleId) return;
  selectedModuleId = moduleId;
  localStorage.setItem('selected_module_id', moduleId);

  const select = document.getElementById('module-select');
  if (select && select.value !== moduleId) {
    select.value = moduleId;
  }

  initDataForModule(moduleId);
};

window.setActiveModuleInCloud = async function (targetModuleId) {
  MODULES_LIST.forEach(m => {
    m.isActive = (m.id === targetModuleId);
  });

  if (isFirebaseEnabled && firestoreDb) {
    try {
      const batch = firestoreDb.batch();
      MODULES_LIST.forEach(m => {
        const docRef = firestoreDb.collection('modules').doc(m.id);
        batch.set(docRef, { isActive: m.id === targetModuleId }, { merge: true });
      });
      await batch.commit();
      showToast(`Đã chọn Phân hệ kích hoạt mặc định!`);
    } catch (err) {
      console.error("Failed to set active module in Firestore:", err);
      showToast("Lỗi khi đặt phân hệ kích hoạt", "error");
    }
  } else {
    localStorage.setItem(STORAGE_KEY + '_modules_list', JSON.stringify(MODULES_LIST));
    showToast(`Đã đặt phân hệ kích hoạt cục bộ!`);
  }

  switchModule(targetModuleId);
  if (typeof renderAdminTabContent === 'function') renderAdminTabContent();
};

let screensListenerUnsubscribe = null;
let menuStructureListenerUnsubscribe = null;
let tablesListenerUnsubscribe = null;
let statusesListenerUnsubscribe = null;
let difficultiesListenerUnsubscribe = null;

function initDataForModule(moduleId) {
  if (!moduleId) return;

  if (screensListenerUnsubscribe) {
    screensListenerUnsubscribe();
    screensListenerUnsubscribe = null;
  }

  const savedKey = STORAGE_KEY + '_' + moduleId;
  const saved = localStorage.getItem(savedKey);
  if (saved) {
    try {
      screensMap = JSON.parse(saved);
    } catch (e) {
      console.error("Localstorage load error:", e);
      screensMap = {};
    }
  } else {
    screensMap = {};
  }

  const savedStructKey = STORAGE_KEY + '_structure_' + moduleId;
  const savedStruct = localStorage.getItem(savedStructKey);
  if (savedStruct) {
    try {
      activeMenuStructure = JSON.parse(savedStruct);
    } catch (e) {
      activeMenuStructure = [];
    }
  } else {
    activeMenuStructure = [];
  }

  renderSidebarChips();
  renderContent();

  if (isFirebaseEnabled && firestoreDb) {
    setupFirebaseListener(moduleId);
    setupMenuStructureListener(moduleId);
  }
}

function loadLocalStatusConfigs() {
  const saved = localStorage.getItem('asc_status_configs');
  if (saved) {
    try {
      STATUS_CONFIGS = JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse status configs from local storage", e);
    }
  }
  applyStatusStyles();
}

function loadLocalDifficultyConfigs() {
  const saved = localStorage.getItem('asc_difficulty_configs');
  if (saved) {
    try {
      DIFFICULTY_CONFIGS = JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse difficulty configs from local storage", e);
    }
  }
}

function setupStatusesListener() {
  if (statusesListenerUnsubscribe) {
    statusesListenerUnsubscribe();
    statusesListenerUnsubscribe = null;
  }

  if (!isFirebaseEnabled || !firestoreDb) return;

  statusesListenerUnsubscribe = firestoreDb.collection('status_configs').orderBy('order')
    .onSnapshot(snap => {
      if (!snap.empty) {
        const list = [];
        snap.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });
        STATUS_CONFIGS = list;
        localStorage.setItem('asc_status_configs', JSON.stringify(STATUS_CONFIGS));
        applyStatusStyles();
        renderSidebarChips();
        renderContent();
      } else {
        initializeDefaultStatusesInFirestore();
      }
    }, err => {
      console.error("Error listening to status configs:", err);
    });
}

function initializeDefaultStatusesInFirestore() {
  if (!isFirebaseEnabled || !firestoreDb) return;
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
  batch.commit().then(() => {
    console.log("Initialized default statuses in Firestore");
  }).catch(err => {
    console.error("Failed to initialize default statuses in Firestore:", err);
  });
}

function setupDifficultiesListener() {
  if (difficultiesListenerUnsubscribe) {
    difficultiesListenerUnsubscribe();
    difficultiesListenerUnsubscribe = null;
  }

  if (!isFirebaseEnabled || !firestoreDb) return;

  difficultiesListenerUnsubscribe = firestoreDb.collection('difficulty_configs').orderBy('order')
    .onSnapshot(snap => {
      if (!snap.empty) {
        const list = [];
        snap.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });
        DIFFICULTY_CONFIGS = list;
        localStorage.setItem('asc_difficulty_configs', JSON.stringify(DIFFICULTY_CONFIGS));
        renderContent();
      } else {
        initializeDefaultDifficultiesInFirestore();
      }
    }, err => {
      console.error("Error listening to difficulty configs:", err);
    });
}

function initializeDefaultDifficultiesInFirestore() {
  if (!isFirebaseEnabled || !firestoreDb) return;
  const batch = firestoreDb.batch();
  DIFFICULTY_CONFIGS.forEach(diff => {
    const docRef = firestoreDb.collection('difficulty_configs').doc(diff.id);
    batch.set(docRef, {
      label: diff.label,
      bg: diff.bg,
      text: diff.text,
      border: diff.border,
      weight: diff.weight,
      order: diff.order
    });
  });
  batch.commit().then(() => {
    console.log("Initialized default difficulties in Firestore");
  }).catch(err => {
    console.error("Failed to initialize default difficulties in Firestore:", err);
  });
}

async function loadModulesListFromFirestore() {
  if (!firestoreDb) return;
  try {
    const snap = await firestoreDb.collection('modules').orderBy('order').get();
    if (!snap.empty) {
      const list = [];
      snap.forEach(doc => {
        const data = doc.data();
        list.push({
          id: data.id,
          name: data.name,
          order: data.order || 1,
          isActive: data.isActive === true
        });
      });
      MODULES_LIST = list;

      // Detect active module
      const activeMod = MODULES_LIST.find(m => m.isActive);

      if (activeMod && (!selectedModuleId || !MODULES_LIST.some(m => m.id === selectedModuleId))) {
        selectedModuleId = activeMod.id;
        localStorage.setItem('selected_module_id', selectedModuleId);
      } else if (!selectedModuleId && MODULES_LIST.length > 0) {
        selectedModuleId = MODULES_LIST[0].id;
        localStorage.setItem('selected_module_id', selectedModuleId);
      }

      repopulateModuleDropdown();
    }
  } catch (err) {
    console.error("Error loading modules list from Firestore:", err);
  }
}

function setupFirebaseListener(moduleId) {
  if (!firestoreDb) return;

  screensListenerUnsubscribe = firestoreDb.collection('screens')
    .where('moduleId', '==', moduleId)
    .onSnapshot(snapshot => {
      let changed = false;
      snapshot.forEach(doc => {
        const data = doc.data();
        const scrId = data.id;
        if (screensMap[scrId]) {
          if (screensMap[scrId].status !== data.status ||
            screensMap[scrId].description !== data.description ||
            screensMap[scrId].jiraUrl !== data.jiraUrl ||
            screensMap[scrId].actualUrl !== data.actualUrl ||
            screensMap[scrId].difficulty !== data.difficulty) {

            screensMap[scrId].status = data.status || 'Chưa xử lý';
            screensMap[scrId].description = data.description || '';
            screensMap[scrId].jiraUrl = data.jiraUrl || '';
            screensMap[scrId].actualUrl = data.actualUrl || '';
            screensMap[scrId].difficulty = data.difficulty || 'Trung bình';
            changed = true;
          }
        } else {
          screensMap[scrId] = {
            id: data.id,
            name: data.name,
            eduCode: data.eduCode || '-',
            tables: data.tables || [],
            status: data.status || 'Chưa xử lý',
            description: data.description || '',
            jiraUrl: data.jiraUrl || '',
            actualUrl: data.actualUrl || '',
            difficulty: data.difficulty || 'Trung bình'
          };
          changed = true;
        }
      });

      if (changed) {
        localStorage.setItem(STORAGE_KEY + '_' + moduleId, JSON.stringify(screensMap));
        updateProgressMetrics();
        renderContent();
      }
    }, err => {
      console.error("Firestore screens list listen error:", err);
      showToast('Lỗi đồng bộ Firestore', 'error');
    });
}

function setupMenuStructureListener(moduleId) {
  if (menuStructureListenerUnsubscribe) {
    menuStructureListenerUnsubscribe();
    menuStructureListenerUnsubscribe = null;
  }
  if (!firestoreDb) return;

  menuStructureListenerUnsubscribe = firestoreDb.collection('menu_structures').doc(moduleId)
    .onSnapshot(doc => {
      if (doc.exists) {
        const data = doc.data();
        activeMenuStructure = data.structure || [];
        localStorage.setItem(STORAGE_KEY + '_structure_' + moduleId, JSON.stringify(activeMenuStructure));
        updateProgressMetrics();
        renderContent();
      }
    });
}

function setupTablesListener() {
  if (tablesListenerUnsubscribe) {
    tablesListenerUnsubscribe();
    tablesListenerUnsubscribe = null;
  }
  if (!firestoreDb) return;

  tablesListenerUnsubscribe = firestoreDb.collection('tables')
    .onSnapshot(snapshot => {
      const list = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        list.push({
          id: data.tableId,
          title: data.tableName || data.tableId,
          group: data.group || 'general',
          x: data.x !== undefined ? data.x : 150,
          y: data.y !== undefined ? data.y : 150,
          columns: data.columns || [],
          relations: data.relations || []
        });
      });
      if (list.length > 0) {
        tables = list;
        localStorage.setItem(STORAGE_KEY + '_tables_schema', JSON.stringify(tables));
        renderContent();
      }
    });
}

// LOCK / UNLOCK FEATURES
function checkEditMode() {
  const isUnlocked = localStorage.getItem('asc_admin_unlocked') === 'true';
  isEditMode = isUnlocked;

  updateLockStatusUI();
}

function updateLockStatusUI() {
  const lockBtn = document.getElementById('lock-toggle-btn');
  if (lockBtn) {
    lockBtn.style.display = 'flex';
    if (isEditMode) {
      lockBtn.innerHTML = `
        <svg class="icon-svg" viewBox="0 0 24 24" style="fill:#ef4444; width:16px; height:16px; margin-right:4px;"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
        <span class="btn-text-label">Khóa Cấu Hình</span>
      `;
      lockBtn.title = "Bấm để khóa lại chế độ Chỉ Xem";
    } else {
      lockBtn.innerHTML = `
        <svg class="icon-svg" viewBox="0 0 24 24" style="fill:#10b981; width:16px; height:16px; margin-right:4px;"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"/></svg>
        <span class="btn-text-label">Mở Khóa</span>
      `;
      lockBtn.title = "Nhập mật mã để chỉnh sửa cấu hình";
    }
  }

  const adminBtn = document.getElementById('admin-settings-btn');
  const importBtn = document.getElementById('import-btn');
  const resetBtn = document.getElementById('reset-btn');

  if (adminBtn) adminBtn.style.display = isEditMode ? 'flex' : 'none';
  if (importBtn) importBtn.style.display = isEditMode ? 'flex' : 'none';
  if (resetBtn) resetBtn.style.display = isEditMode ? 'flex' : 'none';
}

window.toggleLockMode = async function () {
  if (isEditMode) {
    localStorage.removeItem('asc_admin_unlocked');
    showToast("Đã khóa lại chế độ chỉ xem!");
    setTimeout(() => location.reload(), 600);
  } else {
    const pass = prompt("Nhập mật mã để mở khóa các tính năng cấu hình:");
    if (pass === null) return;

    let correctPassword = 'asc@2026';
    if (isFirebaseEnabled && firestoreDb) {
      try {
        const doc = await firestoreDb.collection('settings').doc('auth').get();
        if (doc.exists && doc.data().password) {
          correctPassword = doc.data().password;
        }
      } catch (e) {
        console.error("Failed to fetch password from Firebase settings/auth:", e);
      }
    }

    if (pass === correctPassword) {
      localStorage.setItem('asc_admin_unlocked', 'true');
      showToast("Mở khóa cấu hình thành công!");
      setTimeout(() => location.reload(), 600);
    } else {
      alert("Mật mã không đúng!");
    }
  }
};
