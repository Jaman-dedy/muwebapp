import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Image, Icon } from 'semantic-ui-react';

import isAuth from 'utils/isAuth';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import logo from 'assets/images/LOGO.svg';
import './LoadingPage.scss';

const LoadingPage = ({ loading }) => {
  const history = useHistory();

  return isAuth() ? (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <h3 className="head-title">M2U Money</h3>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div
        className="LoadingPage xlarge-padding flex flex-column justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
      >
        <Image src={logo} className="logo" />
        {loading ? null : (
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
        )}
      </div>
    </DashboardLayout>
  ) : (
    <div
      className="LoadingPage xlarge-padding flex flex-column justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <Image src={logo} className="logo" />
      {loading ? null : (
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
      )}
    </div>
  );
};

LoadingPage.propTypes = {
  loading: PropTypes.bool,
};

LoadingPage.defaultProps = {
  loading: true,
};

export default LoadingPage;
