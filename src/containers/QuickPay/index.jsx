import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuickPayComponent from 'components/QuickPay';
import findUser, {
  clearFoundUser,
} from 'redux/actions/contacts/locateWallet';
import { CELINE_MONEY } from 'constants/general';
import confirmTransaction from 'redux/actions/moneyTransfer/confirmTransaction';
import { updateMoneyTransferStep } from 'redux/actions/dashboard/dashboard';
import sendMoneyModal from './sendMoneyModal';

const QuickPay = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    digit0: '',
    digit1: '',
    digit2: '',
    digit3: '',
  });
  const [result, setResult] = useState(null);
  const [canScanQR, setCanScanQR] = useState(false);
  const [selectWallet, setSelectedWallet] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [errors, setErrors] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const { locateWallet } = useSelector(({ contacts }) => contacts);
  const {
    myWallets: { walletList },
    userData,
  } = useSelector(({ user }) => user);
  const {
    moneyTransfer: { step },
  } = useSelector(state => state.dashboard);
  const { confirmationError, confirmationData } = useSelector(
    state => state.moneyTransfer.confirmTransaction,
  );

  useEffect(() => {
    if (confirmationError) {
      setErrors(confirmationError?.[0]?.Description);
    }
  }, [confirmationError]);

  useEffect(() => {
    if (userData.data) {
      setCountryCode(userData.data?.Country);
    }
  }, [userData]);

  const onOptionChange = ({ target: { value, name } }) => {
    if (locateWallet.data && name === 'AccountNumber') {
      clearFoundUser()(dispatch);
    }
    if (locateWallet.error) {
      clearFoundUser()(dispatch);
      setErrors(null);
    }
    if (confirmationError) {
      setErrors(null);
    }
    if (errors) {
      setErrors(null);
    }

    setForm({ ...form, [name]: value });
  };
  const handleScan = data => {
    if (data) {
      setResult(data);
    }
  };
  const handleError = err => {
    throw new Error('fail to scan', err);
  };
  useEffect(() => {
    if (locateWallet.error) {
      setErrors(locateWallet.error?.Description);
    }
  }, [locateWallet]);

  useEffect(() => {
    if (result) {
      setForm({
        ...form,
        AccountNumber: result,
      });
    }
  }, [result]);

  const isUsingDefaultWallet = () =>
    userData.data?.DefaultWallet === form.SourceWallet || false;

  const searchUser = () => {
    const WalletNumber = form?.AccountNumber;
    setForm({
      ...form,
      TargetCurrency: form?.AccountNumber.substring(0, 3),
    });
    const data = {
      WalletNumber,
    };
    if (WalletNumber) findUser(data)(dispatch);
  };

  useEffect(() => {
    if (walletList) {
      walletList.map(wallet => {
        if (wallet.Default === 'YES') {
          setSelectedWallet(wallet);
        }
      });
    }
  }, [walletList]);
  useEffect(() => {
    if (selectWallet) {
      setForm({
        ...form,
        SourceWallet:
          selectWallet.AccountNumber || selectWallet.AccountNumber,
      });
    }
    if (errors) {
      setErrors(null);
    }
  }, [selectWallet]);
  const checkTransactionConfirmation = () => {
    const Amount = form?.Amount.replace(/,/g, '');
    const data = {
      CountryCode: userData?.data?.Country,
      Amount: Amount.toString(),
      TargetCurrency: form.TargetCurrency,
      TargetType: CELINE_MONEY,
      SourceWallet: form?.SourceWallet,
    };
    confirmTransaction(data)(dispatch);
  };
  useEffect(() => {
    if (confirmationData && confirmationData[0]) {
      updateMoneyTransferStep(2)(dispatch);
      setOpenModal(true);
    }
  }, [confirmationData]);
  return (
    <QuickPayComponent
      onOptionChange={onOptionChange}
      searchUser={searchUser}
      locateUser={locateWallet && locateWallet}
      loading={locateWallet.loading}
      form={form}
      handleError={handleError}
      handleScan={handleScan}
      result={result}
      canScanQR={canScanQR}
      setCanScanQR={setCanScanQR}
      walletList={walletList}
      setSelectedWallet={setSelectedWallet}
      selectWallet={selectWallet}
      checkTransactionConfirmation={checkTransactionConfirmation}
      errors={errors}
      confirmationData={confirmationData}
      sendMoneyModal={sendMoneyModal({
        form,
        setForm,
        confirmationData,
        openModal,
        setOpenModal,
        step,
        errors,
        setErrors,
        countryCode,
        locateWallet,
        isUsingDefaultWallet,
        setResult,
      })}
    />
  );
};

export default QuickPay;
