import React from 'react';
import PropTypes from 'prop-types';
import {
  Tab,
  Grid,
  Image,
  Card,
  Responsive,
} from 'semantic-ui-react';

const StoreWalletSettingsTab = ({ currentStore }) => {
  return (
    <Tab.Pane>
      <Grid columns="equal" />
      <Grid columns="equal">
        <Grid.Column minWidth={768}>
          <div className="stats-card">
            <Card.Content>
              <p className="stat-header">
                {global.translate('Attached Wallet')}
              </p>
              <span className="stats-value">
                <Image
                  src={currentStore.CurrencyFlag}
                  style={{ display: 'inline', height: 20 }}
                />{' '}
                {currentStore.AccountNumber}
              </span>
            </Card.Content>
          </div>
        </Grid.Column>

        <Grid.Column>
          <div className="stats-card">
            <Card.Content>
              <p className="stat-header">
                {global.translate('Last operation amount')}
              </p>
              <span className="stats-value">
                <Image
                  src={currentStore.CurrencyFlag}
                  style={{ display: 'inline', height: 20 }}
                />{' '}
                {currentStore.LastOpsAmount} {currentStore.Currency}
              </span>
            </Card.Content>
          </div>
        </Grid.Column>
        <Responsive as={Grid.Column} minWidth={768}>
          <div className="stats-card">
            <Card.Content>
              <p className="stat-header">
                {global.translate('Total turnover', 857)}
              </p>
              <span className="stats-value">
                <Image
                  src={currentStore.CurrencyFlag}
                  style={{ display: 'inline', height: 20 }}
                />{' '}
                {currentStore.TotalTurnOver} {currentStore.Currency}
              </span>
            </Card.Content>
          </div>
        </Responsive>
      </Grid>
      <Grid columns="equal" className="count-stats">
        <Grid.Column>
          <div className="stats-card">
            <Card.Content>
              <p className="stat-header">
                {global.translate('Total', 269)}{' '}
                {global.translate('Transactions').toLowerCase()}
              </p>
              <span className="stats-value">
                {currentStore.TransCount}
              </span>
            </Card.Content>
          </div>
        </Grid.Column>
        <Grid.Column>
          <div className="stats-card">
            <Card.Content>
              <p className="stat-header">
                {global.translate('Last operation date')}
              </p>
              <span className="stats-value">
                {currentStore.LastOpsDate !== ''
                  ? currentStore.LastOpsDate
                  : new Date().toDateString()}
              </span>
            </Card.Content>
          </div>
        </Grid.Column>
        <Responsive as={Grid.Column} minWidth={768} />
      </Grid>
    </Tab.Pane>
  );
};

StoreWalletSettingsTab.propTypes = {
  currentStore: PropTypes.objectOf(PropTypes.any),
};
StoreWalletSettingsTab.defaultProps = {
  currentStore: {},
};

export default StoreWalletSettingsTab;
