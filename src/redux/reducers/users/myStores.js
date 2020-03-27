import {
  GET_MY_STORES_START,
  GET_MY_STORES_SUCCESS,
  GET_MY_STORES_ERROR,
} from 'constants/action-types/stores/getMyStores';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_MY_STORES_START:
      return {
        ...state,
        myStores: {
          ...state.myStores,
          loading: true,
        },
      };
    case GET_MY_STORES_ERROR:
      return {
        ...state,
        myStores: {
          ...state.myStores,
          error: payload.error,
          loading: false,
        },
      };
    case GET_MY_STORES_SUCCESS:
      return {
        ...state,
        myStores: {
          ...state.myStores,
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
