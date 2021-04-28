import React from 'react';
import { Checkbox, Segment, Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';

const UpgradeAccountDisclaimer = ({
  goToNextStep,
  termsAgreed,
  setTermsAgreed,
}) => {
  return (
    <Segment>
      <Header as="h3" className="disclaimer__header">
        {global.translate('Upgrade to business account')}
      </Header>
      <p className="disclaimer__message">
        {global.translate(
          `Converting your account to business will allow you to create stores, broadcast campaigns to millions
            of customers around the world, make unlimited number of money transfer per day. You will not lose your
            information such as transactions history, wallets, cards and contacts. However, some of your personal
             information will be converted into business information. Don’t worry,
             you will be able to update them`,
        )}
      </p>
      <div className="disclaimer__checkbox">
        <Checkbox
          label={global.translate(
            'I know and agree that this action is irreversible.',
          )}
          checked={termsAgreed}
          onChange={() => setTermsAgreed(prev => !prev)}
        />
      </div>
      <Button
        onClick={goToNextStep}
        className="disclaimer__button"
        disabled={!termsAgreed}
      >
        {global.translate('Upgrade to business now')}
      </Button>
    </Segment>
  );
};

UpgradeAccountDisclaimer.propTypes = {
  goToNextStep: PropTypes.func.isRequired,
  termsAgreed: PropTypes.bool.isRequired,
  setTermsAgreed: PropTypes.func.isRequired,
};

export default UpgradeAccountDisclaimer;
