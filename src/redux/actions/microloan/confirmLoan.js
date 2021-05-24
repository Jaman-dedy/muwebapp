import { toast } from 'react-toastify';
import {
  PAY_LOAN_CONFIRMATION_START,
  PAY_LOAN_CONFIRMATION_SUCCESS,
  PAY_LOAN_CONFIRMATION_ERROR,
  CLEAR_PAY_LOAN_CONFIRMATION,
} from 'constants/action-types/microloan/payLoanConfirmation';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/PayLoanConfirmation',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: PAY_LOAN_CONFIRMATION_START,
        }),
      onSuccess: data => dispatch => {
        const result = Array.isArray(data)
          ? data[0] || {}
          : data || {};
        if (result.Result === 'Success') {
          return dispatch({
            type: PAY_LOAN_CONFIRMATION_SUCCESS,
            payload: {
              ...result,
              success: result.Result === 'Success',
            },
          });
        }
        return dispatch({
          type: PAY_LOAN_CONFIRMATION_ERROR,
          payload: {
            ...data[0],
          },
        });
      },
      onFailure: error => dispatch => {
        const err = Array.isArray(error)
          ? error[0] || {}
          : error || {};
        toast.error(err.Description);
        return dispatch({
          type: PAY_LOAN_CONFIRMATION_ERROR,
          payload: {
            ...err,
          },
        });
      },
    }),
  );
export const clearConfirmLoan = () => dispatch => {
  return dispatch({
    type: CLEAR_PAY_LOAN_CONFIRMATION,
  });
};
