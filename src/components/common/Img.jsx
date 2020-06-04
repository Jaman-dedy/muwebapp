/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

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
  ...props
}) => {
  const [hidden, hideImage] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imageInputRef = useRef(null);

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
      {hidden ? (
        <ImagePlaceHolder
          style={{
            ...styles,
            camStyle,
            display: hidden ? 'none' : null,
          }}
        />
      ) : (
        ''
      )}
      <Image
        {...props}
        src={
          !src || src.startsWith('blob:')
            ? src
            : `${src}?${Math.random()}`
        }
        onLoad={() => hideImage(false)}
        className={className}
        hidden={hidden}
        onClick={onClick}
        onError={() => setHasError(true)}
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
};

Img.defaultProps = {
  src: '',
  alt: '',
  className: '',
  onClick: () => true,
  onImageChange: false,
  camStyle: {},
  name: '',
};

export default Img;
