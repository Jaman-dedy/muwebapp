import {
  GET_STORE_PENDING_VOUCHERS_ERROR,
  GET_STORE_PENDING_VOUCHERS_START,
  GET_STORE_PENDING_VOUCHERS_SUCCESS,
} from 'constants/action-types/vouchers/getPendingVouchers';
import apiAction from 'helpers/apiAction';

export default data => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/GetStorePendingVoucher',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_STORE_PENDING_VOUCHERS_START,
          payload: data,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_STORE_PENDING_VOUCHERS_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_STORE_PENDING_VOUCHERS_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
