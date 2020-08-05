/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {  Form, Input, Label } from 'semantic-ui-react';
import { MonthRangeInput } from 'semantic-ui-calendar-react';
import { useHistory, Prompt, useLocation } from 'react-router-dom';
import './AddMoney.scss';
import DashboardLayout from 'components/common/DashboardLayout';
import GoBack from 'components/common/GoBack';

import useWindowSize from 'utils/useWindowSize';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import MyWallets from 'components/common/WalletCarousselSelector';
import CreditCardNumberInput from './CreditCardNumberInput';
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
  const [oneSuccess, setOneSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [selectedWalletNumber, setSelectedWalletNumber] = useState(
    '',
  );
  const cvvRef = useRef(null);

  const history = useHistory();
  const location = useLocation();
  const { width } = useWindowSize();

  const onClickHandler = () => history.goBack();
  const { Currency } = addMoneyData;

  const { justAdded } = addMoneyFromCreditCard;

  useEffect(() => {
    if (location.state?.wallet) {
      const { AccountNumber } = location.state.wallet;
      setSelectedWalletNumber(AccountNumber);
    }
  }, [myWallets]);

  useEffect(() => {
    if (justAdded) {
      setOneSuccess(true);
    }
  }, [justAdded]);

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
  const { MM, YYYY } = addMoneyData;

  const justSuccessful = !!MM.length && !!YYYY.length && oneSuccess;

  const formIsHalfFilledOut =
    Object.values(addMoneyData).filter(item => item && item !== '')
      .length > 2 && !justSuccessful;

  return (
    <>
      <Prompt
        when={formIsHalfFilledOut}
        message={JSON.stringify({
          header: global.translate('Confirm'),
          content: global.translate(
            'You have unsaved changes, Are you sure you want to leave?',
          ),
        })}
      />

      <DashboardLayout>
        <WelcomeBar loading={userData.loading}>
          <div className="head-content">
            <div className="go-back">
              <GoBack style onClickHandler={onClickHandler} />
            </div>
            <h2 className="head-title">
              {global.translate('Add money using a credit card')}
            </h2>
            <div className="clear" />
          </div>
        </WelcomeBar>
        <div className="clear" />
      <div className="wrap__container">
          <div className="add-money-container">
             <MyWallets
              myWallets={myWallets}
              selectWallet={selectWallet}
              selectedWalletNumber={selectedWalletNumber}
            />
            <div className="clear" />
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
                  type="number"
                  required
                  width={3}
                />
                <input
                  type="text"
                  ref={cvvRef}
                  className="hasFocus"
                />
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
                    error={errors.Country || false}
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
        </div> 
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
