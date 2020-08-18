/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import saveUserDataAction from 'redux/actions/userAccountManagement/saveUserData';
import restoreSaveUserDataAction from 'redux/actions/userAccountManagement/restoreSaveUserData';

export default () => {
  const { userData } = useSelector(({ user }) => user);
  const { saveUserData } = useSelector(
    ({ userAccountManagement }) => userAccountManagement,
  );
  const dispatch = useDispatch();

  const [generalData, setGeneralData] = useState({
    FirstName: '',
    LastName: '',
    Address1: '',
    Address2: '',
    City: '',
    CountryName: '',
    State: '',
    POBox: '',
    CompanyName: '',
    BusinessAccount: '',
    DateOfBirth: '',
  });

  const [errors, setErrors] = useState({});
  const [infoOrEdit, setInfoOrEdit] = useState('info');

  const clearError = name => {
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleInputChange = async ({ target: { name, value } }) => {
    clearError(name);

    if (name === 'position') {
      return setGeneralData({
        ...generalData,
        City: value.City || generalData.City,
      });
    }

    if (name === 'Address') {
      return setGeneralData({
        ...generalData,
        Address1: value,
      });
    }

    return setGeneralData({
      ...generalData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const FirstName = generalData.FirstName
      ? ''
      : global.translate('Please provide your First Name.', 18);

    const LastName = generalData.LastName
      ? ''
      : global.translate('Please provide your Last Name.', 19);

    const Address1 = generalData.Address1
      ? ''
      : global.translate('Please provide the street number');

    const CountryName = generalData.CountryName
      ? ''
      : global.translate('Please select your country');

    const City = generalData.City
      ? ''
      : global.translate('Please provide the city name.', 685);

    setErrors({
      ...errors,
      FirstName,
      LastName,
      Address1,
      CountryName,
      City,
    });
    return !(
      FirstName ||
      LastName ||
      Address1 ||
      CountryName ||
      City
    );
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return false;
    }
    saveUserDataAction(generalData)(dispatch);
    return true;
  };

  useEffect(() => {
    const { data } = userData;
    if (data) {
      setGeneralData({
        FirstName: data.FirstName,
        LastName: data.LastName,
        CountryName: data.CountryName,
        City: data.City,
        State: data.State,
        Address1: data.Address1,
        Address2: data.Address2,
        POBox: data.POBox,
        CompanyName: data.CompanyName,
        BusinessAccount: data.BusinessAccount,
      });
    }
  }, [userData]);

  useEffect(() => {
    if (saveUserData.success) {
      setInfoOrEdit('info');
      restoreSaveUserDataAction()(dispatch);
    }
  }, [saveUserData]);

  return {
    generalData,
    errors,
    handleSubmit,
    handleInputChange,
    infoOrEdit,
    setInfoOrEdit,
    saveUserData,
  };
};
