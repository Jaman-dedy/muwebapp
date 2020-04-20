import {
  GET_EXTERNAL_CONTACT_TRANSACTIONS_ERROR,
  GET_EXTERNAL_CONTACT_TRANSACTIONS_START,
  GET_EXTERNAL_CONTACT_TRANSACTIONS_SUCCESS,
} from 'constants/action-types/transactions/externalContactTransactions';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetCashTransactions',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_EXTERNAL_CONTACT_TRANSACTIONS_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_EXTERNAL_CONTACT_TRANSACTIONS_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_EXTERNAL_CONTACT_TRANSACTIONS_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
