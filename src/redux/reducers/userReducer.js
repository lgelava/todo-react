import { actionTypes } from "../actions/userActions";

const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  const { users } = state;

  switch (action.type) {
    case actionTypes.ADD_NEW_USER:
      return {
        ...state,
        users: [...users, action.newUser],
      };

    case actionTypes.USER_LOGS_IN:
      return {
        ...state,
        users: users.filter((user) => user._id === action.id),
      };

    case actionTypes.PROFILE_PAGE_RENDERED:
      return {
        ...state,
        ...users,
        userName: action.user.userName,
        email: action.user.email,
      };

    case actionTypes.SAVE_USER_CHANGES:
      console.log(action.userName);
      return {
        ...state,
        users: users.map((user) =>
          user._id === action.author
            ? { ...user, userName: action.userName, email: action.email }
            : user
        ),
      };

    default:
      return state;
  }
};

export default userReducer;
