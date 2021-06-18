import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Modal } from 'semantic-ui-react';

const ConfirmModal = ({
  isOpened,
  message,
  onClickYes,
  onClickNo,
  close,
  loading,
}) => {
  return (
    <>
      <Modal size="mini" open={isOpened} onClose={() => close(false)}>
        <Modal.Content>
          <p className="medium-text center-align">
            {global.translate(message)}
          </p>
        </Modal.Content>
        <Modal.Actions>
          <div className="center-align large-v-padding">
            <Button
              color="red"
              onClick={() => {
                onClickNo(false);
                close(false);
              }}
            >
              <Icon name="remove" /> {global.translate('No')}
            </Button>
            <Button
              color="green"
              loading={loading}
              onClick={async () => {
                await onClickYes();
                close(false);
              }}
            >
              <Icon name="checkmark" /> {global.translate('Yes')}
            </Button>
          </div>
        </Modal.Actions>
      </Modal>
    </>
  );
};

ConfirmModal.propTypes = {
  close: PropTypes.func,
  isOpened: PropTypes.bool,
  message: PropTypes.string,
  onClickNo: PropTypes.func,
  onClickYes: PropTypes.func,
  loading: PropTypes.bool,
};
ConfirmModal.defaultProps = {
  isOpened: false,
  message: global.translate( 'Do you want to perform this action?'),
  onClickYes: () => true,
  onClickNo: () => true,
  close: () => true,
  loading: false,
};

export default ConfirmModal;
