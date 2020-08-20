import {
  GET_SERVICE_CATEGORIES_ERROR,
  GET_SERVICE_CATEGORIES_START,
  GET_SERVICE_CATEGORIES_SUCCESS,
} from 'constants/action-types/peerServices';
import apiAction from 'helpers/apiAction';

export default data => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/PSGetCategories',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_SERVICE_CATEGORIES_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_SERVICE_CATEGORIES_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_SERVICE_CATEGORIES_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
