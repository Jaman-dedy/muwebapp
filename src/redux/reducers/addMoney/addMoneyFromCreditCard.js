import {
  ADD_MONEY_FROM_CREDIT_CARD_START,
  ADD_MONEY_FROM_CREDIT_CARD_SUCCESS,
  ADD_MONEY_FROM_CREDIT_CARD_ERROR,
  CLEAR_ADD_MONEY_FROM_CREDIT_CARD_STORE,
} from 'constants/action-types/addMoney/addMoneyFromCreditCard';

export default (state, { type, payload }) => {
  switch (type) {
    case ADD_MONEY_FROM_CREDIT_CARD_START:
      return {
        ...state,
        addMoneyFromCreditCard: {
          ...state.addMoneyFromCreditCard,
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
    case ADD_MONEY_FROM_CREDIT_CARD_ERROR:
      return {
        ...state,
        addMoneyFromCreditCard: {
          ...state.addMoneyFromCreditCard,
          error: payload,
          loading: false,
          justAdded: false,
        },
      };
    case ADD_MONEY_FROM_CREDIT_CARD_SUCCESS:
      return {
        ...state,
        addMoneyFromCreditCard: {
          ...state.addMoneyFromCreditCard,
          ...payload,
          loading: false,
          error: null,
          justAdded: true,
        },
      };
    case CLEAR_ADD_MONEY_FROM_CREDIT_CARD_STORE:
      return {
        ...state,
        addMoneyFromCreditCard: {
          ...state.addMoneyFromCreditCard,
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
