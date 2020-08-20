import {
  GET_SERVICE_ERROR,
  GET_SERVICE_START,
  GET_SERVICE_SUCCESS,
} from 'constants/action-types/peerServices';
import apiAction from 'helpers/apiAction';

export default data => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/PSGetServiceList',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_SERVICE_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_SERVICE_SUCCESS,
          payload: data[0],
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_SERVICE_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
