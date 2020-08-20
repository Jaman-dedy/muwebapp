import {
  MOVE_FUNDS_START,
  MOVE_FUNDS_SUCCESS,
  MOVE_FUNDS_ERROR,
  CLEAR_MOVE_FUNDS_ERRORS,
} from 'constants/action-types/moneyTransfer';

export default (state, { type, payload }) => {
  switch (type) {
    case MOVE_FUNDS_START:
      return {
        ...state,
        moveFundsTo2UWallet: {
          ...state.moveFundsTo2UWallet,
          loading: true,
          error: null,
        },
      };
    case MOVE_FUNDS_ERROR:
      return {
        ...state,
        moveFundsTo2UWallet: {
          ...state.moveFundsTo2UWallet,
          error: payload,
          loading: false,
        },
      };
    case MOVE_FUNDS_SUCCESS:
      return {
        ...state,
        moveFundsTo2UWallet: {
          ...state.moveFundsTo2UWallet,
          error: null,
          loading: false,
          data: payload,
        },
      };

    case CLEAR_MOVE_FUNDS_ERRORS: {
      return {
        ...state,
        moveFundsTo2UWallet: {
          ...state.moveFundsTo2UWallet,
          error: null,
          loading: false,
          data: null,
        },
        confirmTransaction: {
          ...state.confirmTransaction,
          confirmationError: null,
          checking: false,
          confirmationData: null,
        },
        cancelTransaction: {
          ...state.cancelTransaction,
          data: null,
          loading: false,
          error: null,
        },
      };
    }
    default:
      return null;
  }
};
