import {
  GET_WALLET_TRANSACTIONS_START,
  GET_WALLET_TRANSACTIONS_SUCCESS,
  GET_WALLET_TRANSACTIONS_ERROR,
  CLEAR_ACCOUNT_NUMBER,
} from 'constants/action-types/transactions/wallet';

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
          data: payload.result,
          AccountNumber: payload.data?.WalletNumber,
        },
      };
    case CLEAR_ACCOUNT_NUMBER:
      return {
        ...state,
        walletTransactions: {
          ...state.walletTransactions,
          AccountNumber: null,
        },
      };
    default:
      return null;
  }
};
