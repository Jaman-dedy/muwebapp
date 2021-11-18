import { toast } from 'react-toastify';
import {
  REJECT_STORE_VOUCHER_ERROR,
  REJECT_STORE_VOUCHER_START,
  REJECT_STORE_VOUCHER_SUCCESS,
} from 'constants/action-types/vouchers/rejectStoreVoucher';

import apiAction from 'helpers/apiAction';

export default (requestData, history) => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/StoreRejectVoucher',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: REJECT_STORE_VOUCHER_START,
        }),
      onSuccess: ([data]) => dispatch => {
        toast.success(data.Description);
        history.goBack();
        return dispatch({
          type: REJECT_STORE_VOUCHER_SUCCESS,
          payload: { data, TransactionID: requestData.TransactionID },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: REJECT_STORE_VOUCHER_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
