import { SET_PEER_SERVICE } from 'constants/action-types/peerServices';

export default data => dispatch => {
  dispatch({
    type: SET_PEER_SERVICE,
    payload: data,
  });
};
