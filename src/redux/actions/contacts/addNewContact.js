import {
  ADD_NEW_CONTACT_ERROR,
  ADD_NEW_CONTACT_START,
  ADD_NEW_CONTACT_SUCCESS,
} from 'constants/action-types/contacts';

import apiAction from 'helpers/apiAction';

export default (contact, endpoint) => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: endpoint,
      data: contact,
      onStart: () => dispatch =>
        dispatch({
          type: ADD_NEW_CONTACT_START,
          payload: contact,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: ADD_NEW_CONTACT_SUCCESS,
          payload: { data, endpoint, contact },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: ADD_NEW_CONTACT_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
