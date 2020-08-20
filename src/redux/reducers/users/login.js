import {
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  CLEAR_LOGIN_ERRORS,
  UPDATE_AUTH_DATA,
} from 'constants/action-types/users/login';

export default (state, { type, payload }) => {
  switch (type) {
    case CLEAR_LOGIN_ERRORS:
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
          error: null,
        },
      };

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
      localStorage.removeItem('userWasIdle');
      localStorage.removeItem('fromUserLogout');
      localStorage.setItem('token', payload.data[0].LiveToken);
      localStorage.setItem(
        'refresh_token',
        payload.data[0].RefreshToken,
      );

      localStorage.setItem(
        'MAX_USER_IDLE_TIME',
        Number(payload.data[0].MaxIdleTimeForLogoff) * 60000,
      );
      return {
        ...state,
        login: {
          ...state.login,
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
        myWallets: {
          ...state.myWallets,
          walletList: payload.data?.[0]?.UserData.Wallets,
          success: true,
          loading: false,
        },

        currencies: {
          ...state.currencies,
          error: null,
          loading: false,
          data: payload.data?.[0]?.Currencies,
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
