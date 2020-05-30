import {
  MAKE_NOTIFICATIONS_SEEN_START,
  MAKE_NOTIFICATIONS_SEEN_SUCCESS,
  MAKE_NOTIFICATIONS_SEEN_ERROR,
} from 'constants/action-types/users/notifications';

import apiAction from 'helpers/apiAction';

const {
  REACT_APP_REAL_TIME_SERVICES_URL,
  REACT_APP_LOGIN_NAME_NOTIFICATION,
  REACT_APP_API_KEY_NOTIFICATION,
  REACT_APP_ID_NOTIFICATION,
} = process.env;

export default ({ IDs = [], ...rest }) => dispatch =>
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
      method: 'PUT',
      url: '/notifications',
      data: {
        IDs,
        ...rest,
      },
      onStart: () => dispatch =>
        dispatch({
          type: MAKE_NOTIFICATIONS_SEEN_START,
          payload: {
            IDs,
          },
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: MAKE_NOTIFICATIONS_SEEN_SUCCESS,
          payload: {
            ...data,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: MAKE_NOTIFICATIONS_SEEN_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
