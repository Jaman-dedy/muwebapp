import {
  ADD_WALLET_START,
  ADD_WALLET_SUCCESS,
  ADD_WALLET_ERROR,
  ADD_WALLET_CLEAR,
  ADD_WALLET_END,
} from 'constants/action-types/users/addWallet';

export default (state, { type, payload }) => {
  switch (type) {
    case ADD_WALLET_START:
      return {
        ...state,
        createWallet: {
          ...state.createWallet,
          loading: true,
          error: null,
        },
      };
    case ADD_WALLET_SUCCESS:
      return {
        ...state,
        createWallet: {
          ...state.createWallet,
          ...payload,
          loading: false,
          error: null,
          success: true,
        },
      };

    case ADD_WALLET_ERROR:
      return {
        ...state,
        createWallet: {
          ...state.createWallet,
          loading: false,
          error: payload,
        },
      };

    case ADD_WALLET_CLEAR:
      return {
        ...state,
        createWallet: {
          ...state.createWallet,
          loading: false,
          Name: '',
          Currency: '',
          success: false,
          error: null,
        },
      };
    case ADD_WALLET_END:
      return {
        ...state,
        createWallet: {
          ...state.createWallet,
          success: false,
          error: null,
        },
      };
    default:
      return null;
  }
};
