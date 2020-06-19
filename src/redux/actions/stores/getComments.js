import {
  GET_COMMENTS_START,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_ERROR,
} from 'constants/action-types/stores/comments';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetStoreComments',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_COMMENTS_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_COMMENTS_SUCCESS,
          payload: {
            data,
            success: data[0].Result === 'Success',
            message: data[0].Description,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_COMMENTS_ERROR,
          payload: error,
        });
      },
    }),
  );
