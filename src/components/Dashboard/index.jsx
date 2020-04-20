import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import './Dashboard.scss';
import DashboardLayout from 'components/common/DashboardLayout';
import MoneyTransferIcon from 'assets/images/transactionsimage.png';
import AddMoneyIcon from 'assets/images/add_money_dash.png';
import MyWalletIcon from 'assets/images/my_wallet_dash.png';
import ContactIcon from 'assets/images/contact_icon_dash.png';
import ServicesIcon from 'assets/images/services.png';
import DefaultWalletContainer from 'containers/Dashboard/defaultWallet';
import GraphDataContainer from 'containers/Dashboard/cumulativeGraph';
import UserCurrenciesContainer from 'containers/Dashboard/userCurrencies';
import NetworthContainer from 'containers/Dashboard/networth';
import StatusBar from './StatusBar';
import WelcomeBar from './WelcomeSection';
import CardComponent from '../common/BottomMenu/Card';

const Dashboard = ({ userData, authData }) => {
  const history = useHistory();
  const getStatusMessage = () => {
    if (authData && authData.DOBSet === 'NO') {
      return {
        message: global.translate(
          'Your date of birth is not set yet.',
          465,
        ),
        type: 'DOB',
      };
    }
    if (authData && authData.QuestionsSet === 'NO') {
      return {
        message: global.translate(
          'You have not set your security questions.',
          466,
        ),
        type: 'SecurityQuestion',
      };
    }

    if (authData && authData.UserVerified === 'NO') {
      return {
        message: global.translate(
          'You have not yet upload your Identification documents.',
          474,
        ),
        type: 'IdDocs',
      };
    }
    return null;
  };

  const onEdit = () => {
    if (getStatusMessage()) {
      history.push(
        `/account-management?target=${getStatusMessage().type}`,
      );
    }
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
          {getStatusMessage() && (
            <StatusBar
              onEdit={onEdit}
              message={global.translate(getStatusMessage().message)}
            />
          )}
          <div className="dashboard-content-wrapper">
            <div className="top-section">
              <div className="wallet">
                <DefaultWalletContainer />
              </div>
              <div className="dash_graph1">
                <GraphDataContainer />
              </div>
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
                to="/money-transfer"
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
                to="/wallets"
              />
              <CardComponent
                image={ContactIcon}
                title={global.translate('Contacts', 109)}
                subtitle={global.translate('Manage my Contacts')}
                to="/contacts"
              />
              <CardComponent
                image={ServicesIcon}
                title={global.translate('Services')}
                subtitle={global.translate('Find or offer a service')}
                to="/services"
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
