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

const getPrevState = state =>
  state.messages.chatThreads.data?.data || [];

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
          directMessages: [
            ...payload.data,
            ...state.messages.directMessages,
          ],
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
                getPrevState(state),
                payload.receiver,
              )
                ? getPrevState(state).map(thread => {
                    if (payload.threadId === thread.id) {
                      return {
                        ...state.messages.chatThreads.data?.data[0],
                        ...payload,
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
                  })
                : [
                    {
                      ...payload,
                      directMessages: [
                        { body: payload.body, status: SENDING },
                      ],
                    },
                    ...getPrevState(state),
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
