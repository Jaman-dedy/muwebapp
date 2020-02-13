import {
  GET_COUNTRY_CURRENCIES_START,
  GET_COUNTRY_CURRENCIES_SUCCESS,
  GET_COUNTRY_CURRENCIES_ERROR,
} from 'constants/action-types/users/countryCurrencies';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_COUNTRY_CURRENCIES_START:
      return {
        ...state,
        countryCurrencies: {
          ...state.countryCurrencies,
          loading: true,
        },
      };
    case GET_COUNTRY_CURRENCIES_ERROR:
      return {
        ...state,
        countryCurrencies: {
          ...state.countryCurrencies,
          error: payload.error,
          loading: false,
        },
      };
    case GET_COUNTRY_CURRENCIES_SUCCESS:
      return {
        ...state,
        countryCurrencies: {
          ...state.countryCurrencies,
          ...payload,
          loading: false,
        },
      };
    default:
      return null;
  }
};
