import { DELETE_CHAT_DIRECT_MESSAGES_SUCCESS } from 'constants/events/chat/deleteMessages';
import { DELETE_CHAT_THREAD } from 'constants/events/chat/chatThreads';

export const deleteDirectMessages = messageIds => dispatch =>
  dispatch({
    type: DELETE_CHAT_DIRECT_MESSAGES_SUCCESS,
    payload: Array.isArray(messageIds)
      ? messageIds.map(messageIds => String(messageIds))
      : [String(messageIds)],
  });
export const deleteChatThread = data => dispatch =>
  dispatch({
    type: DELETE_CHAT_THREAD,
    payload: data,
  });
