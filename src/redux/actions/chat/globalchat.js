import { SET_CURRENT_CHAT_TARGET } from 'constants/action-types/chat/globalchat';
import {
  SET_CHAT_LIST_CLOSED,
  SET_CHAT_LIST_OPEN,
} from 'constants/action-types/dashboard';

export const setGlobalChat = data => dispatch => {
  return dispatch({
    type: SET_CURRENT_CHAT_TARGET,
    payload: data,
  });
};
export const closeChatList = () => dispatch => {
  return dispatch({
    type: SET_CHAT_LIST_CLOSED,
  });
};
export const openChatList = () => dispatch => {
  return dispatch({
    type: SET_CHAT_LIST_OPEN,
  });
};
