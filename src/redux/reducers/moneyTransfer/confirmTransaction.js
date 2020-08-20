import {
  CONFIRM_TRANSACTION_START,
  CONFIRM_TRANSACTION_SUCCESS,
  CONFIRM_TRANSACTION_ERROR,
  CLEAR_TRANSACTION_INFO,
} from 'constants/action-types/moneyTransfer';

export default (state, { type, payload }) => {
  switch (type) {
    case CONFIRM_TRANSACTION_START:
      return {
        ...state,
        confirmTransaction: {
          ...state.confirmTransaction,
          checking: true,
          confirmationError: null,
        },
      };
    case CONFIRM_TRANSACTION_ERROR:
      return {
        ...state,
        confirmTransaction: {
          ...state.confirmTransaction,
          confirmationError: payload,
          checking: false,
        },
      };
    case CONFIRM_TRANSACTION_SUCCESS:
      return {
        ...state,
        confirmTransaction: {
          ...state.confirmTransaction,
          confirmationError: null,
          checking: false,
          confirmationData: payload,
        },
      };
    case CLEAR_TRANSACTION_INFO: {
      return {
        ...state,
        confirmTransaction: {
          ...state.confirmTransaction,
          confirmationError: null,
          checking: false,
          confirmationData: null,
        },
      };
    }
    default:
      return null;
  }
};
