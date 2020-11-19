import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import SendMoneyModal from './SendMoneyModal';

const SendMoney = ({
  history,
  userData,
  allContacts,
  walletList,
  destinationContact,
  setForm,
  setContactPID,
  onOptionsChange,
  setBalance,
  moveFundsToToUWallet,
  form,
  balanceOnWallet,
  modalOpen,
  setOpen,
  setDestinationContact,
  currency,
  checkTransactionConfirmation,
  destinationWallets,
  checking,
  confirmationError,
  confirmationData,
  loading,
  error,
  setStep,
  data,
  step,
  DefaultWallet,
  errors,
  setErrors,
  resetState,
  shouldClear,
  setShouldClear,
  isSendingMoney,
}) => {
  return (
    <SendMoneyModal
      open={modalOpen}
      shouldClear={shouldClear}
      setShouldClear={setShouldClear}
      DefaultWallet={DefaultWallet}
      userData={userData}
      destinationContact={destinationContact}
      setOpen={setOpen}
      resetState={resetState}
      walletList={walletList}
      history={history}
      destinationWallets={destinationWallets}
      allContacts={allContacts}
      setForm={setForm}
      moveFundsToToUWallet={moveFundsToToUWallet}
      currency={currency}
      onOptionsChange={onOptionsChange}
      form={form}
      balanceOnWallet={balanceOnWallet}
      modalOpen={modalOpen}
      setDestinationContact={setDestinationContact}
      checkTransactionConfirmation={checkTransactionConfirmation}
      checking={checking}
      confirmationError={confirmationError}
      confirmationData={confirmationData}
      setContactPID={setContactPID}
      loading={loading}
      error={error}
      data={data}
      setBalance={setBalance}
      errors={errors}
      step={step}
      setStep={setStep}
      setErrors={setErrors}
      isSendingMoney={isSendingMoney}
    />
  );
};

SendMoney.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.bool,
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  setOpen: PropTypes.func,
  walletList: PropTypes.arrayOf(PropTypes.any),
  destinationContact: PropTypes.objectOf(PropTypes.any).isRequired,
  destinationWallets: PropTypes.arrayOf(PropTypes.any),
  onOptionsChange: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  balanceOnWallet: PropTypes.string,
  setForm: PropTypes.func,
  currency: PropTypes.string,
  checkTransactionConfirmation: PropTypes.func,
  checking: PropTypes.bool,
  confirmationError: PropTypes.objectOf(PropTypes.any).isRequired,
  confirmationData: PropTypes.objectOf(PropTypes.any).isRequired,
  moveFundsToToUWallet: PropTypes.func,
  error: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  setBalance: PropTypes.func,
  setDestinationContact: PropTypes.func,
  allContacts: PropTypes.objectOf(PropTypes.any).isRequired,
  setContactPID: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool,
  errors: PropTypes.string,
  DefaultWallet: PropTypes.string,
  setStep: PropTypes.func,
  step: PropTypes.number,
  setErrors: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired,
  shouldClear: PropTypes.bool.isRequired,
  setShouldClear: PropTypes.func.isRequired,
  isSendingMoney: PropTypes.bool.isRequired,
};

SendMoney.defaultProps = {
  moveFundsToToUWallet: () => {},
  loading: false,
  setBalance: () => {},
  currency: PropTypes.string,
  checkTransactionConfirmation: () => {},
  checking: false,
  balanceOnWallet: 0,
  setForm: () => {},
  destinationWallets: [],
  onOptionsChange: () => {},
  setOpen: () => {},
  walletList: [],
  history: {},
  setDestinationContact: () => {},
  modalOpen: false,
  step: 1,
  setStep: () => {},
  DefaultWallet: null,
  errors: null,
};
export default SendMoney;
