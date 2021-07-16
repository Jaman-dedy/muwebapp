import { toast } from 'react-toastify';
import {
  PAY_LOAN_START,
  PAY_LOAN_SUCCESS,
  PAY_LOAN_ERROR,
  CLEAR_PAY_LOAN,
} from 'constants/action-types/microloan/payLoan';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/PayLoan',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: PAY_LOAN_START,
        }),
      onSuccess: data => dispatch => {
        const result = Array.isArray(data)
          ? data[0] || {}
          : data || {};
        if (result.Result === 'Success') {
          if (result?.Description) {
            toast.success(result.Description);
          }
          return dispatch({
            type: PAY_LOAN_SUCCESS,
            payload: {
              ...result,
              success: result.Result === 'Success',
            },
          });
        }
        return dispatch({
          type: PAY_LOAN_ERROR,
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
          type: PAY_LOAN_ERROR,
          payload: {
            ...err,
          },
        });
      },
    }),
  );

export const clearPayLoan = () => dispatch => {
  return dispatch({
    type: CLEAR_PAY_LOAN,
  });
};
