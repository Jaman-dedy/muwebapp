import {
  CANCEL_TRANSACTION_ERROR,
  CANCEL_TRANSACTION_START,
  CANCEL_TRANSACTION_SUCCESS,
} from 'constants/action-types/transactions/cancelTransaction';

import apiAction from 'helpers/apiAction';

export default requestData => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/CancelCash',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: CANCEL_TRANSACTION_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: CANCEL_TRANSACTION_SUCCESS,
          payload: { data, securityCode: requestData.SecurityCode },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: CANCEL_TRANSACTION_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
