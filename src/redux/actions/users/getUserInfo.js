import {
  GET_USER_INFO_START,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ERROR,
} from 'constants/action-types/users/getUserInfo';
import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetUserData',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_USER_INFO_START,
        }),
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
