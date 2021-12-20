import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Message } from 'semantic-ui-react';
import './FailedModal.scss';

const FailedModal = ({ open, errors, clearForm }) => {
  const errorList =
    errors &&
    Array.isArray(errors) &&
    errors.map(err => {
      if (Array.isArray(err.Messages)) {
        return err.Messages.map(subErr =>
          global.translate(subErr.Text),
        );
      }
      return err;
    });
  return (
    <Modal open={open} onClose={() => clearForm()} size="tiny">
      <Modal.Header className="modal-title">
        {global.translate('Delete Wallet', 557)}
      </Modal.Header>
      <Modal.Content>
        <Message
          error
          header={
            global.translate(
              errors && errors[0] && errors[0].Description,
              2045,
            ) || global.translate('Something went wrong', 1933)
          }
          list={errorList && errorList[0]}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => clearForm()}>
          {global.translate('Close', 186)}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

FailedModal.propTypes = {
  open: PropTypes.bool,
  errors: PropTypes.objectOf(PropTypes.any),
  clearForm: PropTypes.func,
};

FailedModal.defaultProps = {
  open: true,
  errors: {},
  clearForm: () => true,
};

export default FailedModal;
