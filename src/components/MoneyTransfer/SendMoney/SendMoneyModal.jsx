import Message from 'components/common/Message';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input, Modal } from 'semantic-ui-react';
import formatNumber from 'utils/formatNumber';
import { getPossibleDates } from 'utils/monthdates';
import ConfirmationForm from '../../ConfirmationForm';
import './modal.scss';
import TransactionEntity from './TransactionEntity';

const SendMoneyModal = ({
  open,
  userData,
  setOpen,
  walletList,
  destinationContact,
  destinationWallets,
  onOptionsChange,
  form,
  balanceOnWallet,
  setForm,
  currency,
  checkTransactionConfirmation,
  checking,
  confirmationError,
  confirmationData,
  moveFundsToToUWallet,
  loading,
  setDestinationContact,
  error,
  data,
  errors,
  setErrors,
  step,
  resetState,
  shouldClear,
  setShouldClear,
  isSendingMoney,
}) => {
  const defaultOption =
    walletList && walletList.find(item => item.Default === 'YES');
  const [currentOption, setCurrentOption] = useState({});
  const [currentDestOption, setCurrentDestOption] = useState({});
  const { language: { preferred } = {} } = useSelector(
    ({ user }) => user,
  );
  const {
    allContacts: { data: allContactsData },
  } = useSelector(state => state.contacts);
  useEffect(() => {
    if (defaultOption) {
      setCurrentOption(defaultOption);
    }
  }, [defaultOption]);

  const updateDestinationContactDefaultWallet = contact => {
    if (contact) {
      setCurrentDestOption({
        AccountNumber: contact.DefaultWallet.WalletNumber,
        Flag: contact.DefaultWallet.Flag,
        AccountName: contact.DefaultWallet.WalletName || '',
        Currency: contact.DefaultWallet.Currency,
      });
    }
  };

  useEffect(() => {
    if (destinationContact && destinationContact.DefaultWallet) {
      updateDestinationContactDefaultWallet(destinationContact);
    } else if (
      destinationContact &&
      !destinationContact.DefaultWallet &&
      destinationContact.ContactPID
    ) {
      const contact = allContactsData.find(
        item => item.ContactPID === destinationContact.ContactPID,
      );
      updateDestinationContactDefaultWallet(contact);
    }
  }, [destinationContact]);

  useEffect(() => {
    if (currentDestOption) {
      setForm({
        ...form,
        user2wallets: currentDestOption.AccountNumber,
      });
    }
  }, [currentDestOption]);

  useEffect(() => {
    if (data && data[0]) {
      setForm({});
      setErrors(null);
      setOpen(false);
      setDestinationContact(null);
      setCurrentOption(defaultOption);
      resetState();
    }
  }, [data]);

  const days = getPossibleDates().map(item => ({
    key: item.day,
    value: item.day,
    text: item.val,
  }));

  const clearForm = () => {
    setForm({});
    setCurrentDestOption({});
    setCurrentOption(defaultOption);
    setOpen(false);
    resetState();
    setForm({});
    setErrors(null);
  };
  return (
    <Modal
      size="small"
      open={open}
      closeOnDimmerClick={false}
      closeOnDocumentClick={false}
      onClose={() => {
        setOpen(false);
        resetState();
        clearForm();
      }}
    >
      {destinationContact && (
        <Modal.Header className="modal-title">
          {global.translate(`Transfer Money to  `)}
          <strong>&nbsp;{destinationContact.FirstName}</strong>
        </Modal.Header>
      )}

      {step === 1 && (
        <Modal.Content className="entities">
          <div className="entities">
            <TransactionEntity
              data={userData}
              id={1}
              name="sourceWallet"
              form={form}
              walletList={walletList}
              currentOption={currentOption}
              setCurrentOption={setCurrentOption}
              onChange={onOptionsChange}
              isSendingMoney={isSendingMoney}
            />
            <h4 className="to">{global.translate('To')}: </h4>

            {destinationContact && (
              <TransactionEntity
                data={{
                  data: destinationContact || {},
                }}
                form={form}
                name="user2wallets"
                id={2}
                walletList={
                  destinationWallets &&
                  destinationWallets.map(item => ({
                    AccountNumber: item.WalletNumber,
                    Flag: item.Flag,
                    AccountName: item.WalletName || '',
                    Currency: item.Currency,
                  }))
                }
                currentOption={currentDestOption}
                setCurrentOption={setCurrentDestOption}
                onChange={onOptionsChange}
              />
            )}
          </div>

          <div className="remaining-money-shade">
            <h4 className="available">
              {global.translate(
                'Available Balance in the Selected Wallet',
              )}
              <p className="available-value">
                {formatNumber(balanceOnWallet, {
                  locales: preferred,
                  currency,
                })}
              </p>
            </h4>
          </div>
          <div className="wrap-money-form">
            <div className="wrap-money-input">
              <div>{global.translate('Amount')}</div>
              <div className="money-input">
                <Input
                  type="number"
                  name="amount"
                  placeholder={global.translate('Amount')}
                  onChange={onOptionsChange}
                  value={form.amount || null}
                  min="0"
                />
                <span>{currency}</span>
              </div>
            </div>
            <div className="loader-section">
              {parseInt(form.amount, 10) >
              parseInt(
                formatNumber(balanceOnWallet).replace(
                  /[^\w\s]/gi,
                  '',
                ),
                10,
              ) ? (
                <Message
                  message={global.translate(
                    'The amount entered is greater than your available balance',
                  )}
                />
              ) : null}
              {errors && <Message message={errors} />}
              {confirmationError && confirmationError[0] && (
                <Message
                  message={
                    confirmationError &&
                    confirmationError[0].Description
                      ? global.translate(
                          confirmationError &&
                            confirmationError[0].Description,
                        )
                      : global.translate(confirmationError.error)
                  }
                />
              )}
              {confirmationError && !confirmationError[0] && (
                <Message
                  message={global.translate(confirmationError.error)}
                />
              )}
            </div>
          </div>
        </Modal.Content>
      )}

      {step === 2 && confirmationData && confirmationData[0] && (
        <ConfirmationForm
          confirmationData={confirmationData[0]}
          onOptionsChange={onOptionsChange}
          form={form}
          shouldClear={shouldClear}
          setShouldClear={setShouldClear}
          errors={errors}
          error={error}
          loading={loading}
          days={days}
        />
      )}

      <Modal.Actions>
        <>
          {step !== 1 && (
            <Button
              basic
              color="red"
              disabled={checking || loading}
              onClick={() => {
                resetState();
              }}
            >
              {global.translate('Back')}
            </Button>
          )}

          <Button
            basic
            color="red"
            disabled={checking || loading}
            onClick={() => {
              clearForm();
            }}
          >
            {global.translate('Cancel')}
          </Button>

          <Button
            positive
            loading={checking || loading}
            disabled={
              checking ||
              loading ||
              !form.amount ||
              parseInt(form.amount, 10) >
                parseInt(
                  formatNumber(balanceOnWallet).replace(
                    /[^\w\s]/gi,
                    '',
                  ),
                  10,
                )
            }
            onClick={() => {
              if (step === 1) {
                checkTransactionConfirmation();
              } else if (step === 2) {
                moveFundsToToUWallet();
              }
            }}
          >
            {global.translate('Transfer Money')}
          </Button>
        </>
      </Modal.Actions>
    </Modal>
  );
};

SendMoneyModal.propTypes = {
  open: PropTypes.bool,
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  setOpen: PropTypes.func,
  walletList: PropTypes.arrayOf(PropTypes.any),
  destinationContact: PropTypes.objectOf(PropTypes.any).isRequired,
  destinationWallets: PropTypes.arrayOf(PropTypes.any),
  onOptionsChange: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  balanceOnWallet: PropTypes.string,
  setForm: PropTypes.func,
  currency: PropTypes.string,
  isRecurring: PropTypes.bool,
  checkTransactionConfirmation: PropTypes.func,
  checking: PropTypes.bool,
  confirmationError: PropTypes.objectOf(PropTypes.any).isRequired,
  confirmationData: PropTypes.objectOf(PropTypes.any).isRequired,
  moveFundsToToUWallet: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
  setErrors: PropTypes.func,
  step: PropTypes.number,
  setShouldClear: PropTypes.func,
  resetState: PropTypes.func,
  shouldClear: PropTypes.bool,
  isSendingMoney: PropTypes.bool,
  setDestinationContact: PropTypes.func,
};

SendMoneyModal.defaultProps = {
  moveFundsToToUWallet: () => {},
  loading: false,
  currency: null,
  isRecurring: false,
  checkTransactionConfirmation: () => {},
  checking: false,
  balanceOnWallet: 0,
  setForm: () => {},
  destinationWallets: [],
  onOptionsChange: () => {},
  setOpen: () => {},
  walletList: [],
  open: false,
  setErrors: () => {},
  step: 1,
  setShouldClear: () => true,
  resetState: () => {},
  shouldClear: false,
  isSendingMoney: false,
  setDestinationContact: () => {},
};
export default React.memo(SendMoneyModal);
