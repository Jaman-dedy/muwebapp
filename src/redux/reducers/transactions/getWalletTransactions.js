import {
  GET_WALLET_TRANSACTIONS_START,
  GET_WALLET_TRANSACTIONS_SUCCESS,
  GET_WALLET_TRANSACTIONS_ERROR,
} from 'constants/action-types/transactions';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_WALLET_TRANSACTIONS_START:
      return {
        ...state,
        walletTransactions: {
          ...state.walletTransactions,
          loading: true,
          error: null,
        },
      };
    case GET_WALLET_TRANSACTIONS_ERROR:
      return {
        ...state,
        walletTransactions: {
          ...state.walletTransactions,
          error: payload,
          loading: false,
        },
      };
    case GET_WALLET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        walletTransactions: {
          ...state.walletTransactions,
          error: null,
          loading: false,
          data: payload,
        },
      };
    default:
      return null;
  }
};
