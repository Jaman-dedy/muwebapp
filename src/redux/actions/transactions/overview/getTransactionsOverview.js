import {
  GET_TRANSACTIONS_OVERVIEW_ERROR,
  GET_TRANSACTIONS_OVERVIEW_START,
  GET_TRANSACTIONS_OVERVIEW_SUCCESS,
} from 'constants/action-types/transactions/overview';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/TransactionsHistoryLight',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_TRANSACTIONS_OVERVIEW_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_TRANSACTIONS_OVERVIEW_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_TRANSACTIONS_OVERVIEW_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
