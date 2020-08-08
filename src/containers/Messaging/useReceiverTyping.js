import { useState, useEffect } from 'react';
import socketIOClient, {
  chatSocketIOClient,
} from 'services/socketIO';
import { TYPING_CHAT_DIRECT_MESSAGE } from 'constants/events/chat/directMessages';

export default receiver => {
  const [isReceiverTyping, toggleReceiverTyping] = useState(false);
  const [typingResponse, setTypingResponse] = useState(null);

  const onReceiverTyping = () => {
    chatSocketIOClient.emit(
      TYPING_CHAT_DIRECT_MESSAGE,
      { receiver },
      localStorage.rtsToken,
    );
  };

  useEffect(() => {
    socketIOClient.on(TYPING_CHAT_DIRECT_MESSAGE, response => {
      setTypingResponse(response);
    });
    return () => {
      socketIOClient.off(TYPING_CHAT_DIRECT_MESSAGE);
    };
  }, []);

  useEffect(() => {
    if (
      typingResponse &&
      receiver &&
      typingResponse?.sender === receiver
    ) {
      toggleReceiverTyping(true);
      clearTimeout(localStorage.typingTimeout);
      localStorage.typingTimeout = setTimeout(() => {
        toggleReceiverTyping(false);
      }, 5000);
    }
    return () => {
      clearTimeout(localStorage.typingTimeout);
    };
  }, [typingResponse]);

  return {
    onReceiverTyping,
    isReceiverTyping,
  };
};
