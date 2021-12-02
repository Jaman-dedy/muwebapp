import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button, Icon, Image } from 'semantic-ui-react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const CropImage = ({
  open,
  setOpen,
  loading,
  file,
  uploadImage,
  chooseImage,
  aspectRatio,
  uploadedUrl,
}) => {
  const [cropper, setCropper] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const [croppedUrl, setCroppedUrl] = useState('');

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
      size="tiny"
      open={open || loading}
      onClose={() => setOpen(false)}
      closeOnDimmerClick={false}
    >
      <Modal.Header>
        {global.translate('Select a Picture')}
      </Modal.Header>
      <Modal.Content>
        {!loading && (
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
            rotatable
            aspectRatio={aspectRatio}
          />
        )}
        {loading && uploadedUrl && <Image src={uploadedUrl} />}
        {loading && croppedUrl && <Image src={croppedUrl} />}
        <div className="center-align rotate-actions">
          <Button
            icon
            labelPosition="left"
            onClick={() => {
              cropper.rotate(-90);
            }}
          >
            <Icon disabled name="undo" />
            {global.translate('Rotate left')}
          </Button>
          <Button
            icon
            labelPosition="left"
            onClick={() => {
              cropper.rotate(90);
            }}
          >
            <Icon disabled name="redo" />
            {global.translate('Rotate right')}
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
              {global.translate('Close')}
            </Button>
            {chooseImage && (
              <Button
                basic
                color="green"
                onClick={chooseImage}
                type="button"
              >
                {global.translate('Pool')}
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
                  setCroppedUrl(croppedURL);
                  const file = base64ToBlob(croppedURL);
                  uploadImage(file);
                }
                return false;
              }}
            >
              {global.translate('Upload')}
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
  aspectRatio: PropTypes.number,
  uploadedUrl: PropTypes.string,
};
CropImage.defaultProps = {
  open: false,
  setOpen: () => undefined,
  uploadImage: () => undefined,
  chooseImage: false,
  loading: false,
  aspectRatio: NaN,
  uploadedUrl: '',
};

export default CropImage;
