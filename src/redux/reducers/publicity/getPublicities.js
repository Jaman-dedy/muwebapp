import {
  GET_PUBLICITIES_START,
  GET_PUBLICITIES_SUCCESS,
  GET_PUBLICITIES_ERROR,
  CLEAR_GET_PUBLICITIES_STORE,
} from 'constants/action-types/publicity';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_PUBLICITIES_START:
      return {
        ...state,
        publicities: {
          ...state.publicities,
          loading: true,
          error: null,
        },
      };
    case GET_PUBLICITIES_ERROR:
      return {
        ...state,
        publicities: {
          ...state.publicities,
          error: payload,
          loading: false,
        },
      };
    case GET_PUBLICITIES_SUCCESS:
      return {
        ...state,
        publicities: {
          ...state.publicities,
          ...payload,
          loading: false,
          error: null,
        },
      };
    case CLEAR_GET_PUBLICITIES_STORE:
      return {
        ...state,
        publicities: {
          ...state.publicities,
          ...payload,
          loading: false,
          error: null,
          success: false,
          data: [],
        },
      };

    default:
      return null;
  }
};
