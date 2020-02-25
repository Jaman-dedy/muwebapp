import {
  GET_TRANSACTION_HISTORY_START,
  GET_TRANSACTION_HISTORY_SUCCESS,
  GET_TRANSACTION_HISTORY_ERROR,
} from 'constants/action-types/users/getTransactionHistory';
import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/TransactionsGraphData',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_TRANSACTION_HISTORY_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_TRANSACTION_HISTORY_SUCCESS,
          payload: {
            data,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_TRANSACTION_HISTORY_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
