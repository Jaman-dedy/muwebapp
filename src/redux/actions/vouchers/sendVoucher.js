import {
  CREATE_VOUCHER_ERROR,
  CREATE_VOUCHER_SUCCESS,
  CREATE_VOUCHER_START,
  CLEAR_VOUCHER_ERROR,
} from 'constants/action-types/vouchers/createVoucher';
import apiAction from 'helpers/apiAction';

export default (data, endpoint = '/SendVoucher') => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: endpoint,
      data,
      onStart: () => dispatch =>
        dispatch({
          type: CREATE_VOUCHER_START,
          payload: data,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: CREATE_VOUCHER_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: CREATE_VOUCHER_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
export const clearVoucherErrors = () => dispatch => {
  return dispatch({
    type: CLEAR_VOUCHER_ERROR,
  });
};
