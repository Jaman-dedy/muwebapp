import './auth-landing-page.scss';
import './spiner.scss';
import './style.scss';

import AdPlaceholer from 'assets/images/AD_V1.jpg';
import bgCoverDefaultImage from 'assets/images/africaLadyWithPhone.jpg';
import LogoColored from 'assets/images/logo-colored.svg';
import SelectLanguage from 'components/common/SelectLanguage';
import validateImg from 'helpers/image/validateImg';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Image } from 'semantic-ui-react';

const setCoverImage = {
  backgroundImage: `url("${bgCoverDefaultImage}")`,
};
let isImgCorrect = false;
let setEventImg;

const AuthWrapper = ({ children, rightHeadlineText, authHeader }) => {
  let eventUrl;
  let sideBardWrapper;
  const { dailyEvent } = useSelector(
    ({ authWrapper }) => authWrapper,
  );
  if (!dailyEvent.data) {
    sideBardWrapper = (
      <div className="loader_login">
        {global.translate('Loading', 194)}...
      </div>
    );
  } else {
    eventUrl =
      dailyEvent.data[0].ResultURL || dailyEvent.data[0].DefaultURL;
    setEventImg = {
      backgroundImage: `url("${eventUrl}")`,
    };
  }
  validateImg(eventUrl).then(
    function fulfilled(img) {
      isImgCorrect = true;
    },

    function rejected() {
      isImgCorrect = false;
    },
  );
  return (
    <div className="wrapper">
      <div className="os-header">
        <div className="os-container">
          <Grid columns="two">
            <Grid.Row>
              <Grid.Column mobile={6} tablet={6} computer={4}>
                <Image className="logo" src={LogoColored} />
              </Grid.Column>
              <Grid.Column mobile={10} tablet={10} computer={12}>
                <SelectLanguage />
                <ul className="nav-menu hide-on-small">
                  <li>
                    <a href="https://2u.money">
                      {global.translate('Home', 134)}
                    </a>
                  </li>
                  <li>
                    <Link to="/marketplace">
                      {global.translate('Marketplace')}{' '}
                    </Link>
                  </li>
                  <li>
                    <a href="https://2u.money/how-it-works">
                      {global.translate('How it works')}
                    </a>
                  </li>
                </ul>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
      <div className="wrap-auth-section">
        <div className="os-container">
          <div className="auth-section">
            <div className="wrap-event">
              {!eventUrl ? (
                <Image src={AdPlaceholer} />
              ) : (
                <Image src={AdPlaceholer} />
              )}
            </div>
            <div className="wrap-auth">
              <h2 className="right-sub-header">
                {rightHeadlineText}
              </h2>
              {authHeader && (
                <div className="auth-sub-text">
                  {global.translate(authHeader)}
                </div>
              )}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AuthWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  rightHeadlineText: PropTypes.string.isRequired,
  authHeader: PropTypes.string,
};

AuthWrapper.defaultProps = {
  authHeader: '',
};

export default AuthWrapper;
