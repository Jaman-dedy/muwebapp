import {
  LIST_STORE_AGENTS_ERROR,
  LIST_STORE_AGENTS_START,
  LIST_STORE_AGENTS_SUCCESS,
} from 'constants/action-types/stores/listStoreAgents';

export default (state, { type, payload }) => {
  switch (type) {
    case LIST_STORE_AGENTS_START:
      return {
        ...state,
        listStoreAgents: {
          ...state.listStoreAgents,
          loading: true,
          error: null,
        },
      };
    case LIST_STORE_AGENTS_ERROR:
      return {
        ...state,
        listStoreAgents: {
          ...state.listStoreAgents,
          error: payload,
          loading: false,
        },
      };
    case LIST_STORE_AGENTS_SUCCESS:
      return {
        ...state,
        listStoreAgents: {
          ...state.listStoreAgents,
          error: null,
          loading: false,
          data: payload,
        },
      };

    default:
      return null;
  }
};
