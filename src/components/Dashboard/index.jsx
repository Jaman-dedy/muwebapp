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
      return 'Your date of birth is not set yet. Click the Pencil icon to update in settings';
    }
    if (authData && authData.QuestionsSet === 'NO') {
      return 'You have not set your security questions. Click the Pencil icon to update in settings';
    }

    if (authData && authData.UserVerified === 'NO') {
      return 'You have not yet upload your Identification documents. Click the Pencil icon to upload them in settings';
    }
    return null;
  };

  return (
    <>
      <DashboardLayout>
        <div className="dashboard">
          <WelcomeBar loading={userData.loading}>
            <span className="lighter">
              Welcome to 2U &nbsp;
              <span className="bold">
                {userData.data ? `  ${userData.data.FirstName}` : ''}
              </span>
              ,
            </span>
          </WelcomeBar>
          {getStausMessage() && (
            <StatusBar message={getStausMessage()} />
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
            <p className="sub-title">Our Services</p>
            <div className="to-u-services">
              <CardComponent
                image={MoneyTransferIcon}
                title="Money transfer"
                subtitle=" Transfer money to your friend in 2U`money"
              />
              <CardComponent
                image={AddMoneyIcon}
                title="Add money"
                to="/add-money"
                subtitle="Add money to your wallet using your credit card"
              />
              <CardComponent
                image={MyWalletIcon}
                title="My wallets"
                subtitle="Manage my wallets"
              />
              <CardComponent
                image={ContactIcon}
                title="Contacts"
                subtitle="Manage my Contacts"
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
