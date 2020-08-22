/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button, Image } from 'semantic-ui-react';
// import { toast } from 'react-toastify';

const ConfirmImageModal = ({
  open,
  setOpen,
  loading,
  uploadImage,
  modalImage,
  storeImages,
  setStoreImages,
  chooseLogoImage,
  chooseBannerImage,
}) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (storeImages[modalImage] && storeImages[modalImage].name) {
      const url = URL.createObjectURL(storeImages[modalImage]);
      setImageUrl(url);
    }
  }, [storeImages, modalImage]);

  useEffect(() => {
    if (!loading && open) {
      setOpen(false);
    }
  }, [loading]);

  const onClose = () => {
    setStoreImages({
      ...storeImages,
      [modalImage]: {},
    });
    setOpen(false);
  };

  const handleSelectFile = () => {
    if (modalImage === 'LogoURL') {
      chooseLogoImage();
    } else chooseBannerImage();
  };

  return (
    <Modal
      className="ProfilePictureModal"
      size="mini"
      open={open}
      onClose={() => onClose()}
    >
      <Modal.Header>
        {global.translate('Select a Picture', 2027)}
      </Modal.Header>
      <Modal.Content>
        <Image
          src={imageUrl}
          size="medium"
          centered
          // className="radius-1"
          alt="Selected image"
        />
      </Modal.Content>
      <Modal.Actions>
        <Form>
          <div className="center-align">
            <Button negative onClick={() => onClose()} type="button">
              {global.translate('Close', 186)}
            </Button>
            <Button
              basic
              color="green"
              onClick={handleSelectFile}
              type="button"
            >
              {global.translate('Change Image', 2028)}
            </Button>
            <Button
              positive
              type="button"
              loading={loading}
              disabled={!modalImage || loading}
              onClick={() => {
                if (!loading && modalImage) {
                  uploadImage({
                    name: modalImage,
                    value: storeImages[modalImage],
                  });
                }
                return false;
              }}
            >
              {global.translate('Upload', 2029)}
            </Button>
          </div>
        </Form>
      </Modal.Actions>
    </Modal>
  );
};

ConfirmImageModal.propTypes = {
  // value: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  uploadImage: PropTypes.func,
  modalImage: PropTypes.string,
  // handleUpload: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  setStoreImages: PropTypes.func,
  loading: PropTypes.bool,
  storeImages: PropTypes.instanceOf(Object),
  chooseLogoImage: PropTypes.func,
  chooseBannerImage: PropTypes.func,
};
ConfirmImageModal.defaultProps = {
  // value: '',
  open: false,
  setOpen: () => undefined,
  uploadImage: () => undefined,
  modalImage: '',
  // handleUpload: false,
  setStoreImages: () => undefined,
  loading: false,
  storeImages: {},
  chooseLogoImage: () => undefined,
  chooseBannerImage: () => undefined,
};

export default ConfirmImageModal;
