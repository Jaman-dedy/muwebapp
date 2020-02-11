import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Icon, Grid } from 'semantic-ui-react';

import './Dashboard.scss';
import DashboardLayout from 'components/common/DashboardLayout';
import LineChart from 'components/common/charts/LineChart';

import MoneyTransferIcon from 'assets/images/transactions.png';
import AddMoneyIcon from 'assets/images/add_money_dash.png';
import MyWalletIcon from 'assets/images/my_wallet_dash.png';
import ContactIcon from 'assets/images/contact_icon_dash.png';

const Dashboard = ({ currentUser }) => {
  const [showWallet, setShowWallet] = useState(true);

  return (
    <>
      <DashboardLayout>
        <div className="dashboard">
          <div className="xlarge-h-padding white welcome flex flex-center  align-items-center large-text">
            <span className="lighter">
              Welcome to 2U,
              <span className="bold">
                {' '}
                {currentUser.data.FirstName}
              </span>
            </span>
          </div>
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
            <div className="overviewcard cards_bottom flex flex-column align-items-center ">
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

        {/*        <div className="dashboard border-1">
          <Grid padded>
            <Grid.Row>
              <Grid.Column computer={8} tablet={8} mobile={16}>
                <div className="overviewcard dash_upper_cards">
                  <p className="large-text lighter text-darken-blue">
                    My default wallet
                  </p>
                  <div className="xlarge-h-margin small-padding radius-1 white shadow-1 flex flex-row justify-content-space-between align-items-center">
                    <div
                      className="flex flex-row align-items-center"
                      style={{ width: '80%' }}
                    >
                      <span className="small-h-padding">
                        <Image src={currentUser.data.Flag} />
                      </span>
                      <span className="medium-text small-h-padding">
                        {currentUser.data.Currency} :
                      </span>
                      <span className="medium-text small-h-padding">
                        {showWallet
                          ? currentUser.data.Balance
                          : Array(5)
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
              </Grid.Column>
              <Grid.Column computer={8} tablet={8} mobile={16}>
                <div className="overviewcard dash_upper_cards">
                  <LineChart />
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column computer={10} tablet={16} mobile={16}>
                <Grid.Column width={16}>
                  <div className="overviewcard dash_upper_cards">
                    <p className="large-text lighter text-darken-blue">
                      My currencies
                    </p>
                  </div>
                </Grid.Column>
                <Grid>
                  <Grid.Row>
                    <Grid.Column
                      className="center-align"
                      computer={4}
                      tablet={4}
                      mobile={8}
                    >
                      <button
                        type="button"
                        className="white radius-1"
                      >
                        <Image
                          className="inline"
                          src={currentUser.data.Flag}
                        />{' '}
                        RWF
                      </button>
                    </Grid.Column>
                    <Grid.Column
                      className="center-align"
                      computer={4}
                      tablet={4}
                      mobile={8}
                    >
                      <button
                        type="button"
                        className="white radius-1"
                      >
                        <Image
                          className="inline"
                          src={currentUser.data.Flag}
                        />{' '}
                        RWF
                      </button>
                    </Grid.Column>
                    <Grid.Column
                      className="center-align"
                      computer={4}
                      tablet={4}
                      mobile={8}
                    >
                      <button
                        type="button"
                        className="white radius-1"
                      >
                        <Image
                          className="inline"
                          src={currentUser.data.Flag}
                        />{' '}
                        RWF
                      </button>
                    </Grid.Column>
                    <Grid.Column
                      className="center-align"
                      computer={4}
                      tablet={4}
                      mobile={8}
                    >
                      <button
                        type="button"
                        className="white radius-1"
                      >
                        <Image
                          className="inline"
                          src={currentUser.data.Flag}
                        />{' '}
                        RWF
                      </button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column>Sum</Grid.Column>
            </Grid.Row>
          </Grid>
          <div className="main-overview">
            <div className="overviewcard">
              <div>Money transfter</div>
            </div>

            <div className="overviewcard">
              <div>Add Money</div>
            </div>
            <div className="overviewcard">
              <div>My wallets</div>
            </div>
            <div className="overviewcard">
              <div>Contact</div>
            </div>
          </div>
        </div> */}
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
