import { toast } from 'react-toastify';
import {
  VERIFY_STORE_VOUCHER_ERROR,
  VERIFY_STORE_VOUCHER_START,
  VERIFY_STORE_VOUCHER_SUCCESS,
} from 'constants/action-types/vouchers/verifyStoreVoucher';

import apiAction from 'helpers/apiAction';

export default requestData => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/VerifyVoucher',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: VERIFY_STORE_VOUCHER_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: VERIFY_STORE_VOUCHER_SUCCESS,
          payload: { data, TransactionID: requestData.TransactionID },
        });
      },
      onFailure: error => dispatch => {
        toast.error(global.translate(error?.[0].Description));
        return dispatch({
          type: VERIFY_STORE_VOUCHER_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
