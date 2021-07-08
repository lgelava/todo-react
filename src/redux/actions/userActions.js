export const actionTypes = {
  ADD_NEW_USER: "ADD_NEW_USER",
  USER_LOGS_IN: "USER_LOGS_IN",
  PROFILE_PAGE_RENDERED: "PROFILE_PAGE_RENDERED",
  SAVE_USER_CHANGES: "SAVE_USER_CHANGES",
};

export const addNewUser = (newUser) => ({
  type: actionTypes.ADD_NEW_USER,
  newUser,
});

export const userLogsIn = (id) => ({
  type: actionTypes.USER_LOGS_IN,
  id,
});

export const profilePageRendered = (user) => ({
  type: actionTypes.PROFILE_PAGE_RENDERED,
  user,
});

export const saveUserChanges = (author, userName, email) => ({
  type: actionTypes.SAVE_USER_CHANGES,
  author,
  userName,
  email,
});
