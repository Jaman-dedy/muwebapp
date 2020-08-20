import { OPEN_CREATE_SERVICE_MODAL } from 'constants/action-types/peerServices';

export default data => dispatch => {
  dispatch({
    type: OPEN_CREATE_SERVICE_MODAL,
    payload: data,
  });
};
