/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageCroper from '../../common/ImageCroper/CropImage';

const ConfirmImageModal = ({
  open,
  setOpen,
  loading,
  uploadImage,
  modalImage,
  storeImages,
  chooseLogoImage,
  chooseBannerImage,
}) => {
  const [file, setFile] = useState();

  useEffect(() => {
    if (storeImages[modalImage] && storeImages[modalImage].name) {
      setFile(storeImages[modalImage]);
    }
  }, [storeImages, modalImage]);

  useEffect(() => {
    if (!loading && open) {
      setOpen(false);
    }
  }, [loading]);

  const handleSelectFile = () => {
    if (modalImage === 'LogoURL') {
      chooseLogoImage();
    } else chooseBannerImage();
  };

  const upload = file => {
    uploadImage({
      name: modalImage,
      value: file,
    });
  };

  return (
    <ImageCroper
      open={open}
      setOpen={setOpen}
      loading={loading}
      file={file}
      uploadImage={upload}
      chooseImage={handleSelectFile}
    />
  );
};

ConfirmImageModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  uploadImage: PropTypes.func,
  modalImage: PropTypes.string,
  loading: PropTypes.bool,
  storeImages: PropTypes.instanceOf(Object),
  chooseLogoImage: PropTypes.func,
  chooseBannerImage: PropTypes.func,
};
ConfirmImageModal.defaultProps = {
  open: false,
  setOpen: () => undefined,
  uploadImage: () => undefined,
  modalImage: '',
  loading: false,
  storeImages: {},
  chooseLogoImage: () => undefined,
  chooseBannerImage: () => undefined,
};

export default ConfirmImageModal;
