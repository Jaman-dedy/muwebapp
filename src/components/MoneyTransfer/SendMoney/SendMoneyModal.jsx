import React, { useEffect, useState } from 'react';
import {
  Modal,
  Button,
  Icon,
  Input,
  Dropdown,
  TransitionablePortal,
} from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import PropTypes from 'prop-types';
import './modal.scss';
import ToggleSwitch from 'components/common/ToggleButton';
import PinCodeForm from 'components/common/PinCodeForm';
import { getPossibleDates } from 'utils/monthdates';
import LoaderComponent from 'components/common/Loader';
import Message from 'components/common/Message';
import TransactionEntity from './TransactionEntity';
import { useSelector } from 'react-redux';

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
  setStep,
  resetState,
  shouldClear,
}) => {
  const defaultOption =
    walletList && walletList.find(item => item.Default === 'YES');
  const [currentOption, setCurrentOption] = useState({});
  const [currentDestOption, setCurrentDestOption] = useState({});
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
      setStep(step + 1);
    }
  }, [data]);

  useEffect(() => {
    if (step === 3) {
      setForm({});
      setStep(1);
      setErrors(null);
      setOpen(false);
      setDestinationContact(null);
      setCurrentOption(defaultOption);
    }
  }, [step]);

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
    setStep(1);
    resetState();
    setErrors(null);
  };
  return (
    <TransitionablePortal
      transition={{
        duration: 400,
        animation: 'fade',
      }}
      onClose={() => setOpen(false)}
      open={open}
    >
      <Modal
        size="small"
        open={open}
        closeOnDimmerClick={false}
        closeOnDocumentClick={false}
        onClose={() => {
          clearForm();
        }}
      >
        {destinationContact && (
          <Modal.Header className="modal-title">
            {global.translate(`Send Money to `)}
            <strong>{destinationContact.FirstName}</strong>
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
                <p className="available-value">{balanceOnWallet}</p>
              </h4>
            </div>

            <div className="money-section">
              <div className="amount">
                <span>{global.translate('Amount', 116)}</span> &nbsp;
              </div>
              <div className="amount-value">
                <div className="form-information">
                  <Input
                    type="number"
                    name="amount"
                    placeholder={global.translate('Amount')}
                    onChange={onOptionsChange}
                    value={form.amount || null}
                  />
                  <strong>{currency}</strong>
                </div>
              </div>

              <div className="plus-minus-icons">
                <div
                  role="button"
                  tabIndex="0"
                  onKeyPress={() => {}}
                  className="icon"
                  onClick={() => {
                    setForm({
                      ...form,
                      amount: parseInt(form.amount, 10) - 1,
                    });
                  }}
                >
                  <Icon name="minus" className="inner-icon" />
                </div>
                <div
                  className="icon"
                  role="button"
                  tabIndex="0"
                  onClick={() => {
                    setForm({
                      ...form,
                      amount: parseInt(form.amount, 10) + 1,
                    });
                  }}
                  onKeyPress={() => {}}
                >
                  <Icon name="add" className="inner-icon" />
                </div>
              </div>
            </div>
            <div className="load-stuff">
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
              {checking && (
                <LoaderComponent
                  loaderContent={global.translate('Working…', 412)}
                />
              )}
            </div>
          </Modal.Content>
        )}

        {step === 2 && confirmationData && confirmationData[0] && (
          <Modal.Content className="ss-content">
            <div className="ss-amount">
              <p>{global.translate('Amount', 116)}: </p> &nbsp;&nbsp;
              <p>
                <strong>{confirmationData[0].Amount}</strong>
              </p>
            </div>

            <div className="fees">
              <div className="fees-list">
                <p>{global.translate('Fees', 117)}</p>

                <div className="fees-item">
                  <p className="left">
                    {global.translate('Fees', 117)}:
                  </p>
                  <p className="right">{confirmationData[0].Fees}</p>
                </div>
                <div className="fees-item">
                  <p className="left">
                    {global.translate('External fees', 121)}:
                  </p>
                  <p className="right">
                    {confirmationData[0].ExternalFees}
                  </p>
                </div>
                <div className="fees-item">
                  <p className="left">
                    {global.translate('Exchange fees', 120)}:
                  </p>
                  <p className="right">
                    {' '}
                    {confirmationData[0].ExchangeFees}
                  </p>
                </div>
                <div className="fees-item">
                  <p className="left">
                    {global.translate('Taxes', 965)}:
                  </p>
                  <p className="right">{confirmationData[0].Taxes}</p>
                </div>
              </div>
            </div>
            <div className="exchange-rate">
              <p>
                {global.translate('Exchange Rate', 80)}=
                {confirmationData[0].ExchangeRate}
              </p>
            </div>
            <div className="amount-to-be-recieved-break-down">
              <div className="fees-item">
                <p className="left" style={{ marginTop: '13px' }}>
                  {global.translate('Total', 269)}:
                </p>
                <p className="right">
                  <strong
                    className="bolder"
                    style={{ fontSize: '20px', fontWeight: 500 }}
                  >
                    {confirmationData[0].TotalAmount}
                  </strong>
                </p>
              </div>
              <div className="fees-item">
                <p className="left" style={{ marginTop: '13px' }}>
                  {global.translate('Amount to be received', 397)}:
                </p>
                <p className="right">
                  {' '}
                  <strong
                    className="bolder"
                    style={{ fontSize: '20px', fontWeight: 500 }}
                  >
                    {confirmationData[0].AmountToBeSent}
                  </strong>
                </p>
              </div>
            </div>

            <div className="confirm-form">
              <Input
                name="reference"
                onChange={onOptionsChange}
                value={form.reference || ''}
                placeholder={global.translate(
                  'Enter reference here',
                  433,
                )}
              />
              <Input
                name="description"
                onChange={onOptionsChange}
                value={form.description || ''}
                placeholder={global.translate(
                  'Enter description here',
                  434,
                )}
              />
            </div>

            <div className="one-tme-transfer">
              <p>{global.translate('Recurring transfer', 265)}</p>

              <ToggleSwitch
                id="isRecurring"
                name="isRecurring"
                value={form.isRecurring || false}
                onChange={checked =>
                  onOptionsChange(checked, {
                    name: 'isRecurring',
                    value: checked,
                  })
                }
              />
            </div>

            {form.isRecurring && (
              <div className="recurring">
                <div className="repeat-date">
                  <p className="repeated-on">
                    {global.translate('Payment day of the month')}:{' '}
                  </p>
                  <span>
                    <Dropdown
                      className="custom-dropdown2"
                      search
                      name="day"
                      value={form.day || ''}
                      onChange={onOptionsChange}
                      selection
                      options={days}
                    />
                  </span>
                </div>
                <div className="from-to-dates">
                  <div className="from-two-group">
                    <p className="from">
                      {' '}
                      {global.translate('From')}:
                    </p>
                    <DateInput
                      icon="dropdown"
                      popupPosition="top left"
                      animation="fade"
                      placeholder={global.translate(
                        'Start date',
                        338,
                      )}
                      iconPosition="right"
                      dateFormat="YYYY-MM-DD"
                      name="startDate"
                      value={
                        form.startDate
                          ? new Date(form.startDate).toDateString()
                          : ''
                      }
                      onChange={onOptionsChange}
                    />
                  </div>
                  <div className="from-two-group">
                    <p className="from">{global.translate('to')}:</p>
                    <DateInput
                      icon="dropdown"
                      popupPosition="top left"
                      animation="fade"
                      placeholder={global.translate('End date', 398)}
                      iconPosition="right"
                      dateFormat="YYYY-MM-DD"
                      name="endDate"
                      value={
                        form.endDate
                          ? new Date(form.endDate).toDateString()
                          : ''
                      }
                      onChange={onOptionsChange}
                    />
                  </div>
                </div>

                <div className="send-now">
                  <p>
                    {global.translate('Do not send the money now')}
                  </p>

                  <ToggleSwitch
                    id="sendNow"
                    name="sendNow"
                    value={form.sendNow}
                    onChange={checked =>
                      onOptionsChange(checked, {
                        name: 'sendNow',
                        value: checked,
                      })
                    }
                  />
                </div>
              </div>
            )}
            <hr />
            <div className="pin-number">
              <PinCodeForm
                label={global.translate(
                  'Confirm  your PIN number',
                  941,
                )}
                onChange={onOptionsChange}
                name="pin"
                shouldClear={shouldClear}
                value={form.pin || ''}
              />
            </div>
            <div
              className="load-stuff"
              style={{ alignSelf: 'center' }}
            >
              {errors && <Message message={errors} />}
              {error && error[0] && (
                <Message
                  message={
                    error && error[0].Description
                      ? global.translate(error[0].Description)
                      : global.translate(error.error)
                  }
                />
              )}
              {error && !error[0] && (
                <Message message={global.translate(error.error)} />
              )}
              {loading && (
                <LoaderComponent
                  loaderContent={global.translate('Working…', 412)}
                />
              )}
            </div>
          </Modal.Content>
        )}

        <Modal.Actions>
          <>
            {step !== 1 && step !== 3 && (
              <Button
                negative
                disabled={checking || loading}
                onClick={() => {
                  setStep(step - 1);
                  resetState();
                }}
              >
                {global.translate('Back')}
              </Button>
            )}

            {step !== 3 && (
              <Button
                negative
                disabled={checking || loading}
                onClick={() => {
                  clearForm();
                }}
              >
                {global.translate('Cancel', 86)}
              </Button>
            )}
            <Button
              positive
              disabled={checking || loading}
              onClick={() => {
                if (step === 1) {
                  checkTransactionConfirmation();
                } else if (step === 2) {
                  moveFundsToToUWallet();
                }
              }}
            >
              {global.translate('Send Money', 112)}
            </Button>
          </>
        </Modal.Actions>
      </Modal>
    </TransitionablePortal>
  );
};

SendMoneyModal.propTypes = {
  open: PropTypes.bool,
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  setOpen: PropTypes.func,
  walletList: PropTypes.arrayOf(PropTypes.any),
  destinationContact: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: PropTypes.func,
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
  onChange: () => {},
  destinationWallets: [],
  onOptionsChange: () => {},
  setOpen: () => {},
  walletList: [],
  open: false,
};
export default SendMoneyModal;
