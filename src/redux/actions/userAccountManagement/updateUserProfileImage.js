import { UPDATE_USER_INFO_SUCCESS } from 'constants/action-types/users/getUserInfo';

export default PictureURL => dispatch => {
  dispatch({
    type: UPDATE_USER_INFO_SUCCESS,
    payload: {
      PictureURL,
    },
  });
};
