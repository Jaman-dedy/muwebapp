import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Item, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import clearPayPalOperationFees from 'redux/actions/addMoney/clearPayPalOperationFees';
import Info from 'components/common/Alert/Info';
import Placeholder from './PlaceHolder';

const ConfirmPayPal = ({
  step,
  setStep,
  addMoneyData,
  payPalOperationFees,
  addMoneyFromPayPal,
  clearAddMoneyData,
  setLevelThree,
  handlePullPayPal,
}) => {
  const dispatch = useDispatch();
  const { loading, success, error } = addMoneyFromPayPal;
  const {
    Fees,
    TotalAmount,
    Currency,
    Warning,
  } = payPalOperationFees;
  const { Amount, WalletNumber } = addMoneyData;
  useEffect(() => {
    if (success) {
      setStep(1);
      clearAddMoneyData();
      clearPayPalOperationFees()(dispatch);
    }
  }, [success]);

  return (
    <div className="transfer-summary">
      <h3>{global.translate('Top Up summary', 2222)}</h3>
      <Item.Group divided>
        <Item style={{ display: 'block' }}>
          <span>{global.translate('Top up amount', 2221)}</span>
          <span className="moneyAmount">
            {Fees ? `${Amount} ${Currency}` : <Placeholder />}
          </span>
        </Item>

        <Item style={{ display: 'block' }}>
          <span>{global.translate('PayPal fees', 3366)}</span>
          <span className="moneyAmount">
            {Fees ? `${Fees} ${Currency}` : <Placeholder />}
          </span>
        </Item>
        <Item style={{ display: 'block' }}>
          <span>{global.translate(`Total amount`, 2223)}</span>
          <span className="moneyAmount">
            {TotalAmount ? (
              `${TotalAmount} ${Currency}`
            ) : (
              <Placeholder />
            )}
          </span>
        </Item>
        <Item style={{ display: 'block' }}>
          <span>{global.translate(`Wallet number`, 98)}</span>
          <span className="moneyAmount">
            {TotalAmount ? `${WalletNumber}` : <Placeholder />}
          </span>
        </Item>
      </Item.Group>

      <Info message={Warning} />

      <Info
        message={global.translate(
          'You are going to be redirected to PayPal website',
        )}
      />
      {error && (
        <Message negative>
          <Message.Header>{error.Description}</Message.Header>
          <p>{error.ErrorMessage}</p>
        </Message>
      )}
      <Button
        loading={loading}
        disabled={loading}
        positive
        onClick={handlePullPayPal}
      >
        {error
          ? global.translate('Try again', 1996)
          : global.translate('Confirm & Top Up', 2224)}
      </Button>
      <Button
        disabled={loading}
        onClick={() => {
          setStep(step - 1);
          clearPayPalOperationFees()(dispatch);
          setLevelThree(false);
        }}
      >
        {global.translate('Back', 174)}
      </Button>
    </div>
  );
};

ConfirmPayPal.propTypes = {
  step: PropTypes.bool.isRequired,
  setStep: PropTypes.func.isRequired,
  addMoneyData: PropTypes.instanceOf(Object),
  payPalOperationFees: PropTypes.instanceOf(Object),
  addMoneyFromPayPal: PropTypes.instanceOf(Object),
  clearAddMoneyData: PropTypes.func,
  setLevelThree: PropTypes.func,
  handlePullPayPal: PropTypes.func,
};
ConfirmPayPal.defaultProps = {
  addMoneyData: {},
  payPalOperationFees: {},
  addMoneyFromPayPal: {},
  clearAddMoneyData: () => {},
  setLevelThree: () => {},
  handlePullPayPal: () => {},
};
export default ConfirmPayPal;
