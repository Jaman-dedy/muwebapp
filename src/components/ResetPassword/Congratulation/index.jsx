/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon, Image } from 'semantic-ui-react';
import success from 'assets/images/success.svg';
import './Congratulation.scss';

const Congratulation = ({ screenSix }) => {
  const { resetPassword, resetSuccess } = screenSix;

  return (
    <div className="congratulation-reset">
      <div className="content">
        <Image
          src={success}
        />
        <h1 className="headline">
          <span>{global.translate('Congratulations', 950)}</span>.
        </h1>
        <div className="congratulate">
          <span className="name">{resetPassword.FirstName}</span>,{' '}
          {global.translate('you made it', 1246)}!
        </div>
        <div className="text">
          <span>
            {global.translate(
              'Your password and PIN number have been changed. This is effective immediately',
              742,
            )}
          </span>
        </div>

        <div className="login">
          <Link className="submit" to="/login" onClick={resetSuccess}>
            {global.translate('Login', 190)}
          </Link>
        </div>
      </div>
    </div>
  );
};

Congratulation.propTypes = {
  screenSix: PropTypes.instanceOf(Object).isRequired,
};

export default Congratulation;
