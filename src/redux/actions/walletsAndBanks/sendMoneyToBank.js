import {
  SEND_MONEY_TO_BANK_FAILURE,
  SEND_MONEY_TO_BANK_START,
  SEND_MONEY_TO_BANK_SUCCESS,
  CLEAR_SEND_MONEY_TO_BANK,
} from 'constants/action-types/walletsAndBanks/bankAccounts';

import apiAction from 'helpers/apiAction';
import { toast } from 'react-toastify';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/WalletToBankAccount',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: SEND_MONEY_TO_BANK_START,
        }),
      onSuccess: data => dispatch => {
        const res = Array.isArray(data) ? data[0] : data ?? {};
        toast.success(res?.Description);
        return dispatch({
          type: SEND_MONEY_TO_BANK_SUCCESS,
          payload: {
            ...res,
            success: res.Result === 'Success',
          },
        });
      },

      onFailure: error => dispatch => {
        const err = Array.isArray(error) ? error[0] : error ?? {};
        toast.error(err.Description);
        return dispatch({
          type: SEND_MONEY_TO_BANK_FAILURE,
          payload: {
            error: err,
          },
        });
      },
    }),
  );

export const clearSendMoneyToBank = () => dispatch => {
  return dispatch({
    type: CLEAR_SEND_MONEY_TO_BANK,
  });
};
