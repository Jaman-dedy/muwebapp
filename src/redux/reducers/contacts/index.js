import initialState from 'redux/initial-states/contacts';
import getAllContacts from './getAllContacts';
import locateUser from './locateUser';
import addNewContact from './addNewContact';
import getRecentActiveContacts from './getRecentActiveContacts';
import getExternalContactList from './getExternalContacts';
import deleteContact from './deleteContact';
import updateContactPicture from './updateContactPicture';
import getRecentActiveExternalContacts from './getActiveExternalContacts';
import getReferreesList from './getReferreesList';

export default (state = initialState, action = {}) => ({
  ...state,
  ...getAllContacts(state, action),
  ...locateUser(state, action),
  ...addNewContact(state, action),
  ...getRecentActiveContacts(state, action),
  ...getRecentActiveExternalContacts(state, action),
  ...getExternalContactList(state, action),
  ...deleteContact(state, action),
  ...updateContactPicture(state, action),
  ...getReferreesList(state, action),
});
