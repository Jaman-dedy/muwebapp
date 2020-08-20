import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'services/socketIO';
import { CONTACT_PRESENCE_CHANGED } from 'constants/events/userPresence';
import setNewContactPresenceStatus from 'redux/actions/contacts/setNewContactPresenceStatus';
import createNotification from 'redux/actions/users/createNotification';
import { AWAY, DO_NOT_DISTURB, INVISIBLE } from 'constants/general';

export default () => {
  const dispatch = useDispatch();

  const {
    userData: { data },
  } = useSelector(state => state.user);

  useEffect(() => {
    if (data) {
      localStorage.presenceStatus = data?.PresenceStatus;
      localStorage.PID = data?.PID;
    }
  }, [data]);

  useEffect(() => {
    socketIOClient.on(CONTACT_PRESENCE_CHANGED, response => {
      const { contact, action } = response.data;

      if (
        !(
          [INVISIBLE, AWAY, DO_NOT_DISTURB].indexOf(
            localStorage.presenceStatus,
          ) > -1
        )
      ) {
        const notificationPayload = {
          PID: [contact],
          type: CONTACT_PRESENCE_CHANGED,
          data: {
            contact: localStorage.PID,
            action: {
              PresenceStatus: localStorage.presenceStatus,
            },
          },
          save: false,
        };
        if (localStorage.respondedTo !== contact) {
          localStorage.respondedTo = contact;
       //   createNotification(notificationPayload)(dispatch);
        }
      }

     // setNewContactPresenceStatus({ contact, action })(dispatch);
    });

    return () => {
      socketIOClient.off(CONTACT_PRESENCE_CHANGED);
    };
  }, []);
};
