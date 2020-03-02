import initialState from 'redux/initial-states/contacts';
import getAllContacts from './getAllContacts';
import locateUser from './locateUser';
import addNewContact from './addNewContact';
import getRecentActiveContacts from './getRecentActiveContacts';

export default (state = initialState, action = {}) => ({
  ...state,
  ...getAllContacts(state, action),
  ...locateUser(state, action),
  ...addNewContact(state, action),
  ...getRecentActiveContacts(state, action),
});
