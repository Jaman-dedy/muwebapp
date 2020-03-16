/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Image, Form, Input, Label } from 'semantic-ui-react';
import { MonthRangeInput } from 'semantic-ui-calendar-react';

import './AddMoney.scss';
import DashboardLayout from 'components/common/DashboardLayout';

import creditCardImage from 'assets/images/pay-online.png';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import CreditCardNumberInput from './CreditCardNumberInput';
import MyWallets from './MyWallets';
import AddMoneyModal from './AddMoneyModal';

const defaultOptions = [
  { key: 'usd', text: 'USD', value: 'USD' },
  { key: 'eur', text: 'EUR', value: 'EUR' },
  { key: 'gbp', text: 'GBP', value: 'GBP' },
  { key: 'cad', text: 'CAD', value: 'CAD' },
  { key: 'aud', text: 'AUD', value: 'AUD' },
];

const AddMoney = ({
  handleInputChange,
  addMoneyData,
  userData,
  myWallets,
  selectWallet,
  cardOperationFees,
  addMoneyFromCreditCard,
  errors,
  handleSubmit,
  clearAddMoneyData,
}) => {
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const cvvRef = useRef(null);

  const { Currency } = addMoneyData;

  const handleChange = (_, { value }) => {
    if (date) setDate(value.split(' ')[2] || value);
    else setDate(value.split(' ')[0]);

    cvvRef.current.focus();
  };

  const handleDateChange = () => {
    handleInputChange({
      target: { name: 'date', value: date },
    });
  };

  useEffect(() => {
    handleDateChange();
    if (cardOperationFees.success) setOpen(true);
  }, [date, cardOperationFees]);

  useEffect(() => {
    const option = defaultOptions.find(
      option => option.value === Currency,
    );

    const newOptions = option
      ? defaultOptions
      : [
          ...defaultOptions,
          {
            key: Currency.toLowerCase(),
            text: Currency,
            value: Currency,
          },
        ];

    setOptions(newOptions);
  }, [Currency]);

  return (
    <>
      <DashboardLayout>
        <WelcomeBar loading={userData.loading}>
          <span className="lighter">
            Hey{' '}
            <span className="bold">
              {userData.data && userData.data.FirstName}
            </span>
            , {global.translate('add money to your wallet')}
          </span>
        </WelcomeBar>
        <div className="add-money-container">
          <div>
            <Image src={creditCardImage} size="medium" centered />
          </div>

          <MyWallets
            myWallets={myWallets}
            selectWallet={selectWallet}
          />

          <Form className="add-money-form" autoComplete="off">
            <div className="amount">
              <Form.Input
                placeholder={global.translate('Amount', 116)}
                className="amount-input"
                error={errors.Amount || false}
                name="Amount"
                value={addMoneyData.Amount}
                onChange={handleInputChange}
                type="number"
                required
                // width={13}
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
              <MonthRangeInput
                name="date"
                placeholder={global.translate('Date')}
                value={date}
                error={errors.date || false}
                icon="calendar alternate outline"
                popupPosition="bottom left"
                iconPosition="left"
                onChange={handleChange}
              />
              <Form.Input
                className="cvv"
                placeholder="CVV"
                name="CVV"
                value={addMoneyData.CVV}
                error={errors.CVV || false}
                onChange={handleInputChange}
                ref={cvvRef}
                type="text"
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
                <span>{global.translate('City')}</span>
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
                  error={errors.Country || true}
                  onChange={handleInputChange}
                  fluid
                />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <span>
                {global.translate('Description')} [
                {global.translate('Optional')}]
              </span>
              <Input
                name="OpDescription"
                value={addMoneyData.OpDescription}
                onChange={handleInputChange}
                fluid
              />
            </Form.Field>
            {cardOperationFees.error && (
              <Form.Field style={{ marginTop: '-7px' }}>
                <Label prompt>
                  {global.translate(
                    cardOperationFees.error.Description,
                  )}
                </Label>
              </Form.Field>
            )}
            <Form.Button
              type="button"
              primary
              loading={cardOperationFees.loading}
              onClick={() =>
                !cardOperationFees.loading && handleSubmit()
              }
            >
              {global.translate('next')}
            </Form.Button>
          </Form>
        </div>
        <AddMoneyModal
          open={open}
          setOpen={setOpen}
          addMoneyData={addMoneyData}
          cardOperationFees={cardOperationFees}
          addMoneyFromCreditCard={addMoneyFromCreditCard}
          clearAddMoneyData={clearAddMoneyData}
        />
      </DashboardLayout>
    </>
  );
};

AddMoney.propTypes = {
  userData: PropTypes.instanceOf(Object),
  addMoneyData: PropTypes.instanceOf(Object).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  errors: PropTypes.instanceOf(Object),
  handleSubmit: PropTypes.func.isRequired,
  myWallets: PropTypes.instanceOf(Object).isRequired,
  cardOperationFees: PropTypes.instanceOf(Object),
  addMoneyFromCreditCard: PropTypes.instanceOf(Object),
  selectWallet: PropTypes.func.isRequired,
  clearAddMoneyData: PropTypes.func,
};

AddMoney.defaultProps = {
  userData: {
    data: {},
  },
  errors: {},
  cardOperationFees: {
    success: false,
  },
  addMoneyFromCreditCard: {
    success: false,
  },
  clearAddMoneyData: () => null,
};
export default AddMoney;
