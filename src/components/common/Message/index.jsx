import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  Message as SemanticMessage,
} from 'semantic-ui-react';
import './index.scss';

const Message = ({ message, color, icon, iconSize, action }) => (
  <SemanticMessage color={color} size="small" error>
    <div
      className="message-component"
      style={{ justifyContent: action ? 'space-between' : 'center' }}
    >
      <span>
        {icon ? <Icon name={icon} size={iconSize} /> : ''}
        {global.translate(message)}
      </span>
      {action ? (
        <Button
          size="small"
          content={
            global.translate(action.content) ||
            global.translate('Retry')
          }
          icon={action.icon || 'right redo'}
          color={action.color || color}
          labelPosition={action.position || 'right'}
          onClick={action.onClick}
        />
      ) : (
        ''
      )}
    </div>
  </SemanticMessage>
);

Message.defaultProps = {
  color: 'grey',
  icon: '',
  action: null,
  iconSize: 'large',
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  action: PropTypes.instanceOf(Object),
  icon: PropTypes.string,
  iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Message;
