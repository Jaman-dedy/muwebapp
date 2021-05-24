import {
  CHECK_LOAN_START,
  CHECK_LOAN_SUCCESS,
  CHECK_LOAN_ERROR,
  CLEAR_CHECK_ELIGIBILITY,
} from 'constants/action-types/microloan/checkLoan';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/CheckForLoanEligibility',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: CHECK_LOAN_START,
        }),
      onSuccess: data => dispatch => {
        const result = Array.isArray(data)
          ? data[0] || {}
          : data || {};
        return dispatch({
          type: CHECK_LOAN_SUCCESS,
          payload: result,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: CHECK_LOAN_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );

export const clearCheckEligibility = () => dispatch => {
  return dispatch({
    type: CLEAR_CHECK_ELIGIBILITY,
  });
};
