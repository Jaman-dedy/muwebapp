import {
  GET_PROVIDERS_START,
  GET_PROVIDERS_SUCCESS,
  GET_PROVIDERS_ERROR,
} from 'constants/action-types/providers/countries/countriesList.js';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_PROVIDERS_START:
      return {
        ...state,
        providersList: {
          ...state.providersList,
          loading: true,
          error: null,
        },
      };
    case GET_PROVIDERS_ERROR:
      return {
        ...state,
        providersList: {
          ...state.providersList,
          error: payload,
          loading: false,
        },
      };
    case GET_PROVIDERS_SUCCESS:
      return {
        ...state,
        providersList: {
          ...state.providersList,
          data: payload,
          success: true,
          loading: false,
        },
      };
    default:
      return null;
  }
};
