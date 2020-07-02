import React from 'react';
import { Placeholder } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import ChatMessage from './ChatMessage/ChatMessage';

const MessagesArea = ({ loadUserChatThread, deleteMessage }) => {
  const { threadLoading } = useSelector(state => state.chat.messages);
  const {
    userData: { data },
  } = useSelector(state => state.user);
  const getCurrentChatUserMessages = () => loadUserChatThread();
  return (
    <>
      {threadLoading && (
        <div className="loader-segment">
          {Array(2)
            .fill(1)
            .map(() => (
              <Placeholder
                key={new Date() * Math.random()}
                className="loader-segment-left"
                inverted
              >
                <Placeholder.Header>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
              </Placeholder>
            ))}
        </div>
      )}
      {getCurrentChatUserMessages().map(message => (
        <ChatMessage
          handleDeleteMessage={deleteMessage}
          message={message}
          isOwner={data?.PID === message.sender}
        />
      ))}
    </>
  );
};

export default MessagesArea;
