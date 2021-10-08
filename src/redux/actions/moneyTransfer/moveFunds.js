import { toast } from 'react-toastify';
import {
  MOVE_FUNDS_ERROR,
  MOVE_FUNDS_START,
  MOVE_FUNDS_SUCCESS,
  CLEAR_MOVE_FUNDS_ERRORS,
} from 'constants/action-types/moneyTransfer';
import apiAction from 'helpers/apiAction';

export default (
  data,
  endpoint = '/TransferFunds2UWallet',
  type = 'send-money',
) => dispatch => (callback = null) => {
  return dispatch(
    apiAction({
      method: 'post',
      url: endpoint,
      data,
      onStart: () => dispatch =>
        dispatch({
          type: MOVE_FUNDS_START,
          payload: data,
        }),
      onSuccess: data => dispatch => {
        dispatch({
          type: MOVE_FUNDS_SUCCESS,
          payload: [{ ...data[0], type }],
        });
        if (callback) callback(data[0]);
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
