import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import abName from 'utils/abName';
import randomColor from 'utils/randomColor';
import './index.scss';

const Thumbnail = ({
  avatar,
  name,
  height,
  secondName,
  style,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    console.log(
      avatar,
      name,
      height,
      secondName,
      style,
      rest,
      avatar,
      name,
      height,
      secondName,
      style,
    );
  }, [avatar, name, height, secondName, style, rest]);

  return (
    <>
      {avatar && !hasError ? (
        <Image
          src={avatar}
          alt=""
          className="thumbnail"
          circular
          height={height}
          onError={() => setHasError(true)}
          style={{ ...style }}
          {...rest}
        />
      ) : (
        <div
          {...rest}
          className="thumbnail"
          style={{ ...style, backgroundColor: randomColor() }}
        >
          <span>
            {!secondName ? abName(name) : abName(name, secondName)}
          </span>
        </div>
      )}
    </>
  );
};

Thumbnail.defaultProps = {
  secondName: null,
  style: {},
};

Thumbnail.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string,
  secondName: PropTypes.string,
  style: PropTypes.objectOf(Object),
  height: PropTypes.number,
};
Thumbnail.defaultProps = {
  name: 'N/A',
  secondName: 'A',
  style: PropTypes.objectOf(Object),
  height: 40,
};
export default Thumbnail;
