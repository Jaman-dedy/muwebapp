import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  Image,
  Icon,
  TransitionablePortal,
} from 'semantic-ui-react';
import { useDispatch } from 'react-redux';

import alertIcon from 'assets/images/alert.png';
import Loader from 'components/common/Loader';
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

  useEffect(() => {
    if (success) {
      clearAddMoneyData();
      clearCardOperationFeesAction()(dispatch);
    }
    setOpen(false);
  }, [success]);

  const displayContent = () => {
    if (loading) {
      return (
        <div className="loading">
          <Loader loaderSize="massive" />
        </div>
      );
    }

    if (error)
      return (
        <div className="success-message">
          <Icon name="times" color="red" size="massive" />
          <span className="successful">
            {global.translate('Failed', 1213)}
          </span>
          <span className="message">
            {global.translate(error.Description)}
          </span>
          {error && error.ErrorMessage !== '' && (
            <span className="message">
              {global.translate(error.ErrorMessage)}
            </span>
          )}
        </div>
      );

    return (
      <>
        <p className="total-amount">
          {global.translate('Total amount:', 938)} {'  '}
          <strong className="amount">
            {`${TotalAmount} ${Currency}`}{' '}
          </strong>{' '}
          .
        </p>
        <div className="transaction-fees">
          <Image src={alertIcon} size="mini" />
          <div className="">
            {global.translate(
              'The credit card company will charge the following transaction fees :',
              937,
            )}{' '}
            <strong className="amount">{`${Fees} ${Currency}`}</strong>
          </div>
        </div>
      </>
    );
  };

  const displayActions = () => {
    if (error) {
      return (
        <Button
          onClick={() => {
            clearCardOperationFeesAction()(dispatch);
            setOpen(false);
          }}
          secondary
          content={global.translate('Try Again', 1996)}
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
          basic
          color="red"
          content={global.translate('Cancel', 86)}
        />
        <Button
          onClick={() =>
            !loading &&
            addMoneyFromCreditCardAction(addMoneyData)(dispatch)
          }
          positive
          content={global.translate('Proceed', 1752)}
        />
      </>
    );
  };

  return (
    <TransitionablePortal
      transition={{
        duration: 400,
        animation: 'fade',
      }}
      onClose={() => setOpen(false)}
      open={open}
    >
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
          {global.translate('Add money to your wallet', 173)}
        </Modal.Header>
        <Modal.Content className={` ${error && 'error-content'}`}>
          {displayContent()}
        </Modal.Content>
        <Modal.Actions>{displayActions()}</Modal.Actions>
      </Modal>
    </TransitionablePortal>
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
