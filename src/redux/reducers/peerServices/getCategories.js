import {
  GET_SERVICE_CATEGORIES_START,
  GET_SERVICE_CATEGORIES_SUCCESS,
  GET_SERVICE_CATEGORIES_ERROR,
} from 'constants/action-types/peerServices';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_SERVICE_CATEGORIES_START:
      return {
        ...state,
        categories: {
          ...state.categories,
          loading: true,
          error: null,
        },
      };
    case GET_SERVICE_CATEGORIES_ERROR:
      return {
        ...state,
        categories: {
          ...state.categories,
          error: payload,
          loading: false,
        },
      };
    case GET_SERVICE_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: {
          ...state.categories,
          error: null,
          loading: false,
          data: payload,
        },
      };

    default:
      return null;
  }
};
