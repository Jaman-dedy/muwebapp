import { CONTACT_PRESENCE_CHANGED } from 'constants/events/userPresence';

export default response => dispatch =>
  dispatch({
    type: CONTACT_PRESENCE_CHANGED,
    payload: response,
  });
