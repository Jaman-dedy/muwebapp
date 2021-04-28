/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Button } from 'semantic-ui-react';

import ImageCroper from 'components/common/ImageCroper/CropImage';
import uploadImgIcon from 'assets/images/profile/upload-img-icon.svg';

const UploadImgButton = ({
  name,
  onChooseFile,
  loading,
  img,
  src,
}) => {
  const imageInputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const upload = file => {
    onChooseFile({ target: { name, value: new Array(file) } });
    setOpen(false);
  };
  const handleImageSelect = () => {
    imageInputRef.current.click();
  };

  const handleImageCropping = file => {
    setFile(file);
    setOpen(true);
  };

  return (
    <div>
      <ImageCroper
        open={open}
        setOpen={setOpen}
        file={file}
        uploadImage={upload}
        chooseImage={handleImageSelect}
        loading={loading}
      />
      <div
        className="doc-placeholder"
        onClick={() => handleImageSelect()}
      >
        <input
          type="file"
          accept="image/jpeg, image/png"
          name={name}
          ref={imageInputRef}
          onChange={event => {
            const { files } = event.target;
            if (files) handleImageCropping(files[0]);
          }}
          style={{ display: 'none' }}
        />
        {img ? (
          <Image src={src} />
        ) : (
          <Button className="btn-add-doc">
            <Image src={uploadImgIcon} />
            {global.translate('Upload now')}
          </Button>
        )}
      </div>
    </div>
  );
};

UploadImgButton.propTypes = {
  onChooseFile: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

UploadImgButton.defaultProps = {};

export default UploadImgButton;
