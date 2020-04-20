import {
  DELETE_CONTACT_ERROR,
  DELETE_CONTACT_START,
  DELETE_CONTACT_SUCCESS,
  CLEAR_DELETE_CONTACT,
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
          type: DELETE_CONTACT_START,
          payload: contact,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: DELETE_CONTACT_SUCCESS,
          payload: { data, endpoint, contact },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: DELETE_CONTACT_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
export const clearDeleteContact = () => dispatch => {
  dispatch({ type: CLEAR_DELETE_CONTACT });
};
