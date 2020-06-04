import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import PREVIOUS_ICON from 'assets/images/arrow.png';
import classes from './GoBack.module.scss';

const GoBack = ({ onClickHandler, style, authentication }) => (
  <div
    className={
      (style && classes.CustomStyle) ||
      (authentication && classes.Authentication) ||
      classes.GoBack
    }
  >
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
  authentication: PropTypes.bool,
};

GoBack.defaultProps = {
  onClickHandler: () => {},
  style: false,
  authentication: false,
};

export default GoBack;
