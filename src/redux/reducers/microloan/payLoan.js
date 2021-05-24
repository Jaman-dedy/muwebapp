import {
  PAY_LOAN_START,
  PAY_LOAN_SUCCESS,
  PAY_LOAN_ERROR,
  CLEAR_PAY_LOAN,
} from 'constants/action-types/microloan/payLoan';

export default (state, { type, payload }) => {
  switch (type) {
    case PAY_LOAN_START:
      return {
        ...state,
        payLoan: {
          ...state.payLoan,
          loading: true,
          success: false,
          OK: '',
        },
      };
    case PAY_LOAN_ERROR:
      return {
        ...state,
        payLoan: {
          ...state.payLoan,
          error: payload,
          loading: false,
        },
      };
    case PAY_LOAN_SUCCESS:
      return {
        ...state,
        payLoan: {
          ...state.payLoan,
          data: payload,
          loading: false,
          error: null,
        },
      };
    case CLEAR_PAY_LOAN:
      return {
        ...state,
        payLoan: {
          data: null,
          loading: false,
          error: null,
          success: false,
          OK: '',
        },
      };
    default:
      return null;
  }
};
