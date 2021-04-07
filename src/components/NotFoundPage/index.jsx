import React from 'react';
import { useHistory } from 'react-router-dom';
import { Image, Icon } from 'semantic-ui-react';

import isAuth from 'utils/isAuth';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import ErrorImg from 'assets/images/404-or-500.svg';

import './NotFoundPage.scss';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';

const NotFoundPage = () => {
  const history = useHistory();
  return isAuth() ? (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <h2 className="head-title">
            {global.translate('Page not found', 2001)}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className="empty-store flex flex-column justify-content-center align-items-center">
        <Image src={ErrorImg} />
        <h2>
          {global.translate(
            `Oops, looks like the page you are looking for is not found`,
          )}
        </h2>
        <div>
          {' '}
          {global.translate(`You can navigate to other pages or you can click on this
          button below to navigate to the home page`)}
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              if (isAppDisplayedInWebView()) {
                history.push(
                  `${history.location.pathname}?redirect_back=1`,
                );
              } else {
                history.push({
                  pathname: '/',
                });
              }
            }}
            className="btn-auth btn-primary"
          >
            &nbsp; &nbsp;
            <Icon name="chevron left" className="text-white" />
            {global.translate('Home')}
            &nbsp; &nbsp;
          </button>
        </div>
      </div>
    </DashboardLayout>
  ) : (
    <div
      className="empty-store flex flex-column justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <Image src={ErrorImg} />
      <h2>
        {global.translate(
          `Oops, looks like the page you are looking for is not found`,
        )}
      </h2>
      <div>
        {global.translate(`You can navigate to other pages or you can click on this
          button below to navigate to the home page`)}
      </div>
      <div>
        <button
          type="button"
          onClick={() => history.push({ pathname: '/' })}
          className="btn-auth btn-primary"
        >
          &nbsp; &nbsp;
          <Icon name="chevron left" className="text-white" />
          {global.translate('Home')}
          &nbsp; &nbsp;
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
