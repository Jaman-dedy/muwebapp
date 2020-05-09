import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useSelector } from 'react-redux';

import Notifications from 'components/Notifications';
// import notifAction from 'redux/actions/users/notifications';

const NotificationsContainer = () => {
  // const dispatch = useDispatch();

  const { userData, notifications } = useSelector(
    state => state.user,
  );
  // const { data, loading } = userData;

  // useEffect(() => {
  //   if (!loading && data && Object.keys(data).length) {
  //     notifAction({ PID: data.PID })(dispatch);
  //   }
  // }, [data && data.PID]);

  return (
    <Notifications
      userData={userData}
      notifications={notifications}
    />
  );
};

export default NotificationsContainer;
