import { toast } from 'react-toastify';

import {
  GET_USER_DATA_START,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
} from 'constants/action-types/users/getUserData';
import apiAction from 'helpers/apiAction';
import changeLanguage from 'redux/actions/users/changeLanguage';

export default userData => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetUserData',
      data: userData,
      onStart: () => dispatch =>
        dispatch({
          type: GET_USER_DATA_START,
        }),
      onSuccess: data => dispatch => {
        if (Array.isArray(data) && data[0]) {
          changeLanguage(data[0].Language)(dispatch);
          dispatch({
            type: GET_USER_DATA_SUCCESS,
            payload: data[0],
          });
        }
      },
      onFailure: error => dispatch => {
        if (error && error[0] && error[0].Description) {
          toast.error(global.translate(error[0].Description));
        }
        return dispatch({
          type: GET_USER_DATA_FAILURE,
          payload: {
            error,
          },
        });
      },
    }),
  );
