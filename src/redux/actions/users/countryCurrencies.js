import { toast } from 'react-toastify';

import {
  GET_COUNTRY_CURRENCIES_START,
  GET_COUNTRY_CURRENCIES_SUCCESS,
  GET_COUNTRY_CURRENCIES_ERROR,
} from 'constants/action-types/users/countryCurrencies';
import apiAction from 'helpers/apiAction';
import countryCodes from 'utils/countryCodes';

export default countryCode => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetCountryCurrencies',
      data: {
        CountryCode:
          countryCodes
            .find(({ value }) => value === countryCode)
            .key.toUpperCase() || '',
      },
      onStart: () => dispatch =>
        dispatch({
          type: GET_COUNTRY_CURRENCIES_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_COUNTRY_CURRENCIES_SUCCESS,
          payload: {
            success: true,
            currencies: data,
          },
        });
      },
      onFailure: error => dispatch => {
        toast.error('A problem occurred, please try again !');
        return dispatch({
          type: GET_COUNTRY_CURRENCIES_ERROR,
          payload: {
            error: error[0],
          },
        });
      },
    }),
  );
