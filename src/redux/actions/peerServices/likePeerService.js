import {
  LIKE_SERVICE_ERROR,
  LIKE_SERVICE_START,
  LIKE_SERVICE_SUCCESS,
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
          type: LIKE_SERVICE_START,
          payload: { requestData, ...service },
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: LIKE_SERVICE_SUCCESS,
          payload: { data: data[0], requestData },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: LIKE_SERVICE_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
