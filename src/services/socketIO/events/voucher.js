/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { VOUCHER } from 'constants/events/voucher';
import socketIOClient from 'services/socketIO';
import notifAction from 'redux/actions/users/notifications';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';

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
      socketIOClient.off(VOUCHER);
      socketIOClient.on(VOUCHER, notification => {
        notifAction({ PID: data.PID })(newDispatch);
        const { message } = notification || {};

        if (!isAppDisplayedInWebView) {
          console.log('message voucher event:>> ', message);
          toast.success(global.translate(message));
        }
      });
    }
    return () => {
      socketIOClient.off(VOUCHER);
    };
  }, [data && data.PID]);
};
