import axios from "axios";
import { actionTypes } from "../actions/userActions";

const initialState = {
  users: {},
};

const userReducer = (state = initialState, action) => {
  const { users } = state;

  switch (action.type) {
    case actionTypes.ADD_NEW_USER:
      return {
        ...state,
        users: action.newUser,
      };

    case actionTypes.PROFILE_PAGE_RENDERED:
      return {
        ...state,
        users: action.users,
      };

    case actionTypes.SAVE_USER_CHANGES:
      return {
        ...state,
        ...users,
        userName: action.newUserName,
        email: action.newEmail,
      };

    default:
      return state;
  }
};

export default userReducer;
