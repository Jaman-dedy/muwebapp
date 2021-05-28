import {
  GET_PAY_PAL_FEES_START,
  GET_PAY_PAL_FEES_SUCCESS,
  GET_PAY_PAL_FEES_ERROR,
  CLEAR_PAY_PAL_FEES_STORE,
} from 'constants/action-types/addMoney/getPayPalFees';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_PAY_PAL_FEES_START:
      return {
        ...state,
        addMoneyFromPayPal: {
          ...state.addMoneyFromPayPal,
          loading: false,
          success: false,
          OK: '',
          Fees: '',
          TotalAmount: '',
          Currency: '',
          Description: '',
          Result: '',
        },
        payPalOperationFees: {
          ...state.payPalOperationFees,
          loading: true,
        },
      };
    case GET_PAY_PAL_FEES_ERROR:
      return {
        ...state,
        payPalOperationFees: {
          ...state.payPalOperationFees,
          error: payload.error,
          loading: false,
        },
      };
    case GET_PAY_PAL_FEES_SUCCESS:
      return {
        ...state,
        payPalOperationFees: {
          ...state.payPalOperationFees,
          ...payload,
          success: true,
          loading: false,
        },
      };
    case CLEAR_PAY_PAL_FEES_STORE:
      return {
        ...state,
        payPalOperationFees: {
          ...state.payPalOperationFees,
          error: null,
          loading: false,
          success: false,
          message: '',
          Fees: '',
          TotalAmount: '',
          AddMoneyCurrency: '',
          AddMoneyFlatFee: '',
          AddMoneyExternalRate: '',
          OK: '',
          Description: '',
          Warning: '',
          Result: '',
        },
      };
    default:
      return null;
  }
};
