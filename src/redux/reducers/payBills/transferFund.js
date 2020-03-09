import {
  TRANSFER_FUND_START,
  TRANSFER_FUND_SUCCESS,
  TRANSFER_FUND_ERROR,
  CLEAR_TRANSFER_FUND_STORE,
} from 'constants/action-types/payBills/transferFund';

export default (state, { type, payload }) => {
  switch (type) {
    case TRANSFER_FUND_START:
      return {
        ...state,
        transferFund: {
          ...state.transferFund,
          loading: true,
        },
      };
    case TRANSFER_FUND_ERROR:
      return {
        ...state,
        transferFund: {
          ...state.transferFund,
          error: payload.error,
          success: false,
          loading: false,
        },
      };
    case TRANSFER_FUND_SUCCESS:
      return {
        ...state,
        transferFund: {
          ...state.transferFund,
          ...payload,
          success: true,
          error: null,
          loading: false,
        },
      };
    case CLEAR_TRANSFER_FUND_STORE:
      return {
        ...state,
        transferFund: {
          ...state.transferFund,
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
