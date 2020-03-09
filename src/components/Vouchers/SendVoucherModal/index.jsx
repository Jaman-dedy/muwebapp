import React from 'react';
import { Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './SendVoucherModal.scss';

const SendVoucherModal = ({ open, setOpen, form }) => {
  return (
    <Modal open={open} className="wallet_modal">
      <Modal.Header>
        <p className="center-align title">we are testing this</p>
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>we are testing here</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default SendVoucherModal;
