import {
  GET_CURRENCIES_START,
  GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_ERROR,
} from 'constants/action-types/users/getCurrencies';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_CURRENCIES_START:
      return {
        ...state,
        currenciesList: {
          ...state.currencies,
          loading: true,
          error: null,
        },
      };
    case GET_CURRENCIES_ERROR:
      return {
        ...state,
        currenciesList: {
          ...state.currencies,
          error: payload,
          loading: false,
        },
      };
    case GET_CURRENCIES_SUCCESS:
      return {
        ...state,
        currenciesList: {
          ...state.currencies,
          error: null,
          loading: false,
          data: payload.data,
        },
      };
    default:
      return null;
  }
};
