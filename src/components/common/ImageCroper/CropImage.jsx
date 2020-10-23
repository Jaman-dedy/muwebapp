import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button, Icon } from 'semantic-ui-react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const CropImage = ({
  open,
  setOpen,
  loading,
  file,
  uploadImage,
  chooseImage,
}) => {
  const [cropper, setCropper] = useState();
  const [imageUrl, setImageUrl] = useState('');

  const base64ToBlob = base64 => {
    const byteString = atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
  };

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  }, [file]);

  return (
    <Modal
      className="ProfilePictureModal"
      size="tiny"
      open={open}
      onClose={() => setOpen(false)}
    >
      <Modal.Header>
        {global.translate('Select a Picture', 2027)}
      </Modal.Header>
      <Modal.Content>
        <Cropper
          style={{ height: 400, width: '100%' }}
          initialAspectRatio={1}
          src={imageUrl}
          viewMode={1}
          guides
          background={false}
          responsive
          autoCropArea={1}
          checkOrientation={false}
          onInitialized={instance => {
            setCropper(instance);
          }}
          aspectRatio={1 / 1}
          rotatable
        />
        <div className="center-align rotate-actions">
          <Button
            icon
            labelPosition="left"
            onClick={() => {
              cropper.rotate(-90);
            }}
          >
            <Icon disabled name="undo" />
            Rotate left
          </Button>
          <Button
            icon
            labelPosition="left"
            onClick={() => {
              cropper.rotate(90);
            }}
          >
            <Icon disabled name="redo" />
            Rotate right
          </Button>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Form>
          <div className="center-align">
            <Button
              negative
              onClick={() => setOpen(false)}
              type="button"
            >
              {global.translate('Close', 186)}
            </Button>
            {chooseImage && (
              <Button
                basic
                color="green"
                onClick={chooseImage}
                type="button"
              >
                {global.translate('Change', '739')}
              </Button>
            )}

            <Button
              positive
              type="button"
              loading={loading}
              disabled={loading}
              onClick={() => {
                if (!loading) {
                  const ctx = cropper.getCroppedCanvas();

                  const croppedURL = ctx.toDataURL();
                  const file = base64ToBlob(croppedURL);
                  uploadImage(file);
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

CropImage.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  uploadImage: PropTypes.func,
  chooseImage: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  loading: PropTypes.bool,
  file: PropTypes.instanceOf(File).isRequired,
};
CropImage.defaultProps = {
  open: false,
  setOpen: () => undefined,
  uploadImage: () => undefined,
  chooseImage: false,
  loading: false,
};

export default CropImage;
