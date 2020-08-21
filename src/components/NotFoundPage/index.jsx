import React from 'react';
import { useHistory, Link } from 'react-router-dom';

import { Image } from 'semantic-ui-react';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';
import EmpyStore from 'assets/images/EmpyStoreIcon.svg';

import './NotFoundPage.scss';

const NotFoundPage = () => {
  const history = useHistory();
  const onClickHandler = () => history.goBack();
  return (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title">
            {global.translate('Page not found')}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className="empty-store">
        <Image src={EmpyStore} />
        <h2>
          Oops, looks like the page you are looking for is not found
        </h2>
        <div>
          {' '}
          You can navigate to other pages or you can click on this
          button below to navigate to the home page
        </div>
        <button
          type="button"
          onClick={() => {
            history.push({
              pathname: '/',
            });
          }}
        >
          Home
        </button>
      </div>
    </DashboardLayout>
  );
};

export default NotFoundPage;
