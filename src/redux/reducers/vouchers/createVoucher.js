import {
  CREATE_VOUCHER_ERROR,
  CREATE_VOUCHER_SUCCESS,
  CREATE_VOUCHER_START,
  CLEAR_VOUCHER_ERROR,
  CREATE_VOUCHER_CLEAR,
} from 'constants/action-types/vouchers/createVoucher';

export default (state, { type, payload }) => {
  switch (type) {
    case CREATE_VOUCHER_START:
      return {
        ...state,
        createVoucher: {
          ...state.createVoucher,
          loading: true,
          error: null,
        },
      };
    case CREATE_VOUCHER_ERROR:
      return {
        ...state,
        createVoucher: {
          ...state.createVoucher,
          error: payload,
          loading: false,
        },
      };
    case CREATE_VOUCHER_SUCCESS:
      return {
        ...state,
        createVoucher: {
          ...state.createVoucher,
          error: null,
          loading: false,
          data: payload,
        },
      };
    case CREATE_VOUCHER_CLEAR:
      return {
        ...state,
        createVoucher: {
          ...state.createVoucher,
          error: null,
          loading: false,
          data: null,
        },
      };

    case CLEAR_VOUCHER_ERROR: {
      return {
        ...state,
        createVoucher: {
          ...state.createVoucher,
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
      };
    }
    default:
      return null;
  }
};
