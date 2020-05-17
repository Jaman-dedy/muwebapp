import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import getProvidersCountries from 'redux/actions/providers/getProvidersCountries';
import getUserLocationData from 'redux/actions/users/userLocationData';
import getProviders from 'redux/actions/providers/getProviders';
import TopUp from 'components/MoneyTransfer/TopUp';
import getExternalContactList from 'redux/actions/contacts/getExternalContactList';
import getUserData from 'redux/actions/users/getUserData';

const TopUpContainer = ({}) => {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState({});

  const { externalContacts } = useSelector(
    ({ contacts }) => contacts,
  );
  const { userLocationData, userData } = useSelector(
    ({ user }) => user,
  );
  const { providersCountries, providersList } = useSelector(
    ({ providersCountries }) => providersCountries,
  );
  useEffect(() => {
    if (!providersCountries.data) {
      getProvidersCountries()(dispatch);
    }
  }, []);

  useEffect(() => {
    if (!externalContacts.data) {
      getExternalContactList()(dispatch);
    }
  }, []);

  useEffect(() => {
    if (!userLocationData.data) {
      getUserLocationData()(dispatch);
    }
  }, []);
  useEffect(() => {
    if (!userData.data) {
      getUserData()(dispatch);
    }
  }, []);
  let Phones;

  if (userData.data) {
    ({ Phones } = userData.data);
  }

  const onOptionsChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const currentCountryOption =
    providersCountries.data &&
    providersCountries.data.find(({ CountryCode }) => {
      if (userLocationData.CountryCode) {
        return (
          CountryCode.toLowerCase() === userLocationData.CountryCode
        );
      }
    });
  useEffect(() => {
    if (currentCountryOption) {
      setSelectedCountry(currentCountryOption);
    }
  }, [currentCountryOption]);

  useEffect(() => {
    getProvidersCountries()(dispatch);
  }, []);

  useEffect(() => {
    if (form.CountryCode) {
      const newCountry =
        providersCountries.data &&
        providersCountries.data.find(({ CountryCode }) => {
          return (
            CountryCode.toLowerCase() ===
            form.CountryCode.toLowerCase()
          );
        });
      setSelectedCountry(newCountry);
    }
  }, [form]);

  const submitFormHandler = () => {
    if (form.CountryCode) {
      const requestData = {
        CountryCode: form.CountryCode.toLowerCase(),
      };
      getProviders(requestData)(dispatch);
    }
  };
  const resetFormHandler = () => {};

  return (
    <TopUp
      providersCountries={providersCountries.data}
      currentCountryOption={selectedCountry}
      onOptionsChange={onOptionsChange}
      submitFormHandler={submitFormHandler}
      resetFormHandler={resetFormHandler}
      providersList={providersList && providersList.data}
      myPhoneNumbers={Phones}
      externalContactList={externalContacts.data}
    />
  );
};

TopUp.propTypes = {};

TopUp.defaultProps = {};

export default TopUpContainer;
