/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import getVirtualCard from 'redux/actions/virtualCard/getVirtualCard';

import MyVirtualCards from 'components/VrtualCard';
import getUserCurrencies from 'redux/actions/users/getUserCurrencies';
import visaCardImg from 'assets/images/visa-card.png';
import masterCardImg from 'assets/images/mastercard.png';
import createVirtualCard, {
  clearAddVirtuaCard,
} from 'redux/actions/virtualCard/addVirtualCard';

const MyVirtualCardsContainer = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [toastMessage, setToasMessage] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState('');
  const [addMoneyOpen, setAddMoneyOpen] = useState(false);

  const dispatch = useDispatch();
  const { userData, currencies } = useSelector(({ user }) => user);
  const { virtualCardList, addVirtualCard } = useSelector(
    ({ virtualCard }) => virtualCard,
  );

  const options = [
    {
      Title: 'Visa card',
      Img: visaCardImg,
    },
    {
      Title: 'Master card',
      Img: masterCardImg,
    },
  ];
  const onOptionsChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };
  const fetchVirtualCardList = () => {
    if (!virtualCardList.data) {
      getVirtualCard()(dispatch);
    }
  };
  const fetchcurrencies = () => {
    if (!currencies.data) {
      getUserCurrencies()(dispatch);
    }
  };
  useEffect(() => {
    setSelectedCard(options[0]);
  }, []);
  useEffect(() => {
    if (selectedCard) {
      setForm({
        ...form,
        VirtualCard: selectedCard,
      });
    }
  }, [selectedCard]);
  useEffect(() => {
    fetchVirtualCardList();
    fetchcurrencies();
  }, []);
  useEffect(() => {
    if (addVirtualCard?.data) {
      setToasMessage(addVirtualCard?.data?.Description);
    }
  }, [addVirtualCard?.data]);

  useEffect(() => {
    if (addVirtualCard?.error) {
      setToasMessage(addVirtualCard?.error?.Description);
    }
  }, [addVirtualCard?.error]);
  useEffect(() => {
    if (addVirtualCard?.data) {
      toast.success(toastMessage);
      setToasMessage(null);
      setOpen(false);
      setSelectedCard(null);
      setSelectedCurrency(null);
      clearAddVirtuaCard()(dispatch);
    }
  }, [toastMessage]);

  useEffect(() => {
    if (addVirtualCard?.error) {
      toast.error(toastMessage);

      setSelectedCard(null);
      setSelectedCurrency(null);
      clearAddVirtuaCard()(dispatch);
      setToasMessage(null);
    }
  }, [toastMessage]);
  const onAddVirtualCard = () => {
    const data = {
      CardType: form?.VirtualCard?.Title === 'Visa card' ? '1' : '2',
      Currency: form?.CurrencyCode,
    };
    if (!form?.VirtualCard) {
      setErrors(
        global.translate(
          'Please provide the virtual card type.',
          2100,
        ),
      );
    }
    if (!form?.CurrencyCode) {
      setErrors(
        global.translate('You did not select any currency.', 144),
      );
    }
    setErrors(null);
    createVirtualCard(data, '/AddVirtualCard')(dispatch);
  };

  return (
    <MyVirtualCards
      virtualCardList={virtualCardList?.data}
      isLoading={virtualCardList.loading}
      userData={userData}
      currencies={currencies && currencies}
      onOptionsChange={onOptionsChange}
      selectedCard={selectedCard}
      setSelectedCard={setSelectedCard}
      selectedCurrency={selectedCurrency}
      setSelectedCurrency={setSelectedCurrency}
      virtualCardTypes={options}
      onAddVirtualCard={onAddVirtualCard}
      errors={errors}
      setErrors={setErrors}
      addVirtualCard={addVirtualCard}
      open={open}
      setOpen={setOpen}
      size={size}
      setSize={setSize}
      addMoneyOpen={addMoneyOpen}
      setAddMoneyOpen={setAddMoneyOpen}
      form={form}
      setForm={setForm}
    />
  );
};

export default MyVirtualCardsContainer;
