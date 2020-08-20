import {
  REJECT_STORE_VOUCHER_ERROR,
  REJECT_STORE_VOUCHER_START,
  REJECT_STORE_VOUCHER_SUCCESS,
  CLEAR_CANCEL_TRANSACTION,
} from 'constants/action-types/vouchers/rejectStoreVoucher';
import { CLEAR_MOVE_FUNDS_ERRORS } from 'constants/action-types/moneyTransfer';

export default (state, { type, payload }) => {
  switch (type) {
    case REJECT_STORE_VOUCHER_START:
      return {
        ...state,
        rejectVoucher: {
          ...state.rejectVoucher,
          loading: true,
          error: null,
        },
      };
    case REJECT_STORE_VOUCHER_ERROR:
      return {
        ...state,
        rejectVoucher: {
          ...state.rejectVoucher,
          error: payload,
          loading: false,
        },
      };
    case REJECT_STORE_VOUCHER_SUCCESS:
      return {
        ...state,
        rejectVoucher: {
          ...state.rejectVoucher,
          error: null,
          loading: false,
          data: payload.data,
        },
        storePendingVouchers: {
          ...state.storePendingVouchers,
          data: state.storePendingVouchers.data.filter(
            item => item.TransactionID !== payload.TransactionID,
          ),
        },
      };

    case CLEAR_MOVE_FUNDS_ERRORS: {
      return {
        ...state,
        rejectVoucher: {
          ...state.rejectVoucher,
          data: null,
          loading: false,
          error: null,
        },
      };
    }

    case CLEAR_CANCEL_TRANSACTION:
      return {
        rejectVoucher: {
          ...state.rejectVoucher,
          data: null,
          loading: false,
          error: null,
        },
        cancelVoucher: {
          ...state.cancelVoucher,
          data: null,
          loading: false,
          error: null,
        },
      };
    default:
      return null;
  }
};
