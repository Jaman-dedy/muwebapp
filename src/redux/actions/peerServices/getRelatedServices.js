import {
  GET_RELATED_SERVICES_ERROR,
  GET_RELATED_SERVICES_START,
  GET_RELATED_SERVICES_SUCCESS,
} from 'constants/action-types/peerServices';
import apiAction from 'helpers/apiAction';

export default (data, service) => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/PSGetServiceList',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_RELATED_SERVICES_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_RELATED_SERVICES_SUCCESS,
          payload: { data: data[0], service },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_RELATED_SERVICES_ERROR,
          payload: {
            error: error[0],
          },
        });
      },
    }),
  );
};
