import {
  DELETE_NOTIFICATIONS_START,
  DELETE_NOTIFICATIONS_SUCCESS,
  DELETE_NOTIFICATIONS_ERROR,
} from 'constants/action-types/users/notifications';

import apiAction from 'helpers/apiAction';

const {
  REACT_APP_REAL_TIME_SERVICES_URL,
  REACT_APP_LOGIN_NAME_NOTIFICATION,
  REACT_APP_API_KEY_NOTIFICATION,
  REACT_APP_ID_NOTIFICATION,
} = process.env;

export default ({ IDs = [] }) => dispatch =>
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
      method: 'DELETE',
      url: '/notifications',
      data: {
        IDs,
      },
      onStart: () => dispatch =>
        dispatch({
          type: DELETE_NOTIFICATIONS_START,
          payload: {
            IDs,
          },
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: DELETE_NOTIFICATIONS_SUCCESS,
          payload: {
            ...data,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: DELETE_NOTIFICATIONS_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
