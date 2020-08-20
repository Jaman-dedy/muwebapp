import {
  ADD_DIRECT_MESSAGE,
  DELETE_DIRECT_MESSAGE,
  CLEAR_CHAT_DIRECT_MESSAGES,
  NEW_INCOMING_MESSAGE_ADDED,
} from 'constants/action-types/chat/directMessage';
import {
  GET_CHAT_DIRECT_MESSAGES_SUCCESS,
  GET_CHAT_DIRECT_MESSAGES,
} from 'constants/events/chat/directMessages';
import { SENDING, SENT } from 'constants/general';
import removeDuplicatesBy from 'utils/removeDuplicatesBy';

const recentExists = (list, itemKey) =>
  list?.some(
    item => item.receiver === itemKey || item.sender === itemKey,
  );

const getSeenStatus = payload => (payload.id ? SENT : SENDING);

export default (state, { type, payload }) => {
  switch (type) {
    case GET_CHAT_DIRECT_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: {
          ...state.messages,
          threadLoading: false,
          threadMeta: payload.meta,
          directMessages: removeDuplicatesBy(x => x.id, [
            ...payload.data,
            ...state.messages.directMessages,
          ]),
          chatThreads: {
            ...state.messages?.chatThreads,
            loading: false,
          },
        },
      };
    case GET_CHAT_DIRECT_MESSAGES:
      return {
        ...state,
        messages: {
          ...state.messages,
          threadLoading: true,
        },
      };
    case ADD_DIRECT_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          directMessages:
            payload.id && payload.currentAuthUser
              ? state.messages.directMessages.map(msg =>
                  msg.messageId === payload.messageId ? payload : msg,
                )
              : [...state.messages.directMessages, payload],

          chatThreads: {
            ...state.messages?.chatThreads,
            loading: false,
            data: {
              data: recentExists(
                state.messages.chatThreads.data?.data,
                payload.receiver,
              )
                ? state.messages.chatThreads.data?.data.map(
                    (thread, index) => {
                      if (payload.threadId === thread.id) {
                        return {
                          ...state.messages.chatThreads.data?.data[
                            index
                          ],
                          createdAt: payload.createdAt,
                          updatedAt: payload.updatedAt,
                          directMessages: [
                            {
                              id: payload.id,
                              body: payload.body,
                              status: getSeenStatus(payload),
                            },
                          ],
                        };
                      }
                      return thread;
                    },
                  )
                : [
                    {
                      ...payload,
                      directMessages: [
                        { body: payload.body, status: SENDING },
                      ],
                    },
                    ...state.messages.chatThreads.data?.data,
                  ],
            },
          },
        },
      };
    case DELETE_DIRECT_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          directMessages: state.messages.directMessages.filter(
            msg => msg.id !== payload.id,
          ),
        },
      };

    case CLEAR_CHAT_DIRECT_MESSAGES:
      return {
        ...state,
        messages: {
          ...state.messages,
          directMessages: [],
        },
      };

    case NEW_INCOMING_MESSAGE_ADDED: {
      return {
        messages: {
          ...state.messages,
          lastIncomingMessage: payload,
        },
      };
    }

    default:
      return null;
  }
};
