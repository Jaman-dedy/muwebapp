import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import abName from 'utils/abName';
import randomColor from 'utils/randomColor';
import './index.scss';
import Img from '../Img';

const Thumbnail = React.memo(
  ({
    avatar,
    name,
    height,
    width,
    secondName,
    style,
    className,
    hasError,
    setHasError,
  }) => {
    const [loadWithError, setLoadWithError] = useState(false);
    useEffect(() => {
      if (loadWithError) {
        setHasError(true);
      }
    }, [loadWithError]);
    return (
      <>
        {avatar && !loadWithError ? (
          <Img
            src={avatar.startsWith('blob:') ? avatar : avatar}
            alt=""
            className={`thumbnail ${className}`}
            circular
            height={height}
            width={width}
            format="png"
            style={{ ...style }}
            compress
            hasError={loadWithError}
            setHasError={setLoadWithError}
          />
        ) : (
          <div
            className={`thumbnail ${className}`}
            style={{ ...style, backgroundColor: randomColor() }}
          >
            {name !== '' || secondName !== '' ? (
              <span>
                {!secondName
                  ? abName(name)
                  : abName(name, secondName)}
              </span>
            ) : (
              <span>{abName('Not', 'Applicable')}</span>
            )}
          </div>
        )}
      </>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.avatar !== nextProps.avatar) {
      return false;
    }
    return true;
  },
);

Thumbnail.defaultProps = {
  secondName: null,
  style: {},
};

Thumbnail.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string,
  secondName: PropTypes.string,
  style: PropTypes.objectOf(Object),
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
};
Thumbnail.defaultProps = {
  name: 'N/A',
  secondName: 'A',
  style: PropTypes.objectOf(Object),
  height: '50px',
  width: '50px',
  className: '',
};
export default Thumbnail;
