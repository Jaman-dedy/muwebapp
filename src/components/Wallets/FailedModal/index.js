import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Icon } from 'semantic-ui-react';
import './FailedModal.scss';

const FailedModal = ({ open, errors, clearForm }) => {
  return (
    <Modal
      open={open}
      onClose={() => clearForm()}
      size="tiny"
      className="failed_modal"
    >
      <Modal.Header>
        {errors && (
          <p className="err_title">
            {global.translate(errors[0].Description, '2045') ||
              'Something went wrong'}
          </p>
        )}
      </Modal.Header>
      <Modal.Content
        className="error-content"
        style={{ textAlign: 'center' }}
      >
        <Icon
          name="times"
          color="red"
          style={{ fontSize: '60px', marginTop: '-20px' }}
        />

        {errors && Array.isArray(errors)
          ? errors.map(err => (
              <>
                {Array.isArray(err.Messages)
                  ? err.Messages.map(subErr => (
                      <p className="error_text">
                        {global.translate(subErr.Text, subErr.ID) ||
                          'Something went wrong'}
                      </p>
                    ))
                  : ''}
              </>
            ))
          : ''}
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => clearForm()}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

FailedModal.propTypes = {
  open: PropTypes.bool,
  errors: PropTypes.objectOf(PropTypes.any),
};

FailedModal.defaultProps = {
  open: true,
  errors: {},
};

export default FailedModal;
