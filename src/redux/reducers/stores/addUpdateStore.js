import {
  ADD_UPDATE_STORE_START,
  ADD_UPDATE_STORE_SUCCESS,
  ADD_UPDATE_STORE_ERROR,
  CLEAR_ADD_UPDATE_STORE_STORE,
} from 'constants/action-types/stores/addUpdateStore';

export default (state, { type, payload }) => {
  switch (type) {
    case ADD_UPDATE_STORE_START:
      return {
        ...state,
        addUpdateStore: {
          ...state.addUpdateStore,
          loading: true,
          error: null,
        },
      };
    case ADD_UPDATE_STORE_ERROR:
      return {
        ...state,
        addUpdateStore: {
          ...state.addUpdateStore,
          error: payload,
          loading: false,
        },
      };
    case ADD_UPDATE_STORE_SUCCESS:
      return {
        ...state,
        addUpdateStore: {
          ...state.addUpdateStore,
          ...payload,
          loading: false,
          error: null,
        },
      };
    case CLEAR_ADD_UPDATE_STORE_STORE:
      return {
        ...state,
        addUpdateStore: {
          ...state.addUpdateStore,
          ...payload,
          loading: false,
          error: null,
          success: false,
          OK: '',
          Description: '',
          StoreID: '',
          Result: '',
        },
      };

    default:
      return null;
  }
};
