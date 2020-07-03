/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'services/socketIO';

import {
  CONNECT_USER_SUCCESS,
  RECONNECT,
  CONNECT_USER_ERROR,
} from 'constants/events/common';
import notifAction from 'redux/actions/users/notifications';
import { ON_CONTACT_DISCONNECTED } from 'constants/events/userPresence';
import * as connectUserEvent from './connectUser';

export default () => {
  const dispatch = useDispatch();
  const contactListRef = useRef([]);
  const { userData: { data, loading } = {} } = useSelector(
    ({ user }) => user,
  );

  const { allContacts: { data: allContactList } = {} } = useSelector(
    ({ contacts }) => contacts,
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
        notifAction({
          PID: data.PID,
        })(dispatch);
      });
      socketIOClient.off(CONNECT_USER_ERROR);
      socketIOClient.on(CONNECT_USER_ERROR, () => {});
    }
    return () => {
      socketIOClient.off(CONNECT_USER_SUCCESS);
      socketIOClient.off(CONNECT_USER_ERROR);
    };
  }, [data && data.PID]);

  useEffect(() => {
    if (!loading && data?.PID) {
      socketIOClient.off(RECONNECT);
      socketIOClient.on(RECONNECT, () => {
        const contactPids =
          Array.isArray(allContactList) &&
          allContactList
            .map(contact => contact.ContactPID)
            .filter(item => !!item);

        connectUserEvent.emit({
          PID: data.PID,
          Country: data.Country,
          eventsToEmitOnDisconnect: [ON_CONTACT_DISCONNECTED],
          usersToNotifyOnDisconnect: contactPids,
        });
      });
    }
    return () => {
      socketIOClient.off(RECONNECT);
    };
  }, [data?.PID]);

  useEffect(() => {
    if (!loading && data?.PID && Array.isArray(allContactList)) {
      const contactPids = allContactList
        .map(contact => contact.ContactPID)
        .filter(item => !!item);
      if (
        contactPids.length &&
        contactListRef.current.length !== contactPids.length
      ) {
        connectUserEvent.emit({
          PID: data.PID,
          Country: data.Country,
          eventsToEmitOnDisconnect: [ON_CONTACT_DISCONNECTED],
          usersToNotifyOnDisconnect: contactPids,
        });

        contactListRef.current = contactPids;
      }
    }
  }, [data?.PID, allContactList]);
};
