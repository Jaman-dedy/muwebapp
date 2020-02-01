import {
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
} from 'constants/action-types/users/login';

export default (state, { type, payload }) => {
  switch (type) {
    case LOGIN_START:
      return {
        ...state,
        login: {
          ...state.login,
          loading: true,
          error: null,
        },
      };
    case LOGIN_ERROR:
      return {
        ...state,
        login: {
          ...state.login,
          error: payload,
          loading: false,
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          isAuthenticated: true,
        },
      };
    default:
      return null;
  }
};
