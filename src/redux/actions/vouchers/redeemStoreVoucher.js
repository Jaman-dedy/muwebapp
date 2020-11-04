import { toast } from 'react-toastify';
import {
  REDEEM_STORE_VOUCHER_ERROR,
  REDEEM_STORE_VOUCHER_START,
  REDEEM_STORE_VOUCHER_SUCCESS,
} from 'constants/action-types/vouchers/redeemStoreVoucher';

import apiAction from 'helpers/apiAction';

export default requestData => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/RedeemVoucher',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: REDEEM_STORE_VOUCHER_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: REDEEM_STORE_VOUCHER_SUCCESS,
          payload: {
            data,
            TransactionID: requestData?.TransactionID,
          },
        });
      },
      onFailure: error => dispatch => {
        toast.error(global.translate(error?.[0]?.Description));
        return dispatch({
          type: REDEEM_STORE_VOUCHER_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
