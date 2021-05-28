import {
  ADD_MONEY_FROM_PAYPAL_START,
  ADD_MONEY_FROM_PAYPAL_SUCCESS,
  ADD_MONEY_FROM_PAYPAL_ERROR,
  CLEAR_ADD_MONEY_FROM_PAYPAL_STORE,
} from 'constants/action-types/addMoney/addMoneyFromPayPal';

export default (state, { type, payload }) => {
  switch (type) {
    case ADD_MONEY_FROM_PAYPAL_START:
      return {
        ...state,
        addMoneyFromPayPal: {
          ...state.addMoneyFromPayPal,
          loading: true,
          success: false,
          OK: '',
          Fees: '',
          TotalAmount: '',
          Currency: '',
          Description: '',
          Result: '',
          justAdded: false,
        },
      };
    case ADD_MONEY_FROM_PAYPAL_ERROR:
      return {
        ...state,
        addMoneyFromPayPal: {
          ...state.addMoneyFromPayPal,
          error: payload,
          loading: false,
          justAdded: false,
        },
      };
    case ADD_MONEY_FROM_PAYPAL_SUCCESS:
      return {
        ...state,
        addMoneyFromPayPal: {
          ...state.addMoneyFromPayPal,
          ...payload,
          loading: false,
          error: null,
          justAdded: true,
        },
      };
    case CLEAR_ADD_MONEY_FROM_PAYPAL_STORE:
      return {
        ...state,
        addMoneyFromPayPal: {
          ...state.addMoneyFromPayPal,
          ...payload,
          loading: false,
          error: null,
          justAdded: false,
          success: false,
          OK: '',
          Fees: '',
          TotalAmount: '',
          Currency: '',
          Description: '',
          Result: '',
        },
      };
    default:
      return null;
  }
};
