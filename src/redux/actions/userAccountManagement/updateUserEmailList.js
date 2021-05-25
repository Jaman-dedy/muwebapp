/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from 'react-toastify';

import {
  UPDATE_USER_EMAIL_LIST_START,
  UPDATE_USER_EMAIL_LIST_SUCCESS,
  UPDATE_USER_EMAIL_LIST_FAILURE,
  UPDATE_USER_EMAIL_LIST,
} from 'constants/action-types/userAccountManagement/updateUserEmailList';
import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/UpdateUserEmailList',
      data,
      requireAppId: false,
      onStart: () => dispatch =>
        dispatch({
          type: UPDATE_USER_EMAIL_LIST_START,
        }),
      onSuccess: result => dispatch => {
        const res = Array.isArray(result)
          ? result[0] || {}
          : result || {};
        toast.success(res.Description);
        if (res.Result === 'Success') {
          dispatch({
            type: UPDATE_USER_EMAIL_LIST_SUCCESS,
            payload: {
              data: { ...res },
              newEmailList: data,
            },
          });

          dispatch({
            type: UPDATE_USER_EMAIL_LIST,
            payload: { data: data.Emails },
          });
        } else {
          dispatch({
            type: UPDATE_USER_EMAIL_LIST_FAILURE,
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
          type: UPDATE_USER_EMAIL_LIST_FAILURE,
          payload: {
            ...err,
          },
        });
      },
    }),
  );
