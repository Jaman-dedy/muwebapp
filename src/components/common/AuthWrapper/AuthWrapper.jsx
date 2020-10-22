/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import moment from 'moment';
import './auth-landing-page.scss';
import './spiner.scss';
import './style.scss';

import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Image } from 'semantic-ui-react';
import LogoColored from 'assets/images/LOGO.svg';
import getUserDailyEvent from 'redux/actions/authWrapper';
import AdPlaceholderDefault from 'assets/images/M2U_UBA.png';
import SelectLanguage from 'components/common/SelectLanguage';
import validateImg from 'helpers/image/validateImg';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';
import { HOME_WEBSITE, HOW_IT_WORKS } from 'constants/general';

const AuthWrapper = ({ children, rightHeadlineText, authHeader }) => {
  let sideBardWrapper;
  const dispatch = useDispatch();
  const language = localStorage.getItem('language');
  const Country = localStorage.getItem('countryCode');
  const Today = moment().format('YYYY-MM-DD');
  const [openLanguage, setOpenLanguage] = useState(false);
  const [isImgCorrect, setIsImgCorrect] = useState(false);
  const [eventUrl, setEventUrl] = useState(null);

  const { dailyEvent } = useSelector(
    ({ authWrapper }) => authWrapper,
  );

  const {
    language: {
      supported: { loading: getSupportedLanguagesLoading },
    } = {},
  } = useSelector(({ user }) => user);

  const fetchDailyEvent = () => {
    const data = {
      Language: language || 'en',
      Country,
      Date: Today,
    };
    getUserDailyEvent(data)(dispatch);
  };

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!dailyEvent.data) {
      fetchDailyEvent();
    }
  }, []);

  useEffect(() => {
    if (dailyEvent.data) {
      validateImg(dailyEvent?.data?.[0]?.ResultURL).then(
        function fulfilled(img) {
          setIsImgCorrect(true);
        },

        function rejected() {
          setIsImgCorrect(false);
        },
      );
    }
  }, [dailyEvent]);

  useEffect(() => {
    if (isImgCorrect) {
      setEventUrl(dailyEvent?.data?.[0]?.ResultURL);
    }
  }, [isImgCorrect]);

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset)
    }
  }, []);

  return (
    <div
      onClick={() => {
        setOpenLanguage(false);
      }}
      className="wrapper"
    >
      <div className={ offset ? 'os-header bg-nav-scrolled' : 'os-header' }>
        {!isAppDisplayedInWebView() && (
          <div className="os-container">
            <Grid columns="two">
              <Grid.Row>
                <Grid.Column mobile={6} tablet={6} computer={4}>
                  <Image className="logo" src={LogoColored} />
                </Grid.Column>
                <Grid.Column mobile={10} tablet={10} computer={12}>
                  <ul className="nav-menu">
                    <li className="hide-on-small">
                      <a href={HOME_WEBSITE}>
                        {global.translate('Home', 134)}
                      </a>
                    </li>
                    <li className="hide-on-small">
                      <Link to="/marketplace">
                        {global.translate('Marketplace')}{' '}
                      </Link>
                    </li>
                    <li className="hide-on-small">
                      <a href={HOW_IT_WORKS}>
                        {global.translate('How it works')}
                      </a>
                    </li>
                    <li>
                      {getSupportedLanguagesLoading ? null : (
                        <SelectLanguage
                          open={openLanguage}
                          setOpen={setOpenLanguage}
                        />
                      )}
                    </li>
                  </ul>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        )}
      </div>
      <div className="wrap-auth-section">
        <div className="os-container">
          
          <div className="auth-section">
            <div className="wrap-event">
              {eventUrl ? (
                <Image src={eventUrl} />
              ) : (
                <Image src={AdPlaceholderDefault} />
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
