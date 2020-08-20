import {
  CANCEL_VOUCHER_START,
  CANCEL_VOUCHER_SUCCESS,
  CANCEL_VOUCHER_ERROR,
} from 'constants/action-types/transactions/cancelTransaction';
import { CLEAR_MOVE_FUNDS_ERRORS } from 'constants/action-types/moneyTransfer';

export default (state, { type, payload }) => {
  switch (type) {
    case CANCEL_VOUCHER_START:
      return {
        ...state,
        cancelVoucher: {
          ...state.cancelVoucher,
          loading: true,
          error: null,
        },
      };
    case CANCEL_VOUCHER_ERROR:
      return {
        ...state,
        cancelVoucher: {
          ...state.cancelVoucher,
          error: payload,
          loading: false,
        },
      };
    case CANCEL_VOUCHER_SUCCESS:
      return {
        ...state,
        cancelVoucher: {
          ...state.cancelVoucher,
          error: null,
          loading: false,
          data: payload.data,
        },
        pendingVouchers: {
          ...state.pendingVouchers,
          data: state.pendingVouchers.data.filter(
            item => item.SecurityCode !== payload.securityCode,
          ),
        },
      };

    case CLEAR_MOVE_FUNDS_ERRORS: {
      return {
        ...state,
        cancelVoucher: {
          ...state.cancelVoucher,
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
