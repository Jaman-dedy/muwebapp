/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import moveFunds, {
  clearMoveFundsErrors,
} from 'redux/actions/moneyTransfer/moveFunds';
import getallContacts from 'redux/actions/contacts/getContactList';
import getMyWallets from 'redux/actions/users/getMyWallets';
import confirmTransaction from 'redux/actions/moneyTransfer/confirmTransaction';
import ExchangeCurrency from 'components/MoneyTransfer/currencyExchange/CurrencyExchange';
import { updateMoneyTransferStep } from 'redux/actions/dashboard/dashboard';
import { CELINE_MONEY } from 'constants/general';

const CurrencyExchangeContainer = ({
  setSendMoneyOpen,
  sendMoneyOpen,
}) => {
  const { allContacts } = useSelector(state => state.contacts);
  const { walletList } = useSelector(state => state.user.myWallets);
  const { userData } = useSelector(({ user }) => user);
  const [contactPID, setContactPID] = React.useState();
  const [form, setForm] = useState({});
  const [balanceOnWallet, setBalance] = useState(0.0);
  const [currency, setCurrency] = useState(null);

  const [errors, setErrors] = useState(null);
  const wallet = useSelector(
    state =>
      state.user.userData.data &&
      state.user.userData.data.DefaultWallet,
  );

  const [DefaultWallet, setDefaultWallet] = useState(wallet);

  const {
    moneyTransfer: { step },
  } = useSelector(state => state.dashboard);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (DefaultWallet) {
      setForm({ ...form, sourceWallet: DefaultWallet.AccountNumber });
    }
  }, [DefaultWallet, sendMoneyOpen]);

  const {
    checking,
    confirmationError,
    confirmationData,
  } = useSelector(state => state.moneyTransfer.confirmTransaction);
  const { loading, error, data } = useSelector(
    state => state.moneyTransfer.moveFundsTo2UWallet,
  );

  useEffect(() => {
    if (
      confirmationData &&
      confirmationData[0] &&
      !confirmationData?.[0]?.TargetAccountVerified
    ) {
      updateMoneyTransferStep(2)(dispatch);
    }
  }, [confirmationData]);

  const resetState = () => {
    updateMoneyTransferStep(1)(dispatch);
    clearMoveFundsErrors()(dispatch);
  };

  useEffect(() => {
    if (data && data[0]) {
      resetState();
      getMyWallets()(dispatch);
    }
  }, [data]);

  useEffect(() => {
    if (walletList && walletList.length > 0) {
      setDefaultWallet(
        walletList.find(wallet => wallet.Default === 'YES'),
      );
    }
  }, [walletList]);

  const balanceData = useSelector(state => state.user.userData.data);

  useEffect(() => {
    if (balanceData) {
      setBalance(balanceData.Balance);
    }
  }, [balanceData]);

  useEffect(() => {
    if (!walletList.length) {
      getMyWallets()(dispatch);
    }
  }, []);

  const loadContacts = () => getallContacts()(dispatch);

  useEffect(() => {
    if (!allContacts.data) {
      loadContacts();
    }
  }, []);

  const validate = () => {
    let hasError = false;
    if (parseFloat(form.amount, 10) === 0) {
      setErrors(
        global.translate('The Exchange amount cannot be zero', 2072),
      );
      hasError = true;
    }
    if (parseFloat(form.amount, 10) < 0) {
      setErrors(
        global.translate(
          'The Exchange amount cannot be negative',
          2073,
        ),
      );
      hasError = true;
    }
    if (parseFloat(balanceOnWallet, 10) === 0) {
      setErrors(
        global.translate(
          'You do not have enough money in this wallet for this operation',
          394,
        ),
      );
      hasError = true;
      return true;
    }

    if (form.amount === '' || !form.amount) {
      setErrors(
        global.translate(
          'You must enter the amount for this operation.',
          393,
        ),
      );
      hasError = true;
    }
    if (form.user2wallets === '' || !form.user2wallets) {
      setErrors(
        global.translate(
          'Please provide the target wallet number.',
          437,
        ),
      );
      hasError = true;
    }
    if (form.sourceWallet === '' || !form.sourceWallet) {
      setErrors('Please provide the source wallet number.', 1032);
      hasError = true;
    }
    if (form.sourceWallet === !'' || form.sourceWallet) {
      if (form.user2wallets === form.sourceWallet) {
        setErrors(
          global.translate(
            'The source wallet and the target wallet must not be the same',
            1236,
          ),
        );
        hasError = true;
      }
    }
    return hasError;
  };

  const checkTransactionConfirmation = () => {
    const data = {
      Amount: form.amount && form.amount.toString(),
      TargetCurrency:
        form.user2wallets &&
        walletList.find(
          wallet => wallet.AccountNumber === form.user2wallets,
        ).CurrencyCode,
      TargetType: CELINE_MONEY,
      SourceWallet: form.sourceWallet,
    };
    setErrors(null);
    if (!validate()) {
      confirmTransaction(data)(dispatch);
    }
  };

  const { digit0, digit1, digit2, digit3 } = form;
  const PIN = `${digit0}${digit1}${digit2}${digit3}`;
  const pinIsValid = () => PIN.length === 4;
  const moveFundsToToUWallet = () => {
    const data = {
      PIN,
      Amount: form.amount && form.amount.toString(),
      ContactPID: contactPID,
      TargetWallet: form.user2wallets,
      SourceWallet: form.sourceWallet,
      Reference: form.reference || '',
      Description: form.description || '',
      Reccurent: form.isRecurring ? 'YES' : 'No',
      SendNow: 'YES',
    };

    if (!pinIsValid()) {
      setErrors(
        global.translate('Please provide your PIN number.', 543),
      );
      return;
    }

    setErrors(null);
    moveFunds(
      data,
      '/TransferFunds2UWallet',
      'currency-exchange',
    )(dispatch);
  };

  useEffect(() => {
    if (form.sourceWallet && walletList) {
      const walletData =
        walletList &&
        walletList.find(
          item => item.AccountNumber === form.sourceWallet,
        );
      if (walletData) {
        setBalance(
          `${walletData.Balance} ${walletData.CurrencyCode}`,
        );
        setCurrency(walletData.CurrencyCode);
      }
    }
  }, [form.sourceWallet]);

  const onOptionsChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };
  const onChange = e => {
    e.persist();
    setForm({ ...form, [e.target.name]: e.target.checked });
  };
  return (
    <ExchangeCurrency
      history={history}
      allContacts={allContacts}
      setErrors={setErrors}
      walletList={walletList}
      userData={userData}
      onChange={onChange}
      onOptionsChange={onOptionsChange}
      form={form}
      balanceOnWallet={balanceOnWallet}
      setBalance={setBalance}
      setForm={setForm}
      modalOpen={sendMoneyOpen}
      setOpen={setSendMoneyOpen}
      checkTransactionConfirmation={checkTransactionConfirmation}
      currency={currency}
      checking={checking}
      confirmationError={confirmationError}
      confirmationData={confirmationData}
      moveFundsToToUWallet={moveFundsToToUWallet}
      setContactPID={setContactPID}
      loading={loading}
      errors={errors}
      error={error}
      data={data}
      retryContacts={loadContacts}
      DefaultWallet={DefaultWallet}
      step={step}
      resetState={resetState}
    />
  );
};

CurrencyExchangeContainer.propTypes = {
  setSendMoneyOpen: PropTypes.func.isRequired,
  sendMoneyOpen: PropTypes.bool.isRequired,
};
export default CurrencyExchangeContainer;
