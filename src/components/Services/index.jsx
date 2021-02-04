/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import findServicesIcon from 'assets/images/services/send-c-service.svg';
import storeIcon from 'assets/images/services/money-t-service.svg';
import savingWalletIcon from 'assets/images/services/saving-w-service.svg';
import CardComponent from 'components/common/BottomMenu/Card';
import GoBack from 'components/common/GoBack';
import { Global } from 'recharts';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';

const MoneyTransfer = ({ userData }) => {
  const history = useHistory();
  const onClickHandler = () => history.goBack();

  return (
    <>
      <DashboardLayout>
        {!isAppDisplayedInWebView() && (
          <WelcomeBar>
            <div className="head-content">
              <div className="go-back">
                <GoBack style onClickHandler={onClickHandler} />
              </div>
              <h2 className="head-title">
                <span className="bold">
                  {userData.data && userData.data?.FirstName}
                </span>
                , {global.translate('enjoy our services', 2020)}
              </h2>
              <div className="clear" />
            </div>
          </WelcomeBar>
        )}
        <div className="wrap__container">
          <div className="services-container">
            <h3>{global.translate('Services')}</h3>
            <div className="container-subtitle">
              {global.translate('Explore our services')}
            </div>
            <div className="services-cards">
              <CardComponent
                image={storeIcon}
                title={global.translate('My stores', 848)}
                to="/my-stores"
                subtitle={global.translate(
                  'Find store or create one.',
                  2021,
                )}
              />
              <CardComponent
                image={findServicesIcon}
                to="/marketplace"
                title={global.translate(`Marketplace`)}
                subtitle={global.translate(
                  `Find products and services near you`,
                )}
              />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

MoneyTransfer.propTypes = {
  userData: PropTypes.instanceOf(Object),
};

MoneyTransfer.defaultProps = {
  userData: {
    data: {},
  },
};
export default MoneyTransfer;
