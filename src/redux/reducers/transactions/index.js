import initialState from 'redux/initial-states/transactions';
import getWalletTransactions from './getWalletTransactions';
import getUnpaidCashList from './getUnpaidCashList';
import getAllTransactionHistory from './getAllTransactionHistory';
import cancelTransaction from './cancelTransaction';
import modifyCash from './modifyCash';
import getCashTransactions from './getCashTransactions';
import getPendingVouchers from './getPendingVouchers';
import cancelVoucher from './cancelVoucher';

export default (state = initialState, action = {}) => ({
  ...state,
  ...getWalletTransactions(state, action),
  ...getUnpaidCashList(state, action),
  ...getAllTransactionHistory(state, action),
  ...cancelTransaction(state, action),
  ...modifyCash(state, action),
  ...getCashTransactions(state, action),
  ...getPendingVouchers(state, action),
  ...cancelVoucher(state, action),
});
