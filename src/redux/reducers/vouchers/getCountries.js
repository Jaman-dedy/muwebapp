import {
  GET_COUNTRIES_START,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_ERROR,
  GET_COUNTRIES_CLEAR,
} from 'constants/action-types/vouchers/countries';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_COUNTRIES_START:
      return {
        ...state,
        countries: {
          ...state.create,
          loading: true,
          error: null,
        },
      };
    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: {
          ...state.create,
          ...payload,
          loading: false,
          error: null,
          success: true,
        },
      };

    case GET_COUNTRIES_ERROR:
      return {
        ...state,
        countries: {
          ...state.create,
          loading: false,
          error: payload,
        },
      };

    case GET_COUNTRIES_CLEAR:
      return {
        ...state,
        countries: {
          ...state.create,
          loading: false,
          success: false,
        },
      };
    default:
      return null;
  }
};
