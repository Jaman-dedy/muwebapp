import {
  RECENT_STORES_ERROR,
  RECENT_STORES_START,
  RECENT_STORES_SUCCESS,
} from 'constants/action-types/transactions/recentStores';

export default (state, { type, payload }) => {
  switch (type) {
    case RECENT_STORES_START:
      return {
        ...state,
        recentStores: {
          ...state.recentStores,
          loading: true,
          error: null,
        },
      };
    case RECENT_STORES_ERROR:
      return {
        ...state,
        recentStores: {
          ...state.recentStores,
          error: payload,
          loading: false,
        },
      };
    case RECENT_STORES_SUCCESS:
      return {
        ...state,
        recentStores: {
          ...state.recentStores,
          error: null,
          loading: false,
          data: payload,
        },
      };
    default:
      return null;
  }
};
