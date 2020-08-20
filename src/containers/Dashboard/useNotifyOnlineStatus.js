/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getContactList from 'redux/actions/contacts/getContactList';
import createNotification from 'redux/actions/users/createNotification';
import { CONTACT_PRESENCE_CHANGED } from 'constants/events/userPresence';
import { ONLINE } from 'constants/general';

export default () => {
  const dispatch = useDispatch();
  const contactRef = useRef([]);
  const { allContacts } = useSelector(state => state.contacts);
  const { data } = allContacts;
  const {
    userData: { data: currentUserData },
  } = useSelector(state => state.user);

  useEffect(() => {
    if (!data && currentUserData) {
      getContactList()(dispatch);
    }
  }, [currentUserData]);

  useEffect(() => {
    if (data && currentUserData?.PresenceStatus === ONLINE) {
      const notificationPayload = {
        PID: data
          .filter(item => item.ContactPID)
          .map(item => item.ContactPID),
        type: CONTACT_PRESENCE_CHANGED,
        data: {
          contact: currentUserData?.PID,
          action: {
            PresenceStatus: ONLINE,
          },
        },
        save: false,
      };
      if (contactRef.current.length !== data?.length) {
       // createNotification(notificationPayload)(dispatch);
        contactRef.current = data;
      }
    }
  }, [data]);
};
