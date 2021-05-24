import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getBusinessType from 'redux/actions/userAccountManagement/getBusinessType';
import switchToBusinessAccount from 'redux/actions/userAccountManagement/switchToBusinessAccount';

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
const formatDate = dateToFormat => {
  if (typeof dateToFormat !== 'string') {
    const year = dateToFormat.getFullYear();
    const month = `0${dateToFormat.getMonth() + 1}`.substr(-2);
    const day = `0${dateToFormat.getDate()}`.substr(-2);
    return `${year}-${month}-${day}`;
  }
  return new Date(dateToFormat);
};

export default () => {
  const [isUpgradingAccount, setIsUpgradingAccount] = useState(false);
  const [upgradeStep, setUpgradeStep] = useState(1);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isBusinessAccount, setIsBusinessAccount] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState();
  const [form, setForm] = useState({ ...FORM_VALUES });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const { userLocationData, userData } = useSelector(
    ({ user }) => user,
  );
  const [defaultCountryCode, setDefaultCountryCode] = useState('');

  const { success: switchAccountSuccess } = useSelector(
    ({ userAccountManagement: { switchToBusinessAccount } }) =>
      switchToBusinessAccount,
  );

  const cancelOperation = useCallback(() => {
    setUpgradeStep(1);
    setIsUpgradingAccount(false);
    setTermsAgreed(false);
  }, []);
  const handleOpenInfoModal = () => {
    setOpenInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setOpenInfoModal(false);
  };

  useEffect(() => {
    if (switchAccountSuccess) {
      setUpgradeStep(1);
      setIsUpgradingAccount(false);
      setTermsAgreed(false);
      setIsBusinessAccount(true);
      setOpenInfoModal(false);
    }
  }, [switchAccountSuccess]);

  useEffect(() => {
    if (userData?.data) {
      const { data } = userData;
      setIsBusinessAccount(data?.BusinessAccount === 'YES');
      const { BusinessExtraKYC } = data;
      if (
        BusinessExtraKYC &&
        Object.values(BusinessExtraKYC).every(value => !!value)
      ) {
        setDefaultCountryCode(BusinessExtraKYC?.CountryCode);
        setForm({
          ...BusinessExtraKYC,
        });
      }
      if (
        typeof BusinessExtraKYC?.CreationDate === 'string' &&
        BusinessExtraKYC?.CreationDate?.length
      ) {
        setSelectedDate(
          new Date(
            BusinessExtraKYC?.CreationDate.replaceAll("'", '').substr(
              0,
              10,
            ),
          ),
        );
      } else if (BusinessExtraKYC?.CreationDate) {
        setSelectedDate(new Date(BusinessExtraKYC?.CreationDate));
      } else {
        setSelectedDate(new Date());
      }
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

  const valueChangeHandler = useCallback((e, { value, name }) => {
    setForm(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const goToNextStep = () => {
    setUpgradeStep(prevStep => prevStep + 1);
  };

  const goToPrevStep = () => {
    if (isBusinessAccount) {
      cancelOperation();
    } else {
      setUpgradeStep(step => step - 1);
    }
  };

  const createBusinessAccountHandler = () => {
    const { CreationDate } = form;

    switchToBusinessAccount({
      ...form,
      CreationDate: formatDate(CreationDate),
    })(dispatch);
  };

  const countryChangeHandler = countryCode => {
    if (countryCode) {
      valueChangeHandler(null, {
        value: countryCode,
        name: 'CountryCode',
      });

      setSelectedCountry(countryCode);
    }
  };

  useEffect(() => {
    setForm(form => ({
      ...form,
      CreationDate: selectedDate,
    }));
  }, [selectedDate]);

  useEffect(() => {
    if (userLocationData?.CountryCode) {
      valueChangeHandler(null, {
        value: userLocationData.CountryCode,
        name: 'CountryCode',
      });
      setSelectedCountry(userLocationData?.CountryCode);
    }
  }, [userLocationData?.CountryCode]);

  return {
    form,
    valueChangeHandler,
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
    setForm,
    selectedDate,
    setSelectedDate,
    openInfoModal,
    handleOpenInfoModal,
    handleCloseInfoModal,
    defaultCountryCode,
  };
};
