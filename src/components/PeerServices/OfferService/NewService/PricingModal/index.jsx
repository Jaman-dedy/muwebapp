import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Image } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import EditPricing from 'components/PeerServices/Pricing/EditPricing';
import openEditPricingModal from 'redux/actions/peerServices/openEditPricingModal';

const EditPricingModal = ({ handleupdateService }) => {
  const { data: updateServiceData, loading } = useSelector(
    state => state.peerServices.updateService,
  );
  const dispatch = useDispatch();

  const { open, service } = useSelector(
    state => state.peerServices.editPricingModal,
  );

  const onClose = () => {
    openEditPricingModal({ open: false, service: null })(dispatch);
  };

  useEffect(() => {
    if (updateServiceData) {
      onClose();
    }
  }, [updateServiceData]);

  const user = useSelector(state => state.user.userData);

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeIcon={!loading}
      closeOnDimmerClick={false}
      closeOnEscape={!loading}
      closeOnDocumentClick={false}
      closeOnTriggerBlur={false}
      closeOnPortalMouseLeave={false}
      closeOnTriggerMouseLeave={false}
    >
      <Modal.Header id="user-header">
        <Image circular src={user.data?.PictureURL} width={49} />
        <span> {global.translate('Update pricing')}</span>
      </Modal.Header>
      <Modal.Content>
        <EditPricing
          service={service}
          handleupdateService={handleupdateService}
        />
      </Modal.Content>
    </Modal>
  );
};

EditPricingModal.propTypes = {
  handleupdateService: PropTypes.func.isRequired,
};
export default EditPricingModal;
