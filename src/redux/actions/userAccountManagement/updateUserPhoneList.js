import { toast } from 'react-toastify';
import {
  UPDATE_USER_PHONE_LIST_START,
  UPDATE_USER_PHONE_LIST_SUCCESS,
  UPDATE_USER_PHONE_LIST_FAILURE,
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
          type: UPDATE_USER_PHONE_LIST_START,
        }),
      onSuccess: phones => dispatch => {
        const res = Array.isArray(phones)
          ? phones[0] || {}
          : phones || {};
        const newPhones = Array.isArray(data) ? data : null;
        const newPhone = typeof data === 'object' ? data : null;
        toast.success(res.Description);
        dispatch({
          type: UPDATE_USER_PHONE_LIST_SUCCESS,
          payload: {
            ...res,
            success: res.Result === 'Success',
            phoneNumber: newPhone?.PhoneNumber,
            Phones: newPhones,
          },
        });
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
