import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import removeDuplicatesBy from 'utils/removeDuplicatesBy';
import ChatInputBox from './BottomChatInputBox';
import ChatSectionTopBar from './ChatSectionTopBar/ChatSectionTopBar';
import FilePreview from './FilePreviewer';
import MessagesArea from './MessagesArea';

const MainChatArea = ({
  chatAreaState: {
    currentAuthUser,
    width,
    MOBILE_BREAK_POINT,
    handleBackArrowClicked,
    setChatInfoOpen,
    chatInfoOpen,
    setSearchMessagesOpen,
    sendMessage,
    deleteMessage,
    setCurrentPage,
    hasMoreItemsToLoad,
    onChange,
    isReceiverTyping,
    formValue,
    singleMessageAdded,
    setFormValue,
    textareaHeight,
    setTextareaHeight,
    onEmojiSelected,
    onSendMessage,
    handleKeyDown,
    shouldSendMessage,
    emojiDisplay,
    setEmojiDisplay,
    handleSendFileMessage,
    chatAreaRef,
    blockedContacts,
    scrollToBottom,
  },
}) => {
  const {
    currentChatTarget: currentChatUser,
    isChattingWithSingleUser: viewingSingleUser,
  } = useSelector(state => state.chat.appChat);

  const { directMessages, threadLoading, threadMeta } = useSelector(
    state => state.chat.messages,
  );

  const [scrollHeight, setScrollHeight] = useState(1);
  const [files, setFiles] = useState(null);
  const [visible, setVisible] = useState(false);

  const [availableImages, setAvailableImages] = useState([]);

  useEffect(() => {
    setAvailableImages([]);
  }, [currentChatUser]);

  useEffect(() => {
    if (files) {
      setVisible(true);
    }
  }, [files]);

  const loadUserChatThread = () => {
    const userMessages = directMessages.filter(msg => {
      if (
        (msg.sender === currentAuthUser?.PID &&
          msg.receiver === currentChatUser?.ContactPID) ||
        (msg.sender === currentChatUser?.ContactPID &&
          msg.receiver === currentAuthUser?.PID)
      ) {
        return true;
      }
    });
    const messages = removeDuplicatesBy(
      x => x.id,
      userMessages,
    ).sort((a, b) => a.updatedAt?.localeCompare(b.createdAt));
    return messages;
  };

  useEffect(() => {
    if (scrollHeight === 0 && hasMoreItemsToLoad) {
      setCurrentPage(page => page + 1);
    }
  }, [scrollHeight]);

  const handleChatScroll = () => {
    setScrollHeight(chatAreaRef?.current?.scrollTop);
  };

  useEffect(() => {
    if (threadMeta?.page > 1 && !singleMessageAdded) {
      chatAreaRef.current.scrollTo({
        top: 900,
      });
    } else {
      scrollToBottom();
    }
  }, [directMessages]);

  return (
    <>
      {currentChatUser && (
        <>
          <ChatSectionTopBar
            viewingSingleUser={viewingSingleUser}
            width={width}
            MOBILE_BREAK_POINT={MOBILE_BREAK_POINT}
            handleBackArrowClicked={handleBackArrowClicked}
            setChatInfoOpen={setChatInfoOpen}
            chatInfoOpen={chatInfoOpen}
            blockedContacts={blockedContacts}
            setSearchMessagesOpen={setSearchMessagesOpen}
            isReceiverTyping={isReceiverTyping}
          />

          <FilePreview
            style={{ display: visible ? 'block' : 'none' }}
            files={files}
            setFiles={setFiles}
            handleSendFileMessage={handleSendFileMessage}
            visible={visible}
            setVisible={setVisible}
          />

          <div
            className="chat-area"
            onClick={() => {
              setEmojiDisplay('none');
            }}
            ref={chatAreaRef}
            onScroll={handleChatScroll}
            style={threadLoading ? { paddingTop: 20 } : {}}
          >
            <MessagesArea
              loadUserChatThread={loadUserChatThread}
              deleteMessage={deleteMessage}
              availableImages={availableImages}
              setAvailableImages={setAvailableImages}
            />
          </div>
          <ChatInputBox
            setFiles={setFiles}
            sendMessage={sendMessage}
            emojiDisplay={emojiDisplay}
            setEmojiDisplay={setEmojiDisplay}
            onChange={onChange}
            formValue={formValue}
            setFormValue={setFormValue}
            textareaHeight={textareaHeight}
            setTextareaHeight={setTextareaHeight}
            onEmojiSelected={onEmojiSelected}
            handleKeyDown={handleKeyDown}
            shouldSendMessage={shouldSendMessage}
            onSendMessage={onSendMessage}
          />
        </>
      )}
    </>
  );
};
MainChatArea.propTypes = {
  chatAreaState: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default MainChatArea;
