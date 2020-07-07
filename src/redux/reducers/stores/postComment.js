import {
  POST_COMMENT_START,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_ERROR,
  POST_COMMENT_CLEAR,
} from 'constants/action-types/stores/postComment';

export default (state, { type, payload }) => {
  switch (type) {
    case POST_COMMENT_START:
      return {
        ...state,
        postComment: {
          ...state.postComment,
          loading: true,
          error: null,
        },
      };
    case POST_COMMENT_ERROR:
      return {
        ...state,
        postComment: {
          ...state.postComment,
          error: payload,
          loading: false,
        },
      };
    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        postComment: {
          ...state.postComment,
          ...payload,
          loading: false,
          error: null,
        },
      };
    case POST_COMMENT_CLEAR:
      return {
        ...state,
        postComment: {
          ...state.postComment,
          ...payload,
          loading: false,
          error: null,
          success: false,
          Comment: '',
        },
      };
    default:
      return null;
  }
};
