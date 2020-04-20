import React from 'react';
import { Image, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ImagePreview = ({ open, setOpen, src }) => {
  return (
    <Modal
      open={open}
      size="small"
      basic
      closeIcon
      onClose={() => setOpen(false)}
    >
      <Modal.Content>
        <Image centered src={src} alt="Preview" />
      </Modal.Content>
    </Modal>
  );
};

ImagePreview.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  src: PropTypes.string,
};

ImagePreview.defaultProps = {
  open: false,
  setOpen: () => null,
  src: '',
};

export default ImagePreview;
