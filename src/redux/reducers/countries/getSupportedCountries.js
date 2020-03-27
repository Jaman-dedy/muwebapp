import {
  GET_APP_COUNTRIES_ERROR,
  GET_APP_COUNTRIES_START,
  GET_APP_COUNTRIES_SUCCESS,
} from 'constants/action-types/countries';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_APP_COUNTRIES_START:
      return {
        ...state,
        supportedCountries: {
          ...state.supportedCountries,
          loading: true,
          error: null,
        },
      };
    case GET_APP_COUNTRIES_ERROR:
      return {
        ...state,
        supportedCountries: {
          ...state.supportedCountries,
          error: payload,
          loading: false,
        },
      };
    case GET_APP_COUNTRIES_SUCCESS:
      return {
        ...state,
        supportedCountries: {
          ...state.supportedCountries,
          error: null,
          loading: false,
          data: payload,
        },
      };
    default:
      return null;
  }
};
