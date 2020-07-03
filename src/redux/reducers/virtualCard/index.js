import initialState from 'redux/initial-states/virtualCard';
import getVirtualCards from './getVirtualCards';
import addVirtualCard from './addVirtualCard';
import addMoneyToVirtualCard from './addMoneyToVirtualCard';
import updateCardStatus from './updateCardStatus';
import renewVirtualCard from './renewVirtualCard';
import redeeMoney from './redeeMoney';

export default (state = initialState, action = {}) => ({
  ...state,
  ...getVirtualCards(state, action),
  ...addVirtualCard(state, action),
  ...addMoneyToVirtualCard(state, action),
  ...updateCardStatus(state, action),
  ...renewVirtualCard(state, action),
  ...redeeMoney(state, action),
});
