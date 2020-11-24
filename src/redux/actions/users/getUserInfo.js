import {
  GET_USER_INFO_START,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ERROR,
} from 'constants/action-types/users/getUserInfo';
import apiAction from 'helpers/apiAction';

export default userData => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetUserData',
      data: userData,
      onStart: () => dispatch => {
        return dispatch({
          type: GET_USER_INFO_START,
        });
      },
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_USER_INFO_SUCCESS,
          payload: {
            data,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_USER_INFO_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
