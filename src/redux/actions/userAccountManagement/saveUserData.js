import { toast } from 'react-toastify';
import { UPDATE_USER_INFO_SUCCESS } from 'constants/action-types/users/getUserInfo';
import {
  SAVE_USER_DATA_START,
  SAVE_USER_DATA_FAILURE,
  SAVE_USER_DATA_SUCCESS,
} from 'constants/action-types/userAccountManagement/saveUserData';
import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/SaveUserData',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: SAVE_USER_DATA_START,
        }),
      onSuccess: data => dispatch => {
        dispatch({
          type: SAVE_USER_DATA_SUCCESS,
          payload: {
            ...data[0],
            success: data[0].Result === 'Success',
          },
        });
        dispatch({
          type: UPDATE_USER_INFO_SUCCESS,
          payload: {
            ...data[0],
          },
        });

        if (Array.isArray(data)) {
          toast.success(data[0].Description);
        }
      },
      onFailure: error => dispatch => {
        if (Array.isArray(error)) {
          toast.error(error?.[0].Description);
        }
        return dispatch({
          type: SAVE_USER_DATA_FAILURE,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );
