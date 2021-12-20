/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import VirtualCardDetails from 'components/VrtualCard/virtualCardDetails/VirtualCardDetails';
import addMoneyToVCard, {
  clearAddMoneyToVirtuaCard,
} from 'redux/actions/virtualCard/addMoneyToVirtualCard';
import updateVirtualCardStatus, {
  clearUpdateCardStatus,
} from 'redux/actions/virtualCard/updateCardStatus';
import getMyWallets from 'redux/actions/users/getMyWallets';
import confirmTransaction, {
  clearConfirmation,
} from 'redux/actions/moneyTransfer/confirmTransaction';
import renewCard, {
  clearRenewCardStatus,
} from 'redux/actions/virtualCard/renewVirtualCard';
import redeeMyMoney, {
  clearRedeeMoney,
} from 'redux/actions/virtualCard/redeeMoney';
import { VIRTUAL_CARD } from 'constants/general';

const VirtualCardDetailsContainer = () => {
  const dispatch = useDispatch();
  const [selectedWallet, setSelectedWallet] = useState(null);

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState(null);
  const [step, setStep] = useState(1);
  const { userData } = useSelector(({ user }) => user);
  const [toastMessage, setToasMessage] = useState(null);
  const [toastCardStatus, setToastCardStatus] = useState(null);
  const [redeemMoneyToast, setRedeemMoneyToast] = useState(null);
  const [renewCardToast, setrenewCardToast] = useState(null);
  const [isViewingDetail, setIsViewingDetail] = useState(false);
  const [cardsStatus, setCardStatus] = useState('YES');
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [renewCardLoad, setRenewCardLoad] = useState(false);
  const [loadRedeeMoney, setLoadRedeeMoney] = useState(false);
  const [isRedeeming, setisRedeeming] = useState(false);
  const [error, setError] = useState(null);
  const [confirmRedeem, setConfirmRedeem] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [shouldClear, setShouldClear] = useState(false);
  const [destCurrency, setDestCurrency] = useState(null);

  const [addMoneyOpen, setAddMoneyOpen] = useState(false);
  const { walletList } = useSelector(state => state.user.myWallets);
  const location = useLocation();

  const {
    addMoneyToVirtualCard,
    cardStatus,
    renewVirtualCard,
    redeeMoney,
  } = useSelector(({ virtualCard }) => virtualCard);

  const {
    checking,
    confirmationError,
    confirmationData,
  } = useSelector(state => state.moneyTransfer.confirmTransaction);

  const onOptionsChange = (e, { name, value }) => {
    setShouldClear(false);
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    if (location?.state?.item?.Currency) {
      setDestCurrency(location.state.item.Currency);
    }
  }, [location?.state?.item]);

  useEffect(() => {
    if (userData.data) {
      walletList.map(wallet => {
        if (wallet.Default === 'YES') {
          setSelectedWallet(wallet);
        }
      });
    }
  }, [userData.data]);

  useEffect(() => {
    if (walletList.length === 0) {
      getMyWallets()(dispatch);
    }
  }, [walletList]);

  useEffect(() => {
    if (walletList.length) {
      const defaultWalletData = walletList.find(item => {
        return item.AccountNumber === selectedWallet?.AccountNumber;
      });

      setSelectedWallet(defaultWalletData);

      setForm({
        ...form,
        sourceWallet: defaultWalletData?.AccountNumber,
      });
    }
  }, [walletList]);

  useEffect(() => {
    if (addMoneyToVirtualCard?.data) {
      setToasMessage(addMoneyToVirtualCard?.data?.Description);
      setForm({
        ...form,
        amount: '',
        digit0: '',
        digit1: '',
        digit2: '',
        digit3: '',
      });
      setStep(1);
      setAddMoneyOpen(false);
      setError(null);
      setErrors(null);
    }
  }, [addMoneyToVirtualCard?.data]);

  useEffect(() => {
    if (addMoneyToVirtualCard?.error) {
      setError(addMoneyToVirtualCard?.error.Description);
      if (
        addMoneyToVirtualCard.error.Description ===
        'Wrong PIN number. Try again.'
      ) {
        setShouldClear(true);
      }
    }
  }, [addMoneyToVirtualCard?.error]);

  useEffect(() => {
    if (toastMessage) {
      setToasMessage(null);
      clearAddMoneyToVirtuaCard()(dispatch);
      clearConfirmation()(dispatch);
    }
  }, [toastMessage]);

  useEffect(() => {
    if (cardStatus?.data) {
      setToastCardStatus(cardStatus.data.Description);
      setCardStatus(cardStatus.data.Enabled);
    }
  }, [cardStatus?.data]);

  useEffect(() => {
    if (toastCardStatus) {
      toast.success(toastCardStatus);
      setToastCardStatus(null);
      clearUpdateCardStatus()(dispatch);
    }
  }, [toastCardStatus]);

  useEffect(() => {
    if (renewVirtualCard?.data) {
      setrenewCardToast(renewVirtualCard.data.Description);
    }
  }, [renewVirtualCard?.data]);

  useEffect(() => {
    if (renewCardToast) {
      toast.success(renewCardToast);
      setrenewCardToast(null);
      clearRenewCardStatus()(dispatch);
    }
  }, renewCardToast);

  useEffect(() => {
    if (redeeMoney?.data) {
      setRedeemMoneyToast(redeeMoney.data.Description);
    }
  }, [redeeMoney.data]);

  useEffect(() => {
    if (redeeMoney?.error) {
      setRedeemMoneyToast(redeeMoney.error.Description);
    }
  }, [redeeMoney?.error]);

  useEffect(() => {
    if (redeeMoney?.data) {
      clearRedeeMoney()(dispatch);
      toast.success(redeemMoneyToast);
      setRedeemMoneyToast(null);
      setStep(1);
      setisRedeeming(false);
      setErrors(null);
      setError(null);
      setOpenConfirmModal(false);
    }
  }, [redeemMoneyToast, redeeMoney.data]);

  useEffect(() => {
    if (redeeMoney?.error) {
      toast.error(redeemMoneyToast);
      setRedeemMoneyToast(null);
      setStep(1);
      setAddMoneyOpen(false);
      setOpenConfirmModal(false);
    }
  }, [redeemMoneyToast]);

  useEffect(() => {
    setIsLoadingStatus(cardStatus.loading);
  }, [cardStatus.loading]);

  useEffect(() => {
    setRenewCardLoad(renewVirtualCard?.loading);
  }, [renewVirtualCard?.loading]);

  useEffect(() => {
    setLoadRedeeMoney(redeeMoney.loading);
  }, [redeeMoney.loading]);

  const validate = () => {
    let hasError = false;
    if (parseFloat(form.amount, 10) === 0) {
      setErrors(
        global.translate('The Transfer amount can not be zero', 992),
      );
      hasError = true;
    }
    if (parseFloat(form.amount, 10) < 0) {
      setErrors(
        global.translate(
          'The Transfer amount can not be less than zero',
          992,
        ),
      );
      hasError = true;
    }
    if (parseFloat(selectedWallet?.Balance, 10) === 0) {
      setErrors(
        global.translate(
          "You don't have enough money in this wallet for this operation",
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

    return hasError;
  };

  const checkTransactionConfirmation = () => {
    const data = {
      Amount: form.amount && form.amount.toString(),
      TargetCurrency: destCurrency && destCurrency,
      TargetType: VIRTUAL_CARD,
      SourceWallet: form.sourceWallet || selectedWallet.AccountNumber,
      CardNumber: form?.CardNumber,
    };
    setErrors(null);
    if (!validate()) {
      confirmTransaction(data)(dispatch);
    }
  };

  const { digit0, digit1, digit2, digit3, digit4, digit5 } = form;
  const PIN = `${digit0}${digit1}${digit2}${digit3}${digit4}${digit5}`;
  const pinIsValid = () => PIN.length === 6;

  const onAddMoneyToVirtualCard = cardInfo => {
    const data = {
      PIN,
      Amount: form?.amount.toString(),
      Currency: cardInfo?.Currency,
      TargetType: VIRTUAL_CARD,
      SourceWallet:
        form?.sourceWallet || selectedWallet.AccountNumber,
      CardNumber: cardInfo?.CardNumber,
    };
    if (!pinIsValid()) {
      setErrors(
        global.translate('Please provide your PIN number.', 944),
      );
      return;
    }
    if (!form?.amount) {
      setErrors(
        global.translate(
          'Please provide the amount to be added',
          393,
        ),
      );
    }
    if (!form?.AccountNumber) {
      setErrors(
        global.translate('You did not select any wallet', 437),
      );
    }
    setErrors(null);

    addMoneyToVCard(data, '/AddMoneyToVirtualCard')(dispatch);
  };

  const onUpdateCardStatus = () => {
    const status = cardsStatus === 'YES' ? 'NO' : 'YES';
    const data = {
      CardNumber: form.CardNumber,
      Enable: status,
    };
    updateVirtualCardStatus(
      data,
      '/UpdateVirtualCardStatus',
    )(dispatch);
  };

  const onRenewVirtualCard = () => {
    const data = {
      CardNumber: form?.CardNumber,
    };
    renewCard(data, '/RenewVirtualCard')(dispatch);
  };

  const onRedeeMoney = currentCard => {
    const { digit0, digit1, digit2, digit3, digit4, digit5 } = form;
    const PIN = `${digit0}${digit1}${digit2}${digit3}${digit4}${digit5}`;
    const pinIsValid = () => PIN.length === 6;
    const data = {
      PIN,
      CardNumber: form?.CardNumber ?? currentCard?.CardNumber,
      TargetWallet: selectedWallet?.AccountNumber,
    };
    if (!pinIsValid()) {
      setErrors(
        global.translate('Please provide your PIN number.', 944),
      );
      return;
    }
    redeeMyMoney(data, '/RedeemVirtualCardBalance')(dispatch);
  };

  useEffect(() => {
    if (confirmationData && confirmationData[0]) {
      setStep(step + 1);
    }
  }, [confirmationData]);

  useEffect(() => {
    setErrors(null);
  }, [step]);

  return (
    <VirtualCardDetails
      selectedWallet={selectedWallet && selectedWallet}
      setSelectedWallet={setSelectedWallet}
      onOptionsChange={onOptionsChange}
      onAddMoneyToVirtualCard={onAddMoneyToVirtualCard}
      errors={errors}
      setForm={setForm}
      form={form}
      isViewingDetail={isViewingDetail}
      setIsViewingDetail={setIsViewingDetail}
      step={step}
      setStep={setStep}
      setErrors={setErrors}
      checkTransactionConfirmation={checkTransactionConfirmation}
      checking={checking}
      confirmationError={confirmationError}
      confirmationData={confirmationData}
      loading={addMoneyToVirtualCard?.loading}
      addMoneyOpen={addMoneyOpen}
      setAddMoneyOpen={setAddMoneyOpen}
      cardStatus={cardsStatus}
      setCardStatus={setCardStatus}
      onUpdateCardStatus={onUpdateCardStatus}
      loadingStatus={isLoadingStatus}
      onRenewVirtualCard={onRenewVirtualCard}
      onRedeeMoney={onRedeeMoney}
      renewCardLoad={renewCardLoad}
      setisRedeeming={setisRedeeming}
      isRedeeming={isRedeeming}
      loadRedeeMoney={loadRedeeMoney}
      error={error}
      userData={userData}
      confirmRedeem={confirmRedeem}
      setConfirmRedeem={setConfirmRedeem}
      setOpenConfirmModal={setOpenConfirmModal}
      openConfirmModal={openConfirmModal}
      shouldClear={shouldClear}
    />
  );
};

export default VirtualCardDetailsContainer;
