import {
  GET_BOOKMARKED_SERVICE_START,
  GET_BOOKMARKED_SERVICE_SUCCESS,
  GET_BOOKMARKED_SERVICE_ERROR,
} from 'constants/action-types/peerServices';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_BOOKMARKED_SERVICE_START:
      return {
        ...state,
        bookMarkedServices: {
          ...state.bookMarkedServices,
          loading: true,
          error: null,
        },
      };
    case GET_BOOKMARKED_SERVICE_ERROR:
      return {
        ...state,
        bookMarkedServices: {
          ...state.bookMarkedServices,
          error: payload,
          loading: false,
        },
      };
    case GET_BOOKMARKED_SERVICE_SUCCESS:
      return {
        ...state,
        bookMarkedServices: {
          ...state.bookMarkedServices,
          error: null,
          loading: false,
          data: payload,
        },
      };

    default:
      return null;
  }
};
