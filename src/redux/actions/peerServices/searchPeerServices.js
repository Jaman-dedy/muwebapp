import {
  SEARCH_PEER_SERVICES_ERROR,
  SEARCH_PEER_SERVICES_START,
  SEARCH_PEER_SERVICES_SUCCESS,
} from 'constants/action-types/peerServices';
import apiAction from 'helpers/apiAction';

export default (data, options = {}) => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/PSGetServiceList',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: SEARCH_PEER_SERVICES_START,
          payload: options,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: SEARCH_PEER_SERVICES_SUCCESS,
          payload: data[0],
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: SEARCH_PEER_SERVICES_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
