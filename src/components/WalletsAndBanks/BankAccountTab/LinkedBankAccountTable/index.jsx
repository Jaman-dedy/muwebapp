import React from 'react';
import { Table, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import EllipseOption from 'components/common/EllipseOptions';
import TablePlaceholder from 'assets/images/placeholders/linked-bank-table-placeholder.svg';
import FreezeAccountIcon from 'assets/images/bankAccountOptions/freeze-account.svg';
import UnlinkAccountIcon from 'assets/images/bankAccountOptions/unlink-account.svg';
import ApproveLinkingIcon from 'assets/images/bankAccountOptions/approve-linking.svg';
import RejectLinkingIcon from 'assets/images/bankAccountOptions/reject-linking.svg';
import EmptyBankListIcon from 'assets/images/empty-bank-list.svg';
import EmptyCard from 'components/common/EmptyCard';
import ConfirmationModal from 'components/common/ConfirmationModal';
import { bankAccountOptions } from 'constants/general';

import './style.scss';

const LinkedBankAccountTable = ({ bankAccount }) => {
  const {
    linkedBankAccounts,
    openConfirmModal,
    setOpenLinkBankModal,
    setOpenConfirmModal,
    handleOpenConfirmModal,
    handleCloseConfirmModal,
    bankOptionActionConfirmedHandler,
    confirmationMessage,
    linkBankAccountData,
    unlinkBankAccountData,
    handleAddMoneyToWallet,
    handleSendMoneyToBank,
    currentItem,
  } = bankAccount;

  const { data, loading } = linkedBankAccounts;

  const linkedBankOptions = [
    {
      image: FreezeAccountIcon,
      name: 'Freeze',
      onClick: accountItem =>
        handleOpenConfirmModal(
          accountItem,
          bankAccountOptions.FREEZE,
        ),
    },
    {
      image: UnlinkAccountIcon,
      name: 'Unlink',
      onClick: accountItem =>
        handleOpenConfirmModal(
          accountItem,
          bankAccountOptions.UNLINK,
        ),
    },
  ];
  const pendingBankOptions = [
    {
      image: ApproveLinkingIcon,
      name: 'Approve',
      onClick: accountItem =>
        handleOpenConfirmModal(
          accountItem,
          bankAccountOptions.APPROVE,
        ),
    },
    {
      image: RejectLinkingIcon,
      name: 'Reject',
      onClick: accountItem =>
        handleOpenConfirmModal(
          accountItem,
          bankAccountOptions.REJECT,
        ),
    },
  ];

  const options = {
    '0': pendingBankOptions,
    '1': linkedBankOptions,
  };

  return (
    <div className="banks__list">
      <ConfirmationModal
        open={openConfirmModal}
        onClickYes={bankOptionActionConfirmedHandler}
        onClickNo={handleCloseConfirmModal}
        setOpen={setOpenConfirmModal}
        title={confirmationMessage.title}
        message={confirmationMessage.message}
        loading={
          linkBankAccountData?.loading ||
          unlinkBankAccountData?.loading
        }
        bankAccount={currentItem}
      />
      {loading && (
        <Image
          src={TablePlaceholder}
          className="animate-placeholder fluid"
        />
      )}
      {!loading && data?.length === 0 && (
        <EmptyCard
          header={global.translate('Add a bank account')}
          createText={global.translate('Add a bank account')}
          body={global.translate(
            'Let us help you to easily move your money from bank to Wallet and vice versa',
          )}
          onAddClick={() => setOpenLinkBankModal(true)}
          imgSrc={EmptyBankListIcon}
        />
      )}
      {!loading && data?.length > 0 && (
        <Table basic="very" stackable>
          <Table.Body>
            {data.map(bankAccount => {
              return (
                <Table.Row>
                  <Table.Cell>
                    <div className="banks__account-info">
                      <span className="banks__account banks__account--user">
                        {bankAccount?.AccountName}
                      </span>
                      <span className="banks__account banks__account--number">
                        {bankAccount?.AccountNumber}
                        <span className="currency">
                          {bankAccount?.Currency}
                        </span>
                      </span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="banks__account">
                      <div className="banks__account-logo">
                        <Image src={bankAccount?.Logo} />
                      </div>
                      <div className="banks__account-details">
                        <span className="banks__account--name">
                          {bankAccount?.BankName}
                        </span>
                        <span className="banks__account--description">
                          {bankAccount?.BankAddress}
                        </span>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {bankAccount?.Status === '1' && (
                      <>
                        <Button
                          color="orange"
                          basic
                          size="tiny"
                          className="list-button"
                          onClick={() =>
                            handleAddMoneyToWallet(bankAccount)
                          }
                        >
                          {global.translate('Top up wallet')}
                        </Button>
                        <Button
                          basic
                          size="tiny"
                          className="list-button"
                          onClick={() =>
                            handleSendMoneyToBank(bankAccount)
                          }
                        >
                          {global.translate('Send to bank')}
                        </Button>
                      </>
                    )}
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    <EllipseOption
                      options={options[bankAccount?.Status]}
                      currentItem={bankAccount}
                      iconSize={24}
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

LinkedBankAccountTable.propTypes = {
  bankAccount: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default LinkedBankAccountTable;
