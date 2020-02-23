import { RESET_PREQUALIFICATION_CLEAR } from 'constants/action-types/users/resetPasswordPrequalification';

export default () => dispatch =>
  dispatch({
    type: RESET_PREQUALIFICATION_CLEAR,
  });
