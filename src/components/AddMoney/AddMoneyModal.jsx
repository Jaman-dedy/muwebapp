import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  Image,
  Loader,
  Icon,
} from 'semantic-ui-react';
import { useDispatch } from 'react-redux';

import alertIcon from 'assets/images/alert.png';
import clearCardOperationFeesAction from 'redux/actions/addMoney/clearCardOperationFees';
import addMoneyFromCreditCardAction from 'redux/actions/addMoney/addMoneyFromCreditCard';
import './AddMoneyModal.scss';

const AddMoneyModal = ({
  open,
  setOpen,
  addMoneyData,
  cardOperationFees,
  addMoneyFromCreditCard,
  clearAddMoneyData,
}) => {
  const { Fees, TotalAmount, Currency } = cardOperationFees;
  const { loading, success, error } = addMoneyFromCreditCard;
  const dispatch = useDispatch();

  const displayContent = () => {
    if (success) {
      return (
        <div className="success-message">
          <Icon name="checkmark" color="green" size="massive" />
          <span className="successful">Successful</span>
          <span className="message">
            Your transaction has been completed successfully
          </span>
        </div>
      );
    }
    if (loading) {
      return <Loader className="loading" inverted size="massive" />;
    }

    if (error)
      return (
        <div className="success-message">
          <Icon name="times" color="red" size="massive" />
          <span className="successful">Failed</span>
          <span className="message">{error.Description}</span>
        </div>
      );

    return (
      <>
        <p className="total-amount">
          Total amount :{'  '}
          <strong className="amount">
            {`${TotalAmount} ${Currency}`}{' '}
          </strong>{' '}
          .
        </p>
        <div className="transaction-fees">
          <Image src={alertIcon} size="mini" />
          <div className="">
            The credit card company will charge the following
            transaction fees :{' '}
            <strong className="amount">{`${Fees} ${Currency}`}</strong>
          </div>
        </div>
      </>
    );
  };

  const displayActions = () => {
    if (success) {
      return (
        <Button
          onClick={() => {
            clearCardOperationFeesAction()(dispatch);
            clearAddMoneyData();
            setOpen(false);
          }}
          positive
          content="Done"
        />
      );
    }

    if (error) {
      return (
        <Button
          onClick={() => {
            clearCardOperationFeesAction()(dispatch);
            setOpen(false);
          }}
          secondary
          content="Try Again"
        />
      );
    }

    return (
      <>
        <Button
          onClick={() => {
            clearCardOperationFeesAction()(dispatch);
            return !loading && setOpen(false);
          }}
          negative
          content="Cancel"
        />
        <Button
          onClick={() =>
            !loading &&
            addMoneyFromCreditCardAction(addMoneyData)(dispatch)
          }
          positive
          content="Proceed"
        />
      </>
    );
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        if (error || success) {
          clearCardOperationFeesAction()(dispatch);
          setOpen(false);
        }
      }}
      size="tiny"
      className="add-money-modal"
    >
      <Modal.Header>
        Add money from your Visa card to your 2U wallet
      </Modal.Header>
      <Modal.Content
        className={`${success && 'success-content'} ${error &&
          'error-content'}`}
      >
        {displayContent()}
      </Modal.Content>
      <Modal.Actions>{displayActions()}</Modal.Actions>
    </Modal>
  );
};

AddMoneyModal.propTypes = {
  cardOperationFees: PropTypes.instanceOf(Object).isRequired,
  addMoneyData: PropTypes.instanceOf(Object).isRequired,
  addMoneyFromCreditCard: PropTypes.instanceOf(Object),
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  clearAddMoneyData: PropTypes.func,
};

AddMoneyModal.defaultProps = {
  open: false,
  setOpen: () => null,
  clearAddMoneyData: () => null,
  addMoneyFromCreditCard: { success: false },
};

export default AddMoneyModal;
