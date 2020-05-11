import {
  GET_PENDING_VOUCHERS_START,
  GET_PENDING_VOUCHERS_SUCCESS,
  GET_PENDING_VOUCHERS_ERROR,
} from 'constants/action-types/transactions/getPendingVouchers';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_PENDING_VOUCHERS_START:
      return {
        ...state,
        pendingVouchers: {
          ...state.pendingVouchers,
          loading: true,
          error: null,
        },
      };
    case GET_PENDING_VOUCHERS_ERROR:
      return {
        ...state,
        pendingVouchers: {
          ...state.pendingVouchers,
          error: payload,
          loading: false,
        },
      };
    case GET_PENDING_VOUCHERS_SUCCESS:
      return {
        ...state,
        pendingVouchers: {
          ...state.pendingVouchers,
          error: null,
          loading: false,
          data: payload,
        },
      };
    default:
      return null;
  }
};
