import React from 'react';
import { Modal, Button, Dropdown, Input } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { DateInput } from 'semantic-ui-calendar-react';
import PropTypes from 'prop-types';
import './modal.scss';
import PinCodeForm from 'components/common/PinCodeForm';
import { getPossibleDates } from 'utils/monthdates';
import LoaderComponent from 'components/common/Loader';
import ToggleSwitch from 'components/common/ToggleButton';
import Message from 'components/common/Message';
import { clearFoundUser } from 'redux/actions/contacts/locateUser';

const SendMoneyModal = ({ sendMoneyModal }) => {
  const dispatch = useDispatch();
  const {
    form,
    confirmationData,
    openModal: open,
    setOpenModal: setOpen,
    step,
    errors,
    setErrors,
    onOptionsChange,
    moveFundsToToUWallet,
    resetState,
    loading,
    moveFundError,
    setResult,
  } = sendMoneyModal;
  const days = getPossibleDates().map(item => ({
    key: item.day,
    value: item.day,
    text: item.val,
  }));
  const clearForm = () => {
    // setForm({});
    setOpen(false);
    resetState();
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
      <Modal.Header className="modal-title">
        {global.translate(`Transfer Money to  `, 1950)}
        <strong>&nbsp; Whoever</strong>
      </Modal.Header>

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
                  {global.translate('Taxes', 956)}:
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
              value={form?.reference || ''}
              placeholder={global.translate(
                'Enter reference here',
                433,
              )}
            />
            <Input
              name="description"
              onChange={onOptionsChange}
              value={form?.description || ''}
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
              value={form?.isRecurring || false}
              onChange={checked =>
                onOptionsChange(checked, {
                  name: 'isRecurring',
                  value: checked,
                })
              }
            />
          </div>

          {form?.isRecurring && (
            <div className="recurring">
              <div className="repeat-date">
                <p className="repeated-on">
                  {global.translate('Payment day of the month', 336)}:{' '}
                </p>
                <span>
                  <Dropdown
                    className="custom-dropdown2"
                    search
                    name="day"
                    value={form?.day || ''}
                    onChange={onOptionsChange}
                    selection
                    options={days}
                  />
                </span>
              </div>
              <div className="from-to-dates">
                <div className="from-two-group">
                  <p className="from">
                    {global.translate('From', 114)}:
                  </p>
                  <DateInput
                    icon="dropdown"
                    popupPosition="top left"
                    animation="fade"
                    placeholder={global.translate('Start date', 338)}
                    iconPosition="right"
                    dateFormat="YYYY-MM-DD"
                    name="startDate"
                    pickerWidth="100%"
                    minDate={new Date()}
                    value={
                      form?.startDate
                        ? new Date(form?.startDate).toDateString()
                        : ''
                    }
                    onChange={onOptionsChange}
                    localization={localStorage.language || 'en'}
                  />
                </div>
                <div className="from-two-group">
                  <p className="from">
                    {global.translate('to', 115)}:
                  </p>
                  <DateInput
                    icon="dropdown"
                    popupPosition="top left"
                    animation="fade"
                    placeholder={global.translate('End date', 398)}
                    iconPosition="right"
                    dateFormat="YYYY-MM-DD"
                    name="endDate"
                    minDate={new Date()}
                    value={
                      form?.endDate
                        ? new Date(form?.endDate).toDateString()
                        : ''
                    }
                    onChange={onOptionsChange}
                    localization={localStorage.language || 'en'}
                  />
                </div>
              </div>

              <div className="send-now">
                <p>
                  {global.translate('Do not send the money now', 386)}
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
          <hr className="sep-line" />
          <div className="pin-number">
            <PinCodeForm
              label={global.translate(
                'Confirm  your PIN number',
                941,
              )}
              onChange={onOptionsChange}
            />
          </div>
          <div className="load-stuff" style={{ alignSelf: 'center' }}>
            {errors && <Message message={errors} />}
            {moveFundError && moveFundError[0] && (
              <Message
                message={
                  moveFundError && moveFundError[0].Description
                    ? global.translate(moveFundError[0].Description)
                    : global.translate(moveFundError.error)
                }
              />
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
          <Button
            basic
            color="red"
            disabled={loading}
            onClick={() => {
              clearForm();
              setOpen(false);
              clearFoundUser()(dispatch);
              setResult(null);
            }}
          >
            {global.translate('Cancel', 86)}
          </Button>

          <Button
            positive
            disabled={loading}
            onClick={() => {
              if (step === 2) {
                moveFundsToToUWallet();
              }
            }}
          >
            {global.translate('Transfer Money', 1950)}
          </Button>
        </>
      </Modal.Actions>
    </Modal>
  );
};

SendMoneyModal.propTypes = {
  sendMoneyModal: PropTypes.objectOf(PropTypes.any).isRequired,
};
SendMoneyModal.defaultProps = {};

export default SendMoneyModal;
