import React, { useState } from 'react';
import PropTypes from 'prop-types';
import abName from 'utils/abName';
import randomColor from 'utils/randomColor';
import './index.scss';
import { Image } from 'semantic-ui-react';

const Thumbnail = ({ avatar, name, secondName, style }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <>
      {avatar && !hasError ? (
        <Image
          height={95}
          src={avatar}
          alt=""
          className="thumbnail"
          onError={() => setHasError(true)}
          style={{ ...style }}
        />
      ) : (
        <div
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
};
Thumbnail.defaultProps = {
  name: '',
  secondName: '',
  style: PropTypes.objectOf(Object),
};
export default Thumbnail;
