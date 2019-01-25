export const setUser = (state, user) => {
  state.userId = user.id || '';
  state.userName = user.name || '';
  state.permissions = user.permissions || [];
  state.menus = user.menus || [];
};
