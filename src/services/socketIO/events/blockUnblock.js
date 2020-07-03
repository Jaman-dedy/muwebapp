/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socketIOClient from 'services/socketIO';
import { CONTACT_BLOCK_UPDATE } from 'constants/events/blockUnblock';
import { updateBlockedByList } from 'redux/actions/contacts/getBlockedByList';

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    socketIOClient.on(CONTACT_BLOCK_UPDATE, response => {
      const { contact, action } = response.data;
      updateBlockedByList({ contact, action })(dispatch);
    });

    return () => {
      socketIOClient.off(CONTACT_BLOCK_UPDATE);
    };
  }, []);
};
