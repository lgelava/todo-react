export const actionTypes = {
  ADD_NEW_USER: "ADD_NEW_USER",
  USER_LOGS_IN: "USER_LOGS_IN",
  PROFILE_PAGE_RENDERED: "PROFILE_PAGE_RENDERED",
  SAVE_USER_CHANGES: "SAVE_USER_CHANGES",
  PROFILE_FIELDS_DISPLAYED: "PROFILE_FIELDS_DISPLAYED",
};

export const addNewUser = (newUser) => ({
  type: actionTypes.ADD_NEW_USER,
  newUser,
});

export const userLogsIn = (id) => ({
  type: actionTypes.USER_LOGS_IN,
  id,
});

export const profilePageRendered = (users) => ({
  type: actionTypes.PROFILE_PAGE_RENDERED,
  users,
});

export const saveUserChanges = (newUserName, newEmail) => ({
  type: actionTypes.SAVE_USER_CHANGES,
  newUserName,
  newEmail,
});

// export const passwordChanger = (newPassword) => ({
//   type: actionTypes.PASSWORD_CHANGER,
//   newPassword
// })
