import {
  VERIFY_STORE_VOUCHER_ERROR,
  VERIFY_STORE_VOUCHER_START,
  VERIFY_STORE_VOUCHER_SUCCESS,
  CLEAR_CANCEL_TRANSACTION,
} from 'constants/action-types/vouchers/verifyStoreVoucher';
import { CLEAR_MOVE_FUNDS_ERRORS } from 'constants/action-types/moneyTransfer';

export default (state, { type, payload }) => {
  switch (type) {
    case VERIFY_STORE_VOUCHER_START:
      return {
        ...state,
        verifyVoucher: {
          ...state.verifyVoucher,
          loading: true,
          error: null,
        },
      };
    case VERIFY_STORE_VOUCHER_ERROR:
      return {
        ...state,
        verifyVoucher: {
          ...state.verifyVoucher,
          error: payload,
          loading: false,
        },
      };
    case VERIFY_STORE_VOUCHER_SUCCESS:
      return {
        ...state,
        redeemVoucher: {
          data: null,
          loading: false,
          error: null,
        },
        verifyVoucher: {
          ...state.verifyVoucher,
          error: null,
          loading: false,
          data: payload.data,
        },
      };

    case CLEAR_MOVE_FUNDS_ERRORS: {
      return {
        ...state,
        verifyVoucher: {
          ...state.verifyVoucher,
          data: null,
          loading: false,
          error: null,
        },
      };
    }

    case CLEAR_CANCEL_TRANSACTION:
      return {
        verifyVoucher: {
          ...state.verifyVoucher,
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
