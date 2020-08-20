import {
  CANCEL_TRANSACTION_START,
  CANCEL_TRANSACTION_SUCCESS,
  CANCEL_TRANSACTION_ERROR,
  CLEAR_CANCEL_TRANSACTION,
} from 'constants/action-types/transactions/cancelTransaction';
import { CLEAR_MOVE_FUNDS_ERRORS } from 'constants/action-types/moneyTransfer';

export default (state, { type, payload }) => {
  switch (type) {
    case CANCEL_TRANSACTION_START:
      return {
        ...state,
        cancelTransaction: {
          ...state.cancelTransaction,
          loading: true,
          error: null,
        },
      };
    case CANCEL_TRANSACTION_ERROR:
      return {
        ...state,
        cancelTransaction: {
          ...state.cancelTransaction,
          error: payload,
          loading: false,
        },
      };
    case CANCEL_TRANSACTION_SUCCESS:
      return {
        ...state,
        cancelTransaction: {
          ...state.cancelTransaction,
          error: null,
          loading: false,
          data: payload.data,
        },
        unPaidCashList: {
          ...state.unPaidCashList,
          data: state.unPaidCashList.data.filter(
            item => item.SecurityCode !== payload.securityCode,
          ),
        },
      };

    case CLEAR_MOVE_FUNDS_ERRORS: {
      return {
        ...state,
        cancelTransaction: {
          ...state.cancelTransaction,
          data: null,
          loading: false,
          error: null,
        },
      };
    }

    case CLEAR_CANCEL_TRANSACTION:
      return {
        cancelTransaction: {
          ...state.cancelTransaction,
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
