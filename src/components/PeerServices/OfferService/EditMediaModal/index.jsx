import React, { useEffect } from 'react';
import { Modal, Image } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import closeCreateModal from 'redux/actions/peerServices/closeCreateModal';
import NewServiceContainer from 'containers/PeerServices/NewService';
import './style.scss';

const EditMediaModal = () => {
  // const dispatch = useDispatch();
  // const { open } = useSelector(state => state.peerServices.modal);
  // const {
  //   userData: { data },
  // } = useSelector(state => state.user);

  // const handleClose = () => {
  //   closeCreateModal(dispatch);
  // };

  // useEffect(() => {
  //   if (open) {
  //     // handleClose();
  //   }
  // }, [open]);

  // return (
  //   <Modal open={open} onClose={handleClose} closeIcon>
  //     <Modal.Header id="user-header">
  //       <Image circular src={data?.PictureURL} width={49} />
  //       <span>{global.translate('Edit Media')}</span>
  //     </Modal.Header>
  //     <Modal.Content>
  //       <NewServiceContainer editMedia />
  //     </Modal.Content>
  //   </Modal>
  // );
  <></>;
};

EditMediaModal.propTypes = {};

export default EditMediaModal;
