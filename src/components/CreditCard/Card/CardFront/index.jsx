import React from 'react';
import propTypes from 'prop-types';
import { Image, Label } from 'semantic-ui-react';
import SimCardImg from 'assets/images/simCard.png';
import VisaCardTypeImg from 'assets/images/card-visa.png';
import MasterCardTypeImg from 'assets/images/mastercards.png';
import LogoImg from 'assets/images/textLogo.png';
import classes from './CardFront.module.scss';
import './frontBg.scss';

const CardFront = ({ wallet }) => {
  return (
    <>
      <div
        className={`${classes.Card} ${wallet.levelColor ||
          wallet.LevelName}`}
      >
        <div className={classes.CardHeader}>
          <div>{global.translate(`CREDIT CARD`)}</div>
          <div className={classes.LogoText}>
            <Image src={LogoImg} />
          </div>
        </div>
        {wallet.textLevels && (
          <Label
            className={classes.CardTypeLabel}
            as="a"
            style={{
              backgroundColor: 'rgba(255,255,255,0.4)',
              color: '#454545',
            }}
          >
            {wallet.textLevels}
          </Label>
        )}
        <div className={classes.SimCard}>
          <Image src={SimCardImg} />
        </div>
        <div className={classes.CardNumber}>
          <span>{wallet && wallet.CardNumberSpaced}</span>
        </div>
        <div className={classes.Expiry}>
          <span>{global.translate(`EXPIRES`)}</span>
          <span>
            <strong>{wallet && `${wallet.MM}/${wallet.YYYY}`}</strong>{' '}
          </span>
        </div>
        <div className={classes.CardFooter}>
          <div className={classes.CardOwner}>
            {wallet && wallet.NameOnCard}
          </div>
          <div className={classes.CardType}>
            <Image
              src={
                wallet.CardType === '1'
                  ? VisaCardTypeImg
                  : MasterCardTypeImg
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

CardFront.propTypes = {
  wallet: propTypes.instanceOf(Object).isRequired,
};
export default CardFront;
