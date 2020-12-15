/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import addCreditCard, {
  clearAddVirtuaCard,
} from 'redux/actions/credit-card/createCreditCard';
import { updateCreditCardStep } from 'redux/actions/dashboard/dashboard';

export default (setAddCreditCardModalOpen, form) => {
  const history = useHistory();
  const {
    creditCard: { step },
  } = useSelector(({ dashboard }) => dashboard);
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
      setError('he PIN numbers do not match.', 2068);
      return true;
    }
    if (
      cardPin.search(/[A-Z]/) === 0 ||
      cardPin.search(/[a-z]/) === 0 ||
      cardPin.search(/[@!#$%^&*]/) === 0
    ) {
      setError(
        global.translate('PIN should only contain numbers', 1723),
      );
      return true;
    }
    if (checkSequence(cardPin) && step === 2) {
      setError(
        global.translate(
          'Consecutive numbers are not allowed.',
          1707,
        ),
      );
      return true;
    }
    if (!pinIsValid() && step === 2) {
      setError(
        global.translate('Please provide your PIN number.', 944),
      );
      return true;
    }
    if (!form?.CardType && step === 1) {
      setError(
        global.translate('Please choose the card type.', 2069),
      );
      return true;
    }
    if (!form?.CardLevel && step === 1) {
      setError(
        global.translate('Please select the card level.', 2070),
      );
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
      addCreditCard(data, '/AddCreditCard')(dispatch);
      setError(null);
    }
  };
  const creditCardNextStep = () => {
    if (!validate()) {
      updateCreditCardStep(2)(dispatch);
      // setStep(2);
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
      history.push(`${history.location.pathname}?created=1`);
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
      clearAddVirtuaCard()(dispatch);
    }
  }, [toastMessage]);

  useEffect(() => {
    if (createCreditCard.data) {
      toast.success(toastMessage);
      setToastMessage(null);
      clearAddVirtuaCard()(dispatch);
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
    form,
  };
};
