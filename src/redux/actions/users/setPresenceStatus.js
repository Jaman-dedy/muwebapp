import { toast } from 'react-toastify';
import {
  SET_USER_PRESENCE_STATUS_ERROR,
  SET_USER_PRESENCE_STATUS_START,
  SET_USER_PRESENCE_STATUS_SUCCESS,
} from 'constants/action-types/users/setPresenceStatus';

import apiAction from 'helpers/apiAction';

export default requestData => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/SetUserPresenceStatus',
      data: requestData,
      requireAppId: false,
      onStart: () => dispatch =>
        dispatch({
          type: SET_USER_PRESENCE_STATUS_START,
          payload: requestData,
        }),
      onSuccess: data => dispatch => {
        if (!requestData?.silent) {
          toast.success(global.translate(data[0].Description));
        }

        return dispatch({
          type: SET_USER_PRESENCE_STATUS_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: SET_USER_PRESENCE_STATUS_ERROR,
          payload: error,
        });
      },
    }),
  );
};
