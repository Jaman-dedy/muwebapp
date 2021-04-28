import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import UpgradeAccountDisclaimer from 'components/AccountManagement/SettingsTab/SwitchAccount/Disclaimer';
import SwitchAccountForm from 'components/AccountManagement/SettingsTab/SwitchAccount';
import './style.scss';

const Settings = ({ switchAccount }) => {
  const {
    isUpgradingAccount,
    setIsUpgradingAccount,
    goToNextStep,
    upgradeStep,
    termsAgreed,
    setTermsAgreed,
    isBusinessAccount,
  } = switchAccount;

  const renderOptions = () => {
    return (
      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="settings-header">
              {global.translate('settings')}
            </Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              {global.translate('Account type')}
            </Table.Cell>
            <Table.Cell>
              {isBusinessAccount
                ? global.translate('Business Account')
                : global.translate('Personal Account')}
            </Table.Cell>
            <Table.Cell textAlign="right" className="settings-action">
              <Button
                className="btn--link"
                onClick={() => setIsUpgradingAccount(true)}
              >
                {isBusinessAccount
                  ? global.translate('Update')
                  : global.translate('Change')}
              </Button>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell> {global.translate('Language')}</Table.Cell>
            <Table.Cell>{global.translate('English(UK)')}</Table.Cell>
            <Table.Cell textAlign="right" className="settings-action">
              <Button className="btn--link">
                {global.translate('Change')}
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  };
  return (
    <div className="settings-container">
      {!isUpgradingAccount && renderOptions()}
      {isUpgradingAccount && (
        <>
          {upgradeStep === 1 && !isBusinessAccount && (
            <UpgradeAccountDisclaimer
              goToNextStep={goToNextStep}
              termsAgreed={termsAgreed}
              setTermsAgreed={setTermsAgreed}
            />
          )}

          {upgradeStep === 2 && (
            <SwitchAccountForm switchAccount={switchAccount} />
          )}
        </>
      )}
    </div>
  );
};

Settings.propTypes = {
  switchAccount: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Settings;
