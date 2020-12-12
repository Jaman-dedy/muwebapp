import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Item, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import addMoneyFromCreditCardAction from 'redux/actions/addMoney/addMoneyFromCreditCard';
import clearCardOperationFeesAction from 'redux/actions/addMoney/clearCardOperationFees';
import Placeholder from './PlaceHolder';

const ConfirmAddMoney = ({
  step,
  setStep,
  addMoneyData,
  cardOperationFees,
  addMoneyFromCreditCard,
  clearAddMoneyData,
  setLevelThree,
}) => {
  const dispatch = useDispatch();
  const { loading, success, error } = addMoneyFromCreditCard;
  const { Fees, TotalAmount, Currency } = cardOperationFees;
  const {
    Amount,
    CardNumber,
    WalletNumber,
    NameOnCard,
  } = addMoneyData;
  useEffect(() => {
    if (success) {
      setStep(1);
      clearAddMoneyData();
      clearCardOperationFeesAction()(dispatch);
    }
  }, [success]);

  return (
    <div className="transfer-summary">
      <h3>{global.translate('Top Up summary', 2124)}</h3>
      <Item.Group divided>
        <Item style={{ display: 'block' }}>
          <span>{global.translate('Top up amount', 2125)}</span>
          <span className="moneyAmount">
            {Fees ? `${Amount} ${Currency}` : <Placeholder />}
          </span>
        </Item>

        <Item style={{ display: 'block' }}>
          <span>Credit card company fees</span>
          <span className="moneyAmount">
            {Fees ? `${Fees} ${Currency}` : <Placeholder />}
          </span>
        </Item>

        <Item style={{ display: 'block' }}>
          <span>{global.translate(`Total amount`, 2126)}</span>
          <span className="moneyAmount">
            {TotalAmount ? (
              `${TotalAmount} ${Currency}`
            ) : (
              <Placeholder />
            )}
          </span>
        </Item>
        <Item style={{ display: 'block' }}>
          <span>{global.translate(`Name on card`, 493)}</span>
          <span className="moneyAmount">
            {TotalAmount ? `${NameOnCard}` : <Placeholder />}
          </span>
        </Item>
        <Item style={{ display: 'block' }}>
          <span>{global.translate(`Card number`, 491)}</span>
          <span className="moneyAmount">
            {TotalAmount ? `${CardNumber}` : <Placeholder />}
          </span>
        </Item>
        <Item style={{ display: 'block' }}>
          <span>{global.translate(`Wallet number`, 98)}</span>
          <span className="moneyAmount">
            {TotalAmount ? `${WalletNumber}` : <Placeholder />}
          </span>
        </Item>
      </Item.Group>
      {error && (
        <Message negative>
          <Message.Header>{error.Description}</Message.Header>
          <p>{error.ErrorMessage}</p>
        </Message>
      )}
      <Button
        loading={loading}
        disabled={loading}
        style={{
          backgroundColor: '#d0342f',
          color: '#fff',
        }}
        onClick={() =>
          !loading &&
          addMoneyFromCreditCardAction(addMoneyData)(dispatch)
        }
      >
        {error
          ? global.translate('Try again', 1996)
          : global.translate('Confirm & Top Up', 2127)}
      </Button>
      <Button
        disabled={loading}
        onClick={() => {
          setStep(step - 1);
          clearCardOperationFeesAction()(dispatch);
          setLevelThree(false);
        }}
      >
        {global.translate('Back', 174)}
      </Button>
    </div>
  );
};

ConfirmAddMoney.propTypes = {
  step: PropTypes.bool.isRequired,
  setStep: PropTypes.func.isRequired,
  addMoneyData: PropTypes.instanceOf(Object),
  cardOperationFees: PropTypes.instanceOf(Object),
  addMoneyFromCreditCard: PropTypes.instanceOf(Object),
  clearAddMoneyData: PropTypes.func,
};
ConfirmAddMoney.defaultProps = {
  addMoneyData: {},
  cardOperationFees: {},
  addMoneyFromCreditCard: {},
  clearAddMoneyData: () => {},
};
export default ConfirmAddMoney;
