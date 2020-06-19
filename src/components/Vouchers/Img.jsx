import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import shopPlaceholder from 'assets/images/shopplaceholder.jpg';
import shopPlaceholderBanner from 'assets/images/placeholderBanner.png';

const Thumbnail = ({ pic, style, className, type }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [pic]);

  return (
    <>
      {pic && !hasError ? (
        <Image
          src={pic}
          alt=""
          className={className}
          onError={() => setHasError(true)}
          style={{ ...style }}
        />
      ) : (
        <Image
          src={
            type !== 'banner'
              ? shopPlaceholder
              : shopPlaceholderBanner
          }
          style={{ ...style }}
          className={className}
        />
      )}
    </>
  );
};

Thumbnail.defaultProps = {
  style: {},
  type: 'shopImage',
  className: '',
};

Thumbnail.propTypes = {
  pic: PropTypes.string.isRequired,
  style: PropTypes.objectOf(Object),
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Thumbnail;
