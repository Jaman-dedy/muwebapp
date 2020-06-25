import {
  GET_BLOCKED_LIST_START,
  GET_BLOCKED_LIST_SUCCESS,
  GET_BLOCKED_LIST_ERROR,
} from 'constants/action-types/contacts';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/BlockedContactList',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_BLOCKED_LIST_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_BLOCKED_LIST_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_BLOCKED_LIST_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
