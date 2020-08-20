import { OPEN_REPORT_SERVICE_COMMENT_MODAL } from 'constants/action-types/peerServices';

export default data => dispatch => {
  dispatch({
    type: OPEN_REPORT_SERVICE_COMMENT_MODAL,
    payload: data,
  });
};
