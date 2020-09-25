import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import 'emoji-mart/css/emoji-mart.css';
import MessageInput from './MessageInput';
import EmojiPicker from './EmojiPicker';
import FilePicker from './FilePicker';

const ChatInputBox = ({
  sendMessage,
  emojiDisplay,
  setEmojiDisplay,
  setFiles,
  formValue,
  onChange,
  textareaHeight,
  setTextareaHeight,
  onEmojiSelected,
  handleKeyDown,
  shouldSendMessage,
  onSendMessage,
}) => {
  return (
    <div className="message-box">
      <div className="bottom-section">
        <Icon
          name="smile outline"
          circular
          className="chat-icon"
          size="large"
          onClick={() => {
            setEmojiDisplay(emojiDisplay =>
              emojiDisplay === 'block' ? 'none' : 'block',
            );
          }}
        />

        <EmojiPicker
          style={{
            position: 'absolute',
            bottom: '100%',
            display: emojiDisplay,
            width: '90%',
          }}
          onEmojiSelected={onEmojiSelected}
        />

        <MessageInput
          onChange={onChange}
          sendMessage={sendMessage}
          formValue={formValue}
          textareaHeight={textareaHeight}
          setTextareaHeight={setTextareaHeight}
          handleKeyDown={handleKeyDown}
        />
        <div className="right-items">
          <FilePicker onFilesSelected={files => setFiles(files)}>
            <Icon name="attach" size="large" className="chat-icon" />{' '}
          </FilePicker>
          &nbsp; &nbsp;
          {shouldSendMessage() && (
            <Icon
              name="send"
              size="large"
              className="chat-icon"
              onClick={() => onSendMessage({ body: formValue.body })}
            />
          )}
        </div>
      </div>
    </div>
  );
};

ChatInputBox.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  emojiDisplay: PropTypes.bool.isRequired,
  setEmojiDisplay: PropTypes.func.isRequired,
  setFiles: PropTypes.func.isRequired,
  formValue: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
  textareaHeight: PropTypes.number.isRequired,
  setTextareaHeight: PropTypes.func.isRequired,
  onEmojiSelected: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  shouldSendMessage: PropTypes.func.isRequired,
  onSendMessage: PropTypes.func.isRequired,
};

export default ChatInputBox;
