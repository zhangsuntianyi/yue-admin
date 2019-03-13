export const setToken = (state, token) => {
  state.token = token || '';
};

export const setTabs = (state, tabs) => {
  state.tabs = tabs;
};

export const addTab = (state, tab) => {
  state.tabs.push(tab);
};

export const setCollapsed = (state, collapsed) => {
  state.collapsed = collapsed;
};
