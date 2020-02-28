import { RESET_PASSWORD_CLEAR } from 'constants/action-types/users/resetPassword';

export default () => dispatch =>
  dispatch({
    type: RESET_PASSWORD_CLEAR,
  });
