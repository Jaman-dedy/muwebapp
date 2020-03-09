import {
  GET_SUPPLIERS_COUNTRIES_START,
  GET_SUPPLIERS_COUNTRIES_SUCCESS,
  GET_SUPPLIERS_COUNTRIES_ERROR,
} from 'constants/action-types/payBills/getSuppliersCountries';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_SUPPLIERS_COUNTRIES_START:
      return {
        ...state,
        suppliersCountries: {
          ...state.suppliersCountries,
          loading: true,
        },
      };
    case GET_SUPPLIERS_COUNTRIES_ERROR:
      return {
        ...state,
        suppliersCountries: {
          ...state.suppliersCountries,
          error: payload.error,
          loading: false,
        },
      };
    case GET_SUPPLIERS_COUNTRIES_SUCCESS:
      return {
        ...state,
        suppliersCountries: {
          ...state.suppliersCountries,
          ...payload,
          success: true,
          loading: false,
        },
      };
    default:
      return null;
  }
};
