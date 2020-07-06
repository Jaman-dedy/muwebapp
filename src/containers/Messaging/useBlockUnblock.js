import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import blockUnblock, {
  clearBlockSuccess,
} from 'redux/actions/contacts/blockUnblock';
import getBlockedContactsList from 'redux/actions/contacts/getBlockedContactsList';
import getBlockedByList from 'redux/actions/contacts/getBlockedByList';
import socketIOClient from 'services/socketIO';
import { BLOCK_UNBLOCK_SUCCESS } from 'constants/action-types/contacts';
import { CONTACT_BLOCK_UPDATE } from 'constants/events/blockUnblock';
import createNotification from 'redux/actions/users/createNotification';
import { UNBLOCKED_ME, BLOCKED_ME } from 'constants/general';

export default () => {
  const dispatch = useDispatch();
  const {
    blockUnblock: blockUnblockState,
    blockedByList,
    blockedContactList,
  } = useSelector(state => state.contacts);

  const {
    userData: { data },
  } = useSelector(state => state.user);

  useEffect(() => {
    if (blockUnblockState.data) {
      const notificationPayload = {
        PID: [blockUnblockState.data?.[0]?.ContactPID],
        type: 'ContactBlockUpdate',
        data: {
          contact: data?.PID,
          action:
            blockUnblockState.data?.[0]?.Blocked === 'No'
              ? UNBLOCKED_ME
              : BLOCKED_ME,
        },
        save: false,
      };
      createNotification(notificationPayload)(dispatch);
    }
  }, [blockUnblockState.data]);

  useEffect(() => {
    if (!blockedContactList.data) {
      getBlockedContactsList()(dispatch);
    }
  }, []);

  useEffect(() => {
    if (!blockedByList.data) {
      getBlockedByList()(dispatch);
    }
  }, []);

  const isBlocked = contact =>
    blockedContactList.data &&
    blockedContactList.data
      .map(item => item.ContactPID)
      .includes(contact.ContactPID);

  const userBlockedMe = (userToCheck = '') =>
    blockedByList.data &&
    blockedByList.data
      .map(item => item.ContactPID)
      .includes(userToCheck);

  const handleBlockContactStatusChange = contact => {
    const requestData = {
      Block: isBlocked(contact) ? 'No' : 'Yes',
      ContactPID: contact.ContactPID,
    };
    blockUnblock(requestData, contact)(dispatch);
  };

  return {
    dispatch,
    blockUnblockState,
    handleBlockContactStatusChange,
    isBlocked,
    blockedContactList,
    userBlockedMe,
  };
};
