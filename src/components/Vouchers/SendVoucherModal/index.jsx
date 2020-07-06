import React, { useEffect } from 'react';
import {
  Modal,
  Button,
  Input,
  Dropdown,
  Form,
} from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { DateInput } from 'semantic-ui-calendar-react';
import PropTypes from 'prop-types';
import './SendVoucherModal.scss';
import { useHistory } from 'react-router-dom';
import PinCodeForm from 'components/common/PinCodeForm';
import { getPossibleDates } from 'utils/monthdates';
import LoaderComponent from 'components/common/Loader';
import Message from 'components/common/Message';

import Img from 'components/Vouchers/Img';
import Thumbnail from 'components/common/Thumbnail';

import TransactionEntity from './TransactionEntity';

const SendMoneyModal = ({ SendVoucherModal }) => {
  const {
    setErrors,
    walletList,
    userData,
    onOptionsChange,
    form,
    balanceOnWallet,
    setForm,
    sendMoneyOpen,
    setSendMoneyOpen,
    checkTransactionConfirmation,
    currency,
    checking,
    confirmationError,
    confirmationData,
    sendVoucherFx,
    loading,
    errors,
    error,
    data,
    DefaultWallet,
    step,
    setStep,
    resetState,
    selectedContact,
    selectedStore,
    handleInputChange,
    setScreenNumber,
    setSelectedStore,
    currencyOptions,
  } = SendVoucherModal;

  const history = useHistory();

  const destinationContact = selectedContact;

  useEffect(() => {
    if (data && data[0]) {
      setStep(step + 1);
    }
  }, [data]);

  const days = getPossibleDates().map(item => ({
    key: item.day,
    value: item.day,
    text: item.val,
  }));

  const clearSendVoucher = () => {
    setForm({ Scope: 'AND' });
    setStep(1);
    setErrors(null);
    setSendMoneyOpen(false);
    setScreenNumber(1);

    setSelectedStore({});

    history.push({
      pathname: '/contacts',
      search: '?ref=send-voucher',
    });
  };

  useEffect(() => {
    if (step === 3) {
      clearSendVoucher();
      toast.success(data[0].Description);
    }
  }, [step]);

  return (
    <Modal.Content>
      <Modal
        size="small"
        open={sendMoneyOpen}
        onOpen={() => setSendMoneyOpen(!sendMoneyOpen)}
      >
        {selectedStore && (
          <Modal.Header className="modal-title">
            {global.translate(
              'Send a voucher to be retrieved by',
              1626,
            )}
            {destinationContact.FirstName}{' '}
            {destinationContact.LastName}{' '}
            {global.translate('at', 1627)}
            <strong>{selectedStore.StoreName}</strong>
          </Modal.Header>
        )}

        {step === 1 && (
          <Modal.Content>
            <div className="flex flex-row send-voucher-modal__top-images justify-content-space-between align-items-center ">
              <span>
                <Thumbnail
                  avatar={userData?.data?.PictureURL}
                  name={userData?.data?.FirstName}
                  secondName={userData?.data?.LastName}
                  circular
                  className="header_2u_avatar"
                  style={{
                    height: '80px',
                    width: '80px',
                    marginRight: 0,
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                />
              </span>
              <span>to</span>
              <span>
                <Thumbnail
                  avatar={destinationContact?.PictureURL}
                  name={destinationContact?.FirstName}
                  secondName={destinationContact?.LastName}
                  circular
                  className="header_2u_avatar"
                  style={{
                    height: '80px',
                    width: '80px',
                    marginRight: 0,
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                />
              </span>
              <span>at</span>
              <span>
                <Img
                  pic={selectedStore?.StoreLogo || 'N/A'}
                  className="send-voucher-modal__top-images__store-image"
                />
              </span>
            </div>

            <div className="send-voucher-modal__walletDropdown flex align-items-center">
              <TransactionEntity
                id={1}
                name="user1wallets"
                form={form}
                walletList={walletList}
                DefaultWallet={DefaultWallet}
                onChange={handleInputChange}
              />
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
              <div className="flex flex-column">
                <span style={{ fontFamily: 'Montserrat' }}>
                  {global.translate('Amount', 116)} {`(${currency})`}
                </span>
                <div className="amount-value">
                  <div className="form-information flex flex-row align-items-center">
                    <Input
                      type="number"
                      name="amount"
                      placeholder={global.translate('Amount')}
                      onChange={onOptionsChange}
                      value={form.amount || null}
                      style={{ width: '198px' }}
                    />
                  </div>
                </div>
              </div>
              <div className="dest-country">
                <div className="currency">
                  <div
                    className="choose-dest-country"
                    style={{
                      marginBottom: '5px',
                      marginTop: '-5px',
                      textAlign: 'left',
                      marginLeft: '4px',
                    }}
                  >
                    {global.translate('Destination Currency', 1629)}
                  </div>
                  <Form.Select
                    className="currency-chooser"
                    name="targetCurrency"
                    value={form.targetCurrency || ''}
                    onChange={onOptionsChange}
                    options={currencyOptions}
                    style={{
                      marginTop: '5px',
                      marginLeft: '5px',
                      width: '198px',
                    }}
                  />
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
                <strong> {confirmationData[0].Amount}</strong>
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
                    style={{ fontSize: '23px', fontWeight: 500 }}
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
                    style={{ fontSize: '23px', fontWeight: 500 }}
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

            {form.isRecurring && (
              <div className="recurring">
                <div className="repeat-date">
                  <p className="repeated-on">
                    {global.translate('Repeat Payment on Every')}:{' '}
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
                {global.translate('Back', 86)}
              </Button>
            )}

            {step !== 3 && (
              <Button
                negative
                disabled={checking || loading}
                onClick={() => {
                  setSendMoneyOpen(!sendMoneyOpen);
                  setStep(1);
                  resetState();
                  setForm({});
                  setErrors(null);
                }}
              >
                {global.translate('Cancel', 86)}
              </Button>
            )}
            <Button
              className="success-button"
              disabled={checking || loading}
              onClick={() => {
                if (step === 1) {
                  checkTransactionConfirmation();
                } else if (step === 2) {
                  sendVoucherFx();
                  // clearSendVoucher();
                } else {
                  clearSendVoucher();
                }
              }}
            >
              {step !== 3
                ? global.translate('Send voucher', 863)
                : global.translate('Done')}
            </Button>
          </>
        </Modal.Actions>
      </Modal>
    </Modal.Content>
  );
};

SendMoneyModal.propTypes = {
  SendVoucherModal: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SendMoneyModal;
