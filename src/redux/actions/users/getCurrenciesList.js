import {
  GET_CURRENCIES_START,
  GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_ERROR,
} from 'constants/action-types/users/getCurrencies';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetCurrenciesList',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_CURRENCIES_START,
        }),
      onSuccess: res => dispatch => {
        return dispatch({
          type: GET_CURRENCIES_SUCCESS,
          payload: {
            data: res,
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
