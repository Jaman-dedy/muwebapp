import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Modal } from 'semantic-ui-react';
import PinCodeForm from 'components/common/PinCodeForm';
import Message from 'components/common/Message';
import LoaderComponent from 'components/common/Loader';

const NestedModal = ({
  setIsRedeeming,
  setAddMoneyOpen,
  onOptionsChange,
  openConfirmModal,
  setOpenConfirmModal,
  onRedeeMoney,
  loadRedeeMoney,
  errors,
  error,
  virtualCard,
}) => {
  const closeModal = () => {
    setIsRedeeming(false);
    setAddMoneyOpen(false);
    setOpenConfirmModal(false);
  };

  return (
    <Modal
      closeOnDocumentClick={false}
      closeOnDimmerClick={false}
      closeOnTriggerClick={false}
      size="tiny"
      open={openConfirmModal}
      onClose={closeModal}
    >
      <Modal.Header style={{ textAlign: 'center' }}>
        {global.translate(`Redeem money`, 1689)}
      </Modal.Header>
      <Modal.Content>
        <p style={{ color: 'orange', textAlign: 'center' }}>
          <Icon name="warning sign" />
          {global.translate(
            `Are you sure you want to redeem the balance of your virtual card?`,
            2049,
          )}
          <strong style={{ color: '#1E2120' }}>
            {virtualCard?.Balance} &nbsp; {virtualCard?.Currency}{' '}
          </strong>
          <br />
          {global.translate(`from your virtual card?`, 2050)}
        </p>
        <div className="pin-number">
          <PinCodeForm
            label={global.translate('Confirm  your PIN number', 941)}
            onChange={onOptionsChange}
            name="pin"
          />
        </div>
        <div
          className="loader-section"
          style={{ alignSelf: 'center' }}
        >
          {' '}
          {errors && <Message message={errors} />}
          <>
            {error && <Message message={global.translate(error)} />}
            {error && !error[0] && (
              <Message message={global.translate(error.error)} />
            )}
          </>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={closeModal} basic color="red">
          {global.translate(`Cancel`, 86)}
        </Button>
        <Button
          loading={loadRedeeMoney}
          onClick={() => {
            onRedeeMoney();
          }}
          positive
          content={global.translate(`Redeem Money`, 1689)}
        />
      </Modal.Actions>
    </Modal>
  );
};

NestedModal.propTypes = {
  setIsRedeeming: PropTypes.func,
  setAddMoneyOpen: PropTypes.func,
  onOptionsChange: PropTypes.func,
  openConfirmModal: PropTypes.bool,
  setOpenConfirmModal: PropTypes.func,
  onRedeeMoney: PropTypes.bool,
  loadRedeeMoney: PropTypes.bool,
  errors: PropTypes.objectOf(PropTypes.any),
  error: PropTypes.objectOf(PropTypes.any),
  virtualCard: PropTypes.objectOf(PropTypes.any),
};
NestedModal.defaultProps = {
  setIsRedeeming: () => {},
  setAddMoneyOpen: () => {},
  onOptionsChange: () => {},
  openConfirmModal: false,
  setOpenConfirmModal: () => {},
  onRedeeMoney: false,
  loadRedeeMoney: false,
  errors: {},
  error: {},
  virtualCard: {},
};

export default NestedModal;
