import {
  GET_USER_CURRENCIES_START,
  GET_USER_CURRENCIES_SUCCESS,
  GET_USER_CURRENCIES_ERROR,
} from 'constants/action-types/users/getUserCurrencies';
import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/UserCurrencyList',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_USER_CURRENCIES_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_USER_CURRENCIES_SUCCESS,
          payload: {
            data,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_USER_CURRENCIES_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
