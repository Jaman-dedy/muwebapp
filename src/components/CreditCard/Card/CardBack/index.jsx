import React from 'react';
import propTypes from 'prop-types';
import classes from './CardBack.module.scss';
import './backColor.scss';

const CardBack = ({ wallet }) => {
  return (
    <>
      <div
        className={`${classes.CardVerso} ${wallet.levelBackColor} || ${wallet.LevelName}`}
      >
        <span>{global.translate(`M2U Money`)}</span>
        <div className={classes.BlackSpace}> </div>
        <div className={classes.CVV}>
          <div className={classes.Lines}>
            <hr />
            <hr />
            <hr />
          </div>
          <div className={classes.Cvv}>{wallet && wallet.CVV}</div>
        </div>
        <div className={classes.Description}>
          <p>
            {' '}
            {global.translate(
              `This card is issued by M2U Money and is strictly personal. The use of the card is submitted to the general conditions of use. The card is the property of M2U Money and must be returned upon first request.`,
              1986,
            )}
          </p>
        </div>
      </div>
    </>
  );
};

CardBack.propTypes = {
  wallet: propTypes.instanceOf(Object).isRequired,
};

export default CardBack;
