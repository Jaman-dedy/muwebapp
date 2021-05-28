import { CLEAR_PAY_PAL_FEES_STORE } from 'constants/action-types/addMoney/getPayPalFees';
import { CLEAR_ADD_MONEY_FROM_PAYPAL_STORE } from 'constants/action-types/addMoney/addMoneyFromPayPal';

export default () => dispatch => {
  dispatch({
    type: CLEAR_PAY_PAL_FEES_STORE,
  });
  dispatch({
    type: CLEAR_ADD_MONEY_FROM_PAYPAL_STORE,
  });
};
