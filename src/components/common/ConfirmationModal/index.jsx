import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';

const ConfirmationModal = ({
  open,
  setOpen,
  title,
  message,
  onClickYes,
  loading,
  onClickNo,
  bankAccount,
}) => {
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      closeOnDimmerClick={false}
      open={open}
      size="tiny"
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>{message}</p>
          {bankAccount && (
            <div>
              <div className="account__name">
                {global.translate('Account name')}:{' '}
                <span className="value">
                  {bankAccount.AccountName}
                </span>
              </div>
              <div className="account__number">
                {global.translate('Account number')}:{' '}
                <span className="value">
                  {bankAccount.AccountNumber}
                </span>
              </div>
            </div>
          )}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={onClickNo}
          className="btn--cancel"
          disabled={loading}
        >
          {global.translate('Cancel')}
        </Button>
        <Button
          onClick={onClickYes}
          className="btn--confirm"
          disabled={loading}
          loading={loading}
        >
          {global.translate('Confirm')}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClickYes: PropTypes.func.isRequired,
  onClickNo: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  bankAccount: PropTypes.objectOf(PropTypes.any),
};

ConfirmationModal.defaultProps = {
  bankAccount: null,
};
export default ConfirmationModal;
