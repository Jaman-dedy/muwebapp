import {
  CANCEL_OTHER_TRANSACTION_ERROR,
  CANCEL_OTHER_TRANSACTION_START,
  CANCEL_OTHER_TRANSACTION_SUCCESS,
  CLEAR_CANCEL_OTHER_TRANSACTION,
} from 'constants/action-types/transactions/cancelTransaction';

import apiAction from 'helpers/apiAction';

export default requestData => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/UpdateTransferToOther',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: CANCEL_OTHER_TRANSACTION_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: CANCEL_OTHER_TRANSACTION_SUCCESS,
          payload: { data, requestData },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: CANCEL_OTHER_TRANSACTION_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
export const clearOtherTransactionSuccess = () => dispatch => {
  return dispatch({ type: CLEAR_CANCEL_OTHER_TRANSACTION });
};
