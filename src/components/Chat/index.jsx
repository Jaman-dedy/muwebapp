import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import useWindowSize from 'utils/useWindowSize';
import usePrevious from 'utils/usePrevious';
import { setGlobalChat } from 'redux/actions/chat/globalchat';
import ChartListComponent from './LeftAsideWrapper';
import NewMessageTriggerView from './NewMessageView/NewMessageTriggerView';
import MainChatArea from './MainRightChatArea';
import ChooseChatUserModal from './ChatUserChooser';
import ChatInfoSideBar from './ChatInfoSideBar/ChatInfoSidebar';
import EditChatModal from './EditChatInfo';
import SearchMessagesSidebar from './SearchMessagesSideBar';

const Messaging = ({
  containerState: {
    userFavorite,
    recentChats,
    editModalOpen,
    setEditModalOpen,
    newChatUserChooserOpen,
    currentAuthUser,
    setNewChatUserOpen,
    setChatDetailUser,
    chatInfoOpen,
    setChatInfoOpen,
    chatInfoType,
    searchMessagesOpen,
    setSearchMessagesOpen,
    contactList,
    blockedContacts,
    singleMessageAdded,
    messages,
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
    handleKeyDown,
    shouldSendMessage,
    handleSubmit,
    emojiDisplay,
    setEmojiDisplay,
    handleSendFileMessage,
    chatAreaRef,
    scrollToBottom,
    clearChatThread,
    onSendMessage,
  },
}) => {
  const MOBILE_BREAK_POINT = 700;
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const [isOnMobileDetail, setIsOnMobileDetail] = useState(false);
  const {
    currentChatTarget: currentChatUser,
    isChattingWithSingleUser: viewingSingleUser,
  } = useSelector(state => state.chat.appChat);

  const handleBackArrowClicked = () => {
    setGlobalChat({
      currentChatType: null,
      currentChatTarget: null,
      isChattingWithSingleUser: false,
    })(dispatch);

    if (width < MOBILE_BREAK_POINT) {
      setIsOnMobileDetail(false);
    }
  };

  const prevWidth = usePrevious(width);

  useEffect(() => {
    if (prevWidth < 700) {
      if (width > 700) {
        setIsOnMobileDetail(false);
      }
    }
  }, [width]);

  const chatAreaState = {
    currentChatUser,
    width,
    messages,
    handleBackArrowClicked,
    currentAuthUser,
    viewingSingleUser,
    chatInfoOpen,
    setChatInfoOpen,
    visible: searchMessagesOpen,
    setSearchMessagesOpen,
    MOBILE_BREAK_POINT,
    sendMessage,
    singleMessageAdded,
    onSendMessage,
    setIsOnMobileDetail,
    setCurrentPage,
    deleteMessage,
    hasMoreItemsToLoad,
    onChange,
    isReceiverTyping,
    formValue,
    setFormValue,
    textareaHeight,
    setTextareaHeight,
    onEmojiSelected,
    handleKeyDown,
    shouldSendMessage,
    handleSubmit,
    emojiDisplay,
    setEmojiDisplay,
    handleSendFileMessage,
    chatAreaRef,
    scrollToBottom,
    blockedContacts,
  };
  return (
    <div
      className={`messaging-container ${
        viewingSingleUser ? 'single-user-chat-view' : 'chat-list-view'
      }`}
    >
      <span
        style={{
          display:
            isOnMobileDetail || viewingSingleUser ? 'none' : 'block',
        }}
      >
        <ChartListComponent
          userFavorite={userFavorite}
          recentChats={recentChats}
          currentAuthUser={currentAuthUser}
          setChatDetailUser={setChatDetailUser}
          setIsOnMobileDetail={setIsOnMobileDetail}
          onNewChatClick={() => {
            setNewChatUserOpen(!newChatUserChooserOpen);
          }}
        />
      </span>
      <main
        className="main-chat-area"
        style={{
          display:
            width < MOBILE_BREAK_POINT &&
            !viewingSingleUser &&
            !isOnMobileDetail
              ? 'none'
              : 'block',
        }}
      >
        <ChooseChatUserModal
          setOpen={() => {
            setNewChatUserOpen(false);
          }}
          open={newChatUserChooserOpen}
        />

        <MainChatArea chatAreaState={chatAreaState} />

        {chatInfoOpen && (
          <ChatInfoSideBar
            visible={chatInfoOpen}
            chatUserList={contactList}
            editModalOpen={editModalOpen}
            chatInfoType={chatInfoType}
            deleteMessage={deleteMessage}
            setEditModalOpen={setEditModalOpen}
            onHide={() => setChatInfoOpen(false)}
            routeRef={routeRef}
            setChatInfoOpen={setChatInfoOpen}
            blockedContacts={blockedContacts}
            clearChatThread={clearChatThread}
          />
        )}

        {searchMessagesOpen && (
          <SearchMessagesSidebar
            visible={searchMessagesOpen}
            setSearchMessagesOpen={setSearchMessagesOpen}
            chatUserList={contactList}
            editModalOpen={editModalOpen}
            onHide={() => setSearchMessagesOpen(false)}
          />
        )}

        {!currentChatUser && (
          <NewMessageTriggerView
            onStartClick={() => {
              setNewChatUserOpen(!newChatUserChooserOpen);
            }}
          />
        )}

        <EditChatModal
          editOpen={editModalOpen}
          setEditOpen={setEditModalOpen}
          onSetNewDetails={() => {}}
        />
      </main>
    </div>
  );
};

Messaging.propTypes = {
  containerState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Messaging;
