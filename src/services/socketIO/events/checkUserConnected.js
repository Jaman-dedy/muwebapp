import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  ON_CONTACT_DISCONNECTED,
  CHECK_USER_DISCONNECTED,
  CHECK_USER_PRESENCE_RESPONSE,
} from 'constants/events/userPresence';
import createNotification from 'redux/actions/users/createNotification';
import setNewContactPresenceStatus from 'redux/actions/contacts/setNewContactPresenceStatus';
import socketIOClient from '..';

export default () => {
  const countdownRef = useRef(10);
  const intervalRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    socketIOClient.on(CHECK_USER_DISCONNECTED, response => {
      const { contact } = response.data;
      const notificationPayload = {
        PID: [contact],
        type: CHECK_USER_PRESENCE_RESPONSE,
        data: {
          contact: localStorage.PID,
          action: {
            Status: 'OK',
          },
        },
        save: false,
      };
      createNotification(notificationPayload)(dispatch);
    });
    return () => {
      socketIOClient.off(CHECK_USER_DISCONNECTED);
    };
  }, []);

  useEffect(() => {
    socketIOClient.on(ON_CONTACT_DISCONNECTED, response => {
      countdownRef.current = 10;

      const userToCheck = response.PID;

      const notificationPayload = {
        PID: [userToCheck],
        type: CHECK_USER_DISCONNECTED,
        data: {
          contact: localStorage.PID,
          action: {
            PresenceStatus: localStorage.PresenceStatus,
          },
        },
        save: false,
      };

      setTimeout(() => {
        createNotification(notificationPayload)(dispatch);
        intervalRef.current = setInterval(() => {
          if (countdownRef.current === 0) {
            setNewContactPresenceStatus({
              contact: userToCheck,
              action: { PresenceStatus: '4' },
            })(dispatch);
            clearInterval(intervalRef.current);
          }
          if (countdownRef.current > 0) {
            countdownRef.current -= 1;
          }
        }, 1000);
      }, 5000);
    });

    socketIOClient.on(CHECK_USER_PRESENCE_RESPONSE, response => {
      const { contact } = response.data;
      setNewContactPresenceStatus({
        contact,
        action: { PresenceStatus: '0' },
      });
      clearInterval(intervalRef.current);
    });

    return () => {
      socketIOClient.off(ON_CONTACT_DISCONNECTED);
      socketIOClient.off(CHECK_USER_PRESENCE_RESPONSE);
    };
  }, []);
};
