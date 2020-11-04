// /* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef } from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import 'dotenv/config';

import ImagePlaceHolder from 'components/common/LazyLoadingImages/ImagePlaceHolder';
import cameraIcon from 'assets/images/camera-icon.png';
import ImageCroper from 'components/common/ImageCroper/CropImage';

const Img = ({
  src,
  alt,
  className,
  onClick,
  onImageChange,
  camStyle,
  name,
  centered,
  compress,
  width,
  height,
  format,
  style,
  size,
  circular,
  hasError,
  setHasError,
  not_rounded,
  onImageUnavailable,
  uploadIsLoading,
  ...props
}) => {
  const [hidden, hideImage] = useState(true);
  const imageInputRef = useRef(null);
  let imgUrl = src;

  const { REACT_APP_FILE_SERVICES_URL } = process.env;

  if (
    compress &&
    src &&
    !src.startsWith('blob:') &&
    (width || height || format)
  ) {
    imgUrl = `${REACT_APP_FILE_SERVICES_URL}/files/compress-remote-image?source=${src}&width=${width}&height=${height}&format=${format}`;
  }

  const styles = {
    width: 45,
    height: 38,
    background: '#ffffff',
    boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    position: 'absolute',
    objectFit: 'cover',
    bottom: '-5%',
    right: '-10%',
  };
  const [croperOpen, setCroperOpen] = useState(false);
  const [file, setFile] = useState('');

  const handleImageSelect = ({ target }) => {
    const { files } = target;
    if (files[0]) {
      setFile(files[0]);
      setCroperOpen(true);
    }
  };
  const upload = file => {
    onImageChange({ target: { name, value: new Array(file) } });
    setCroperOpen(false);
  };
  return (
    <>
      {hidden && hasError ? alt : ''}
      {hidden && !hasError ? (
        <ImagePlaceHolder
          style={{
            ...style,
            borderRadius: not_rounded ? '0' : '50%',
          }}
        />
      ) : (
        ' '
      )}
      <Image
        {...props}
        src={imgUrl}
        onLoad={() => {
          onImageUnavailable(imgUrl);
          hideImage(false);
        }}
        className={className}
        hidden={hidden}
        onClick={onClick}
        style={{ width, height, ...style }}
        {...{ size: size || undefined }}
        {...{ centered: centered || undefined }}
        onError={err => {
          setHasError(true);
          hideImage(true);
        }}
        circular={circular && circular}
      />
      {onImageChange && (
        <div
          style={{
            ...styles,
            ...camStyle,
            display: hidden ? 'none' : null,
          }}
          className="flex justify-content-center align-items-center cursor-pointer"
        >
          <ImageCroper
            open={croperOpen}
            setOpen={setCroperOpen}
            loading={uploadIsLoading}
            file={file}
            uploadImage={upload}
            chooseImage={handleImageSelect}
          />
          <input
            type="file"
            accept="image/*"
            name={name}
            ref={imageInputRef}
            onChange={handleImageSelect}
            style={{ display: 'none' }}
          />
          <Image
            src={cameraIcon}
            width={camStyle.width ? camStyle.width / 2 : 25}
            onClick={() => imageInputRef.current.click()}
          />
        </div>
      )}
    </>
  );
};

Img.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
  className: PropTypes.string,
  onClick: PropTypes.func,
  onImageChange: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  camStyle: PropTypes.instanceOf(Object),
  name: PropTypes.string,
  centered: PropTypes.bool,
  compress: PropTypes.bool,
  width: PropTypes.instanceOf(String).isRequired,
  height: PropTypes.instanceOf(String).isRequired,
  format: PropTypes.instanceOf(String).isRequired,
  style: PropTypes.instanceOf(Object).isRequired,
  size: PropTypes.instanceOf(String).isRequired,
  circular: PropTypes.bool,
  hasError: PropTypes.bool,
  onImageUnavailable: PropTypes.func,
  setHasError: PropTypes.func,
  not_rounded: PropTypes.bool,
  uploadIsLoading: PropTypes.bool,
};

Img.defaultProps = {
  src: '',
  alt: '',
  className: '',
  onImageUnavailable: () => {},
  onClick: () => true,
  onImageChange: false,
  camStyle: {},
  name: '',
  circular: false,
  hasError: false,
  setHasError: () => {},
  centered: false,
  not_rounded: false,
  compress: true,
  uploadIsLoading: false,
};
export default Img;
