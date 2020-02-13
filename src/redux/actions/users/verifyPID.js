import { toast } from 'react-toastify';
import {
  VERIFY_PID_START,
  VERIFY_PID_SUCCESS,
  VERIFY_PID_ERROR,
} from 'constants/action-types/users/verifyPID';

import apiAction from 'helpers/apiAction';

export default personalId => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/UserPIDExists',
      data: {
        PID: personalId.toUpperCase(),
      },
      onStart: () => dispatch =>
        dispatch({
          type: VERIFY_PID_START,
        }),
      onSuccess: data => dispatch => {
        if (data[0].UserPIDExits === 'YES') {
          return dispatch({
            type: VERIFY_PID_ERROR,
            payload: {
              isValid: false,
              message: data[0].Messages[0].Text,
            },
          });
        }
        return dispatch({
          type: VERIFY_PID_SUCCESS,
          payload: {
            isValid: true,
            message: data[0].Description,
          },
        });
      },
      onFailure: error => dispatch => {
        toast.error('A problem occurred, please try again !');
        return dispatch({
          type: VERIFY_PID_ERROR,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );
