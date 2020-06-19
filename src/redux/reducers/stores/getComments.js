import {
  GET_COMMENTS_START,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_ERROR,
  GET_COMMENTS_CLEAR,
} from 'constants/action-types/stores/comments';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_COMMENTS_START:
      return {
        ...state,
        comments: {
          ...state.create,
          loading: true,
          error: null,
        },
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: {
          ...state.create,
          ...payload,
          loading: false,
          error: null,
          success: true,
        },
      };

    case GET_COMMENTS_ERROR:
      return {
        ...state,
        comments: {
          ...state.create,
          loading: false,
          error: payload,
        },
      };

    case GET_COMMENTS_CLEAR:
      return {
        ...state,
        comments: {
          ...state.create,
          loading: false,
          success: false,
        },
      };
    default:
      return null;
  }
};
