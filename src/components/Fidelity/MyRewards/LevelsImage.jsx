/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

import explorer from 'assets/images/medals/explorer.svg';
import silver from 'assets/images/medals/silver.svg';
import platinum from 'assets/images/medals/platinum.svg';
import ambassador from 'assets/images/medals/ambassador.svg';
import bronze from 'assets/images/medals/bronze.svg';
import gold from 'assets/images/medals/gold.svg';
import rookie from 'assets/images/medals/rookie.svg';

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
