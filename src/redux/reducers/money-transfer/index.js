import initialState from 'redux/initial-states/money-transfer';
import confirmTransaction from './confirmTransaction';
import moveFundsToWallet from './moveFundsToWallet';

export default (state = initialState, action = {}) => ({
  ...state,
  ...confirmTransaction(state, action),
  ...moveFundsToWallet(state, action),
});
