import {
  GET_PENDING_VOUCHERS_ERROR,
  GET_PENDING_VOUCHERS_START,
  GET_PENDING_VOUCHERS_SUCCESS,
} from 'constants/action-types/transactions/getPendingVouchers';
import apiAction from 'helpers/apiAction';

export default data => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/GetPendingVoucherList',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_PENDING_VOUCHERS_START,
          payload: data,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_PENDING_VOUCHERS_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_PENDING_VOUCHERS_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
