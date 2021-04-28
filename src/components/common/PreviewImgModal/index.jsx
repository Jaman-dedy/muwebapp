import React from 'react';
import { Modal, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';

const PreviewImgModal = ({ setOpen, open, imgToPreview }) => {
  return (
    <Modal
      closeIcon
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      size="small"
      className="preview-img-modal"
    >
      <Modal.Content className="preview-img-content">
        <Image src={imgToPreview} />
      </Modal.Content>
    </Modal>
  );
};
PreviewImgModal.propTypes = {
  setOpen: PropTypes.func,
  open: PropTypes.bool,
  imgToPreview: PropTypes.string,
};
PreviewImgModal.defaultProps = {
  setOpen: () => {},
  open: false,
  imgToPreview: PropTypes.string,
};

export default PreviewImgModal;
