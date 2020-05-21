import React from 'react';
import { Image } from 'semantic-ui-react';
import PREVIOUS_ICON from 'assets/images/arrow.png';
import classes from './GoBack.module.scss';

const GoBack = ({ onClickHandler }) => (
  <div className={classes.GoBack}>
    <Image
      src={PREVIOUS_ICON}
      height={30}
      className="goBack"
      onClick={onClickHandler}
    />
  </div>
);

export default GoBack;
