import { UPDATE_CHAT_DIRECT_MESSAGES_READ_STATUS_SUCCESS } from 'constants/action-types/chat/directMessage';
import { SEEN } from 'constants/general';

const getPrevState = state =>
  state.messages.chatThreads.data?.data || [];

export default (state, { type, payload }) => {
  switch (type) {
    case UPDATE_CHAT_DIRECT_MESSAGES_READ_STATUS_SUCCESS:
      return {
        ...state,
        messages: {
          ...state.messages,
          directMessages: state.messages.directMessages.map(msg => {
            if (payload?.threadId === msg?.threadId) {
              return { ...msg, status: SEEN };
            }
            return msg;
          }),
          chatThreads: {
            ...state.messages?.chatThreads,
            data: {
              data: getPrevState(state).map(thread => {
                if (thread?.threadId === payload.threadId) {
                  return {
                    ...state.messages?.chatThreads.data.data[0],
                    directMessages: [
                      {
                        ...state.messages?.chatThreads.data.data[0]
                          .directMessages[0],
                        status: SEEN,
                      },
                    ],
                  };
                }
                return thread;
              }),
            },
          },
        },
      };
    default:
      return null;
  }
};
