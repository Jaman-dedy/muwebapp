import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import './Dashboard.scss';
import DashboardLayout from 'components/common/DashboardLayout';
import LineChart from 'components/common/charts/LineChart';

import MoneyTransferIcon from 'assets/images/transactions.png';
import AddMoneyIcon from 'assets/images/add_money_dash.png';
import MyWalletIcon from 'assets/images/my_wallet_dash.png';
import ContactIcon from 'assets/images/contact_icon_dash.png';

const Dashboard = ({ currentUser }) => {
  const [showWallet, setShowWallet] = useState(true);
  const history = useHistory();

  return (
    <>
      <DashboardLayout currentUser={currentUser}>
        <div className="dashboard">
          <div className="main-overview">
            <div className="overviewcard dash_upper_cards">
              <p className="large-text lighter text-darken-blue">
                My default wallet
              </p>
              <div className="small-padding radius-1 white shadow-1 flex flex-row justify-content-space-between align-items-center dash-flag-container">
                <div
                  className="flex flex-row align-items-center"
                  style={{ width: '80%' }}
                >
                  <span className="small-h-padding">
                    <Image
                      src={currentUser.data.Flag}
                      style={{ maxHeight: '30px' }}
                    />
                  </span>
                  <span className="medium-text small-h-padding">
                    {currentUser.data.Currency} :
                  </span>
                  <span className="medium-text small-h-padding">
                    {showWallet
                      ? currentUser.data.Balance
                      : Array(4)
                          .fill(1)
                          .map(index => (
                            <Icon
                              key={index}
                              name="circle"
                              size="small"
                              className="text-darken-blue"
                            />
                          ))}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowWallet(!showWallet)}
                  className="transparent no-border no-outline medium-h-padding cursor-pointer small-text"
                >
                  <Icon
                    name={`${showWallet ? 'eye' : 'eye slash'}`}
                    size="big"
                    className="text-darken-blue"
                  />
                </button>
              </div>
            </div>
            <div className="overviewcard dash_upper_cards">
              <span className="large-text lighter text-darken-blue">
                Cumulative networth
              </span>
              <span className="u-graph">
                <LineChart />
              </span>
            </div>
          </div>

          <div className="main-overview">
            <div className="overviewcard cards_bottom flex flex-column align-items-center ">
              <span className="lighter large-text large-v-margin ">
                Money transfer
              </span>
              <Image
                src={MoneyTransferIcon}
                style={{ height: '80px' }}
              />
              <span className="lighter large-v-margin medium-text center-align">
                Transfer money to your friend in 2Umoney
              </span>
            </div>
            <div
              className="overviewcard cards_bottom flex flex-column align-items-center "
              role="button"
              tabIndex={0}
              onClick={() => history.push('/addMoney')}
              onKeyDown={() => history.push('/addMoney')}
            >
              <span className="lighter large-text large-v-margin">
                Add money
              </span>
              <Image src={AddMoneyIcon} style={{ height: '80px' }} />
              <span className="lighter large-v-margin medium-text center-align">
                Add money to your wallet using your credit card
              </span>
            </div>
            <div className="overviewcard cards_bottom flex flex-column align-items-center ">
              <span className="lighter large-text large-v-margin">
                My wallets
              </span>
              <Image src={MyWalletIcon} style={{ height: '80px' }} />
              <span className="lighter large-v-margin medium-text center-align">
                Manage my wallet
              </span>
            </div>
            <div className="overviewcard cards_bottom flex flex-column align-items-center ">
              <span className="lighter large-text large-v-margin">
                Contact
              </span>
              <Image src={ContactIcon} style={{ height: '80px' }} />
              <span className="lighter large-v-margin medium-text center-align">
                Manage my contacts
              </span>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

Dashboard.propTypes = {
  currentUser: PropTypes.instanceOf(Object),
};

Dashboard.defaultProps = {
  currentUser: {
    data: {},
  },
};
export default Dashboard;
