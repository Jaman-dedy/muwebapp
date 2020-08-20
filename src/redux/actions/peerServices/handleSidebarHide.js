import { TOGGLE_PEER_SERVICES_MOBILE_VIEW } from 'constants/action-types/peerServices';

export default data => dispatch => {
  dispatch({ type: TOGGLE_PEER_SERVICES_MOBILE_VIEW, payload: data });
};
