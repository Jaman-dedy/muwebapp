import {
  GET_USER_CURRENCIES_START,
  GET_USER_CURRENCIES_SUCCESS,
  GET_USER_CURRENCIES_ERROR,
} from 'constants/action-types/users/getUserCurrencies';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_USER_CURRENCIES_START:
      return {
        ...state,
        currencies: {
          ...state.currencies,
          loading: true,
          error: null,
        },
      };
    case GET_USER_CURRENCIES_ERROR:
      return {
        ...state,
        currencies: {
          ...state.currencies,
          error: payload,
          loading: false,
        },
      };
    case GET_USER_CURRENCIES_SUCCESS:
      return {
        ...state,
        currencies: {
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
