import {
  GET_WALLET_TRANSACTIONS_ERROR,
  GET_WALLET_TRANSACTIONS_START,
  GET_WALLET_TRANSACTIONS_SUCCESS,
} from 'constants/action-types/transactions';

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
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_WALLET_TRANSACTIONS_SUCCESS,
          payload: data,
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
