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
import SearchFunction from 'helpers/searchEngine';

const TopUpContainer = ({}) => {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState({});
  const [clickedItem, setClickedItem] = useState({});
  const [tickedItem, setTickedItem] = useState({});
  const [providersListOption, setProvidersListOption] = useState([]);
  const [externalContactList, setExternalContactList] = useState([]);
  const [activeStep, setActiveStep] = useState('Country');
  const [step1Completed, setstep1Completed] = useState(false);
  const [step2Completed, setstep2Completed] = useState(false);
  const [prevStep, setPrevStep] = useState(false);
  const [payload, setPayload] = useState({});

  const handleItemClicked = item => {
    setClickedItem({
      ...clickedItem,
      [Object.keys(item)[0]]: Object.values(item)[0],
    });
    setTickedItem(Object.values(item)[0]);
  };

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
    setPayload({ ...payload, clickedItem });
  }, [clickedItem]);
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
    if (Array.isArray(externalContacts.data)) {
      setExternalContactList(externalContacts.data);
    }
  }, [externalContacts]);

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
      setPayload({ ...payload, selectedCountry });
    }
  }, [currentCountryOption]);

  useEffect(() => {
    if (providersList.data) {
      setProvidersListOption(providersList.data);
    }
  }, [providersList]);

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

  useEffect(() => {
    if (selectedCountry.CountryCode) {
      setForm({ ...form, CountryCode: selectedCountry.CountryCode });
    }
  }, [selectedCountry]);

  const submitFormHandler = () => {
    if (form.CountryCode) {
      const requestData = {
        CountryCode: form.CountryCode.toLowerCase(),
      };
      getProviders(requestData)(dispatch);
    }
  };
  useEffect(() => {
    setstep1Completed(
      providersList.data !== null && !providersList.loading,
    );
  }, [providersList]);
  const resetFormHandler = () => {
    setSelectedCountry(currentCountryOption);
    providersList.data = null;
  };
  const handleKeyUp = e => {
    const data = SearchFunction(e, externalContacts.data);
    setExternalContactList(data);
  };
  const searchProviders = e => {
    const data = SearchFunction(e, providersList.data);
    setProvidersListOption(data);
  };
  const onClickStepHandler = (e, { title }) => setActiveStep(title);
  if (step1Completed && activeStep === 'Country' && !prevStep) {
    setActiveStep('Provider');
    setPrevStep(true);
  }

  const onClickHandler = () => {
    setstep2Completed(true);
  };

  useEffect(() => {
    if (step2Completed) {
      setActiveStep('Recipient');
    }
  }, [step2Completed]);

  console.log('payload :>> ', payload);

  return (
    <TopUp
      providersCountries={providersCountries.data}
      currentCountryOption={selectedCountry}
      onOptionsChange={onOptionsChange}
      submitFormHandler={submitFormHandler}
      resetFormHandler={resetFormHandler}
      providersListOption={providersListOption}
      providersList={providersList && providersList}
      myPhoneNumbers={Phones}
      externalContactList={externalContactList}
      handleItemClicked={handleItemClicked}
      countryOptions={providersCountries.data}
      clickedItem={tickedItem}
      handleKeyUp={handleKeyUp}
      searchProviders={searchProviders}
      onClickStepHandler={onClickStepHandler}
      active={activeStep}
      step1Completed={step1Completed}
      step2Completed={step2Completed}
      onClickHandler={onClickHandler}
    />
  );
};

TopUp.propTypes = {};

TopUp.defaultProps = {};

export default TopUpContainer;
