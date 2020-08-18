/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import editCreditCard from 'redux/actions/credit-card/changeCreditCardPin';
import activateMyCard, {
  clearActivateCard,
} from 'redux/actions/credit-card/activateMyCard';
import enableMycard, {
  clearEnableCard,
} from 'redux/actions/credit-card/enableMyCreditCard';

export default wallet => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [cardPin, setCardPin] = useState(null);
  const [confirmPin, setConfirmPin] = useState(null);
  const [error, setError] = useState(null);
  const [pinError, setPinError] = useState(null);
  const [pin, setPin] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [shouldClear, setShouldClear] = useState(false);
  const [checked, setChecked] = useState(false);
  const [confirmPinOpen, setconfirmPinOpen] = useState(false);
  const [isActivatingCard, setIsActivatingCard] = useState(false);
  const [isEnablingCard, setIsEnablingCard] = useState(false);
  const [isChangingPwd, setIsChangingPwd] = useState(false);
  const [loadOnEnable, setLoadOnEnable] = useState(false);
  const [loadOnActivate, setLoadOnActivate] = useState(false);

  const {
    changeCreditCardPin,
    activateCreditCard,
    enableCreditCard,
  } = useSelector(({ creditCard }) => creditCard);
  const [pinDigit, setPinDigit] = useState({
    digit0: '',
    digit1: '',
    digit2: '',
    digit3: '',
  });

  const [confirmPinDigit, setConfirmPinDigit] = useState({
    digit0: '',
    digit1: '',
    digit2: '',
    digit3: '',
  });
  const [userPinDigit, setUserPinDigit] = useState({
    digit0: '',
    digit1: '',
    digit2: '',
    digit3: '',
  });

  useEffect(() => {
    if (activateCreditCard.data) {
      setToastMessage(activateCreditCard.data.Description);
    }
  }, [activateCreditCard.data]);
  useEffect(() => {
    if (enableCreditCard.data) {
      setToastMessage(enableCreditCard.data.Description);
    }
  }, [enableCreditCard.data]);
  useEffect(() => {
    if (activateCreditCard.error) {
      setToastMessage(activateCreditCard.error.Description);
      setIsActivatingCard(false);
    }
  }, [activateCreditCard.error]);
  useEffect(() => {
    if (enableCreditCard.error) {
      setToastMessage(enableCreditCard.error.Description);
      setIsEnablingCard(false);
    }
  }, [enableCreditCard.error]);
  useEffect(() => {
    if (activateCreditCard.data) {
      toast.success(toastMessage);
      setToastMessage(null);
      setForm({});
      setShouldClear(true);
      setIsActivatingCard(false);
      clearActivateCard()(dispatch);
    }
  }, [toastMessage]);
  useEffect(() => {
    if (enableCreditCard.data) {
      toast.success(toastMessage);
      setToastMessage(null);
      setForm({});
      setShouldClear(true);
      setIsEnablingCard(false);
      clearEnableCard()(dispatch);
    }
  }, [toastMessage]);
  useEffect(() => {
    if (activateCreditCard.error) {
      toast.error(toastMessage);
      setToastMessage(null);
      setForm({});
      setShouldClear(true);
      setIsActivatingCard(false);
      clearActivateCard()(dispatch);
    }
  }, [toastMessage]);
  useEffect(() => {
    if (enableCreditCard.error) {
      toast.error(toastMessage);
      setToastMessage(null);
      setForm({});
      setShouldClear(true);
      setIsEnablingCard(false);
      clearEnableCard()(dispatch);
    }
  }, [toastMessage]);
  useEffect(() => {
    if (changeCreditCardPin.data) {
      setToastMessage(changeCreditCardPin.data.Description);
    }
  }, [changeCreditCardPin.data]);
  useEffect(() => {
    if (changeCreditCardPin.error) {
      setToastMessage(changeCreditCardPin.error.Description);
      setIsChangingPwd(false);
    }
  }, [changeCreditCardPin.error]);
  useEffect(() => {
    if (changeCreditCardPin.data) {
      toast.success(toastMessage);
      setToastMessage(null);
      setForm({});
      setShouldClear(true);
      setIsChangingPwd(false);
    }
  }, [toastMessage]);

  useEffect(() => {
    if (changeCreditCardPin.error) {
      toast.error(toastMessage);
      setToastMessage(null);
      setForm({});
      setShouldClear(true);
    }
  }, [toastMessage]);
  useEffect(() => {
    if (shouldClear) {
      setShouldClear(false);
    }
  }, [shouldClear]);
  const checkSequence = thisPin => {
    const numbers = '123456789';
    const numbersRev = '987654321';
    if (thisPin.length) {
      return (
        numbers.includes(String(thisPin.trim())) ||
        numbersRev.includes(String(thisPin.trim()))
      );
    }
  };
  useEffect(() => {
    const { digit0, digit1, digit2, digit3 } = pinDigit;
    setCardPin(`${digit0}${digit1}${digit2}${digit3}`);
  }, [pinDigit]);
  useEffect(() => {
    const { digit0, digit1, digit2, digit3 } = confirmPinDigit;
    setConfirmPin(`${digit0}${digit1}${digit2}${digit3}`);
  }, [confirmPinDigit]);
  useEffect(() => {
    const { digit0, digit1, digit2, digit3 } = userPinDigit;
    setPin(`${digit0}${digit1}${digit2}${digit3}`);
  }, [userPinDigit]);
  useEffect(() => {
    setForm({
      ...form,
      CardPin: cardPin,
    });
  }, [cardPin]);
  useEffect(() => {
    setForm({
      ...form,
      PIN: pin,
    });
  }, [pin]);
  useEffect(() => {
    if (wallet) {
      setForm({
        ...form,
        CardNumber: wallet.CardNumber,
        Enable: wallet.Enabled === 'NO' ? 'YES' : 'NO',
      });
    }
  }, [wallet]);
  const pinIsValid = () => cardPin && cardPin.length === 4;
  const MyPinIsValid = () => pin && pin.length === 4;
  const validateMyPin = () => {
    if (!MyPinIsValid()) {
      setPinError('Please provide your PIN number.', 944);
      return true;
    }
    return false;
  };
  const validate = () => {
    if (cardPin !== confirmPin) {
      setError('The PIN number does not match.');
      return true;
    }
    if (
      cardPin.search(/[A-Z]/) === 0 ||
      cardPin.search(/[a-z]/) === 0 ||
      cardPin.search(/[@!#$%^&*]/) === 0
    ) {
      setError('PIN should only contain numbers');
      return true;
    }
    if (checkSequence(cardPin)) {
      setError('Consecutive numbers are not allowed.');
      return true;
    }
    if (!pinIsValid()) {
      setError('Please provide your PIN number.', 944);
      return true;
    }

    return false;
  };
  const handleChangeCreditCardPin = () => {
    const data = {
      CardNumber: form?.CardNumber,
      CardPIN: form?.CardPIN,
      PIN: form?.PIN,
    };
    if (!validateMyPin()) {
      setError(null);
      editCreditCard(data, '/ChangeCardPIN')(dispatch);
    }
  };
  const handleActivateCard = () => {
    const data = {
      CardNumber: form?.CardNumber,
      PIN: form?.PIN,
    };
    if (!validateMyPin()) {
      setError(null);
      activateMyCard(data, '/CreditCardReceived')(dispatch);
    }
  };
  const handleEnableCard = () => {
    const data = {
      CardNumber: form?.CardNumber,
      Enable: form?.Enable,
      PIN: form?.PIN,
    };
    if (!validateMyPin()) {
      setError(null);
      enableMycard(data, '/EnableCreditCard')(dispatch);
    }
  };
  useEffect(() => {
    setLoadOnEnable(enableCreditCard.loading);
  }, [enableCreditCard]);
  useEffect(() => {
    setLoadOnActivate(activateCreditCard.loading);
  }, [activateCreditCard]);
  return {
    wallet,
    handleChangeCreditCardPin,
    handleActivateCard,
    setError,
    error,
    setForm,
    setPinDigit,
    setConfirmPinDigit,
    pinDigit,
    confirmPinDigit,
    form,
    setUserPinDigit,
    userPinDigit,
    changeCreditCardPin,
    shouldClear,
    setShouldClear,
    checked,
    setChecked,
    confirmPinOpen,
    setconfirmPinOpen,
    isActivatingCard,
    setIsActivatingCard,
    isEnablingCard,
    setIsEnablingCard,
    isChangingPwd,
    setIsChangingPwd,
    validate,
    pinError,
    setPinError,
    handleEnableCard,
    loadOnActivate,
    loadOnEnable,
  };
};
