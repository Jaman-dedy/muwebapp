/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import editCreditCard from 'redux/actions/credit-card/changeCreditCardPin';

export default wallet => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [cardPin, setCardPin] = useState(null);
  const [confirmPin, setConfirmPin] = useState(null);
  const [error, setError] = useState(null);
  const [pin, setPin] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [shouldClear, setShouldClear] = useState(false);
  const [checked, setChecked] = useState(false);
 

  const { changeCreditCardPin } = useSelector(
    ({ creditCard }) => creditCard,
  );
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
    if (changeCreditCardPin.data) {
      setToastMessage(changeCreditCardPin.data.Description);
    }
  }, [changeCreditCardPin.data]);
  useEffect(() => {
    if (changeCreditCardPin.error) {
      setToastMessage(changeCreditCardPin.error.Description);
    }
  }, [changeCreditCardPin.error]);
  useEffect(() => {
    if (changeCreditCardPin.data) {
      toast.success(toastMessage);
      setToastMessage(null);
      setForm({});
      setShouldClear(true);
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
    const numbers = '0123456789';
    const numbersRev = '0987654321';

    return (
      numbers.includes(String(thisPin)) ||
      numbersRev.includes(String(thisPin))
    );
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
  const pinIsValid = () => pin && pin.length === 4;
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
    if (!validate()) {
      setError(null);
      editCreditCard(data, '/ChangeCardPIN')(dispatch);
    }
  };
  return {
    wallet,
    handleChangeCreditCardPin,
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
  };
};
