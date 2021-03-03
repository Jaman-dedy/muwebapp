import {
  GET_UNPAID_CASH_LIST_ERROR,
  GET_UNPAID_CASH_LIST_START,
  GET_UNPAID_CASH_LIST_SUCCESS,
} from 'constants/action-types/transactions/getUnpaidCashList';
import apiAction from 'helpers/apiAction';

export default data => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/GetUnpaidCashList',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_UNPAID_CASH_LIST_START,
          payload: data,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_UNPAID_CASH_LIST_SUCCESS,
          payload: data[0]?.Reference ? data : [],
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_UNPAID_CASH_LIST_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
