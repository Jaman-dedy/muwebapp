import initialState from 'redux/initial-states/dashboard';
import cardOperationFeesReducer from './cardOperationFees';
import addMoneyFromCreditCardReducer from './addMoneyFromCreditCard';
import addMoneyFromPayPal from './addMoneyFromPayPal';
import payPalOperationFees from './payPalOperationFees';

export default (state = initialState, action = {}) => ({
  ...state,
  ...addMoneyFromCreditCardReducer(state, action),
  ...cardOperationFeesReducer(state, action),
  ...addMoneyFromPayPal(state, action),
  ...payPalOperationFees(state, action),
});
