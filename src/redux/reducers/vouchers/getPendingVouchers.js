import {
  GET_STORE_PENDING_VOUCHERS_START,
  GET_STORE_PENDING_VOUCHERS_SUCCESS,
  GET_STORE_PENDING_VOUCHERS_ERROR,
} from 'constants/action-types/vouchers/getPendingVouchers';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_STORE_PENDING_VOUCHERS_START:
      return {
        ...state,
        storePendingVouchers: {
          ...state.storePendingVouchers,
          loading: true,
          error: null,
        },
      };
    case GET_STORE_PENDING_VOUCHERS_ERROR:
      return {
        ...state,
        storePendingVouchers: {
          ...state.storePendingVouchers,
          error: payload,
          loading: false,
        },
      };
    case GET_STORE_PENDING_VOUCHERS_SUCCESS:
      return {
        ...state,
        storePendingVouchers: {
          ...state.storePendingVouchers,
          error: null,
          loading: false,
          data: payload,
        },
      };
    default:
      return null;
  }
};
