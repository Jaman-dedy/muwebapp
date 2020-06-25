export default {
  appChat: {
    open: false,
    currentChatType: null,
    currentChatTarget: null,
    isChattingWithSingleUser: null,
  },
  messages: {
    threadLoading: false,
    threadMeta: {},
    directMessages: [],
    groupMessages: [],
    chatThreads: {
      loading: false,
      data: null,
    },
    lastIncomingMessage: null,
    activeLastMessageThread: null,
  },
};
