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
import validateImg from 'helpers/image/validateImg';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';
import { HOME_WEBSITE, HOW_IT_WORKS } from 'constants/general';
import SelectLanguage from 'components/common/SelectLanguage';
import PersonaBackGround from 'assets/images/BGPersona.png';
import PhoneBackGround from 'assets/images/BGPhone.png';

const AuthWrapper = ({ children, rightHeadlineText, authHeader, register }) => {
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
    if (!dailyEvent.data && Country) {
      fetchDailyEvent();
    }
  }, [Country]);

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
      setOffset(window.pageYOffset);
    };
  }, []);

  return (
    <div
      onClick={() => {
        setOpenLanguage(false);
      }}
      className="page-wrapper"
    >
      <div class="wrap-top-bar">
        <div className="main-logo">
          <Image src={LogoColored} />
        </div>
        <div className="lang-dropdown">
          {getSupportedLanguagesLoading ? null : (
            <SelectLanguage
              open={openLanguage}
              setOpen={setOpenLanguage}
            />
          )}
        </div>
      </div>
      <div className="wrap-auth-section">
        <div
          className={
            register ? 'auth-register-box' : 'auth-login-box'
          }
        >
          <div className="wrap-auth">
            <h1>{rightHeadlineText}</h1>
            {authHeader && <div>{global.translate(authHeader)}</div>}
            {children}
          </div>
          <div className="auth-terms">
            Copyright &copy; {new Date().getFullYear()} Ossix
            Technologies, LLC.
            {global.translate('All rights reserved')}.
          </div>
        </div>
      </div>
      <div className="persona-background">
        <Image src={PersonaBackGround} />
      </div>
      <div className="phone-background">
        <Image src={PhoneBackGround} />
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
  register: PropTypes.bool,
};

AuthWrapper.defaultProps = {
  authHeader: '',
  register: false
};

export default AuthWrapper;
