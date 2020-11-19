/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import propTypes from 'prop-types';
import classes from './CardBack.module.scss';

const CardBack = ({ wallet, onClick }) => {
  return (
    <div onClick={onClick} className={`${classes.Verso} ${wallet.levelColor ||
      wallet.LevelName}`}>
      <div className={classes.Header}>www.m2u.money</div>
      <div className={classes.Cvv}>
        <span>CVV: {wallet && wallet.CVV}</span>
      </div>
    </div>
  );
};

CardBack.propTypes = {
  wallet: propTypes.instanceOf(Object).isRequired,
  onClick: propTypes.func.isRequired,
};

export default CardBack;
