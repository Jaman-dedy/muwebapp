import { CLEAR_SAVE_USER_DATA } from 'constants/action-types/userAccountManagement/saveUserData';

export default () => dispatch => {
  dispatch({
    type: CLEAR_SAVE_USER_DATA,
  });
};
