import initialState from 'redux/initial-states/contacts';
import getAllContacts from './getAllContacts';
import locateUser from './locateUser';
import addNewContact from './addNewContact';
import getRecentActiveContacts from './getRecentActiveContacts';
import getExternalContactList from './getExternalContacts';

export default (state = initialState, action = {}) => ({
  ...state,
  ...getAllContacts(state, action),
  ...locateUser(state, action),
  ...addNewContact(state, action),
  ...getRecentActiveContacts(state, action),
  ...getExternalContactList(state, action),
});
