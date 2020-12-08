import React, { useEffect } from 'react';
import { Form, Label, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import CreditCardNumberInput from '../CreditCardNumberInput';

const CreditCardForm = ({
  errors,
  addMoneyData,
  handleInputChange,
  options,
  cvvRef,
  cardOperationFees,
  handleSubmit,
  step,
  setStep,
  handleBackEvent,
  addMoneyFromCreditCard,
  selectedMonth,
  setSelectedMonth,
  CustomInput,
}) => {
  const { loading, success, error } = cardOperationFees;
  useEffect(() => {
    if (success || error) {
      setStep(step + 1);
    }
  }, [success, error]);
  return (
    <Form className="add-money-form" autoComplete="off">
      <div className="amount">
        <Form.Input
          placeholder={global.translate('Amount', 116)}
          className="amount-credit-card-input"
          error={errors.Amount || false}
          name="Amount"
          value={addMoneyData.Amount}
          onChange={handleInputChange}
          type="number"
          required
        />
        <Form.Select
          className="currency"
          name="Currency"
          value={addMoneyData.Currency}
          error={errors.Currency || false}
          onChange={(_, { name, value }) => {
            handleInputChange({ target: { name, value } });
          }}
          defaultValue={options[0].value}
          options={options}
        />
      </div>
      <Form.Field className="amount">
        <Form.Input
          placeholder={global.translate('Name on card', 493)}
          name="NameOnCard"
          value={addMoneyData.NameOnCard}
          error={errors.NameOnCard || false}
          onChange={handleInputChange}
          type="text"
          required
          width={16}
        />
      </Form.Field>
      <span>{global.translate('Card number', 491)}</span>
      <CreditCardNumberInput
        addMoneyFromCreditCard={addMoneyFromCreditCard}
        handleInputChange={handleInputChange}
        errors={errors}
      />
      <span>{global.translate('Expiration date', 492)}</span>
      <Form.Field className="expiry-date">
        <DatePicker
          selected={selectedMonth}
          minDate={new Date()}
          onChange={date => setSelectedMonth(date)}
          customInput={<CustomInput />}
          dateFormat="MM-yyyy"
          showMonthYearPicker
        />

        <Form.Input
          className="cvv"
          placeholder="CVV"
          name="CVV"
          value={addMoneyData.CVV}
          error={errors.CVV || false}
          onChange={handleInputChange}
          ref={cvvRef}
          type="number"
          required
          width={3}
        />
        <input type="text" ref={cvvRef} className="hasFocus" />
      </Form.Field>
      <Form.Group widths="equal">
        <Form.Field>
          <span>{global.translate('Address')}</span>
          <Form.Input
            name="Address"
            value={addMoneyData.Address}
            error={errors.Address || false}
            onChange={handleInputChange}
            fluid
          />
        </Form.Field>
        <Form.Field>
          <span>{global.translate('City', 294)}</span>
          <Form.Input
            name="City"
            value={addMoneyData.City}
            error={errors.City || false}
            onChange={handleInputChange}
            fluid
          />
        </Form.Field>
        <Form.Field>
          <span>{global.translate('Country')}</span>
          <Form.Input
            name="Country"
            value={addMoneyData.Country}
            error={errors.Country || false}
            onChange={handleInputChange}
            fluid
          />
        </Form.Field>
      </Form.Group>
      <Form.Field>
        <span>
          {global.translate('Description', 1871)} [
          {global.translate('Optional', 1211)}]
        </span>
        <Input
          name="OpDescription"
          value={addMoneyData.OpDescription}
          onChange={handleInputChange}
          fluid
        />
      </Form.Field>
      {error && (
        <Form.Field style={{ marginTop: '-7px' }}>
          <Label prompt>{global.translate(error.Description)}</Label>
        </Form.Field>
      )}
      <div className="topup-actions">
        <Form.Button onClick={handleBackEvent}>
          {global.translate('Back')}
        </Form.Button>

        <Form.Button
          type="button"
          loading={loading}
          onClick={() => {
            if (!loading) {
              handleSubmit();
            }
          }}
          style={{
            backgroundColor: '#d0342f',
            color: '#fff',
          }}
        >
          {global.translate('Next', 10)}
        </Form.Button>
      </div>
    </Form>
  );
};

CreditCardForm.propTypes = {
  errors: PropTypes.instanceOf(Object),
  addMoneyData: PropTypes.instanceOf(Object),
  handleInputChange: PropTypes.func,
  options: PropTypes.instanceOf(Array),
  cvvRef: PropTypes.instanceOf(Object),
  cardOperationFees: PropTypes.instanceOf(Object),
  handleSubmit: PropTypes.func,
  step: PropTypes.instanceOf(Object),
  setStep: PropTypes.func,
  handleBackEvent: PropTypes.func,
  addMoneyFromCreditCard: PropTypes.instanceOf(Object),
  selectedMonth: PropTypes.string.isRequired,
  setSelectedMonth: PropTypes.func,
  CustomInput: PropTypes.func,
};

CreditCardForm.defaultProps = {
  errors: {},
  addMoneyData: {},
  handleInputChange: {},
  options: [],
  cvvRef: {},
  cardOperationFees: {},
  handleSubmit: {},
  step: {},
  setStep: {},
  handleBackEvent: () => {},
  addMoneyFromCreditCard: {},
  setSelectedMonth: () => {},
  CustomInput: () => {},
};

export default CreditCardForm;
