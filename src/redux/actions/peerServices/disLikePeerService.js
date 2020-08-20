import {
  DISLIKE_SERVICE_ERROR,
  DISLIKE_SERVICE_START,
  DISLIKE_SERVICE_SUCCESS,
} from 'constants/action-types/peerServices';
import apiAction from 'helpers/apiAction';

export default (requestData, service) => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/PSAddComment',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: DISLIKE_SERVICE_START,
          payload: { requestData, ...service },
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: DISLIKE_SERVICE_SUCCESS,
          payload: { data: data[0], requestData },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: DISLIKE_SERVICE_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
