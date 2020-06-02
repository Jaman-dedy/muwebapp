import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import PREVIOUS_ICON from 'assets/images/arrow.png';
import classes from './GoBack.module.scss';

const GoBack = ({ onClickHandler, style }) => (
  <div className={style ? classes.CustomStyle : classes.GoBack}>
    <Image
      src={PREVIOUS_ICON}
      height={30}
      className="goBack"
      onClick={onClickHandler}
    />
  </div>
);

GoBack.propTypes = {
  onClickHandler: PropTypes.func,
  style: PropTypes.bool,
};

GoBack.defaultProps = {
  onClickHandler: () => {},
  style: false,
};

export default GoBack;
