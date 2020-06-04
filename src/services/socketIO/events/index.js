import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import socketIOClient from 'services/socketIO';

import {
  CONNECT_USER_SUCCESS,
  RECONNECT,
  CONNECT_USER_ERROR,
} from 'constants/events/common';
import * as connectUserEvent from './connectUser';

export default () => {
  const { userData: { data, loading } = {} } = useSelector(
    ({ user }) => user,
  );

  useEffect(() => {
    if (!loading && data && Object.keys(data).length) {
      connectUserEvent.emit({
        PID: data.PID,
        Country: data.Country,
      });
      socketIOClient.off(CONNECT_USER_SUCCESS);
      socketIOClient.on(CONNECT_USER_SUCCESS, response => {
        localStorage.rtsToken = response.token;
      });
      socketIOClient.off(CONNECT_USER_ERROR);
      socketIOClient.on(CONNECT_USER_ERROR, () => {
        connectUserEvent.emit({
          PID: data.PID,
          Country: data.Country,
        });
      });
    }
    return () => {
      socketIOClient.off(CONNECT_USER_SUCCESS);
      socketIOClient.off(CONNECT_USER_ERROR);
    };
  }, [data && data.PID]);

  useEffect(() => {
    if (!loading && data && Object.keys(data).length) {
      socketIOClient.off(RECONNECT);
      socketIOClient.on(RECONNECT, () => {
        connectUserEvent.emit({
          PID: data.PID,
          Country: data.Country,
        });
      });
    }
    return () => {
      socketIOClient.off(RECONNECT);
    };
  }, [data && data.PID]);
  useEffect(() => {
    if (!loading && data && Object.keys(data).length) {
      connectUserEvent.emit({
        PID: data.PID,
        Country: data.Country,
      });
      socketIOClient.off(RECONNECT);
      socketIOClient.on(RECONNECT, () => {
        connectUserEvent.emit({
          PID: data.PID,
          Country: data.Country,
        });
      });
    }
  }, [data && data.PID]);
};
