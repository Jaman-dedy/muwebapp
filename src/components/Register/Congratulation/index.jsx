/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Image } from 'semantic-ui-react';
import success from 'assets/images/success.svg';
import { restoreRegisterUser } from 'redux/actions/users/registerUser';
import './style.scss';

import '../../ResetPassword/Congratulation/Congratulation.scss';

const Congratulation = ({ congratulationPage }) => {
  const {
    registerUser: { username, Wallets },
  } = congratulationPage;

  const dispatch = useDispatch();
  return (
    <div className="congratulation-reset">
      <div className="content">
        <Image src={success} />
        <h1 className="headline">
          <span>{global.translate('Congratulations', 950)}</span>.
        </h1>
        <div className="congratulate">
          <span className="name">{username}</span>
          <span>, {global.translate('you made it', 1246)}</span>!
        </div>
        <div className="text">
          <div>
            {global.translate(
              'Your account has been successfully created.',
              1206,
            )}
          </div>
          <div>
            {global.translate(
              'We have created a wallet for you in M2U Money virtual currency.',
              548,
            )}
          </div>
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
        <div className="login">
          <Link
            to="/login"
            className="submit"
            onClick={() => restoreRegisterUser()(dispatch)}
          >
            {global.translate('Get started', 190)}
          </Link>
        </div>
      </div>
    </div>
  );
};

Congratulation.propTypes = {
  congratulationPage: PropTypes.instanceOf(Object).isRequired,
};

export default Congratulation;
