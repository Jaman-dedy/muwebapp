/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import 'dotenv/config';

import ImagePlaceHolder from 'components/common/LazyLoadingImages/ImagePlaceHolder';
import cameraIcon from 'assets/images/camera-icon.png';

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
  notRounded,
  ...props
}) => {
  const [hidden, hideImage] = useState(true);
  const imageInputRef = useRef(null);
  let imgUrl = src;

  const { REACT_APP_FILE_SERVICES_URL } = process.env;

  if (compress && src && (width || height || format)) {
    imgUrl = `${REACT_APP_FILE_SERVICES_URL}/files/compress-remote-image?source=${src}&width=${width}&height=${height}&format=${format}`;
  }

  const styles = {
    width: 45,
    height: 38,
    background: '#ffffff',
    boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    position: 'absolute',
    bottom: '-5%',
    right: '-10%',
  };

  return (
    <>
      {hidden && hasError ? alt : ''}
      {hidden && !hasError ? (
        <ImagePlaceHolder
          style={{ ...style, borderRadius: notRounded ? '0' : '50%' }}
        />
      ) : (
        ' '
      )}
      <Image
        {...props}
        src={imgUrl}
        onLoad={() => hideImage(false)}
        className={className}
        hidden={hidden}
        onClick={onClick}
        style={{ width, height, ...style }}
        {...{ size: size || undefined }}
        {...{ centered: centered || undefined }}
        onError={() => setHasError(true)}
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
          <input
            type="file"
            accept="image/*"
            name={name}
            ref={imageInputRef}
            onChange={onImageChange}
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
  compress: PropTypes.bool.isRequired,
  width: PropTypes.instanceOf(String).isRequired,
  height: PropTypes.instanceOf(String).isRequired,
  format: PropTypes.instanceOf(String).isRequired,
  style: PropTypes.instanceOf(Object).isRequired,
  size: PropTypes.instanceOf(String).isRequired,
  circular: PropTypes.bool,
  hasError: PropTypes.bool,
  setHasError: PropTypes.func,
  notRounded: PropTypes.bool,
};

Img.defaultProps = {
  src: '',
  alt: '',
  className: '',
  onClick: () => true,
  onImageChange: false,
  camStyle: {},
  name: '',
  circular: false,
  hasError: false,
  setHasError: () => {},
  centered: false,
  notRounded: false,
};

export default Img;
