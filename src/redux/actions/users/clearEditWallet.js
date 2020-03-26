import { EDIT_WALLET_CLEAR } from 'constants/action-types/users/editWallet';

export default () => dispatch => {
  dispatch({ type: EDIT_WALLET_CLEAR });
};
