import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FileDrop } from 'react-file-drop';
import { Image } from 'semantic-ui-react';

import uploadFile from 'assets/images/upload-file.png';
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
        style={{ width: other ? 100 : 200, height: other ? 83 : 138 }}
        onClick={() => handleImageSelect()}
      >
        <FileDrop
          onDrop={(files, _) => {
            handleImageCropping(files[0]);
          }}
        >
          <Image src={uploadFile} width={other ? 30 : 80} />
          <span style={{ fontSize: other ? '0.5em' : '0.9em' }}>
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
