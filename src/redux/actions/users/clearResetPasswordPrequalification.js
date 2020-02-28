import { RESET_PREQUALIFICATION_CLEAR } from 'constants/action-types/users/resetPasswordPrequalification';
import { RESET_PASSWORD_CLEAR } from 'constants/action-types/users/resetPassword';

export default () => dispatch =>
  dispatch({
    type: RESET_PREQUALIFICATION_CLEAR,
  }).then(
    dispatch({
      type: RESET_PASSWORD_CLEAR,
    }),
  );
