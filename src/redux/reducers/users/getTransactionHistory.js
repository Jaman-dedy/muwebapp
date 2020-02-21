import {
  GET_TRANSACTION_HISTORY_START,
  GET_TRANSACTION_HISTORY_ERROR,
  GET_TRANSACTION_HISTORY_SUCCESS,
} from 'constants/action-types/users/getTransactionHistory';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_TRANSACTION_HISTORY_START:
      return {
        ...state,
        transactionHistory: {
          ...state.transactionHistory,
          loading: true,
          error: null,
        },
      };
    case GET_TRANSACTION_HISTORY_ERROR:
      return {
        ...state,
        transactionHistory: {
          ...state.transactionHistory,
          error: payload,
          loading: false,
        },
      };
    case GET_TRANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        transactionHistory: {
          ...state.transactionHistory,
          error: null,
          loading: false,
          data: payload.data,
        },
      };
    default:
      return null;
  }
};
