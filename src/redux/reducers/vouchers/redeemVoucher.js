import {
  REDEEM_STORE_VOUCHER_ERROR,
  REDEEM_STORE_VOUCHER_START,
  REDEEM_STORE_VOUCHER_SUCCESS,
  CLEAR_CANCEL_TRANSACTION,
} from 'constants/action-types/vouchers/redeemStoreVoucher';
import { CLEAR_MOVE_FUNDS_ERRORS } from 'constants/action-types/moneyTransfer';

export default (state, { type, payload }) => {
  switch (type) {
    case REDEEM_STORE_VOUCHER_START:
      return {
        ...state,
        redeemVoucher: {
          ...state.redeemVoucher,
          loading: true,
          error: null,
        },
      };
    case REDEEM_STORE_VOUCHER_ERROR:
      return {
        ...state,
        redeemVoucher: {
          ...state.redeemVoucher,
          error: payload,
          loading: false,
        },
      };
    case REDEEM_STORE_VOUCHER_SUCCESS:
      return {
        ...state,
        redeemVoucher: {
          ...state.redeemVoucher,
          error: null,
          loading: false,
          data: payload.data,
        },
      };

    case CLEAR_MOVE_FUNDS_ERRORS: {
      return {
        ...state,
        redeemVoucher: {
          ...state.redeemVoucher,
          data: null,
          loading: false,
          error: null,
        },
      };
    }

    case CLEAR_CANCEL_TRANSACTION:
      return {
        redeemVoucher: {
          ...state.redeemVoucher,
          data: null,
          loading: false,
          error: null,
        },
        cadeemVoucher: {
          ...state.cadeemVoucher,
          data: null,
          loading: false,
          error: null,
        },
      };
    default:
      return null;
  }
};
