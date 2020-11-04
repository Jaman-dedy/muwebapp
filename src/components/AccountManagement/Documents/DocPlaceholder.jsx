/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FileDrop } from 'react-file-drop';
import { Image } from 'semantic-ui-react';

import uploadFile from 'assets/images/add-img-plhd.svg';
import './DocPlaceholder.scss';
import ImageCroper from 'components/common/ImageCroper/CropImage';

const DocPlaceholder = ({ name, onChooseFile, other }) => {
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
        loading={false}
        file={file}
        uploadImage={upload}
        chooseImage={handleImageSelect}
      />
      <div
        className="doc-placeholder"
        onClick={() => handleImageSelect()}
      >
        <FileDrop
          onDrop={(files, _) => {
            handleImageCropping(files[0]);
          }}
        >
          <Image src={uploadFile} />
          <span>
            {global.translate('Drop your document here', 1756)}
          </span>
        </FileDrop>
        <input
          type="file"
          accept="image/*"
          name={name}
          ref={imageInputRef}
          onChange={event => {
            const { files } = event.target;
            if (files) handleImageCropping(files[0]);
          }}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

DocPlaceholder.propTypes = {
  onChooseFile: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  other: PropTypes.bool,
};

DocPlaceholder.defaultProps = {
  other: false,
};

export default DocPlaceholder;
