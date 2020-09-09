import { useDispatch, useSelector } from 'react-redux';
import setPresenceStatus from 'redux/actions/users/setPresenceStatus';
import createNotification from 'redux/actions/users/createNotification';
import { CONTACT_PRESENCE_CHANGED } from 'constants/events/userPresence';

export default () => {
  const dispatch = useDispatch();

  const { loading } = useSelector(
    state => state.user.setPresenceStatus,
  );

  const { allContacts } = useSelector(state => state.contacts);
  const { data } = allContacts;
  const {
    userData: { data: currentUserData },
  } = useSelector(state => state.user);

  const changeUserPresence = (status = '0') => {
    const payload = { PresenceStatus: status };
    setPresenceStatus(payload)(dispatch);
    const notificationPayload = {
      PID: data?.map(item => item.ContactPID),
      type: CONTACT_PRESENCE_CHANGED,
      data: {
        contact: currentUserData?.PID,
        action: {
          PresenceStatus: status,
        },
      },
      save: false,
    };
    createNotification(notificationPayload)(dispatch);
  };
  return { loading, changeUserPresence };
};
