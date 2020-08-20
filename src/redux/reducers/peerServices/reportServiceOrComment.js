import {
  REPORT_SERVICE_OR_COMMENT_START,
  REPORT_SERVICE_OR_COMMENT_SUCCESS,
  REPORT_SERVICE_OR_COMMENT_ERROR,
  CLEAR_REPORT_SERVICE_OR_COMMENT,
} from 'constants/action-types/peerServices';

export default (state, { type, payload }) => {
  switch (type) {
    case REPORT_SERVICE_OR_COMMENT_START:
      return {
        ...state,
        reportServiceOrComment: {
          ...state.reportServiceOrComment,
          loading: true,
          error: null,
        },
      };
    case REPORT_SERVICE_OR_COMMENT_SUCCESS:
      return {
        ...state,
        reportServiceOrComment: {
          ...state.reportServiceOrComment,
          data: payload,
          loading: false,
        },
      };
    case REPORT_SERVICE_OR_COMMENT_ERROR:
      return {
        ...state,
        reportServiceOrComment: {
          ...state.reportServiceOrComment,
          error: payload,
          loading: false,
        },
      };

    case CLEAR_REPORT_SERVICE_OR_COMMENT:
      return {
        ...state,
        reportServiceOrComment: {
          ...state.reportServiceOrComment,
          error: null,
          data: null,
          loading: false,
        },
      };

    default:
      return null;
  }
};
