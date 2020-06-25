import { SET_ACTIVE_CHAT_THREAD } from 'constants/action-types/chat/chatThreads';
import {
  GET_CHAT_THREADS_SUCCESS,
  GET_CHAT_THREADS,
} from 'constants/events/chat/chatThreads';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_CHAT_THREADS_SUCCESS:
      return {
        ...state,
        messages: {
          ...state.messages,
          chatThreads: {
            loading: false,
            data: payload,
          },
        },
      };
    case GET_CHAT_THREADS:
      return {
        ...state,
        messages: {
          ...state.messages,
          chatThreads: {
            ...state.messages.chatThreads,
            loading: true,
          },
        },
      };

    case SET_ACTIVE_CHAT_THREAD:
      return {
        ...state,
        messages: {
          ...state.messages,
          activeLastMessageThread: payload,
        },
      };

    default:
      return null;
  }
};
