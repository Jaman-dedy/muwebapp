import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import abName from 'utils/abName';
import randomColor from 'utils/randomColor';
import './index.scss';
import avatarEvent from 'services/socketIO/events/avatar';

const Thumbnail = React.memo(
  ({ avatar, name, height, secondName, style }) => {
    const [hasError, setHasError] = useState(false);
    const [random, setRandom] = useState(Math.random());
    avatarEvent(setRandom);
    return (
      <>
        {avatar && !hasError ? (
          <Image
            src={
              avatar.startsWith('blob:')
                ? avatar
                : `${avatar}?${random}`
            }
            alt=""
            className="thumbnail"
            circular
            height={height}
            onError={() => setHasError(true)}
            style={{ ...style }}
          />
        ) : (
          <div
            className="thumbnail"
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
  height: PropTypes.number,
};
Thumbnail.defaultProps = {
  name: 'N/A',
  secondName: 'A',
  style: PropTypes.objectOf(Object),
  height: 40,
};
export default Thumbnail;
