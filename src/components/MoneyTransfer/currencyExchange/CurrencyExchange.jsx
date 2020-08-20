import React from 'react';
import '../SendMoney/style.scss';
import PropTypes from 'prop-types';
import CurrencyExchangeModal from './CurrencyExchangeModal';

const CurrencyExchange = ({
  history,
  userData,
  allContacts,
  walletList,
  destinationContact,
  onChange,
  setForm,
  setContactPID,
  onOptionsChange,
  moveFundsToToUWallet,
  form,
  balanceOnWallet,
  modalOpen,
  setOpen,
  currency,
  checkTransactionConfirmation,
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
}) => {
  return (
    <CurrencyExchangeModal
      open={modalOpen}
      DefaultWallet={DefaultWallet}
      userData={userData}
      destinationContact={destinationContact}
      setOpen={setOpen}
      resetState={resetState}
      walletList={walletList}
      history={history}
      allContacts={allContacts}
      setForm={setForm}
      moveFundsToToUWallet={moveFundsToToUWallet}
      onChange={onChange}
      currency={currency}
      onOptionsChange={onOptionsChange}
      form={form}
      balanceOnWallet={balanceOnWallet}
      modalOpen={modalOpen}
      checkTransactionConfirmation={checkTransactionConfirmation}
      checking={checking}
      confirmationError={confirmationError}
      confirmationData={confirmationData}
      setContactPID={setContactPID}
      loading={loading}
      error={error}
      data={data}
      errors={errors}
      step={step}
      setStep={setStep}
      setErrors={setErrors}
    />
  );
};

CurrencyExchange.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.bool,
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  setOpen: PropTypes.func,
  walletList: PropTypes.arrayOf(PropTypes.any),
  destinationContact: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: PropTypes.func,
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
  allContacts: PropTypes.objectOf(PropTypes.any).isRequired,
  setContactPID: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool,
  errors: PropTypes.string,
  DefaultWallet: PropTypes.objectOf(PropTypes.any).isRequired,
  setStep: PropTypes.func,
  step: PropTypes.number,
  setErrors: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired,
};

CurrencyExchange.defaultProps = {
  moveFundsToToUWallet: () => {},
  loading: false,
  currency: PropTypes.string,
  checkTransactionConfirmation: () => {},
  checking: false,
  balanceOnWallet: 0,
  setForm: () => {},
  onChange: () => {},
  onOptionsChange: () => {},
  setOpen: () => {},
  walletList: [],
  history: {},
  modalOpen: false,
  step: 1,
  setStep: () => {},
  errors: null,
};
export default CurrencyExchange;
