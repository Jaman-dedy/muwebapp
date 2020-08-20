import {
  CREATE_SERVICE_ERROR,
  CREATE_SERVICE_START,
  CREATE_SERVICE_SUCCESS,
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
          type: CREATE_SERVICE_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: CREATE_SERVICE_SUCCESS,
          payload: { data, requestData },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: CREATE_SERVICE_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
export const uploadPeerServicesMediaStart = () => dispatch => {
  dispatch({
    type: CREATE_SERVICE_START,
  });
};
