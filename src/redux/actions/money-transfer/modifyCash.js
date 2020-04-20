import {
  MODIFY_CASH_ERROR,
  MODIFY_CASH_START,
  MODIFY_CASH_SUCCESS,
  CLEAR_MODIFY_CASH_ERRORS,
} from 'constants/action-types/money-transfer';
import apiAction from 'helpers/apiAction';

export default requestData => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/ModifyCash',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: MODIFY_CASH_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: MODIFY_CASH_SUCCESS,
          payload: { data, requestData },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: MODIFY_CASH_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
export const clearModifyCash = () => dispatch => {
  return dispatch({
    type: CLEAR_MODIFY_CASH_ERRORS,
  });
};
