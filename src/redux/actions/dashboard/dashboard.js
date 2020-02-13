import { TOGGLE_SIDEBAR } from 'constants/action-types/dashboard';

const toggleSidebar = dispatch => {
  return dispatch({
    type: TOGGLE_SIDEBAR,
  });
};

export default toggleSidebar;
