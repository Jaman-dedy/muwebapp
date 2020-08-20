import { toast } from 'react-toastify';
import {
  DELETE_SERVICE_ERROR,
  DELETE_SERVICE_START,
  DELETE_SERVICE_SUCCESS,
  CLEAR_SERVICE_UPDATES,
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
          type: DELETE_SERVICE_START,
          payload: { ...requestData },
        }),
      onSuccess: data => dispatch => {
        toast.success(global.translate(data?.[0].Description));
        return dispatch({
          type: DELETE_SERVICE_SUCCESS,
          payload: { ...data[0], requestData },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: DELETE_SERVICE_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};

export const clearDeletePeerService = () => dispatch => {
  dispatch({
    type: CLEAR_SERVICE_UPDATES,
  });
};
