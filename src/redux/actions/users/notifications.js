import {
  GET_NOTIFICATIONS_START,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_ERROR,
  ADD_NEW_NOTIFICATION,
} from 'constants/action-types/users/notifications';

import apiAction from 'helpers/apiAction';

const {
  REACT_APP_REAL_TIME_SERVICES_URL,
  REACT_APP_LOGIN_NAME_NOTIFICATION,
  REACT_APP_API_KEY_NOTIFICATION,
  REACT_APP_ID_NOTIFICATION,
} = process.env;

export default ({ status, page, perPage }) => dispatch =>
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
      method: 'GET',
      url: `/notifications?status=${status || ''}&page=${page ||
        ''}&perPage=${perPage || ''}`,
      onStart: () => dispatch =>
        dispatch({
          type: GET_NOTIFICATIONS_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_NOTIFICATIONS_SUCCESS,
          payload: {
            ...data,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_NOTIFICATIONS_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );

export const addNewNotification = notification => dispatch => {
  return dispatch({
    type: ADD_NEW_NOTIFICATION,
    payload: {
      ...notification,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};
