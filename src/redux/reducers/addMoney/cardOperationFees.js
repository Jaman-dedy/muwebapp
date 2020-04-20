import {
  GET_CARD_OPERATION_FEES_START,
  GET_CARD_OPERATION_FEES_SUCCESS,
  GET_CARD_OPERATION_FEES_ERROR,
} from 'constants/action-types/addMoney/getCardOperationFees';
import { CLEAR_CARD_OPERATION_FEES_STORE } from 'constants/action-types/addMoney/clearCardOperationFees';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_CARD_OPERATION_FEES_START:
      return {
        ...state,
        addMoneyFromCreditCard: {
          ...state.addMoneyFromCreditCard,
          loading: false,
          success: false,
          OK: '',
          Fees: '',
          TotalAmount: '',
          Currency: '',
          Description: '',
          Result: '',
        },
        cardOperationFees: {
          ...state.cardOperationFees,
          loading: true,
        },
      };
    case GET_CARD_OPERATION_FEES_ERROR:
      return {
        ...state,
        cardOperationFees: {
          ...state.cardOperationFees,
          error: payload.error,
          loading: false,
        },
      };
    case GET_CARD_OPERATION_FEES_SUCCESS:
      return {
        ...state,
        cardOperationFees: {
          ...state.cardOperationFees,
          ...payload,
          success: true,
          loading: false,
        },
      };
    case CLEAR_CARD_OPERATION_FEES_STORE:
      return {
        ...state,
        cardOperationFees: {
          ...state.cardOperationFees,
          error: null,
          loading: false,
          success: false,
          message: '',
          Fees: '',
          TotalAmount: '',
          Currency: '',
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
