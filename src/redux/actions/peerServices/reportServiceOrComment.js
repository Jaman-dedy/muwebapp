import {
  REPORT_SERVICE_OR_COMMENT_START,
  REPORT_SERVICE_OR_COMMENT_SUCCESS,
  REPORT_SERVICE_OR_COMMENT_ERROR,
  CLEAR_REPORT_SERVICE_OR_COMMENT,
} from 'constants/action-types/peerServices';
import apiAction from 'helpers/apiAction';

export default data => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/ReportAbuse',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: REPORT_SERVICE_OR_COMMENT_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: REPORT_SERVICE_OR_COMMENT_SUCCESS,
          payload: data?.[0] || {},
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: REPORT_SERVICE_OR_COMMENT_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};

export const clearReportServiceOrComment = () => dispatch => {
  dispatch({
    type: CLEAR_REPORT_SERVICE_OR_COMMENT,
  });
};
