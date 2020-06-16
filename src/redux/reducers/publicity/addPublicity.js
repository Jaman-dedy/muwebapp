import {
  ADD_PUBLICITY_START,
  ADD_PUBLICITY_SUCCESS,
  ADD_PUBLICITY_ERROR,
  CLEAR_ADD_PUBLICITY_STORE,
} from 'constants/action-types/publicity';

export default (state, { type, payload }) => {
  switch (type) {
    case ADD_PUBLICITY_START:
      return {
        ...state,
        addPublicity: {
          ...state.addPublicity,
          loading: true,
          error: null,
        },
      };
    case ADD_PUBLICITY_ERROR:
      return {
        ...state,
        addPublicity: {
          ...state.addPublicity,
          error: payload,
          loading: false,
        },
      };
    case ADD_PUBLICITY_SUCCESS:
      return {
        ...state,
        addPublicity: {
          ...state.addPublicity,
          ...payload,
          loading: false,
          error: null,
        },
      };
    case CLEAR_ADD_PUBLICITY_STORE:
      return {
        ...state,
        addPublicity: {
          ...state.addPublicity,
          ...payload,
          loading: false,
          error: null,
          success: false,
        },
      };

    default:
      return null;
  }
};
