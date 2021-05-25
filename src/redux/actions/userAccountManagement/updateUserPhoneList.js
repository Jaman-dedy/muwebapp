import { toast } from 'react-toastify';
import {
  UPDATE_USER_PHONE_LIST_START,
  UPDATE_USER_PHONE_LIST_SUCCESS,
  UPDATE_USER_PHONE_LIST_FAILURE,
  UPDATE_USER_PHONE_LIST,
} from 'constants/action-types/userAccountManagement/updateUserPhoneList';
import apiAction from 'helpers/apiAction';

export default ({ isDeleting, existingPhones, data }) => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/UpdateUserPhoneList',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: UPDATE_USER_PHONE_LIST_START,
        }),
      onSuccess: result => dispatch => {
        const res = Array.isArray(result)
          ? result[0] || {}
          : result || {};
        toast.success(res.Description);
        if (res.Result === 'Success') {
          dispatch({
            type: UPDATE_USER_PHONE_LIST_SUCCESS,
            payload: {
              data: {
                ...res,
              },
              Phones: isDeleting
                ? data?.Phones
                : [...existingPhones, ...data?.Phones],
            },
          });
          dispatch({
            type: UPDATE_USER_PHONE_LIST,
            payload: {
              Phones: isDeleting
                ? data?.Phones
                : [...existingPhones, ...data?.Phones],
            },
          });
        } else {
          dispatch({
            type: UPDATE_USER_PHONE_LIST_FAILURE,
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
          type: UPDATE_USER_PHONE_LIST_FAILURE,
          payload: {
            ...err,
          },
        });
      },
    }),
  );
