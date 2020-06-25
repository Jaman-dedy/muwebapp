/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

const Img = ({
  src,
  alt,
  size,
  centered,
  inline,
  spaced,
  width,
  height,
  style,
  className,
  onClick,
}) => {
  const [hidden, hideImage] = useState(true);
  return (
    <>
      {hidden ? alt : ''}
      <Image
        src={src}
        onLoad={() => hideImage(false)}
        className={className}
        hidden={hidden}
        inline={inline}
        spaced={spaced}
        onClick={onClick}
        style={{ width, height, ...style }}
        {...{ size: size || undefined }}
        {...{ centered: centered || undefined }}
      />
    </>
  );
};

Img.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
  size: PropTypes.string,
  centered: PropTypes.bool,
  inline: PropTypes.bool,
  spaced: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.instanceOf(Object),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Img.defaultProps = {
  src: '',
  alt: '',
  size: '',
  centered: false,
  inline: false,
  spaced: false,
  width: '',
  height: '',
  style: {},
  className: '',
  onClick: () => undefined,
};

export default Img;
