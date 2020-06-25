import { UPDATE_CHAT_DIRECT_MESSAGES_READ_STATUS_SUCCESS } from 'constants/action-types/chat/directMessage';
import { UPDATE_CHAT_UNREAD_MESSAGES_COUNT_SUCCESS } from 'constants/events/chat/unReadCount';

export const updateDirectMessagesReadStatus = data => dispatch => {
  return dispatch({
    type: UPDATE_CHAT_DIRECT_MESSAGES_READ_STATUS_SUCCESS,
    payload: data,
  });
};

export const updateUnReadMessagesCount = data => dispatch => {
  return dispatch({
    type: UPDATE_CHAT_UNREAD_MESSAGES_COUNT_SUCCESS,
    payload: data,
  });
};
