import {
  GET_LINKED_BANK_ACCOUNTS_FAILURE,
  GET_LINKED_BANK_ACCOUNTS_START,
  GET_LINKED_BANK_ACCOUNTS_SUCCESS,
} from 'constants/action-types/walletsAndBanks/bankAccounts';

import apiAction from 'helpers/apiAction';

export default () => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetLinkedAccountList',

      onStart: () => dispatch =>
        dispatch({
          type: GET_LINKED_BANK_ACCOUNTS_START,
        }),
      onSuccess: data => dispatch => {
        if (
          Array.isArray(data) &&
          data[0]?.LinkedAccountFound === 'NO'
        ) {
          return dispatch({
            type: GET_LINKED_BANK_ACCOUNTS_SUCCESS,
            payload: {
              data: [],
            },
          });
        }
        dispatch({
          type: GET_LINKED_BANK_ACCOUNTS_SUCCESS,
          payload: {
            data,
          },
        });
      },

      onFailure: error => dispatch => {
        return dispatch({
          type: GET_LINKED_BANK_ACCOUNTS_FAILURE,
          payload: {
            error: Array.isArray(error) ? error[0] : error || {},
          },
        });
      },
    }),
  );
