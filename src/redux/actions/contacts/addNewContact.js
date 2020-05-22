import { toast } from 'react-toastify';
import {
  ADD_NEW_CONTACT_ERROR,
  ADD_NEW_CONTACT_START,
  ADD_NEW_CONTACT_SUCCESS,
} from 'constants/action-types/contacts';

import apiAction from 'helpers/apiAction';

export default (contact, endpoint, type) => dispatch => {
  const removeKey = (obj, prop) => {
    const { [prop]: omit, ...res } = obj;
    return res;
  };
  return dispatch(
    apiAction({
      method: 'post',
      url: endpoint,
      data: removeKey(contact, 'contactToAdd'),
      onStart: () => dispatch =>
        dispatch({
          type: ADD_NEW_CONTACT_START,
          payload: contact,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: ADD_NEW_CONTACT_SUCCESS,
          payload: { data, endpoint, contact, type },
        });
      },
      onFailure: error => dispatch => {
        toast.error(
          error[0]
            ? global.translate(error[0].Description)
            : global.translate(error.error),
        );
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
