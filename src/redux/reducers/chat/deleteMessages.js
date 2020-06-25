import { DELETE_CHAT_DIRECT_MESSAGES_SUCCESS } from 'constants/events/chat/deleteMessages';
import { DELETE_CHAT_THREAD } from 'constants/events/chat/chatThreads';

export default (state, { type, payload }) => {
  switch (type) {
    case DELETE_CHAT_DIRECT_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: {
          ...state.messages,
          directMessages: state.messages.directMessages.filter(
            ({ id }) => !payload?.includes(String(id)),
          ),
        },
      };

    case DELETE_CHAT_THREAD:
      return {
        ...state,
        messages: {
          ...state.messages,
          chatThreads: {
            ...state.messages.chatThreads,
            data: {
              data: state.messages?.chatThreads?.data?.data.filter(
                lastMsg => {
                  return Number(lastMsg.id) !== Number(payload);
                },
              ),
              meta: null,
            },
          },
        },
      };

    default:
      return null;
  }
};
