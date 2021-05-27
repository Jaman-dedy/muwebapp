import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SendToPayPal from 'components/MoneyTransfer/SendToPayPal';
import confirmTransaction, {
  clearConfirmation,
} from 'redux/actions/moneyTransfer/confirmTransaction';
import { TELCO } from 'constants/general';
import transferToOtherAction from 'redux/actions/moneyTransfer/transferToOthers';

const SendToPayPalContainer = () => {
  const dispatch = useDispatch();
  const [currentOption, setCurrentOption] = useState(null);
  const [form, setForm] = useState(null);
  const [openPinModal, setOpenPinModal] = useState(false);
  const [pinData, setPinData] = useState(null);
  const [PIN, setPIN] = useState('');
  const [payload, setPayload] = useState(null);
  const [primaryPhone, setPrimaryPhone] = useState(null);

  const {
    myWallets,
    userData: { data: userData },
  } = useSelector(({ user }) => user);
  const {
    confirmTransaction: {
      checking,
      confirmationError,
      confirmationData,
    },
  } = useSelector(({ moneyTransfer }) => moneyTransfer);

  const {
    transferToOthers: {
      loading: loadMoveFund,
      error: errorMoveFund,
      data: dataMoveFund,
    },
  } = useSelector(({ moneyTransfer }) => moneyTransfer);

  useEffect(() => {
    if (dataMoveFund) {
      setOpenPinModal(false);
      clearConfirmation()(dispatch);
    }
  }, [dataMoveFund]);

  useEffect(() => {
    if (userData) {
      setPrimaryPhone(
        userData.Phones?.find(item => item.Primary === 'YES'),
      );
    }
  }, [userData]);

  useEffect(() => {
    if (myWallets?.walletList.length) {
      const selectedWallet = myWallets?.walletList.find(
        wallet => wallet.Default === 'YES',
      );
      if (selectedWallet) {
        setCurrentOption(selectedWallet);
      }
    }
  }, [myWallets?.walletList.length]);

  const onOptionChange = (e, { name, value }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
  useEffect(() => {
    clearConfirmation()(dispatch);
  }, [form, currentOption]);
  const handleConfirmTransaction = () => {
    const data = {
      CountryCode: 'WW',
      Amount: form?.amount,
      OperatorID: TELCO,
      TargetCurrency: 'USD',
      AccountNumber: form?.email,
      TargetType: '7',
      SourceWallet: currentOption?.AccountNumber,
      SenderPhoneNumber: primaryPhone?.Phone,
    };
    setPayload(data);
    confirmTransaction(data)(dispatch);
  };
  const handleCashOut = () => {
    transferToOtherAction({
      ...payload,
      PIN,
      DestCountryCode: 'WW',
      DestCurrency: 'USD',
    })(dispatch);
  };

  return (
    <SendToPayPal
      currentOption={currentOption}
      walletList={myWallets?.walletList}
      setCurrentOption={setCurrentOption}
      onOptionChange={onOptionChange}
      form={form}
      handleConfirmTransaction={handleConfirmTransaction}
      checking={checking}
      confirmationData={confirmationData}
      pinData={pinData}
      setOpenPinModal={setOpenPinModal}
      openPinModal={openPinModal}
      loadMoveFund={loadMoveFund}
      setPIN={setPIN}
      PIN={PIN}
      handleCashOut={handleCashOut}
      confirmationError={confirmationError?.[0]}
    />
  );
};

export default SendToPayPalContainer;
