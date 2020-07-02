import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import socketIOClient from 'services/socketIO';
import { WATCH_CONTACT_PRESENCE } from 'constants/events/userPresence';

export default () => {
  const {
    allContacts: { data: contactList },
  } = useSelector(state => state.contacts);
  useEffect(() => {
    socketIOClient.emit(
      WATCH_CONTACT_PRESENCE,
      contactList && contactList.map(item => item.ContactPID),
    );
  }, [contactList]);
};
