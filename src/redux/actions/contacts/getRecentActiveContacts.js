import {
  GET_RECENT_ACTIVE_CONTACTS_ERROR,
  GET_RECENT_ACTIVE_CONTACTS_SUCCESS,
  GET_RECENT_ACTIVE_CONTACTS_START,
} from 'constants/action-types/contacts/getLastActiveContacts';

import apiAction from 'helpers/apiAction';

export default (data, endpoint) => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: endpoint,
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_RECENT_ACTIVE_CONTACTS_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_RECENT_ACTIVE_CONTACTS_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_RECENT_ACTIVE_CONTACTS_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
