import {
  DELETE_SERVICE_COMMENT_ERROR,
  DELETE_SERVICE_COMMENT_START,
  DELETE_SERVICE_COMMENT_SUCCESS,
  CLEAR_SERVICE_UPDATES,
} from 'constants/action-types/peerServices';
import apiAction from 'helpers/apiAction';

export default requestData => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/PSDeleteComment',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: DELETE_SERVICE_COMMENT_START,
          payload: requestData,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: DELETE_SERVICE_COMMENT_SUCCESS,
          payload: { ...data[0], requestData },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: DELETE_SERVICE_COMMENT_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};

export const clearDeletePeerServiceComment = () => dispatch => {
  dispatch({
    type: CLEAR_SERVICE_UPDATES,
  });
};
