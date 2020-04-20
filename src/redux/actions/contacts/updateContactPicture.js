import {
  UPDATE_CONTACT_PICTURE_START,
  UPDATE_CONTACT_PICTURE_SUCCESS,
  UPDATE_CONTACT_PICTURE_ERROR,
} from 'constants/action-types/contacts';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/AddToExternalContact',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: UPDATE_CONTACT_PICTURE_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: UPDATE_CONTACT_PICTURE_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: UPDATE_CONTACT_PICTURE_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
