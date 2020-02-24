import { toast } from 'react-toastify';
import {
  ADD_NEW_CONTACT_ERROR,
  ADD_NEW_CONTACT_START,
  ADD_NEW_CONTACT_SUCCESS,
} from 'constants/action-types/contacts';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/AddToContact',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: ADD_NEW_CONTACT_START,
        }),
      onSuccess: data => dispatch => {
        toast.success('New contact added successfully');
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
