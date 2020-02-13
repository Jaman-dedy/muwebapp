/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import blackMan from 'assets/images/output.png';

import './style.scss';

const Congratulation = ({ screenSeven }) => {
  const {
    registerUser: { username, WalletNumber },
    countryCurrencies: { currencies },
  } = screenSeven;

  const currency = currencies.find(
    ({ Currency }) => Currency === WalletNumber.split('-')[0],
  );

  return (
    <div className="congratulation">
      <Image src={blackMan} centered className="confirmation-image" />
      <div className="headline">
        <span>Congratulations</span>
      </div>
      <div className="congratulate">
        <span className="name">{username}</span>
        <span>, you made it</span>
      </div>
      <div className="text">
        <span>Your 2U account has been successfully created</span>
        <br />
        <br />
        <span>
          We have also created the following wallets for you
        </span>
      </div>
      <div className="account">
        <Image
          src={currency ? currency.CurrencyFlag : ''}
          className="inline"
        />
        <span>{WalletNumber}</span>
      </div>

      <span className="whatsnext">What's next?</span>
      <div className="video-tour">
        <iframe
          title="Video tour to 2u money"
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/668nUCeBHyY?autoplay=1"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="or">
        <span>Or</span>
      </div>
      <div className="login">
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

Congratulation.propTypes = {
  screenSeven: PropTypes.instanceOf(Object).isRequired,
};

export default Congratulation;
