import initialState from 'redux/initial-states/wallet';
import addWallet from './addWallets';
import getCurrenciesList from './getCurrenciesList';

export default (state = initialState, action = {}) => ({
  ...state,
  ...addWallet(state, action),
  ...getCurrenciesList(state, action),
});
