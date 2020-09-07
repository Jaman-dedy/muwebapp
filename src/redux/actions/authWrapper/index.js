import {
  GET_DAILY_EVENT_START,
  GET_DAILY_EVENT_SUCCESS,
  GET_DAILY_EVENT_ERROR,
} from 'constants/action-types/authWrapper';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetEventURLs',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_DAILY_EVENT_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_DAILY_EVENT_SUCCESS,
          payload: {
            data,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_DAILY_EVENT_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
