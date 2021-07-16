import { toast } from 'react-toastify';
import {
  APPLY_LOAN_START,
  APPLY_LOAN_SUCCESS,
  APPLY_LOAN_ERROR,
  CLEAR_APPLY_LOAN,
} from 'constants/action-types/microloan/applyLoan';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/ApplyForMicroLoan',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: APPLY_LOAN_START,
        }),
      onSuccess: data => dispatch => {
        const result = Array.isArray(data)
          ? data[0] || {}
          : data || {};
        if (result?.Description) {
          toast.success(result.Description);
        }
        return dispatch({
          type: APPLY_LOAN_SUCCESS,
          payload: {
            ...result,
            success: result.ActiveLoan === 'YES',
          },
        });
      },
      onFailure: error => dispatch => {
        toast.error(error[0].Description);
        return dispatch({
          type: APPLY_LOAN_ERROR,
          payload: {
            error: Array.isArray(error)
              ? error[0] || {}
              : error || {},
          },
        });
      },
    }),
  );

export const clearApplyLoan = () => dispatch => {
  return dispatch({
    type: CLEAR_APPLY_LOAN,
  });
};
