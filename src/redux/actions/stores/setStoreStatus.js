import {
  SET_STORE_STATUS_START,
  SET_STORE_STATUS_SUCCESS,
  SET_STORE_STATUS_ERROR,
  CLEAR_SET_STORE_STATUS,
} from 'constants/action-types/stores/status';
import apiAction from 'helpers/apiAction';

export default requestData => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/SetStoreStatus',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: SET_STORE_STATUS_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: SET_STORE_STATUS_SUCCESS,
          payload: { data, requestData },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: SET_STORE_STATUS_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
};
export const clearStoreStatus = () => dispatch =>
  dispatch({
    type: CLEAR_SET_STORE_STATUS,
  });
