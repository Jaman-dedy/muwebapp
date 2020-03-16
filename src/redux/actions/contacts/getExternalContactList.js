import {
  GET_EXTERNAL_CONTACT_LIST_START,
  GET_EXTERNAL_CONTACT_LIST_SUCCESS,
  GET_EXTERNAL_CONTACT_LIST_ERROR,
} from 'constants/action-types/contacts';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetExternalContactList',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_EXTERNAL_CONTACT_LIST_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_EXTERNAL_CONTACT_LIST_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_EXTERNAL_CONTACT_LIST_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
