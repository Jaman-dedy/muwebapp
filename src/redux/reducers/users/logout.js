import {
  LOGOUT_START,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
} from 'constants/action-types/users/logout';
import initialState from 'redux/initialState';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGOUT_START:
      localStorage.setItem('fromUserLogout', true);
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('token');
      localStorage.removeItem('MAX_USER_IDLE_TIME');
      window.location.reload();
      return {
        ...state,
        logout: {
          ...state.logout,
          loading: true,
          error: null,
        },
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        logout: {
          ...state.logout,
          error: payload,
          loading: false,
        },
      };
    case LOGOUT_SUCCESS:
      return initialState;

    default:
      return null;
  }
};
