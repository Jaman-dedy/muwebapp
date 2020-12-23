import initialState from 'redux/initial-states/creditCard';
import getOptions from './getOptions';
import createCreditCard from './createCreditCard';
import getCreditCards from './getCreditCards';
import changePinNumber from './changeCreditCardPin';
import activateCreditCard from './activateCreditCard';
import enableCreditCard from './enableCreditCard';
import deleteCreditCard from './deleteCreditCard';

export default (state = initialState, action = {}) => ({
  ...state,
  ...deleteCreditCard(state, action),
  ...getOptions(state, action),
  ...createCreditCard(state, action),
  ...getCreditCards(state, action),
  ...changePinNumber(state, action),
  ...activateCreditCard(state, action),
  ...enableCreditCard(state, action),
});
