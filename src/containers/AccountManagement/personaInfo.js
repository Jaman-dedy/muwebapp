/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import moment from 'moment';

import setPhonePrimary from 'redux/actions/users/setPrimaryPhone';
import saveUserDataAction from 'redux/actions/userAccountManagement/saveUserData';
import rawCountries from 'utils/countries';
import rawNationalities from 'utils/nationalities';
import sendOTPAction from 'redux/actions/users/sendOTP';
import getUserProfessionAction from 'redux/actions/users/getProfession';
import isFileImage from 'utils/isFileImage';
import uploadDocs from 'helpers/uploadDocs';
import updateUserPhoneListAction from 'redux/actions/userAccountManagement/updateUserPhoneList';
import updateUserEmailListAction from 'redux/actions/userAccountManagement/updateUserEmailList';
import setPrimaryEmail from 'redux/actions/users/setPrimaryEmail';
import sendEmailAction from 'redux/actions/sendEmail';
import verifyOTPAction, {
  clearVerifyOTP,
} from 'redux/actions/users/verifyOTP';
export default () => {
  const { userData, primaryPhone, primaryEmail } = useSelector(
    ({ user }) => user,
  );
  const {
    saveUserData,
    updateUserPhoneList,
    updateUserEmailList,
  } = useSelector(
    ({ userAccountManagement }) => userAccountManagement,
  );

  const { loading, success } = saveUserData;
  const { data } = userData;
  const { loading: settingPrimaryPhone } = primaryPhone;
  const { loading: settingPrimaryEmail } = primaryEmail;

  const dispatch = useDispatch();
  const [currentOption, setCurrentOption] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [cropImgState, setCropImgState] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [nationality, setNationality] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [phoneValue, setPhoneValue] = useState(null);
  const [openPhoneModal, setOpenPhoneModal] = useState(false);
  const [formEmail, setFormEmail] = useState(null);
  const [OTP, setOTP] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState(null);
  const [professionOptions, setProfessionOptions] = useState(null);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [userIdUrlData, setUserIdUrlData] = useState(null);
  const [personalInfoData, setPersonalInfoData] = useState({
    FirstName: '',
    LastName: '',
    Gender: '',
    DateOfBirth: '',
    FatherFName: '',
    MotherFName: '',
    Nationality: '',
    CountryOfBirth: '',
    CityOfBirth: '',
    Profession: '',
    SpouseName: '',
  });

  const {
    sendOTP,
    professionList,
    verifyOTP,
    language: { preferred },
  } = useSelector(({ user }) => user);
  const { sendEmail } = useSelector(({ email }) => email);

  const countries = rawCountries.map(({ text, flag, key }) => ({
    CountryName: text,
    Flag: `https://www.countryflags.io/${flag}/flat/32.png`,
    CountryCode: key,
  }));
  const nationalities = rawNationalities.map(
    ({ text, flag, key }) => ({
      CountryName: text,
      Flag: `https://www.countryflags.io/${flag}/flat/32.png`,
      CountryCode: key,
    }),
  );

  const options = [
    { key: '0', text: global.translate('Unkown', 1345), value: '0' },
    { key: '1', text: global.translate('Female', 1343), value: '1' },
    { key: '2', text: global.translate('Male', 1344), value: '2' },
  ];

  useEffect(() => {
    if (success) {
      setOpenInfoModal(false);
    }
  }, [success]);
  useEffect(() => {
    if (data) {
      setSelectedCountry(
        countries.find(
          ({ CountryCode }) =>
            CountryCode ===
            data?.UserExtraKYC?.CountryOfBirth?.toLowerCase(),
        ),
      );
    }
  }, [data]);
  useEffect(() => {
    if (data) {
      setNationality(
        nationalities.find(
          ({ CountryCode }) =>
            CountryCode === data?.UserExtraKYC?.Nationality,
        ),
      );
    }
  }, [data]);

  useEffect(() => {
    setPersonalInfoData({
      ...personalInfoData,
      DateOfBirth: moment(selectedDate).format('YYYY-MM-DD'),
    });
  }, [selectedDate]);
  useEffect(() => {
    if (selectedCountry) {
      setPersonalInfoData({
        ...personalInfoData,
        CountryOfBirth: selectedCountry.CountryCode,
      });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (!professionList.data) {
      getUserProfessionAction({ Language: preferred })(dispatch);
    }
  }, []);

  useEffect(() => {
    if (professionList.data) {
      setProfessionOptions(
        professionList.data.map(profession => {
          return {
            key: profession.ProfessionNumber,
            text: profession.ProfessionName,
            value: profession.ProfessionNumber,
          };
        }),
      );
    }
  }, [professionList]);

  const clearError = name => {
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleInputChange = async ({ target: { name, value } }) => {
    clearError(name);

    return setPersonalInfoData({
      ...personalInfoData,
      [name]: value,
    });
  };
  const handleEmailInputChange = async ({
    target: { name, value },
  }) => {
    return setFormEmail({
      ...formEmail,
      [name]: value,
    });
  };

  const handleOnCountryChange = ({ target: { name, value } }) => {
    setSelectedCountry(
      countries.find(({ CountryCode }) => CountryCode === value),
    );
  };
  const handleOnNationalityChange = ({ target: { name, value } }) => {
    setNationality(
      countries.find(({ CountryCode }) => CountryCode === value),
    );
  };
  const handleSubmit = async () => {
    const data = {
      FirstName: personalInfoData?.FirstName,
      LastName: personalInfoData?.LastName,
      FatherFName: personalInfoData?.FatherFName,
      MotherFName: personalInfoData?.MotherFName,
      Nationality: personalInfoData?.Nationality,
      CountryOfBirth: personalInfoData?.CountryOfBirth,
      Profession: currentOption.toString(),
      SpouseName: personalInfoData?.SpouseName,
      CityOfBirth: personalInfoData?.CityOfBirth,
      DateOfBirth: personalInfoData.DateOfBirth,
      Gender: personalInfoData.Gender,
    };
    saveUserDataAction(data)(dispatch);
    return true;
  };

  useEffect(() => {
    if (data) {
      setPersonalInfoData({
        FirstName: data?.FirstName,
        LastName: data?.LastName,
        Gender: data?.Gender?.Number,
        DateOfBirth: data?.DateOfBirth,
        FatherFName: data?.UserExtraKYC?.FatherFName,
        MotherFName: data?.UserExtraKYC?.MotherFName,
        CountryOfBirth: data?.UserExtraKYC?.CountryOfBirth,
        Profession: data?.UserExtraKYC?.Profession,
        SpouseName: data?.UserExtraKYC?.SpouseName,
        CityOfBirth: data?.UserExtraKYC?.CityOfBirth,
        Nationality: nationality?.CountryCode,
      });
    }
  }, [data]);
  useEffect(() => {
    if (nationality) {
      setPersonalInfoData({
        ...personalInfoData,
        Nationality: nationality.CountryCode,
      });
    }
  }, [nationality]);

  useEffect(() => {
    if (personalInfoData) {
      setCurrentOption(personalInfoData.Gender);
    }
  }, [personalInfoData]);
  useEffect(() => {
    if (
      !personalInfoData.FirstName ||
      !personalInfoData.LastName ||
      !personalInfoData.DateOfBirth ||
      !personalInfoData.Gender
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [personalInfoData]);

  const handleSendOTP = () => {
    sendOTPAction(phoneValue)(dispatch);
  };
  useEffect(() => {
    if (sendEmail.data) {
      setOpenEmailModal(false);
    }
  }, [sendEmail]);
  const handleSubmitEmail = () => {
    const EmailData = {
      PID: data?.PID,
      Email: formEmail.email,
      Category: '1',
    };
    sendEmailAction(EmailData)(dispatch);
  };

  const handleSetPrimary = phone => {
    setPhonePrimary({ PhoneNumber: phone })(dispatch);
  };
  const handleSetEmailPrimary = email => {
    setPrimaryEmail({ Email: email })(dispatch);
  };

  const onImageChange = ({ target }) => {
    const { name, files, value } = target;

    const file = (files && files[0]) || (value && value[0]);

    if (file) {
      if (isFileImage(file)) {
        uploadDocs(name, file, data, '/UploadUserPicture').then(
          res => {
            setUserIdUrlData(res);
          },
        );
      } else
        toast.error(
          global.translate('Please, choose an image format', 2056),
        );
    }
  };

  useEffect(() => {
    if (updateUserPhoneList.success) {
      setSecondOpen(false);
    }
  }, [updateUserPhoneList]);

  useEffect(() => {
    if (OTP.length === 6) {
      verifyOTPAction(phoneValue, OTP)(dispatch);
    } else {
      clearVerifyOTP()(dispatch);
    }
  }, [OTP]);

  const phones = (userPhones, Phone) => {
    const unique = userPhones
      .map(e => e[Phone])
      .map((e, Phone, final) => final.indexOf(e) === Phone && Phone)
      .filter(e => userPhones[e])
      .map(e => userPhones[e]);

    return unique;
  };

  useEffect(() => {
    if (verifyOTP?.isValid) {
      const newPhone = {
        OTP: OTP,
        PhoneNumber: phoneValue
          .replace(/\D/g, '')
          .replace(/(\d{3})(\d{3})(\d{3})/, '+$1 $2 $3 '),
        Phone: phoneValue,
        Category: '1',
        CountryCode: phoneCountryCode,
        PhoneFlag: `https://celinemoneypicfiles.blob.core.windows.net/icons/${phoneCountryCode}.png`,
      };
      updateUserPhoneListAction({
        existingPhones: data?.Phones,
        data: { Phones: [newPhone] },
      })(dispatch);
    }
  }, [verifyOTP]);

  const handleDelete = (e, phone) => {
    e.stopPropagation();
    const newPhoneList = data?.Phones?.filter(phoneObject => {
      return (
        phone && phoneObject.Phone.toString() !== phone.toString()
      );
    });

    const newList = newPhoneList?.map(item => {
      return {
        PhoneNumber: item.Phone,
        Phone: item.Phone,
        Category: '1',
        CountryCode: item.CountryCode ?? item.NumberCountryCode,
        NumberCountryCode: item.CountryCode ?? item.NumberCountryCode,
        PhoneFlag: `https://celinemoneypicfiles.blob.core.windows.net/icons/${item?.CountryCode?.toLowerCase() ??
          item?.NumberCountryCode?.toLowerCase()}.png`,
        Primary: item.Primary,
      };
    });
    const filteredPhones = phones(newList, 'Phone');
    updateUserPhoneListAction({
      isDeleting: true,
      data: { Phones: [...filteredPhones] },
    })(dispatch);
  };
  const emails = (userEmails, Email) => {
    const unique = userEmails
      .map(e => e[Email])
      .map((e, Email, final) => final.indexOf(e) === Email && Email)
      .filter(e => userEmails[e])
      .map(e => userEmails[e]);

    return unique;
  };
  const handleDeleteEmail = (e, email) => {
    e.stopPropagation();
    const newEmailList = data?.Emails?.filter(
      emailObject =>
        emailObject.Email.toString() !== email.toString(),
    );
    const newList = newEmailList?.map(item => {
      return {
        Email: item.Email,
        Category: item.CategoryCode,
        Primary: item.Primary,
      };
    });
    const filteredEmails = emails(newList, 'Email');
    updateUserEmailListAction({ Emails: [...filteredEmails] })(
      dispatch,
    );
  };
  return {
    personalInfoData,
    setPersonalInfoData,
    errors,
    handleSubmit,
    handleInputChange,
    cropImgState,
    setCropImgState,
    currentOption,
    options,
    selectedCountry,
    countries,
    nationalities,
    setCurrentOption,
    selectedDate,
    setSelectedDate,
    loading,
    openInfoModal,
    setOpenInfoModal,
    handleOnCountryChange,
    handleOnNationalityChange,
    nationality,
    isEditing,
    disableButton,
    phoneValue,
    setPhoneValue,
    handleSendOTP,
    sendOTP,
    openPhoneModal,
    setOpenPhoneModal,
    secondOpen,
    setSecondOpen,
    handleEmailInputChange,
    handleSubmitEmail,
    formEmail,
    professionOptions,
    handleSetPrimary,
    onImageChange,
    settingPrimaryPhone,
    // handlePhoneInputChange,
    OTP,
    handleSetEmailPrimary,
    settingPrimaryEmail,
    sendEmail,
    setOpenEmailModal,
    openEmailModal,
    updateUserPhoneList,
    updateUserEmailList,
    setOTP,
    handleDelete,
    handleDeleteEmail,
    phoneCountryCode,
    setPhoneCountryCode,
    verifyOTP,
  };
};
