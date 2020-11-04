import {
  DELETE_STORE_AGENTS_ERROR,
  DELETE_STORE_AGENTS_START,
  DELETE_STORE_AGENTS_SUCCESS,
} from 'constants/action-types/stores/deleteStoreAgent';

export default (state, { type, payload }) => {
  switch (type) {
    case DELETE_STORE_AGENTS_START:
      return {
        ...state,
        deleteStoreAgents: {
          ...state.deleteStoreAgents,
          loading: true,
          error: null,
        },
      };
    case DELETE_STORE_AGENTS_ERROR:
      return {
        ...state,
        deleteStoreAgents: {
          ...state.deleteStoreAgents,
          error: payload,
          loading: false,
        },
      };
    case DELETE_STORE_AGENTS_SUCCESS:
      return {
        ...state,
        deleteStoreAgents: {
          ...state.deleteStoreAgents,
          error: null,
          loading: false,
          data: payload.data,
        },

        listStoreAgents: {
          ...state.listStoreAgents,
          data: state.listStoreAgents.data.filter(
            item => item.ContactPID !== payload.data.ContactPID,
          ),
        },
      };

    default:
      return null;
  }
};
