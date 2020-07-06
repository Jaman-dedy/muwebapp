import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

import rookie from 'assets/images/rookie.png';
import explorer from 'assets/images/explorer.png';
import silver from 'assets/images/silver.png';
import bronze from 'assets/images/bronze.png';
import gold from 'assets/images/gold.png';
import platinum from 'assets/images/platinum.png';
import ambassador from 'assets/images/ambassador.png';

import './LevelImage.scss';

const LevelImage = ({
  level,
  isCurrent,
  statusCode,
  currentPoints,
}) => {
  const [levelImage, setLevelImage] = useState();

  useEffect(() => {
    if (statusCode === '0') {
      setLevelImage(rookie);
    } else if (statusCode === '1') {
      setLevelImage(explorer);
    } else if (statusCode === '2') {
      setLevelImage(silver);
    } else if (statusCode === '3') {
      setLevelImage(bronze);
    } else if (statusCode === '4') {
      setLevelImage(gold);
    } else if (statusCode === '5') {
      setLevelImage(platinum);
    } else if (statusCode === '6') {
      setLevelImage(ambassador);
    }
  }, []);

  return (
    <>
      <div className="levelImageContainer">
        <span
          className={
            isCurrent === 'currentStatus'
              ? 'levelLabelBold imgTxt'
              : 'levelLabel imgTxt'
          }
        >
          {level}
        </span>
        <Image
          src={levelImage}
          className={
            isCurrent === 'currentStatus'
              ? 'currentLevelimage levelImage'
              : 'levelImage'
          }
        />
        {isCurrent === 'currentStatus' && (
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#000000',
            }}
          >{`${currentPoints} pts`}</span>
        )}
      </div>
    </>
  );
};
LevelImage.propTypes = {
  level: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
  statusCode: PropTypes.string,
  isCurrent: PropTypes.string,
  currentPoints: PropTypes.string,
};
LevelImage.defaultProps = {
  level: '',
  statusCode: '',
  isCurrent: '',
  currentPoints: '',
};

export default LevelImage;
