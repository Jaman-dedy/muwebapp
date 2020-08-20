import {
  GET_MY_SERVICES_ERROR,
  GET_MY_SERVICES_START,
  GET_MY_SERVICES_SUCCESS,
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
          type: GET_MY_SERVICES_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_MY_SERVICES_SUCCESS,
          payload: data[0],
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_MY_SERVICES_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
