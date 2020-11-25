import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ONLINE,
  DELETE_FOR_ALL,
  PAGINATION_ITEMS_PER_PAGE,
  ONE_TO_ONE,
} from 'constants/general';
import {
  GET_CHAT_THREADS,
  DELETE_CHAT_THREAD,
} from 'constants/events/chat/chatThreads';
import { DELETE_CHAT_DIRECT_MESSAGES } from 'constants/events/chat/deleteMessages';
import { GET_CHAT_DIRECT_MESSAGES } from 'constants/events/chat/directMessages';
import MessagingComponent from 'components/Chat';
import { chatSocketIOClient } from 'services/socketIO';
import {
  addNewDirectMessage,
  loadDirectMessages,
} from 'redux/actions/chat/directMessage';
import { loadChatThreads } from 'redux/actions/chat/chatThreads';
import {
  deleteDirectMessages,
  deleteChatThread,
} from 'redux/actions/chat/deleteMessages';
import { setGlobalChat } from 'redux/actions/chat/globalchat';
import useFavorites from './useFavorites';
import sendMessage from './sendMessage';
import useBlockUnblock from './useBlockUnblock';
import useReceiverTyping from './useReceiverTyping';

const Messaging = ({ routeRef }) => {
  const dispatch = useDispatch();
  const chatAreaRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [formValue, setFormValue] = useState({});
  const [singleMessageAdded, setSingleMessageAdded] = useState(true);

  const [textareaHeight, setTextareaHeight] = useState(0);
  const [emojiDisplay, setEmojiDisplay] = useState('none');

  const onEmojiSelected = e => {
    setFormValue({
      ...formValue,
      body: (formValue.body || '') + e.native,
    });
  };

  const {
    currentChatType,
    currentChatTarget,
    isChattingWithSingleUser,
  } = useSelector(state => state.chat.appChat);

  const { threadMeta, activeLastMessageThread } = useSelector(
    state => state.chat.messages,
  );
  const {
    userData: { data: currentAuthUser },
  } = useSelector(state => state.user);

  const { onReceiverTyping, isReceiverTyping } = useReceiverTyping(
    currentChatTarget?.ContactPID,
  );

  const onChange = (e, { name, value }) => {
    setFormValue({ ...formValue, [name]: value });
    if (currentAuthUser.PresenceStatus === ONLINE) {
      onReceiverTyping();
    }
  };

  const scrollToBottom = () => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTo(
        0,
        chatAreaRef.current.scrollHeight,
      );
    }
  };
  const { userBlockedMe, isBlocked } = useBlockUnblock();
  const onSendMessage = ({
    body = '',
    fileType = '',
    tmpFile = '',
    rawFile = '',
    messageIndex = '',
  }) => {
    sendMessage({
      body,
      fileType,
      tmpFile,
      rawFile,
      messageIndex,
      addNewDirectMessage,
      dispatch,
      currentChatTarget,
      currentAuthUser,
      activeLastMessageThread: activeLastMessageThread?.id,
      shouldDeliver: !(
        userBlockedMe(currentChatTarget?.ContactPID) ||
        isBlocked(currentChatTarget)
      ),
    });
    setFormValue({ ...formValue, body: '' });
    setEmojiDisplay('none');
    setTextareaHeight(0);
    scrollToBottom();
  };

  const getDirectMessages = () => {
    loadDirectMessages()(dispatch);
    chatSocketIOClient.emit(
      GET_CHAT_DIRECT_MESSAGES,
      {
        receiver: currentChatTarget?.ContactPID,
        page: currentPage,
        perPage: PAGINATION_ITEMS_PER_PAGE,
      },
      localStorage.rtsToken,
    );
    setSingleMessageAdded(false);
  };

  const shouldSendMessage = () =>
    formValue.body && formValue.body.trim().length > 0;
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (shouldSendMessage()) {
        onSendMessage({ body: formValue.body });
      }

      setSingleMessageAdded(true);
    }
  };

  useEffect(() => {
    if (currentPage > 1) {
      getDirectMessages();
    }
  }, [currentPage]);

  const hasMoreItemsToLoad =
    threadMeta.page * PAGINATION_ITEMS_PER_PAGE <= threadMeta.total;

  const getCaptionFromName = name => {
    if (!name) {
      return '';
    }
    return `${name.split('.')[0].substring(0, 14)}.${
      name.split('.')[1]
    }`;
  };
  const handleSendFileMessage = files => {
    files.map((file, index) =>
      onSendMessage({
        body:
          file.caption !== ''
            ? file.caption
            : getCaptionFromName(file.file.name),
        fileType: file.file.type,
        tmpFile: file.file.preview,
        rawFile: file.file,
        messageIndex: index,
      }),
    );
  };

  useEffect(() => {
    if (currentChatTarget?.ContactPID) {
      setEmojiDisplay('none');
      setCurrentPage(1);
      getDirectMessages();
    }
  }, [currentChatTarget]);

  const fetchRecent = () => {
    chatSocketIOClient.emit(
      GET_CHAT_THREADS,
      {},
      localStorage.rtsToken,
    );

    loadChatThreads()(dispatch);
  };

  useEffect(() => {
    fetchRecent();
  }, []);

  const clearChatThread = ({ id }) => {
    deleteChatThread(id)(dispatch);
    if (id) {
      chatSocketIOClient.emit(
        DELETE_CHAT_THREAD,
        { id },
        localStorage.rtsToken,
      );
    }
  };

  const deleteMessage = useCallback(
    ({ id, receiver, deleteFor = DELETE_FOR_ALL }) => {
      if (id) {
        deleteDirectMessages([id])(dispatch);
        chatSocketIOClient.emit(
          DELETE_CHAT_DIRECT_MESSAGES,
          { id, receiver, deleteFor },
          localStorage.rtsToken,
        );
      }
      if (receiver) {
        deleteDirectMessages([receiver])(dispatch);
        chatSocketIOClient.emit(
          DELETE_CHAT_DIRECT_MESSAGES,
          { receiver },
          localStorage.rtsToken,
        );
      }
    },
    [],
  );

  const {
    allContacts: { data: contactList },
  } = useSelector(state => state.contacts);

  const [onDetail, setonDetail] = useState(false);
  const [chatInfoOpen, setChatInfoOpen] = useState(false);
  const [searchMessagesOpen, setSearchMessagesOpen] = useState(false);

  const handleBackArrowClicked = () => {
    setGlobalChat({
      currentChatType: ONE_TO_ONE,
      currentChatTarget: null,
      isChattingWithSingleUser: false,
    })(dispatch);
    setonDetail(false);
  };

  const [newChatUserChooserOpen, setNewChatUserOpen] = useState(
    false,
  );

  const [editModalOpen, setEditModalOpen] = useState(false);

  const containerState = {
    userFavorite: useFavorites(),
    chatUser: currentChatTarget,
    viewingSingleUser: isChattingWithSingleUser,
    editModalOpen,
    setEditModalOpen,
    newChatUserChooserOpen,
    currentAuthUser,
    setNewChatUserOpen,
    handleBackArrowClicked,
    onDetail,
    chatInfoOpen,
    setChatInfoOpen,
    chatInfoType: currentChatType,
    searchMessagesOpen,
    setSearchMessagesOpen,
    contactList,
    setonDetail,
    sendMessage,
    setCurrentPage,
    deleteMessage,
    routeRef,
    hasMoreItemsToLoad,
    onChange,
    isReceiverTyping,
    formValue,
    setFormValue,
    textareaHeight,
    setTextareaHeight,
    onEmojiSelected,
    emojiDisplay,
    setEmojiDisplay,
    handleKeyDown,
    shouldSendMessage,
    handleSendFileMessage,
    chatAreaRef,
    scrollToBottom,
    clearChatThread,
    onSendMessage,
    singleMessageAdded,
    blockedContacts: useBlockUnblock(),
  };
  return <MessagingComponent containerState={containerState} />;
};

export default Messaging;
