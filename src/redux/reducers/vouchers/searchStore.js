import {
  GET_SEARCHSTORE_START,
  GET_SEARCHSTORE_SUCCESS,
  GET_SEARCHSTORE_ERROR,
  GET_SEARCHSTORE_CLEAR,
} from 'constants/action-types/vouchers/searchStore';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_SEARCHSTORE_START:
      return {
        ...state,
        searchStore: {
          ...state.searchStore,
          loading: true,
          error: null,
        },
      };
    case GET_SEARCHSTORE_SUCCESS:
      return {
        ...state,
        searchStore: {
          ...state.searchStore,
          ...payload,
          loading: false,
          error: null,
          success: true,
        },
      };

    case GET_SEARCHSTORE_ERROR:
      return {
        ...state,
        searchStore: {
          ...state.searchStore,
          loading: false,
          error: payload,
        },
      };

    case GET_SEARCHSTORE_CLEAR:
      return {
        ...state,
        searchStore: {
          ...state.searchStore,
          loading: false,
          success: false,
          data: {},
        },
      };
    default:
      return null;
  }
};
