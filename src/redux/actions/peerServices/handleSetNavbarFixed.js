import { TOGGLE_DESKTOP_NAVBAR_FIXED } from 'constants/action-types/peerServices';

export default data => dispatch => {
  dispatch({ type: TOGGLE_DESKTOP_NAVBAR_FIXED, payload: data });
};
