import {
  PAY_LOAN_CONFIRMATION_START,
  PAY_LOAN_CONFIRMATION_SUCCESS,
  PAY_LOAN_CONFIRMATION_ERROR,
  CLEAR_PAY_LOAN_CONFIRMATION,
} from 'constants/action-types/microloan/payLoanConfirmation';

export default (state, { type, payload }) => {
  switch (type) {
    case PAY_LOAN_CONFIRMATION_START:
      return {
        ...state,
        confirmLoan: {
          ...state.confirmLoan,
          loading: true,
          success: false,
          OK: '',
        },
      };
    case PAY_LOAN_CONFIRMATION_ERROR:
      return {
        ...state,
        confirmLoan: {
          ...state.confirmLoan,
          error: payload,
          loading: false,
        },
      };
    case PAY_LOAN_CONFIRMATION_SUCCESS:
      return {
        ...state,
        confirmLoan: {
          ...state.confirmLoan,
          data: payload,
          loading: false,
          error: null,
        },
      };
    case CLEAR_PAY_LOAN_CONFIRMATION:
      return {
        ...state,
        confirmLoan: {
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
