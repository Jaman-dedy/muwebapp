import {
  EDIT_CREDIT_CARD_START,
  EDIT_CREDIT_CARD_SUCCESS,
  EDIT_CREDIT_CARD_ERROR,
  CLEAR_EDIT_CREDIT_CARD,
} from 'constants/action-types/credit-card/editCreditCard';

export default (state, { type, payload }) => {
  switch (type) {
    case EDIT_CREDIT_CARD_START:
      return {
        ...state,
        changeCreditCardPin: {
          ...state.changeCreditCardPin,
          loading: true,
          success: false,
          OK: '',
        },
      };
    case EDIT_CREDIT_CARD_ERROR:
      return {
        ...state,
        changeCreditCardPin: {
          ...state.changeCreditCardPin,
          error: payload,
          loading: false,
        },
      };
    case EDIT_CREDIT_CARD_SUCCESS:
      return {
        ...state,
        changeCreditCardPin: {
          ...state.changeCreditCardPin,
          data: payload,
          loading: false,
          error: null,
        },
      };
    case CLEAR_EDIT_CREDIT_CARD:
      return {
        ...state,
        changeCreditCardPin: {
          ...state.changeCreditCardPin,
          ...payload,
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
