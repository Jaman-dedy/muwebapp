import React from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';
import DashboardLayout from 'components/common/DashboardLayout';
import MoneyTransferIcon from 'assets/images/transactions.png';
import AddMoneyIcon from 'assets/images/add_money_dash.png';
import MyWalletIcon from 'assets/images/my_wallet_dash.png';
import ContactIcon from 'assets/images/contact_icon_dash.png';
import DefaultWalletContainer from 'containers/Dashboard/defaultWallet';
import GraphDataContainer from 'containers/Dashboard/cumulativeGraph';
import UserCurrenciesContainer from 'containers/Dashboard/userCurrencies';
import NetworthContainer from 'containers/Dashboard/networth';
import StatusBar from './StatusBar';
import WelcomeBar from './WelcomeSection';
import CardComponent from './BottomMenu/Card';

const Dashboard = ({ userData, authData }) => {
  const getStausMessage = () => {
    if (authData && authData.DOBSet === 'NO') {
      return global.translate(
        'Your date of birth is not set yet.',
        465,
      );
    }
    if (authData && authData.QuestionsSet === 'NO') {
      return global.translate(
        'You have not set your security questions.',
        466,
      );
    }

    if (authData && authData.UserVerified === 'NO') {
      return global.translate(
        'You have not yet upload your Identification documents.',
        474,
      );
    }
    return null;
  };

  return (
    <>
      <DashboardLayout>
        <div className="dashboard">
          <WelcomeBar loading={userData.loading}>
            <span className="lighter">
              {global.translate('Welcome to')} 2U &nbsp;
              <span className="bold">
                {userData.data ? `  ${userData.data.FirstName}` : ''}
              </span>
              ,
            </span>
          </WelcomeBar>
          {getStausMessage() && (
            <StatusBar
              message={global.translate(getStausMessage())}
            />
          )}
          <div className="dashboard-content-wrapper">
            <div className="top-section">
              <div className="wallet">
                <DefaultWalletContainer />
              </div>
              <GraphDataContainer />
            </div>
            <div className="currencies-container">
              <UserCurrenciesContainer />
            </div>
            <div className="networth-container">
              <NetworthContainer />
            </div>
          </div>
          <div className="services">
            <p className="sub-title">
              {global.translate('Our Services')}
            </p>
            <div className="to-u-services">
              <CardComponent
                image={MoneyTransferIcon}
                title="Money transfer"
                subtitle=" Transfer money to your friend in 2U`money"
              />
              <CardComponent
                image={AddMoneyIcon}
                title={global.translate('Add money', 89)}
                to="/add-money"
                subtitle="Add money to your wallet using your credit card"
              />
              <CardComponent
                image={MyWalletIcon}
                title={global.translate('My wallets', 68)}
                subtitle={global.translate('Manage my wallets', 142)}
              />
              <CardComponent
                image={ContactIcon}
                title={global.translate('Contacts', 109)}
                subtitle={global.translate('Manage my Contacts')}
              />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

Dashboard.propTypes = {
  authData: PropTypes.objectOf(PropTypes.any),
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
};

Dashboard.defaultProps = {
  authData: {},
};
export default Dashboard;
