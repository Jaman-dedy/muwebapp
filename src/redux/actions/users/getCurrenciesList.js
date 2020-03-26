import {
  GET_CURRENCIES_START,
  GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_ERROR,
} from 'constants/action-types/users/getCurrencies';

import apiAction from 'helpers/apiAction';

export default () => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetCurrenciesList',
      onStart: () => dispatch =>
        dispatch({
          type: GET_CURRENCIES_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_CURRENCIES_SUCCESS,
          payload: {
            data,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_CURRENCIES_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
