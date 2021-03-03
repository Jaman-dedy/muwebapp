import {
  GET_WALLET_TRANSACTIONS_ERROR,
  GET_WALLET_TRANSACTIONS_START,
  GET_WALLET_TRANSACTIONS_SUCCESS,
  CLEAR_ACCOUNT_NUMBER,
} from 'constants/action-types/transactions/wallet';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetTransactions',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_WALLET_TRANSACTIONS_START,
        }),
      onSuccess: result => dispatch => {
        return dispatch({
          type: GET_WALLET_TRANSACTIONS_SUCCESS,
          payload: { data, result },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_WALLET_TRANSACTIONS_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
export const clearAccountNumber = () => dispatch => {
  return dispatch({
    type: CLEAR_ACCOUNT_NUMBER,
  });
};
