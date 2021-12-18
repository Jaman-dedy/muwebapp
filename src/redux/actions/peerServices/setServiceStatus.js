import { toast } from 'react-toastify';
import {
  SET_SERVICE_STATUS_START,
  SET_SERVICE_STATUS_SUCCESS,
  SET_SERVICE_STATUS_ERROR,
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
          type: SET_SERVICE_STATUS_START,
          payload: requestData,
        }),
      onSuccess: data => dispatch => {
        toast.success(global.translate('Service updated'));
        return dispatch({
          type: SET_SERVICE_STATUS_SUCCESS,
          payload: { data, ...requestData },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: SET_SERVICE_STATUS_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
};
export const clearServiceStatus = () => dispatch =>
  dispatch({
    type: CLEAR_SERVICE_UPDATES,
  });
