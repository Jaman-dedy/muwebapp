/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Image, Button } from 'semantic-ui-react';
import success from 'assets/images/success.svg';
import { restoreRegisterUser } from 'redux/actions/users/registerUser';

import './../../ResetPassword/Congratulation/Congratulation.scss';
import { clearFoundUser } from 'redux/actions/contacts/locateUser';

const Congratulation = ({ screenSeven }) => {
  const history = useHistory();
  const {
    registerUser: { username, Wallets },
  } = screenSeven;

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
              'Your account and wallet(s) have been successfully created.',
              1206,
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
          <Button
            className="submit"
            onClick={() => {
              clearFoundUser()(dispatch);
              restoreRegisterUser()(dispatch);
              history.push('/login');
            }}
          >
            {global.translate('Get started', 190)}
          </Button>
        </div>
      </div>
    </div>
  );
};

Congratulation.propTypes = {
  screenSeven: PropTypes.instanceOf(Object).isRequired,
};

export default Congratulation;
