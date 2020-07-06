/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Image } from 'semantic-ui-react';
import blackMan from 'assets/images/output.png';
import { restoreRegisterUser } from 'redux/actions/users/registerUser';

import './style.scss';

const Congratulation = ({ screenSeven }) => {
  const {
    registerUser: { username, Wallets },
  } = screenSeven;

  const dispatch = useDispatch();
  return (
    <div className="congratulation">
      <Image src={blackMan} centered className="confirmation-image" />
      <div className="headline">
        <span>{global.translate('Congratulations')}</span>
      </div>
      <div className="congratulate">
        <span className="name">{username}</span>
        <span>, {global.translate('you made it')}</span>
      </div>
      <div className="text">
        <span>
          {global.translate(
            'Your account has been successfully created',
            1206,
          )}
        </span>
        <br />
        <br />
        <span>
          {global.translate(
            'We have created a wallet for you in 2UMoney virtual currency.',
            548,
          )}
        </span>
      </div>
      <div className="accounts">
        {Wallets &&
          Wallets.map(wallet => (
            <div className="account">
              <Image src={wallet.Flag} className="inline" />
              <span>{wallet.WalletNumber}</span>
            </div>
          ))}
      </div>
      <span className="whatsnext">
        {global.translate('What’s next?', 1247)}?
      </span>
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
        <span>{global.translate('Or')}</span>
      </div>
      <div className="login">
        <Link
          to="/login"
          onClick={() => restoreRegisterUser()(dispatch)}
        >
          {global.translate('Login')}
        </Link>
      </div>
    </div>
  );
};

Congratulation.propTypes = {
  screenSeven: PropTypes.instanceOf(Object).isRequired,
};

export default Congratulation;
