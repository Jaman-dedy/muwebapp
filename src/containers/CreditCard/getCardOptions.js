/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import addCreditCard from 'redux/actions/credit-card/createCreditCard';

export default (setAddCreditCardModalOpen, form, setStep, step) => {
  const history = useHistory();
  const { creditCardOptions, createCreditCard } = useSelector(
    ({ creditCard }) => creditCard,
  );
  const dispatch = useDispatch();

  const { userData } = useSelector(({ user }) => user);
  const [cardPin, setCardPin] = useState(null);
  const [pin, setPin] = useState(null);
  const [confirmPin, setConfirmPin] = useState(null);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
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
  const [cardFormData, setCardFormData] = useState({});

  const checkSequence = thisPin => {
    const numbers = '0123456789';
    const numbersRev = '0987654321';

    return (
      numbers.includes(String(thisPin)) ||
      numbersRev.includes(String(thisPin))
    );
  };

  const onOptionsChange = (e, { name, value }) => {
    setCardFormData({
      ...cardFormData,
      [name]: value,
    });
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
  const pinIsValid = () => pin && pin.length === 4;
  const validate = () => {
    if (cardPin !== confirmPin && step === 2) {
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
    if (checkSequence(cardPin) && step === 2) {
      setError('Consecutive numbers are not allowed.');
      return true;
    }
    if (!pinIsValid() && step === 2) {
      setError('Please provide your PIN number.', 944);
      return true;
    }
    if (!form?.CardType && step === 1) {
      setError('Please choose the card type.');
      return true;
    }
    if (!form?.CardLevel && step === 1) {
      setError('Please select the card level.');
      return true;
    }
    return false;
  };
  const submitCreditCard = () => {
    const data = {
      CardType: form?.CardType,
      CardLevel: form?.CardLevel,
      Wallet: form?.Wallet,
      NameOnCard: form?.NameOnCard,
      CardPIN: form?.CardPIN,
      PIN: form?.PIN,
    };
    if (!validate()) {
      setError(null);
      addCreditCard(data, '/AddCreditCard')(dispatch);
    }
  };
  const creditCardNextStep = () => {
    if (!validate()) {
      setStep(2);
    }
  };
  useEffect(() => {
    setCardFormData({
      ...cardFormData,
      CardPIN: cardPin,
    });
  }, [cardPin]);
  useEffect(() => {
    setCardFormData({
      ...cardFormData,
      PIN: pin,
    });
  }, [pin]);
  useEffect(() => {
    if (createCreditCard.data) {
      setToastMessage(createCreditCard.data.Description);
      setAddCreditCardModalOpen(false);
    }
  }, [createCreditCard.data]);
  useEffect(() => {
    if (createCreditCard.error) {
      setToastMessage(createCreditCard.error.Description);
      setAddCreditCardModalOpen(false);
    }
  }, [createCreditCard.error]);
  useEffect(() => {
    if (createCreditCard.error) {
      toast.error(toastMessage);
      setToastMessage(null);
    }
  }, [toastMessage]);
  useEffect(() => {
    if (createCreditCard.data) {
      toast.success(toastMessage);
      setToastMessage(null);
      history.push({
        pathname: '/credit-card-details',
        state: {
          wallet: createCreditCard.data,
        },
      });
    }
  }, [toastMessage]);
  return {
    creditCardOptions,
    pinDigit,
    setPinDigit,
    confirmPinDigit,
    setConfirmPinDigit,
    error,
    setError,
    pin,
    setPin,
    onOptionsChange,
    cardFormData,
    setCardFormData,
    userPinDigit,
    setUserPinDigit,
    userData,
    createCreditCard,
    submitCreditCard,
    creditCardNextStep,
    setStep,
    step,
    form,
  };
};
