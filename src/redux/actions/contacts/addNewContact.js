import {
  ADD_NEW_CONTACT_ERROR,
  ADD_NEW_CONTACT_START,
  ADD_NEW_CONTACT_SUCCESS,
} from 'constants/action-types/contacts';

import apiAction from 'helpers/apiAction';

export default data => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/AddToContact',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: ADD_NEW_CONTACT_START,
          payload: data,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: ADD_NEW_CONTACT_SUCCESS,
          payload: data,
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
