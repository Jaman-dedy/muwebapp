import { toast } from 'react-toastify';
import {
  MOVE_FUNDS_ERROR,
  MOVE_FUNDS_START,
  MOVE_FUNDS_SUCCESS,
  CLEAR_MOVE_FUNDS_ERRORS,
} from 'constants/action-types/moneyTransfer';
import apiAction from 'helpers/apiAction';

export default (data, type = 'send-money') => dispatch => (
  callback = null,
) => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/TransferFunds2UWallet',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: MOVE_FUNDS_START,
          payload: data,
        }),
      onSuccess: data => dispatch => {
        const result = Array.isArray(data) ? data[0] : data || {};
        toast.success(result.Description);
        dispatch({
          type: MOVE_FUNDS_SUCCESS,
          payload: [{ ...result, type }],
        });
        if (callback) callback(result);
      },
      onFailure: error => dispatch => {
        const err = Array.isArray(error) ? error[0] : error || {};
        toast.error(err?.Description);
        return dispatch({
          type: MOVE_FUNDS_ERROR,
          payload: {
            ...err,
          },
        });
      },
    }),
  );
};

export const clearMoveFundsErrors = () => dispatch => {
  return dispatch({
    type: CLEAR_MOVE_FUNDS_ERRORS,
  });
};
