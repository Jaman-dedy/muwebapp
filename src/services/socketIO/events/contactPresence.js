/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'services/socketIO';
import { CONTACT_PRESENCE_CHANGED } from 'constants/events/userPresence';
import setNewContactPresenceStatus from 'redux/actions/contacts/setNewContactPresenceStatus';
import createNotification from 'redux/actions/users/createNotification';

export default () => {
  const dispatch = useDispatch();

  const {
    userData: { data },
  } = useSelector(state => state.user);

  useEffect(() => {
    if (data) {
      localStorage.PresenceStatus = data?.PresenceStatus;
      localStorage.PID = data?.PID;
    }
  }, [data]);

  useEffect(() => {
    socketIOClient.on(CONTACT_PRESENCE_CHANGED, response => {
      const { contact, action } = response.data;

      if (['3', '1', '2'].indexOf(localStorage.PresenceStatus) > -1) {
      } else {
        const notificationPayload = {
          PID: [contact],
          type: CONTACT_PRESENCE_CHANGED,
          data: {
            contact: localStorage.PID,
            action: {
              PresenceStatus: localStorage.PresenceStatus,
            },
          },
          save: false,
        };
        if (localStorage.respondedTo !== contact) {
          localStorage.respondedTo = contact;
          createNotification(notificationPayload)(dispatch);
        }
      }

      setNewContactPresenceStatus({ contact, action })(dispatch);
    });

    return () => {
      socketIOClient.off(CONTACT_PRESENCE_CHANGED);
    };
  }, []);
};
