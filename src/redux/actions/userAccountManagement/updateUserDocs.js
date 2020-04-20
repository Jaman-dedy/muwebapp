import { UPDATE_USER_INFO_SUCCESS } from 'constants/action-types/users/getUserInfo';

export default (url, doc) => dispatch => {
  dispatch({
    type: UPDATE_USER_INFO_SUCCESS,
    payload: {
      [doc]: url,
    },
  });
};
