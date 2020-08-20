import React from 'react';
import { Modal, Icon, Button } from 'semantic-ui-react';
import './index.scss';
import PropTypes from 'prop-types';

const ModalHeader = ({
  setOpen,
  onConfirmClick,
  title,
  confirmContent,
  nextDisabled,
  closeIcon,
}) => {
  return (
    <Modal.Header className="app-modal-header">
      <Icon
        className="chat-icon"
        name={closeIcon}
        onClick={setOpen}
      />
      <p className="title">{title}</p>{' '}
      <Button
        basic
        color="orange"
        disabled={nextDisabled}
        onClick={onConfirmClick}
        content={confirmContent}
      />
    </Modal.Header>
  );
};

ModalHeader.propTypes = {
  nextDisabled: PropTypes.bool,
  closeIcon: PropTypes.string,
  setOpen: PropTypes.func,
  onConfirmClick: PropTypes.func,
  title: PropTypes.string,
  confirmContent: PropTypes.string,
};
ModalHeader.defaultProps = {
  nextDisabled: false,
  closeIcon: 'close',
  setOpen: () => {},
  onConfirmClick: () => {},
  title: null,
  confirmContent: null,
};

export default ModalHeader;
