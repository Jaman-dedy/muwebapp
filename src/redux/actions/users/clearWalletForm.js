import { ADD_WALLET_CLEAR } from 'constants/action-types/users/addWallet';

export default () => dispatch => {
  dispatch({ type: ADD_WALLET_CLEAR });
};
