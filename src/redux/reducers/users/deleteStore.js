import {
  DELETE_STORE_ERROR,
  DELETE_STORE_SUCCESS,
  DELETE_STORE_START,
  CLEAR_DELETE_STORE,
} from 'constants/action-types/stores/deleteStore';

export default (state, { type, payload }) => {
  switch (type) {
    case DELETE_STORE_START:
      return {
        ...state,
        deleteStore: {
          ...state.deleteStore,
          loading: true,
          error: null,
        },
      };

    case DELETE_STORE_SUCCESS:
      return {
        ...state,
        deleteStore: {
          ...state.deleteStore,
          data: payload.data,
          loading: false,
          error: null,
        },

        myStores: {
          ...state.myStores,
          storeList: [
            ...state.myStores.storeList.filter(
              store => store.StoreID !== payload.store.StoreID,
            ),
          ],
        },
      };

    case DELETE_STORE_ERROR:
      return {
        ...state,
        deleteStore: {
          ...state.deleteStore,
          error: payload,
          loading: false,
        },
      };

    case CLEAR_DELETE_STORE:
      return {
        ...state,
        deleteStore: {
          ...state.deleteStore,
          error: null,
          data: null,
          loading: false,
        },
      };
    default:
      return null;
  }
};
