import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { Icon, Image } from 'semantic-ui-react';
import success from 'assets/images/success.svg';
import './Congratulation.scss';

import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';

const Congratulation = ({ screenSix }) => {
  const { resetPassword, resetSuccess } = screenSix;

  const history = useHistory();

  const handleRedirect = () => {
    if (isAppDisplayedInWebView()) {
      history.push(
        `${history.location.pathname}?reset-password-success=1`,
      );
    }
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  return (
    <div className="congratulation-reset">
      <div className="content">
        <Image src={success} />
        <h1 className="headline">
          <span>{global.translate('Congratulations')}</span>.
        </h1>
        <div className="congratulate">
          <span className="name">{resetPassword.FirstName}</span>,{' '}
          {global.translate('you made it')}!
        </div>
        <div className="text">
          <span>
            {global.translate(
              'Your password  have been changed. This is effective immediately',
            )}
          </span>
        </div>

        <div className="login">
          <Link className="submit" to="/login" onClick={resetSuccess}>
            {global.translate('Login')}
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
