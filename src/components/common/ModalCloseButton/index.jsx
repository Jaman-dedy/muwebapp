import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

function ModalCloseButton({ onClose, showIcon }) {
  return (
    <Button
      icon={showIcon}
      negative
      inverted
      className="close-chat-btn"
      onClick={() => {
        onClose();
      }}
    >
      {showIcon && <Icon name="close" />}
    </Button>
  );
}

ModalCloseButton.propTypes = {
  onClose: PropTypes.func.isRequired,
  showIcon: PropTypes.bool,
};
ModalCloseButton.defaultProps = {
  showIcon: true,
};

export default ModalCloseButton;
