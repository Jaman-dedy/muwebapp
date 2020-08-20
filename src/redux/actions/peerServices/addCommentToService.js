import { toast } from 'react-toastify';
import {
  ADD_COMMENT_TO_SERVICE_ERROR,
  ADD_COMMENT_TO_SERVICE_START,
  ADD_COMMENT_TO_SERVICE_SUCCESS,
} from 'constants/action-types/peerServices';
import apiAction from 'helpers/apiAction';

export default (requestData, options) => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/PSAddComment',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: ADD_COMMENT_TO_SERVICE_START,
          payload: { ...requestData, ...options },
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: ADD_COMMENT_TO_SERVICE_SUCCESS,
          payload: { data: data[0], requestData, ...options.comment },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: ADD_COMMENT_TO_SERVICE_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
