import {
  TRANSFER_TO_OTHERS_ERROR,
  TRANSFER_TO_OTHERS_START,
  TRANSFER_TO_OTHERS_SUCCESS,
  CLEAR_TRANSFER_TO_OTHERS_ERRORS,
} from 'constants/action-types/moneyTransfer';

export default (state, { type, payload }) => {
  switch (type) {
    case TRANSFER_TO_OTHERS_START:
      return {
        ...state,
        transferToOthers: {
          ...state.transferToOthers,
          loading: true,
          error: null,
        },
      };
    case TRANSFER_TO_OTHERS_ERROR:
      return {
        ...state,
        transferToOthers: {
          ...state.transferToOthers,
          error: payload,
          loading: false,
        },
      };
    case TRANSFER_TO_OTHERS_SUCCESS:
      return {
        ...state,
        transferToOthers: {
          ...state.transferToOthers,
          error: null,
          loading: false,
          data: payload,
        },
      };

    case CLEAR_TRANSFER_TO_OTHERS_ERRORS: {
      return {
        ...state,
        transferToOthers: {
          ...state.transferToOthers,
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
