import { CLEAR_CARD_OPERATION_FEES_STORE } from 'constants/action-types/addMoney/clearCardOperationFees';
import { CLEAR_ADD_MONEY_FROM_CREDIT_CARD_STORE } from 'constants/action-types/addMoney/addMoneyFromCreditCard';

export default () => dispatch => {
  dispatch({
    type: CLEAR_CARD_OPERATION_FEES_STORE,
  });
  dispatch({
    type: CLEAR_ADD_MONEY_FROM_CREDIT_CARD_STORE,
  });
};
