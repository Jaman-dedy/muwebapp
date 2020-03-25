import initialState from 'redux/initial-states/transactions';
import getWalletTransactions from './getWalletTransactions';
import getUnpaidCashList from './getUnpaidCashList';

export default (state = initialState, action = {}) => ({
  ...state,
  ...getWalletTransactions(state, action),
  ...getUnpaidCashList(state, action),
});
