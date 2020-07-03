/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { CONTACT_REQUEST } from 'constants/events/contactRequest';
import socketIOClient from 'services/socketIO';
import notifAction from 'redux/actions/users/notifications';

export default () => {
  const dispatch = useDispatch();

  const { userData: { data } = {} } = useSelector(({ user }) => user);

  const newDispatch = ({ type, payload }) => {
    delete payload.onStart;
    delete payload.onFailure;
    delete payload.onEnd;
    const action = {
      type,
      payload,
    };
    return dispatch(action);
  };

  useEffect(() => {
    if (data && data.PID) {
      socketIOClient.off(CONTACT_REQUEST);
      socketIOClient.on(CONTACT_REQUEST, notification => {
        if (data) notifAction({ PID: data.PID })(newDispatch);
        const { message } = notification || {};
        toast.success(global.translate(message));
      });
    }

    return () => {
      socketIOClient.off(CONTACT_REQUEST);
    };
  }, [data && data.PID]);
};
