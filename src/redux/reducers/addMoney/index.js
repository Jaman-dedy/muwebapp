import initialState from 'redux/initial-states/dashboard';
import cardOperationFeesReducer from './cardOperationFees';
import addMoneyFromCreditCardReducer from './addMoneyFromCreditCard';

export default (state = initialState, action = {}) => ({
  ...state,
  ...addMoneyFromCreditCardReducer(state, action),
  ...cardOperationFeesReducer(state, action),
});
