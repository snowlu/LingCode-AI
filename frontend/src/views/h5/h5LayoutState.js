import { reactive } from 'vue';

export const h5LayoutState = reactive({
  title: '',
  showBack: false,
  showTabbar: true,
  activeTab: 'home',
  sheetVisible: false,
  sheetTitle: '',
  sheetForm: {},
  sheetFields: [],
  sheetLoading: false,
});

let _sheetCallback = null;

export function setH5Layout(options = {}) {
  if (options.title !== undefined) h5LayoutState.title = options.title;
  if (options.showBack !== undefined) h5LayoutState.showBack = options.showBack;
  if (options.showTabbar !== undefined) h5LayoutState.showTabbar = options.showTabbar;
  if (options.activeTab !== undefined) h5LayoutState.activeTab = options.activeTab;
}

export function openH5Sheet(title, fields, form, onSave) {
  h5LayoutState.sheetTitle = title;
  h5LayoutState.sheetFields = fields;
  h5LayoutState.sheetForm = { ...form };
  h5LayoutState.sheetVisible = true;
  _sheetCallback = onSave;
}

export function closeH5Sheet() {
  h5LayoutState.sheetVisible = false;
  _sheetCallback = null;
}

export async function submitH5Sheet(formData) {
  if (!_sheetCallback) return;
  h5LayoutState.sheetLoading = true;
  try {
    await _sheetCallback(formData);
  } finally {
    h5LayoutState.sheetLoading = false;
  }
}
