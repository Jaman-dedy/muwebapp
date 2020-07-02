import {
  ADD_NOTIFICATION_START,
  ADD_NOTIFICATION_ERROR,
  ADD_NOTIFICATION_SUCCESS,
} from 'constants/action-types/users/notifications';

import apiAction from 'helpers/apiAction';

const {
  REACT_APP_REAL_TIME_SERVICES_URL,
  REACT_APP_LOGIN_NAME_NOTIFICATION,
  REACT_APP_API_KEY_NOTIFICATION,
  REACT_APP_ID_NOTIFICATION,
} = process.env;

export default data => dispatch =>
  dispatch(
    apiAction({
      httpOptions: {
        url: `${REACT_APP_REAL_TIME_SERVICES_URL}/api`,
        headers: {
          LoginName: REACT_APP_LOGIN_NAME_NOTIFICATION,
          APIKey: REACT_APP_API_KEY_NOTIFICATION,
          AppID: REACT_APP_ID_NOTIFICATION,
          'rts-access-token': localStorage.rtsToken,
        },
      },
      method: 'POST',
      url: '/notifications',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: ADD_NOTIFICATION_START,
          payload: data,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: ADD_NOTIFICATION_SUCCESS,
          payload: {
            ...data,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: ADD_NOTIFICATION_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
