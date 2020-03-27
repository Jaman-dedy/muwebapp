import {
  GET_STORE_CATEGORIES_START,
  GET_STORE_CATEGORIES_SUCCESS,
  GET_STORE_CATEGORIES_ERROR,
} from 'constants/action-types/stores/getStoreCategories';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_STORE_CATEGORIES_START:
      return {
        ...state,
        storeCategories: {
          ...state.storeCategories,
          loading: true,
        },
      };
    case GET_STORE_CATEGORIES_ERROR:
      return {
        ...state,
        storeCategories: {
          ...state.storeCategories,
          error: payload.error,
          loading: false,
        },
      };
    case GET_STORE_CATEGORIES_SUCCESS:
      return {
        ...state,
        storeCategories: {
          ...state.storeCategories,
          ...payload,
          success: true,
          loading: false,
          error: null,
        },
      };
    default:
      return null;
  }
};
