import { ADD_WALLET_CLEAR } from 'constants/action-types/wallet/addWallet';

export default () => dispatch => {
  dispatch({ type: ADD_WALLET_CLEAR });
};
