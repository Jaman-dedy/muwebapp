/* eslint-disable no-case-declarations */
import {
  GET_MY_STORES_START,
  GET_MY_STORES_SUCCESS,
  GET_MY_STORES_ERROR,
} from 'constants/action-types/stores/getMyStores';
import { ADD_UPDATE_STORE_SUCCESS } from 'constants/action-types/stores/addUpdateStore';

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
    case ADD_UPDATE_STORE_SUCCESS:
      return {
        ...state,
        myStores: {
          ...state.myStores,
          storeList: payload.isEditing
            ? state.myStores.storeList.map(
                ({ StoreID, ...allOther }) => {
                  const newMerged = { StoreID };
                  const newMergedToKeep = {
                    ...newMerged,
                    ...allOther,
                  };
                  if (StoreID === payload.StoreID) {
                    return payload;
                  }
                  return newMergedToKeep;
                },
              )
            : [...state.myStores.storeList, payload],
        },
      };
    default:
      return null;
  }
};
