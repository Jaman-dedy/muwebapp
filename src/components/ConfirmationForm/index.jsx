import LoaderComponent from 'components/common/Loader';
import Message from 'components/common/Message';
import PinCodeForm from 'components/common/PinCodeForm';
import ToggleSwitch from 'components/common/ToggleButton';
import PropTypes from 'prop-types';
import React from 'react';
import { DateInput } from 'semantic-ui-calendar-react';
import { Dropdown, Input, Modal } from 'semantic-ui-react';

const ConfirmationForm = ({
  confirmationData,
  onOptionsChange,
  form,
  shouldClear,
  setShouldClear,
  errors,
  error,
  loading,
  days,
}) => {
  const {
    Amount,
    Fees,
    ExternalFees,
    ExchangeFees,
    ExchangeRate,
    TotalAmount,
    Taxes,
    AmountToBeSent,
  } = confirmationData;
  return (
    <Modal.Content className="ss-content">
      <div className="ss-amount">
        <p>{global.translate('Amount', 116)}: </p> &nbsp;&nbsp;
        <p>
          <strong>{Amount}</strong>
        </p>
      </div>
      <div className="fees">
        <div className="fees-list">
          <p>{global.translate('Fees', 117)}</p>
          <div className="fees-item">
            <p className="left">{global.translate('Fees', 117)}:</p>
            <p className="right">{Fees}</p>
          </div>
          <div className="fees-item">
            <p className="left">
              {global.translate('External fees', 121)}:
            </p>
            <p className="right">{ExternalFees}</p>
          </div>
          <div className="fees-item">
            <p className="left">
              {global.translate('Exchange fees', 120)}:
            </p>
            <p className="right">{ExchangeFees}</p>
          </div>
          <div className="fees-item">
            <p className="left">{global.translate('Taxes', 956)}:</p>
            <p className="right">{Taxes}</p>
          </div>
        </div>
      </div>
      <div className="exchange-rate">
        <p>
          {global.translate('Exchange Rate', 80)}={ExchangeRate}
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
              {TotalAmount}
            </strong>
          </p>
        </div>
        <div className="fees-item">
          <p className="left" style={{ marginTop: '13px' }}>
            {global.translate('Amount to be received', 397)}:
          </p>
          <p className="right">
            <strong
              className="bolder"
              style={{ fontSize: '20px', fontWeight: 500 }}
            >
              {AmountToBeSent}
            </strong>
          </p>
        </div>
      </div>
      <div className="confirm-form">
        <Input
          name="reference"
          onChange={onOptionsChange}
          value={form.reference || ''}
          placeholder={global.translate('Enter reference here', 433)}
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
          checked={!!form.isRecurring}
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
              {global.translate('Payment day of the month', 336)}:{' '}
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
              <p className="from">{global.translate('From', 114)}:</p>
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
                  form.startDate
                    ? new Date(form.startDate).toDateString()
                    : ''
                }
                onChange={onOptionsChange}
                localization={localStorage.language || 'en'}
              />
            </div>
            <div className="from-two-group">
              <p className="from">{global.translate('to', 115)}:</p>
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
                  form.endDate
                    ? new Date(form.endDate).toDateString()
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
              checked={!!form.sendNow}
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
          label={global.translate('Confirm  your PIN number', 941)}
          onChange={onOptionsChange}
          shouldClear={shouldClear}
          setShouldClear={setShouldClear}
        />
      </div>
      <div className="load-stuff" style={{ alignSelf: 'center' }}>
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
  );
};
ConfirmationForm.propTypes = {
  confirmationData: PropTypes.objectOf(PropTypes.any).isRequired,
  onOptionsChange: PropTypes.func.isRequired,
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  shouldClear: PropTypes.func,
  setShouldClear: PropTypes.func,
  errors: PropTypes.arrayOf(PropTypes.any),
  error: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.bool,
  days: PropTypes.arrayOf(PropTypes.any).isRequired,
};
ConfirmationForm.defaultProps = {
  errors: [],
  error: null,
  loading: false,
  shouldClear: () => {},
  setShouldClear: () => {},
};

export default ConfirmationForm;
