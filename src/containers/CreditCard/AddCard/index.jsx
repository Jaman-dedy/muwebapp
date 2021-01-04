import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import AddCardComponent from 'components/CreditCard/AddCard';
import getCreditCardOptions from 'redux/actions/credit-card/getOptions';
import addCreditCard, {
  clearAddCreditCard,
} from 'redux/actions/credit-card/createCreditCard';
import masterCardLogo from 'assets/images/mastercard-logo.svg';
import visaCardLogo from 'assets/images/visa-logo.svg';

const AddCardContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form, setForm] = useState(null);
  const [pinData, setPinData] = useState(null);
  const [hasNotAgreed, setHasNotAgreed] = useState(true);
  const [cardPin, setCardPin] = useState(null);
  const [confirmPin, setConfirmPin] = useState(null);
  const [error, setError] = useState(null);
  const [pin, setPin] = useState(null);

  const cardTypes = [
    { Img: visaCardLogo, Title: 'Visa card', Value: '1' },
    { Img: masterCardLogo, Title: 'Master card', Value: '2' },
  ];
  const [selectedProvider, setSelectedProvider] = useState(null);
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

  const [openPinModal, setOpenPinModal] = useState(false);
  const { creditCardOptions, createCreditCard } = useSelector(
    ({ creditCard }) => creditCard,
  );
  const { loading, error: errors, data } = createCreditCard;

  const { userData } = useSelector(({ user }) => user);
  const onOptionsChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };
  const handleWalletSelected = ({ AccountNumber }) => {
    setForm({
      ...form,
      Wallet: AccountNumber,
    });
    const data = { Wallet: AccountNumber };
    getCreditCardOptions(data, '/GetCreditCardOptions')(dispatch);
  };

  useEffect(() => {
    setSelectedProvider({
      Img: visaCardLogo,
      Title: 'Visa card',
      Value: '1',
    });
  }, []);

  useEffect(() => {
    if (userData.data) {
      const { FirstName, LastName } = userData.data;
      setForm({
        ...form,
        nameOnTheCard: `${FirstName} ${LastName}`,
      });
    }
  }, userData.data);

  const checkSequence = thisPin => {
    const numbers = '0123456789';
    const numbersRev = '0987654321';

    return (
      numbers.includes(String(thisPin)) ||
      numbersRev.includes(String(thisPin))
    );
  };
  const pinIsValid = () => pin && pin.length === 4;
  const validate = () => {
    if (cardPin !== confirmPin) {
      setError('The PIN numbers do not match.', 2068);
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
    if (checkSequence(cardPin)) {
      setError(
        global.translate(
          'Consecutive numbers are not allowed.',
          1707,
        ),
      );
      return true;
    }
    if (!pinIsValid()) {
      setError(
        global.translate('Please provide your PIN number.', 944),
      );
      return true;
    }
    if (!selectedProvider) {
      setError(
        global.translate('Please choose the card type.', 2069),
      );
      return true;
    }
    if (!form?.cardLevel) {
      setError(
        global.translate('Please select the card level.', 2070),
      );
      return true;
    }
    return false;
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
    setPinData({
      ...pinData,
      CardPIN: cardPin,
      PIN: pin,
    });
  }, [cardPin, pin]);

  const submitCreditCard = () => {
    const data = {
      CardType: selectedProvider?.Value,
      CardLevel: form?.cardLevel,
      Wallet: form?.Wallet,
      NameOnCard: form?.nameOnTheCard,
      CardPIN: pinData?.CardPIN,
      PIN: pinData?.PIN,
    };
    if (!validate()) {
      addCreditCard(data, '/AddCreditCard')(dispatch);
      setError(null);
    }
  };
  useEffect(() => {
    if (data) {
      setOpenPinModal(false);
      history.push({
        pathname: '/credit-card-details',
        state: {
          wallet: data,
        },
      });
      clearAddCreditCard()(dispatch);
    }
  }, [data]);

  return (
    <AddCardComponent
      creditCardOptions={creditCardOptions}
      createCreditCard={createCreditCard}
      userData={userData}
      selectWallet={handleWalletSelected}
      onOptionsChange={onOptionsChange}
      form={form}
      setForm={setForm}
      hasNotAgreed={hasNotAgreed}
      setHasNotAgreed={setHasNotAgreed}
      openPinModal={openPinModal}
      setOpenPinModal={setOpenPinModal}
      setConfirmPinDigit={setConfirmPinDigit}
      setUserPinDigit={setUserPinDigit}
      setPinDigit={setPinDigit}
      pinDigit={pinDigit}
      userPinDigit={userPinDigit}
      confirmPinDigit={confirmPinDigit}
      setError={setError}
      error={error}
      submitCreditCard={submitCreditCard}
      createCardLoading={loading}
      errors={errors}
      pinData={pinData}
      preSelectedWallet={history.location.state?.wallet}
      selectedProvider={selectedProvider}
      setSelectedProvider={setSelectedProvider}
      cardTypes={cardTypes}
    />
  );
};

export default AddCardContainer;
