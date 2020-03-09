import {
  TRANSFER_CONFIRMATION_START,
  TRANSFER_CONFIRMATION_SUCCESS,
  TRANSFER_CONFIRMATION_ERROR,
  CLEAR_TRANSFER_CONFIRMATION_STORE,
} from 'constants/action-types/payBills/transferConfirmation';

export default (state, { type, payload }) => {
  switch (type) {
    case TRANSFER_CONFIRMATION_START:
      return {
        ...state,
        transferConfirmation: {
          ...state.transferConfirmation,
          loading: true,
        },
      };
    case TRANSFER_CONFIRMATION_ERROR:
      return {
        ...state,
        transferConfirmation: {
          ...state.transferConfirmation,
          error: payload.error,
          success: false,
          loading: false,
        },
      };
    case TRANSFER_CONFIRMATION_SUCCESS:
      return {
        ...state,
        transferConfirmation: {
          ...state.transferConfirmation,
          ...payload,
          success: true,
          error: null,
          loading: false,
        },
      };
    case CLEAR_TRANSFER_CONFIRMATION_STORE:
      return {
        ...state,
        transferConfirmation: {
          ...state.transferConfirmation,
          ...payload,
          loading: false,
          success: false,
          message: '',
          error: null,
          data: {},
        },
      };
    default:
      return null;
  }
};
