import React from 'react';
import PropTypes from 'prop-types';
import BusinessInfoForm from 'components/AccountManagement/SettingsTab/SwitchAccount';
import { Modal } from 'semantic-ui-react';
const UpdateBusinessInfoModal = ({ switchAccount }) => {
  const {
    handleOpenInfoModal,
    handleCloseInfoModal,
    openInfoModal,
  } = switchAccount;
  return (
    <Modal
      open={openInfoModal}
      onClose={handleCloseInfoModal}
      onOpen={handleOpenInfoModal}
      closeOnDimmerClick={false}
    >
      <Modal.Header>
        {global.translate('Update business information')}
      </Modal.Header>
      <Modal.Content>
        <BusinessInfoForm
          switchAccount={switchAccount}
          fromUpdateMenu
        />
      </Modal.Content>
    </Modal>
  );
};

UpdateBusinessInfoModal.propTypes = {};

export default UpdateBusinessInfoModal;
