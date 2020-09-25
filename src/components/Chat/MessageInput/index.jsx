import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import './style.scss';

const MessageInput = ({
  onChange,
  formValue,
  handleKeyDown,
  textareaHeight,
  setTextareaHeight,
}) => {
  return (
    <div className="message-input">
      <Form.TextArea
        placeholder={global.translate('Type a message')}
        rows={1}
        className="textMessageInput"
        name="chat-textarea"
        value={formValue.body || ''}
        onChange={(_, { value }) => {
          onChange(_, { name: 'body', value });
          const height = document.querySelector(
            'textarea[name="chat-textarea"]',
          )?.scrollHeight;
          setTextareaHeight(height > 42 ? height : 42);
        }}
        style={{
          minHeight: `${
            formValue.body ? textareaHeight || 42 : 42
          }px`,
        }}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

MessageInput.propTypes = {
  formValue: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
  textareaHeight: PropTypes.number.isRequired,
  setTextareaHeight: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
};
export default MessageInput;
