import {
  UPDATE_SERVICE_PRICING_START,
  UPDATE_SERVICE_PRICING_SUCCESS,
  UPDATE_SERVICE_PRICING_ERROR,
} from 'constants/action-types/peerServices';
import apiAction from 'helpers/apiAction';

export default requestData => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/PSAddUpdateService',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: UPDATE_SERVICE_PRICING_START,
          payload: requestData,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: UPDATE_SERVICE_PRICING_SUCCESS,
          payload: { data: data[0], requestData },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: UPDATE_SERVICE_PRICING_ERROR,
          payload: {
            error: error[0],
          },
        });
      },
    }),
  );
};
