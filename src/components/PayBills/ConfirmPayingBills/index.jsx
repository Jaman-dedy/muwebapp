/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import formatNumber from 'utils/formatNumber';
import transferConfirmationAction from 'redux/actions/payBills/transferConfirmation';
import Message from 'components/common/Message';
import PinCodeForm from 'components/common/PinCodeForm';
import './ConfirmPayingBills.scss';

const ConfirmPayingBills = ({
  screen3,
  payBillsData,
  transferConfirmation,
  transferFund,
  handleInputChange,
}) => {
  const { language: { preferred } = {} } = useSelector(
    ({ user }) => user,
  );
  const { errors, clearError, setErrors } = screen3;

  const [pinDigit, setPinDigit] = useState({
    digit0: '',
    digit1: '',
    digit2: '',
    digit3: '',
  });

  useEffect(() => {
    const { digit0, digit1, digit2, digit3 } = pinDigit;
    const pin = `${digit0}${digit1}${digit2}${digit3}`;

    handleInputChange({ target: { name: 'Pin', value: pin } });
    clearError({ target: { name: 'Pin', value: pin } });
  }, [pinDigit]);

  const dispatch = useDispatch();

  return (
    <div className="ConfirmPayingBills">
      <div className="amount-input">
        <span>{`${global.translate('Amount').trim()}:`}</span>
        <Input
          type="number"
          name="Amount"
          value={payBillsData.Amount}
          onChange={e => {
            clearError(e);
            handleInputChange(e);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              if (payBillsData.Amount) {
                if (payBillsData.Amount == 0) {
                  return setErrors({
                    ...errors,
                    Amount: global.translate(
                      'The amount should not be zero.',
                      2006,
                    ),
                  });
                }
                if (payBillsData.Amount < 0) {
                  return setErrors({
                    ...errors,
                    Amount: global.translate(
                      'The amount should not be less than zero.',
                      2007,
                    ),
                  });
                }
                transferConfirmationAction(payBillsData)(dispatch);
              }
            }
          }}
          onBlur={() => {
            if (payBillsData.Amount) {
              if (payBillsData.Amount == 0) {
                return setErrors({
                  ...errors,
                  Amount: global.translate(
                    'The amount should not be zero.',
                    2006,
                  ),
                });
              }
              if (payBillsData.Amount < 0) {
                return setErrors({
                  ...errors,
                  Amount: global.translate(
                    'The amount should not be less than zero.', 2007
                  ),
                });
              }
              transferConfirmationAction(payBillsData)(dispatch);
            }
          }}
          error={!!errors.Amount || false}
          autoComplete="off"
          placeholder={global.translate('Enter the Amount')}
        />
      </div>
      {transferConfirmation.error && (
        <div className="amount-error">
          <Message
            error
            message={global.translate(
              'You do not have enough money in this wallet for this operation',
              394,
            )}
          />
        </div>
      )}
      <div className="fees-box">
        <div className="title">{global.translate('Fees')}</div>
        <div className="fees">
          <span> {global.translate('Fees')} </span> :{' '}
          <span>
            {transferConfirmation.loading
              ? global.translate('Working...')
              : formatNumber(transferConfirmation.data.Fees, {
                  locales: preferred,
                  currency:
                    transferConfirmation.data.Fees &&
                    transferConfirmation.data.Fees.split(' ')[1],
                }) || 0}
          </span>
        </div>
        <div className="external-fees">
          <span> {global.translate('External fees')} </span> :{' '}
          <span>
            {transferConfirmation.loading
              ? global.translate('Working...')
              : formatNumber(transferConfirmation.data.ExternalFees, {
                  locales: preferred,
                  currency:
                    transferConfirmation.data.ExternalFees &&
                    transferConfirmation.data.ExternalFees.split(
                      ' ',
                    )[1],
                }) || 0}
          </span>
        </div>
        <div className="exchange-fees">
          <span> {global.translate('Exchange Fees')} </span> :{' '}
          <span>
            {transferConfirmation.loading
              ? global.translate('Working...')
              : formatNumber(transferConfirmation.data.ExchangeFees, {
                  locales: preferred,
                  currency:
                    transferConfirmation.data.ExchangeFees &&
                    transferConfirmation.data.ExchangeFees.split(
                      ' ',
                    )[1],
                }) || 0}
          </span>
        </div>
        <div className="fees">
          <span> {global.translate('Taxes')} </span> :{' '}
          <span>
            {transferConfirmation.loading
              ? global.translate('Working...')
              : formatNumber(transferConfirmation.data.Taxes, {
                  locales: preferred,
                  currency:
                    transferConfirmation.data.Taxes &&
                    transferConfirmation.data.Taxes.split(' ')[1],
                }) || 0}
          </span>
        </div>
      </div>
      <div className="transaction-details">
        <div className="exchange-rate">
          {global.translate('Exchange Rate')} ={' '}
          {transferConfirmation.data.ExchangeRate || '1:1'}
        </div>
        <div className="total-box">
          <div>
            <span>{global.translate('Total')}: </span>{' '}
            <span>
              {transferConfirmation.loading
                ? global.translate('Working...')
                : formatNumber(
                    transferConfirmation.data.TotalAmount,
                    {
                      locales: preferred,
                      currency:
                        transferConfirmation.data.TotalAmount &&
                        transferConfirmation.data.TotalAmount.split(
                          ' ',
                        )[1],
                    },
                  ) || 0}
            </span>
          </div>
          <div>
            <span>
              {global.translate('Amount to be received')}:
            </span>{' '}
            <span>
              {transferConfirmation.loading
                ? global.translate('Working...')
                : formatNumber(
                    transferConfirmation.data.AmountToBeSent,
                    {
                      locales: preferred,
                      currency:
                        transferConfirmation.data.AmountToBeSent &&
                        transferConfirmation.data.AmountToBeSent.split(
                          ' ',
                        )[1],
                    },
                  ) || 0}
            </span>
          </div>
        </div>
      </div>
      <hr />
      <div className="pin-number">
        <PinCodeForm
          onChange={({ target: { name, value } }) =>
            setPinDigit({
              ...pinDigit,
              [name]: value,
            })
          }
        />
        {screen3.errors.Pin && (
          <Message error message={screen3.errors.Pin} />
        )}
      </div>
      {transferFund.error && (
        <div className="transfer-fund-error">
          <Message
            error
            message={global.translate(transferFund.error.Description)}
          />
        </div>
      )}
    </div>
  );
};

ConfirmPayingBills.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  screen3: PropTypes.instanceOf(Object).isRequired,
  payBillsData: PropTypes.instanceOf(Object).isRequired,
  transferConfirmation: PropTypes.instanceOf(Object).isRequired,
  transferFund: PropTypes.instanceOf(Object).isRequired,
};

export default ConfirmPayingBills;
