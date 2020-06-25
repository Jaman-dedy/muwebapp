import { UPDATE_CHAT_UNREAD_MESSAGES_COUNT_SUCCESS } from 'constants/events/chat/unReadCount';
import { SEEN } from 'constants/general';

export default (state, { type, payload }) => {
  switch (type) {
    case UPDATE_CHAT_UNREAD_MESSAGES_COUNT_SUCCESS:
      return {
        ...state,
        messages: {
          ...state.messages,
          chatThreads: {
            ...state.messages?.chatThreads,
            data: {
              ...state.messages?.chatThreads?.data,
              data: state.messages.chatThreads.data.data.map(
                (msg, index) =>
                  msg.id === payload.id
                    ? {
                        ...msg,
                        directMessage: [
                          {
                            ...state.messages.chatThreads.data.data[
                              index
                            ].directMessage[0],
                            status: SEEN,
                          },
                        ],
                        unreadMessagesCount: [{ count: 0 }],
                      }
                    : msg,
              ),
              loading: false,
            },
          },
        },
      };
    default:
      return null;
  }
};
