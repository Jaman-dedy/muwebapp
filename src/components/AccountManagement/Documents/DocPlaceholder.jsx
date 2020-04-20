import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FileDrop } from 'react-file-drop';
import { Image } from 'semantic-ui-react';

import uploadFile from 'assets/images/upload-file.png';
import './DocPlaceholder.scss';

const DocPlaceholder = ({ name, onChooseFile, other }) => {
  const imageInputRef = useRef(null);

  return (
    <div
      className="doc-placeholder"
      style={{ width: other ? 100 : 200, height: other ? 83 : 138 }}
      onClick={() => imageInputRef.current.click()}
    >
      <FileDrop
        onDrop={(files, _) =>
          onChooseFile({ target: { name, value: files } })
        }
      >
        <Image src={uploadFile} width={other ? 30 : 80} />
        <span style={{ fontSize: other ? '0.5em' : '0.9em' }}>
          Drop your image here
        </span>
      </FileDrop>
      <input
        type="file"
        accept="image/*"
        name={name}
        ref={imageInputRef}
        onChange={onChooseFile}
        style={{ display: 'none' }}
      />
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
