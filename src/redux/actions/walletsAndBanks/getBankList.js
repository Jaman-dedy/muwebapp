import {
  GET_BANK_LIST_FAILURE,
  GET_BANK_LIST_START,
  GET_BANK_LIST_SUCCESS,
} from 'constants/action-types/walletsAndBanks/bankAccounts';

import apiAction from 'helpers/apiAction';

export default (data = { CountryCode: '' }) => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetBankList',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_BANK_LIST_START,
        }),
      onSuccess: data => dispatch => {
        if (Array.isArray(data) && !data[0]?.Error) {
          dispatch({
            type: GET_BANK_LIST_SUCCESS,
            payload: {
              data,
            },
          });
        } else {
          return dispatch({
            type: GET_BANK_LIST_FAILURE,
            payload: {
              error: Array.isArray(data) ? data[0] : data || {},
            },
          });
        }
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_BANK_LIST_FAILURE,
          payload: {
            error: Array.isArray(error) ? error[0] : error || {},
          },
        });
      },
    }),
  );
