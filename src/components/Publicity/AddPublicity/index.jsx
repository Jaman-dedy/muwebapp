import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import './AddPublicity.scss';

import AddPublicityForm from './AddPublicityForm';

const AddPublicity = ({ open, setOpen, createCampaing }) => {
  return (
    <Modal
      open={open}
      size="tiny"
      className="add-publicity-modal"
      closeIcon
      onClose={() => setOpen(false)}
    >
      <Modal.Header className="add-publicity-modal-header">
        {global.translate('Create a campaign')}
      </Modal.Header>
      <Modal.Content>
        <AddPublicityForm createCampaing={createCampaing} />
      </Modal.Content>
    </Modal>
  );
};

AddPublicity.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  createCampaing: PropTypes.instanceOf(Object),
};

AddPublicity.defaultProps = {
  open: false,
  setOpen: () => null,
  createCampaing: {},
};

export default AddPublicity;
