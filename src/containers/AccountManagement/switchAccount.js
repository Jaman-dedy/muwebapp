import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getBusinessType from 'redux/actions/userAccountManagement/getBusinessType';
import switchToBusinessAccount from 'redux/actions/userAccountManagement/switchToBusinessAccount';
import rawCountries from 'utils/countries';

const FORM_VALUES = {
  CreationDate: new Date(),
  CompanyName: '',
  ShortName: '',
  CompanyType: '',
  Activity: '',
  TIN: '',
  RegistrationNumber: '',
  CountryCode: '',
  City: '',
  Address: '',
  VATNumber: '',
};

const countries = rawCountries.map(({ text, flag, key }) => ({
  CountryName: text,
  Flag: `https://www.countryflags.io/${flag}/flat/32.png`,
  CountryCode: key,
}));

export default () => {
  const [isUpgradingAccount, setIsUpgradingAccount] = useState(false);
  const [upgradeStep, setUpgradeStep] = useState(1);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [form, setForm] = useState({ ...FORM_VALUES });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isBusinessAccount, setIsBusinessAccount] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({});
  const { userLocationData, userData } = useSelector(
    ({ user }) => user,
  );

  const { success: switchAccountSuccess } = useSelector(
    ({ userAccountManagement: { switchToBusinessAccount } }) =>
      switchToBusinessAccount,
  );

  const cancelOperation = useCallback(() => {
    setUpgradeStep(1);
    setIsUpgradingAccount(false);
    setTermsAgreed(false);
    setForm({ ...FORM_VALUES });
  }, []);

  useEffect(() => {
    if (switchAccountSuccess) {
      setUpgradeStep(1);
      setIsUpgradingAccount(false);
      setTermsAgreed(false);
      setIsBusinessAccount(true);
    }
  }, [switchAccountSuccess, cancelOperation]);

  useEffect(() => {
    if (userData?.data) {
      setIsBusinessAccount(userData?.data?.BusinessAccount === 'YES');
    }
  }, [userData]);

  useEffect(() => {
    if (isUpgradingAccount && isBusinessAccount) {
      setUpgradeStep(2);
    }
  }, [isUpgradingAccount, isBusinessAccount]);

  const dispatch = useDispatch();

  useEffect(() => {
    const {
      CreationDate,
      CompanyType,
      CompanyName,
      RegistrationNumber,
      Activity,
      CountryCode,
    } = form;

    const hasInvalidData = [
      CreationDate,
      CompanyName,
      CompanyType,
      RegistrationNumber,
      Activity,
      CountryCode,
    ].some(value => `${value}`.trim().length === 0);

    if (!hasInvalidData) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [form]);

  useEffect(() => {
    getBusinessType()(dispatch);
  }, [dispatch]);

  const valueChangeHandler = (e, { value, name }) => {
    setForm(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const goToNextStep = () => {
    setUpgradeStep(prevStep => prevStep + 1);
  };

  const goToPrevStep = () => {
    setUpgradeStep(step => step - 1);
  };

  const createBusinessAccountHandler = () => {
    switchToBusinessAccount(form)(dispatch);
  };

  const countryChangeHandler = ({ target: { value } }) => {
    const selectedCountry = countries.find(
      ({ CountryCode }) => CountryCode === value,
    );

    if (selectedCountry) {
      valueChangeHandler(null, {
        value: selectedCountry.CountryCode,
        name: 'CountryCode',
      });

      setSelectedCountry(selectedCountry);
    }
  };

  useEffect(() => {
    if (userLocationData?.CountryCode) {
      const selectedCountry = countries.find(
        ({ CountryCode }) =>
          CountryCode === userLocationData?.CountryCode,
      );

      if (selectedCountry) {
        valueChangeHandler(null, {
          value: selectedCountry.CountryCode,
          name: 'CountryCode',
        });

        setSelectedCountry(selectedCountry);
      }
    }
  }, [userLocationData?.CountryCode]);

  useEffect(() => {}, []);

  return {
    form,
    valueChangeHandler,
    countries,
    countryChangeHandler,
    selectedCountry,
    upgradeStep,
    goToNextStep,
    isUpgradingAccount,
    setIsUpgradingAccount,
    createBusinessAccountHandler,
    goToPrevStep,
    cancelOperation,
    termsAgreed,
    setTermsAgreed,
    disableSubmit: !isFormValid,
    isBusinessAccount,
  };
};
