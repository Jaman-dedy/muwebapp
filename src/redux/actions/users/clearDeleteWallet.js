import { DELETE_WALLET_CLEAR } from 'constants/action-types/users/deleteWallet';

export default () => dispatch => {
  dispatch({ type: DELETE_WALLET_CLEAR });
};
