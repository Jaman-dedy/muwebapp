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

const LevelImage = ({ level, isCurrent }) => {
  const [levelImage, setLevelImage] = useState();
  useEffect(() => {
    if (level === 'rookie') {
      setLevelImage(rookie);
    } else if (level === 'explorer') {
      setLevelImage(explorer);
    } else if (level === 'silver') {
      setLevelImage(silver);
    } else if (level === 'bronze') {
      setLevelImage(bronze);
    } else if (level === 'gold') {
      setLevelImage(gold);
    } else if (level === 'platinum') {
      setLevelImage(platinum);
    } else if (level === 'ambassador') {
      setLevelImage(ambassador);
    }
  }, [level]);

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

        <span
          className={
            isCurrent === 'currentStatus'
              ? 'levelLabelBold imgTxt'
              : 'levelLabel imgTxt'
          }
        >
          100pts
        </span>
      </div>
    </>
  );
};
LevelImage.propTypes = {
  level: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
};
LevelImage.defaultProps = {
  level: '',
};

export default LevelImage;
