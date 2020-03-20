import initialState from 'redux/initial-states/transactions';
import getWalletTransactions from './getWalletTransactions';

export default (state = initialState, action = {}) => ({
  ...state,
  ...getWalletTransactions(state, action),
});
