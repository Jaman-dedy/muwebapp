import { SET_CURRENT_CONTACT } from 'constants/action-types/contacts';

export default contact => dispatch => {
  return dispatch({
    type: SET_CURRENT_CONTACT,
    payload: contact,
  });
};
