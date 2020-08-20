import initialState from 'redux/initial-states/money-transfer';
import confirmTransaction from './confirmTransaction';
import moveFundsToWallet from './moveFundsToWallet';
import transferToOthers from './transferToOthers';

export default (state = initialState, action = {}) => ({
  ...state,
  ...confirmTransaction(state, action),
  ...moveFundsToWallet(state, action),
  ...transferToOthers(state, action),
});
