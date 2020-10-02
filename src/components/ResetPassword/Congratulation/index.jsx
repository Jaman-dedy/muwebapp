import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { Icon, Image } from 'semantic-ui-react';
import back from 'assets/images/back_icon.png';
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
      <div className="back">
        <Image
          src={back}
          size="mini"
          href="/login"
          onClick={resetSuccess}
        />
      </div>

      <div className="content">
        <Icon name="check" className="check text-success" />
        <div className="headline">
          <span>{global.translate('Congratulations', 950)}</span>
        </div>
        <div className="congratulate">
          <span>
            {resetPassword.FirstName},{' '}
            {global.translate('You made it', 1246)}
          </span>
        </div>
        <div className="text">
          <span>
            {global.translate(
              'Your PIN number has been changed. This is effective immediately.',
              742,
            )}
          </span>
        </div>

        <div className="login">
          <Link to="/login" onClick={resetSuccess}>
            {global.translate('login', 190)}
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
