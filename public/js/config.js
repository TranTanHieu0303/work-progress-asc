// CONFIGURATION MODULE (DEFAULT STATUSES & DIFFICULTIES ONLY)

// STATUS CONFIGURATIONS (DEFAULT FALLBACK)
let STATUS_CONFIGS = [
  { id: 'todo', label: 'Chưa xử lý', bg: '#f1f5f9', text: '#475569', border: '#cbd5e1', isCompleted: false, order: 1 },
  { id: 'progress', label: 'Đang xử lý', bg: '#fffbeb', text: '#b45309', border: '#fde68a', isCompleted: false, order: 2 },
  { id: 'done', label: 'Đã xử lý', bg: '#ecfdf5', text: '#047857', border: '#a7f3d0', isCompleted: true, order: 3 }
];

// DIFFICULTY CONFIGURATIONS (DEFAULT FALLBACK)
let DIFFICULTY_CONFIGS = [
  { id: 'very_easy', label: 'Rất dễ', bg: '#e8f0fe', text: '#1a73e8', border: '#d2e3fc', weight: 1, order: 1 },
  { id: 'easy', label: 'Dễ', bg: '#e6f4ea', text: '#137333', border: '#ceead6', weight: 2, order: 2 },
  { id: 'medium', label: 'Trung bình', bg: '#fef7e0', text: '#b06000', border: '#feebc8', weight: 3, order: 3 },
  { id: 'hard', label: 'Khó', bg: '#fce8e6', text: '#c5221f', border: '#fad2cf', weight: 5, order: 4 },
  { id: 'very_hard', label: 'Cực khó', bg: '#f3e8ff', text: '#6b21a8', border: '#e9d5ff', weight: 8, order: 5 }
];

function getDifficultyBadgeHtml(difficulty) {
  const cfg = DIFFICULTY_CONFIGS.find(c => c.label === difficulty) || DIFFICULTY_CONFIGS.find(c => c.label === 'Trung bình') || DIFFICULTY_CONFIGS[0] || { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1', label: difficulty || 'Chưa rõ' };
  return `<span class="difficulty-badge" style="background:${cfg.bg}; color:${cfg.text}; border:1px solid ${cfg.border}; font-size:10px; padding:2px 6px; border-radius:4px; font-weight:600; margin-left:8px; display:inline-flex; align-items:center; cursor:default;">${cfg.label}</span>`;
}

// APPLICATION RUNTIME STATE (LOADED DYNAMICALLY FROM CLOUD / STORAGE)
let activeMenuStructure = [];
let MODULES_LIST = [];
let tables = [];
let screensMap = {};

let activeFilter = 'ALL';
let activeDifficultyFilter = 'ALL';
let searchQuery = '';
let viewMode = 'tree'; // 'tree' | 'card'
let collapsedNodes = {}; // Tracks expanded state for tree nodes
let activeEditScreenId = null;
let adminScreenQuery = '';
let isEditMode = false;
let selectedModuleId = localStorage.getItem('selected_module_id') || '';
let quillEditorInstance = null;
let currentEditingItemId = null;

// LOCAL STORAGE CONFIG KEY
const STORAGE_KEY = 'edu_menu_manager_progress_v2';

// FIREBASE STATE
let isFirebaseEnabled = false;
let firestoreDb = null;
