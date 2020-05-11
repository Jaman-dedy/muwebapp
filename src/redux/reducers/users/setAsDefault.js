import {
  SET_DEFAULT_WALLET_START,
  SET_DEFAULT_WALLET_SUCCESS,
  SET_DEFAULT_WALLET_ERROR,
  SET_DEFAULT_WALLET_CLEAR,
  SET_DEFAULT_WALLET_END,
} from 'constants/action-types/users/setAsDefault';

export default (state, { type, payload }) => {
  switch (type) {
    case SET_DEFAULT_WALLET_START:
      return {
        ...state,
        setAsDefault: {
          ...state.setAsDefault,
          loading: true,
          error: null,
          success: false,
        },
      };
    case SET_DEFAULT_WALLET_SUCCESS:
      return {
        ...state,
        setAsDefault: {
          ...state.setAsDefault,
          ...payload,
          loading: false,
          error: null,
          success: true,
        },
        userData: {
          ...state.userData,
          data: {
            ...state.userData.data,
            DefaultWallet: payload.defaultWallet,
            Currency: payload.walletDetails.CurrencyCode,
            CurrencyFlag: payload.walletDetails.Flag,
            Balance: payload.walletDetails.Balance,
          },
        },
      };

    case SET_DEFAULT_WALLET_ERROR:
      return {
        ...state,
        setAsDefault: {
          ...state.setAsDefault,
          loading: false,
          error: payload,
        },
      };

    case SET_DEFAULT_WALLET_CLEAR:
      return {
        ...state,
        setAsDefault: {
          ...state.setAsDefault,
          loading: false,
          Name: '',
          Currency: '',
          success: false,
          error: null,
        },
      };
    case SET_DEFAULT_WALLET_END:
      return {
        ...state.setAsDefault,
        success: false,
        error: null,
      };
    default:
      return null;
  }
};
