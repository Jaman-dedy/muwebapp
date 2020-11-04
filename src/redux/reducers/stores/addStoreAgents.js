import {
  ADD_STORE_AGENTS_ERROR,
  ADD_STORE_AGENTS_START,
  ADD_STORE_AGENTS_SUCCESS,
} from 'constants/action-types/stores/addStoreAgents';

export default (state, { type, payload }) => {
  switch (type) {
    case ADD_STORE_AGENTS_START:
      return {
        ...state,
        addStoreAgents: {
          ...state.addStoreAgents,
          loading: true,
          error: null,
        },
      };
    case ADD_STORE_AGENTS_ERROR:
      return {
        ...state,
        addStoreAgents: {
          ...state.addStoreAgents,
          error: payload,
          loading: false,
        },
      };
    case ADD_STORE_AGENTS_SUCCESS:
      return {
        ...state,
        addStoreAgents: {
          ...state.addStoreAgents,
          error: null,
          loading: false,
          data: payload.data,
        },

        listStoreAgents: {
          ...state.listStoreAgents,
          data: [...state.listStoreAgents.data, payload.data],
        },
      };

    default:
      return null;
  }
};
