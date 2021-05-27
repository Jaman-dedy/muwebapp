import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import UpgradeAccountDisclaimer from 'components/AccountManagement/SettingsTab/SwitchAccount/Disclaimer';
import SwitchAccountForm from 'components/AccountManagement/SettingsTab/SwitchAccount';
import './style.scss';
import languages from 'utils/langauges';
import ChangeLanguageModal from './ChangeLanguageModal';

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

  const [changeLanguageOpen, setChangeLanguageOpen] = useState(false);

  const language = useSelector(({ user: { language } }) => language);

  const getLanguage = languageCode =>
    languages.find(lang => lang.language === languageCode);
  const renderOptions = () => {
    return (
      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="settings-header">
              {global.translate('Settings')}
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
              {!isBusinessAccount && (
                <Button
                  className="btn--link"
                  onClick={() => setIsUpgradingAccount(true)}
                >
                  {global.translate('Change')}
                </Button>
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell> {global.translate('Language')}</Table.Cell>
            <Table.Cell>
              {getLanguage(language?.preferred)?.text}
            </Table.Cell>
            <Table.Cell textAlign="right" className="settings-action">
              <Button
                className="btn--link"
                onClick={() => setChangeLanguageOpen(true)}
              >
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
              onCancelSwitchAccount={() =>
                setIsUpgradingAccount(false)
              }
            />
          )}

          {upgradeStep === 2 && (
            <SwitchAccountForm switchAccount={switchAccount} />
          )}
        </>
      )}
      <ChangeLanguageModal
        open={changeLanguageOpen}
        setOpen={setChangeLanguageOpen}
      />
    </div>
  );
};

Settings.propTypes = {
  switchAccount: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Settings;
