import {
  EXECUTE_PUBLICITY_START,
  EXECUTE_PUBLICITY_SUCCESS,
  EXECUTE_PUBLICITY_ERROR,
  CLEAR_EXECUTE_PUBLICITY_STORE,
} from 'constants/action-types/publicity';

export default (state, { type, payload }) => {
  switch (type) {
    case EXECUTE_PUBLICITY_START:
      return {
        ...state,
        executePublicity: {
          ...state.executePublicity,
          loading: true,
          error: null,
        },
      };
    case EXECUTE_PUBLICITY_ERROR:
      return {
        ...state,
        executePublicity: {
          ...state.executePublicity,
          error: payload,
          loading: false,
        },
      };
    case EXECUTE_PUBLICITY_SUCCESS:
      return {
        ...state,
        executePublicity: {
          ...state.executePublicity,
          ...payload,
          loading: false,
          error: null,
        },
      };
    case CLEAR_EXECUTE_PUBLICITY_STORE:
      return {
        ...state,
        executePublicity: {
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
