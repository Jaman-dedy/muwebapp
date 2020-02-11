import { toast } from 'react-toastify';

import {
  TOGGLE_SIDEBAR,
  SET_NOTIFICATIONS,
} from 'constants/action-types/dashboard';

const toggleSidebar = dispatch => {
  return dispatch({
    type: TOGGLE_SIDEBAR,
  });
};

export default toggleSidebar;
