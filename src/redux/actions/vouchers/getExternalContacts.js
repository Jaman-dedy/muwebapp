import {
  GET_EXTERNAL_CONTACTS_START,
  GET_EXTERNAL_CONTACTS_SUCCESS,
  GET_EXTERNAL_CONTACTS_ERROR,
} from 'constants/action-types/vouchers/externalContacts';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetExternalContactList',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_EXTERNAL_CONTACTS_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_EXTERNAL_CONTACTS_SUCCESS,
          payload: {
            data,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_EXTERNAL_CONTACTS_ERROR,
          payload: error,
        });
      },
    }),
  );
