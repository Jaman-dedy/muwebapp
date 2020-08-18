import initialState from 'redux/initial-states/creditCard';
import getOptions from './getOptions';
import createCreditCard from './createCreditCard';
import getCreditCards from './getCreditCards';
import changePinNumber from './changeCreditCardPin';
import activateCreditCard from './activateCreditCard';
import enableCreditCard from './enableCreditCard';

export default (state = initialState, action = {}) => ({
  ...state,
  ...getOptions(state, action),
  ...createCreditCard(state, action),
  ...getCreditCards(state, action),
  ...changePinNumber(state, action),
  ...activateCreditCard(state, action),
  ...enableCreditCard(state, action),
});
