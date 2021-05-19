import React from 'react';
import { Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import LinkedBankAccountTable from './LinkedBankAccountTable';
import AddBankAccountModal from './AddBankAccountModal';
import './style.scss';

const BankAccountTab = ({ bankAccount }) => {
  const { setOpenLinkBankModal, openLinkBankModal } = bankAccount;
  return (
    <div className="banks">
      <div className="banks__header">
        <div>
          <Header className="banks__heading" as="h3">
            {global.translate('My bank accounts')}
          </Header>
        </div>
      </div>
      <LinkedBankAccountTable bankAccount={bankAccount} />
      <AddBankAccountModal
        open={openLinkBankModal}
        onOpen={() => setOpenLinkBankModal(true)}
        onClose={() => setOpenLinkBankModal(false)}
        bankAccount={bankAccount}
      />
    </div>
  );
};

BankAccountTab.propTypes = {
  bankAccount: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default BankAccountTab;
