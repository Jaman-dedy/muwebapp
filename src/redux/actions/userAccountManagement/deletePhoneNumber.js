import { toast } from 'react-toastify';
import {
  DELETE_PHONE_START,
  DELETE_PHONE_SUCCESS,
  DELETE_PHONE_FAILURE,
  UPDATE_USER_PHONE_LIST,
  CLEAR_DELETE_PHONE,
} from 'constants/action-types/userAccountManagement/updateUserPhoneList';
import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/UpdateUserPhoneList',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: DELETE_PHONE_START,
        }),
      onSuccess: result => dispatch => {
        const res = Array.isArray(result)
          ? result[0] || {}
          : result || {};
        toast.success(res.Description);
        if (res.Result === 'Success') {
          dispatch({
            type: DELETE_PHONE_SUCCESS,
            payload: {
              data: {
                ...res,
              },
            },
          });
          dispatch({
            type: UPDATE_USER_PHONE_LIST,
            payload: {
              data: data?.Phones,
            },
          });
        } else {
          dispatch({
            type: DELETE_PHONE_FAILURE,
            payload: {
              ...res,
            },
          });
        }
      },
      onFailure: error => dispatch => {
        const err = Array.isArray(error)
          ? error[0] || {}
          : error || {};
        toast.error(err.Description);
        return dispatch({
          type: DELETE_PHONE_FAILURE,
          payload: {
            ...err,
          },
        });
      },
    }),
  );
export const clearUpdatePhoneList = dispatch =>
  dispatch({
    type: CLEAR_DELETE_PHONE,
  });
