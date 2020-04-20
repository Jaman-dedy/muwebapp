import {
  TRANSACTION_HISTORY_START,
  TRANSACTION_HISTORY_SUCCESS,
  TRANSACTION_HISTORY_ERROR,
} from 'constants/action-types/transactions/history';

export default (state, { type, payload }) => {
  switch (type) {
    case TRANSACTION_HISTORY_START:
      return {
        ...state,
        history: {
          ...state.history,
          loading: true,
          error: null,
        },
      };
    case TRANSACTION_HISTORY_ERROR:
      return {
        ...state,
        history: {
          ...state.history,
          error: payload,
          loading: false,
        },
      };
    case TRANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        history: {
          ...state.history,
          error: null,
          loading: false,
          data: payload,
        },
      };
    default:
      return null;
  }
};
