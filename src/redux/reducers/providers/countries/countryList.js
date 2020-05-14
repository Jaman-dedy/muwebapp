import {
    GET_COUNTRY_LIST_START,
     GET_COUNTRY_LIST_SUCCESS,
     GET_COUNTRY_LIST_ERROR,
  } from 'constants/action-types/providers/countries/countriesList.js';
  
  export default (state, { type, payload }) => {
    switch (type) {
      case  GET_COUNTRY_LIST_START:
        return {
          ...state,
          providersCountries: {
            ...state.providersCountries,
            loading: true,
          },
        };
      case  GET_COUNTRY_LIST_ERROR:
        return {
          ...state,
          providersCountries: {
            ...state.providersCountries,
            error: payload.error,
            loading: false,
          },
        };
      case  GET_COUNTRY_LIST_SUCCESS:
        return {
          ...state,
          providersCountries: {
            ...state.providersCountries,
            ...payload,
            success: true,
            loading: false,
          },
        };
      default:
        return null;
    }
  };
  