import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ChatMessageOptions = ({ options, currentItem }) => (
  <Dropdown>
    <Dropdown.Menu>
      {options.map(item => (
        <Dropdown.Item
          key={`option${Math.random() * Date.now()}`}
          icon={item.icon}
          text={item.name}
          onClick={e => {
            item.onClick(e, currentItem);
          }}
        />
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

ChatMessageOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  currentItem: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default ChatMessageOptions;
