import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

const Img = ({ src, alt, className, onClick }) => {
  const [hidden, hideImage] = useState(true);

  return (
    <>
      {hidden ? alt : ''}
      <Image
        src={src}
        onLoad={() => hideImage(false)}
        className={className}
        hidden={hidden}
        onClick={onClick}
      />
    </>
  );
};

Img.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Img.defaultProps = {
  src: '',
  alt: '',
  className: '',
  onClick: () => true,
};

export default Img;
