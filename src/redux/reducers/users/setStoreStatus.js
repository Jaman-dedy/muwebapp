import {
  SET_STORE_STATUS_ERROR,
  SET_STORE_STATUS_START,
  SET_STORE_STATUS_SUCCESS,
  CLEAR_SET_STORE_STATUS,
} from 'constants/action-types/stores/status';

export default (state, { type, payload }) => {
  switch (type) {
    case SET_STORE_STATUS_START:
      return {
        ...state,
        setStoreStatus: {
          ...state.setStoreStatus,
          loading: true,
          error: null,
        },
      };
    case SET_STORE_STATUS_ERROR:
      return {
        ...state,
        setStoreStatus: {
          ...state.setStoreStatus,
          error: payload,
          loading: false,
        },
      };
    case SET_STORE_STATUS_SUCCESS:
      return {
        ...state,
        setStoreStatus: {
          ...state.setStoreStatus,
          error: null,
          loading: false,
          data: payload.data,
        },
        myStores: {
          ...state.myStores,
          storeList: state.myStores.storeList.map(
            ({ StoreID, ...allOther }) => {
              const updatedItem = {
                Status:
                  payload.requestData.Status === 'ON' ? '1' : '2',
                StoreID: payload.requestData.StoreID,
                StatusText:
                  payload.requestData.Status === 'ON'
                    ? global.translate('Active')
                    : global.translate('Suspended'),
              };
              const merged = {
                ...allOther,
                ...updatedItem,
              };

              const newMerged = {
                StoreID,
              };
              const newMergedToKeep = {
                ...newMerged,
                ...allOther,
              };
              if (StoreID === payload.requestData.StoreID) {
                return merged;
              }

              return newMergedToKeep;
            },
          ),
        },
      };
    case CLEAR_SET_STORE_STATUS:
      return {
        ...state,
        setStoreStatus: {
          ...state.setStoreStatus,
          loading: false,
          error: null,
          data: null,
        },
      };
    default:
      return null;
  }
};
