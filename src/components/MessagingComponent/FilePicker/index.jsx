/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

const FilePicker = ({
  children,
  disableClick,
  onFilesSelected,
  accept,
  ...props
}) => (
  <Dropzone
    accept={accept}
    noClick={disableClick}
    {...props}
    className="ignore"
    onDrop={acceptedFiles => {
      acceptedFiles.map(file => {
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: (Math.random() * new Date()).toString(),
        });
        return onFilesSelected(acceptedFiles);
      });
    }}
  >
    {({ getRootProps, getInputProps }) => (
      <section>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {children}
        </div>
      </section>
    )}
  </Dropzone>
);
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
