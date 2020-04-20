import {
  DELETE_WALLET_START,
  DELETE_WALLET_SUCCESS,
  DELETE_WALLET_ERROR,
  DELETE_WALLET_CLEAR,
} from 'constants/action-types/users/deleteWallet';

export default (state, { type, payload }) => {
  switch (type) {
    case DELETE_WALLET_START:
      return {
        ...state,
        deleteWallet: {
          ...state.deleteWallet,
          loading: true,
          error: null,
        },
      };
    case DELETE_WALLET_SUCCESS:
      return {
        ...state,
        deleteWallet: {
          ...state.deleteWallet,
          loading: false,
          error: null,
        },
      };
    case DELETE_WALLET_ERROR:
      return {
        ...state,
        deleteWallet: {
          loading: false,
          error: payload,
        },
      };
    case DELETE_WALLET_CLEAR:
      return {
        ...state,
        deleteWallet: {
          loading: false,
          error: null,
        },
      };

    default:
      return null;
  }
};
