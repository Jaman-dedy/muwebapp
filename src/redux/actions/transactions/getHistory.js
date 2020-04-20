import {
  TRANSACTION_HISTORY_ERROR,
  TRANSACTION_HISTORY_START,
  TRANSACTION_HISTORY_SUCCESS,
} from 'constants/action-types/transactions/history';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/TransactionsHistory',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: TRANSACTION_HISTORY_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: TRANSACTION_HISTORY_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: TRANSACTION_HISTORY_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
