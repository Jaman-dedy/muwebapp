import { CLOSE_CREATE_SERVICE_MODAL } from 'constants/action-types/peerServices';

export default dispatch => {
  dispatch({
    type: CLOSE_CREATE_SERVICE_MODAL,
  });
};
