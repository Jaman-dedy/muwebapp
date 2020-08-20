import {
  GET_SERVICES_LIST_ERROR,
  GET_SERVICES_LIST_START,
  GET_SERVICES_LIST_SUCCESS,
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
          type: GET_SERVICES_LIST_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_SERVICES_LIST_SUCCESS,
          payload: data[0],
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_SERVICES_LIST_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
