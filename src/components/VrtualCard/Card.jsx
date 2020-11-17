import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import Logo from 'assets/images/logo.png';
import classes from './Card.module.scss';

const Card = ({ virtualCard, userData }) => {
  return (
    <div className={classes.Card}>
      <div className={classes.LeftSide}>
        <span className={classes.CardTitle}>
          {global.translate(`O-Card`)}
        </span>
        <span className={classes.CardNumber}>
          {virtualCard && virtualCard.CardNumberSpaced}
        </span>
        <span className={classes.Cvv}>
          {virtualCard && virtualCard.CVV}
        </span>
        <span className={classes.cardOwner}>
          {' '}
          {`${userData?.FirstName} ${userData?.LastName}`}
        </span>
      </div>
      <div className={classes.RightSide}>
        <div className={classes.Logo}>
          <span>{global.translate(`M2U Money`)}</span>
          <Image src={Logo} size="mini" circular centered />
        </div>
        <div className={classes.Date}>
          <span>{global.translate(`VALID TRHU`)}</span>
          <span>
            {virtualCard && `${virtualCard.MM}'/'${virtualCard.YYYY}`}
          </span>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  virtualCard: PropTypes.objectOf(PropTypes.any).isRequired,
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default Card;
