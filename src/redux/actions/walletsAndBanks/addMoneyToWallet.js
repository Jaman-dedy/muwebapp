import {
  ADD_MONEY_TO_WALLET_FAILURE,
  ADD_MONEY_TO_WALLET_START,
  ADD_MONEY_TO_WALLET_SUCCESS,
  CLEAR_ADD_MONEY_TO_WALLET,
} from 'constants/action-types/walletsAndBanks/bankAccounts';

import apiAction from 'helpers/apiAction';
import { toast } from 'react-toastify';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/BankAccountToWallet',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: ADD_MONEY_TO_WALLET_START,
        }),
      onSuccess: data => dispatch => {
        const res = Array.isArray(data) ? data[0] : data ?? {};
        toast.success(res?.Description);
        return dispatch({
          type: ADD_MONEY_TO_WALLET_SUCCESS,
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
          type: ADD_MONEY_TO_WALLET_FAILURE,
          payload: {
            error: err,
          },
        });
      },
    }),
  );

export const clearAddMoneyToWallet = () => dispatch => {
  return dispatch({
    type: CLEAR_ADD_MONEY_TO_WALLET,
  });
};
