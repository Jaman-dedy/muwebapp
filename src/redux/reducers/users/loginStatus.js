import {
  LOGIN_STATUS_START,
  LOGIN_STATUS_ERROR,
  LOGIN_STATUS_SUCCESS,
  CLEAR_LOGIN_STATUS_ERRORS,
  UPDATE_AUTH_DATA,
} from 'constants/action-types/users/loginStatus';

export default (state, { type, payload }) => {
  switch (type) {
    case CLEAR_LOGIN_STATUS_ERRORS:
      return {
        ...state,
        loginStatus: {
          ...state.loginStatus,
          loading: false,
          error: null,
        },
      };

    case LOGIN_STATUS_START:
      return {
        ...state,
        loginStatus: {
          ...state.loginStatus,
          loading: true,
          error: null,
        },
      };
    case LOGIN_STATUS_ERROR:
      return {
        ...state,
        loginStatus: {
          ...state.loginStatus,
          error: payload,
          loading: false,
        },
      };
    case LOGIN_STATUS_SUCCESS:
      return {
        ...state,
        loginStatus: {
          ...state.loginStatus,
          error: null,
          loading: false,
        },
        currentUser: {
          ...state.currentUser,
          authData: payload.data?.[0],
        },
        userData: {
          data: payload.data[0]?.UserData,
          loading: false,
          error: null,
        },
      };

    case UPDATE_AUTH_DATA:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          authData: {
            ...state.currentUser.authData,
            ...payload,
          },
        },
      };
    default:
      return null;
  }
};
