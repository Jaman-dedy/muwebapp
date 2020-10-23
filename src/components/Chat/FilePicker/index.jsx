/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import ImageCroper from 'components/common/ImageCroper/CropImage';

const FilePicker = ({
  children,
  disableClick,
  onFilesSelected,
  accept,
  ...props
}) => {
  const imageInputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();

  const addFile = file => {
    Object.assign(file, {
      preview: URL.createObjectURL(file),
      id: (Math.random() * new Date()).toString(),
    });
    setOpen(false);
    return onFilesSelected(new Array(file));
  };
  return (
    <div>
      <ImageCroper
        open={open}
        setOpen={setOpen}
        loading={false}
        file={file}
        uploadImage={addFile}
      />
      <Dropzone
        accept={accept}
        noClick={disableClick}
        {...props}
        className="ignore"
        onDrop={acceptedFiles => {
          const file = acceptedFiles[0];
          // console.log('payload', file);
          if (file.type.split('/')[0] === 'image') {
            setFile(file);
            setOpen(true);
          } else {
            addFile(file);
          }
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input ref={imageInputRef} {...getInputProps()} />
              {children}
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};
FilePicker.propTypes = {
  accept: PropTypes.string,
  children: PropTypes.node,
  disableClick: PropTypes.bool,
  onFilesSelected: PropTypes.func,
};

FilePicker.defaultProps = {
  children: <></>,
  disableClick: false,
  onFilesSelected: () => {},
  accept:
    'image/jpeg, image/png, application/pdf, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/msword,  application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};
export default FilePicker;
