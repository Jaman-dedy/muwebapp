import {
  GET_ACTIVE_EXTERNAL_CONTACTS_ERROR,
  GET_ACTIVE_EXTERNAL_CONTACTS_SUCCESS,
  GET_ACTIVE_EXTERNAL_CONTACTS_START,
} from 'constants/action-types/contacts/getLastActiveContacts';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetLastTransactionExternalContacts',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_ACTIVE_EXTERNAL_CONTACTS_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_ACTIVE_EXTERNAL_CONTACTS_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_ACTIVE_EXTERNAL_CONTACTS_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
