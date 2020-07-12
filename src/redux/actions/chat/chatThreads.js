import { SET_ACTIVE_CHAT_THREAD } from 'constants/action-types/chat/chatThreads';
import {
  GET_CHAT_THREADS,
  GET_CHAT_THREADS_SUCCESS,
} from 'constants/events/chat/chatThreads';

export const getChatThreadMessages = data => dispatch => {
  return dispatch({
    type: GET_CHAT_THREADS_SUCCESS,
    payload: data,
  });
};

export const setActiveChatThread = data => dispatch => {
  return dispatch({
    type: SET_ACTIVE_CHAT_THREAD,
    payload: data,
  });
};

export const getChatThreads = data => dispatch => {
  return dispatch({
    type: GET_CHAT_THREADS_SUCCESS,
    payload: data,
  });
};
export const loadChatThreads = () => dispatch => {
  return dispatch({
    type: GET_CHAT_THREADS,
  });
};
