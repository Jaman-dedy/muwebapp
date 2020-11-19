/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import propTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import LogoImg from 'assets/images/logo_colored.svg';
import classes from './CardFront.module.scss';

const CardFront = ({ wallet, onClick }) => {
  return (
    <div onClick={onClick} className={classes.Recto}>
      <div className={classes.RectoHeader}>
        <span>{global.translate(`CREDIT CARD`)}</span>{' '}
        <div className={classes.RectoLogo}>
          {' '}
          <Image src={LogoImg} />
        </div>
      </div>
      <div className={classes.RectoCardNumber}>
        <span>{wallet && wallet.CardNumberSpaced}</span>
      </div>
      <div className={classes.RectoNameOnCard}>
        {/* <span>{wallet && wallet.NameOnCard}</span> */}
      </div>
    </div>
  );
};
CardFront.propTypes = {
  wallet: propTypes.instanceOf(Object).isRequired,
  onClick: propTypes.func.isRequired,
};
export default CardFront;
