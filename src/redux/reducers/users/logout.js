import {
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_END,
} from 'constants/action-types/users/logout';

export default (state, { type, payload }) => {
  switch (type) {
    case LOGOUT_START:
      return {
        ...state,
        logout: {
          ...state.logout,
          loading: true,
          error: null,
          success: false,
        },
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
        },
        logout: {
          ...state.logout,
          error: null,
          success: true,
          loading: false,
        },
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        logout: {
          ...state.logout,
          error: payload,
          success: false,
          loading: false,
        },
      };
    case LOGOUT_END:
      return {
        ...state,
        logout: {
          ...state.logout,
          loading: false,
        },
      };
    default:
      return null;
  }
};
