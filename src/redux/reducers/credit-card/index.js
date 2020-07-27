import initialState from 'redux/initial-states/creditCard';
import getOptions from './getOptions';
import createCreditCard from './createCreditCard';
import getCreditCards from './getCreditCards';
import changePinNumber from './changeCreditCardPin';

export default (state = initialState, action = {}) => ({
  ...state,
  ...getOptions(state, action),
  ...createCreditCard(state, action),
  ...getCreditCards(state, action),
  ...changePinNumber(state, action),
});
