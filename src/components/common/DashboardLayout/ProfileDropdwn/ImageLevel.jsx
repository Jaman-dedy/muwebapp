/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import explorer from 'assets/images/medals/explorer.svg';
import silver from 'assets/images/medals/silver.svg';
import platinum from 'assets/images/medals/platinum.svg';
import ambassador from 'assets/images/medals/ambassador.svg';
import bronze from 'assets/images/medals/bronze.svg';
import gold from 'assets/images/medals/gold.svg';
import rookie from 'assets/images/medals/rookie.svg';

const ImageLevel = ({ imageLevelNumber }) => {
  const [levelImage, setLevelImage] = useState();
  useEffect(() => {
    if (imageLevelNumber === '0') {
      setLevelImage(rookie);
    }
    if (imageLevelNumber === '1') {
      setLevelImage(explorer);
    }
    if (imageLevelNumber === '2') {
      setLevelImage(silver);
    }
    if (imageLevelNumber === '3') {
      setLevelImage(bronze);
    }
    if (imageLevelNumber === '4') {
      setLevelImage(gold);
    }
    if (imageLevelNumber === '5') {
      setLevelImage(platinum);
    }
    if (imageLevelNumber === '6') {
      setLevelImage(ambassador);
    }
  }, []);
  return <img src={levelImage} />;
};

ImageLevel.propTypes = {
  imageLevelNumber: PropTypes.instanceOf(Number).isRequired,
};
ImageLevel.defaultProps = {};
export default ImageLevel;
