import {
  GET_BOOKMARKED_SERVICE_ERROR,
  GET_BOOKMARKED_SERVICE_START,
  GET_BOOKMARKED_SERVICE_SUCCESS,
} from 'constants/action-types/peerServices';
import apiAction from 'helpers/apiAction';

export default data => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/PSGetBookmarkList',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_BOOKMARKED_SERVICE_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_BOOKMARKED_SERVICE_SUCCESS,
          payload: data[0],
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_BOOKMARKED_SERVICE_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
