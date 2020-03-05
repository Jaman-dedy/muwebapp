import initialState from 'redux/initial-states/wallet';
import addWallet from './addWallets';

export default (state = initialState, action = {}) => ({
  ...state,
  ...addWallet(state, action),
});
