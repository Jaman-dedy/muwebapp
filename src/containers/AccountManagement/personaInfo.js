/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import moment from 'moment';

import setPhonePrimary from 'redux/actions/users/setPrimaryPhone';
import saveUserDataAction from 'redux/actions/userAccountManagement/saveUserData';
import sendOTPAction from 'redux/actions/users/sendOTP';
import getUserProfessionAction from 'redux/actions/users/getProfession';
import isFileImage from 'utils/isFileImage';
import uploadDocs from 'helpers/uploadDocs/checkUpload';
import updateUserPhoneListAction from 'redux/actions/userAccountManagement/updateUserPhoneList';
import deletePhoneNumber from 'redux/actions/userAccountManagement/deletePhoneNumber';
import updateUserEmailListAction from 'redux/actions/userAccountManagement/updateUserEmailList';
import verifyPhoneNumberExist from 'redux/actions/users/verifyPhoneNumber';

import verifyOTPAction, {
  clearVerifyOTP,
} from 'redux/actions/users/verifyOTP';
import setPrimaryEmail from 'redux/actions/users/setPrimaryEmail';
import sendEmailAction from 'redux/actions/sendEmail';

export default () => {
  const { userData, primaryPhone, primaryEmail } = useSelector(
    ({ user }) => user,
  );
  const {
    saveUserData,
    updateUserPhoneList,
    updateUserEmailList,
    deletePhone,
  } = useSelector(
    ({ userAccountManagement }) => userAccountManagement,
  );
  const { loading, success } = saveUserData;

  const { data } = userData;
  const { loading: settingPrimaryPhone } = primaryPhone;
  const { loading: settingPrimaryEmail } = primaryEmail;

  const dispatch = useDispatch();
  const [currentOption, setCurrentOption] = useState(null);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const [errors, setErrors] = useState({});
  const [cropImgState, setCropImgState] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [nationality, setNationality] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [phoneValue, setPhoneValue] = useState(null);
  const [phoneCountryCode, setPhoneCountryCode] = useState(null);
  const [secondOpen, setSecondOpen] = useState(false);
  const [openPhoneModal, setOpenPhoneModal] = useState(false);
  const [formEmail, setFormEmail] = useState(null);
  const [OTP, setOTP] = useState('');
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
    language: { preferred },
    verifyOTP,
  } = useSelector(({ user }) => user);
  const { sendEmail } = useSelector(({ email }) => email);

  const [nationalityCountry, setNationalityCountry] = useState('');
  const [bornCountry, setBornCountry] = useState('');
  const [shouldVerifyOtp, setShouldVerifyOtp] = useState(false);

  const options = [
    { key: '0', text: global.translate('Unkown'), value: '0' },
    { key: '1', text: global.translate('Female'), value: '1' },
    { key: '2', text: global.translate('Male'), value: '2' },
  ];

  useEffect(() => {
    if (success && !loading) {
      setOpenInfoModal(false);
    }
  }, [success, loading]);
  useEffect(() => {
    setPersonalInfoData({
      ...personalInfoData,
      DateOfBirth: moment(selectedDate).format('YYYY-MM-DD'),
    });
  }, [selectedDate]);

  useEffect(() => {
    if (!professionList.data) {
      getUserProfessionAction({ Language: preferred })(dispatch);
    }
  }, []);

  useEffect(() => {
    if (professionList.data) {
      setProfessionOptions(
        professionList.data?.map(profession => {
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
  const handleSubmit = async () => {
    const data = {
      FirstName: personalInfoData?.FirstName,
      LastName: personalInfoData?.LastName,
      FatherFName: personalInfoData?.FatherFName,
      MotherFName: personalInfoData?.MotherFName,
      Nationality: nationalityCountry?.toLowerCase(),
      CountryOfBirth: bornCountry.toLowerCase(),
      Profession: currentOption.toString(),
      SpouseName: personalInfoData?.SpouseName,
      CityOfBirth: personalInfoData?.CityOfBirth,
      DateOfBirth: personalInfoData?.DateOfBirth,
      Gender: personalInfoData?.Gender,
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
        Profession: data?.UserExtraKYC?.Profession,
        SpouseName: data?.UserExtraKYC?.SpouseName,
        CityOfBirth: data?.UserExtraKYC?.CityOfBirth,
        Nationality: nationality?.toLowerCase() || '',
      });
      setBornCountry(data?.UserExtraKYC?.CountryOfBirth);
      setNationalityCountry(data?.UserExtraKYC?.Nationality);
      if (data?.DateOfBirth) {
        setSelectedDate(new Date(data?.DateOfBirth));
      } else {
        setSelectedDate('');
      }
    }
  }, [data]);
  useEffect(() => {
    if (nationalityCountry) {
      setPersonalInfoData({
        ...personalInfoData,
        Nationality: nationalityCountry.toLowerCase(),
      });
    }
  }, [nationalityCountry]);

  useEffect(() => {
    if (personalInfoData) {
      setCurrentOption(personalInfoData?.Gender);
    }
  }, [personalInfoData]);
  useEffect(() => {
    if (
      !personalInfoData?.FirstName ||
      !personalInfoData?.LastName ||
      !personalInfoData?.DateOfBirth ||
      !personalInfoData?.Gender ||
      (personalInfoData?.FirstName === data?.FirstName &&
        personalInfoData?.LastName === data?.LastName &&
        personalInfoData?.Gender === data?.Gender?.Number &&
        personalInfoData?.DateOfBirth === data?.DateOfBirth &&
        personalInfoData?.FatherFName ===
          data?.UserExtraKYC?.FatherFName &&
        personalInfoData?.MotherFName ===
          data?.UserExtraKYC?.MotherFName &&
        personalInfoData?.Profession ===
          data?.UserExtraKYC?.Profession &&
        personalInfoData?.SpouseName ===
          data?.UserExtraKYC?.SpouseName &&
        personalInfoData?.CityOfBirth ===
          data?.UserExtraKYC?.CityOfBirth &&
        bornCountry?.toLowerCase() ===
          data?.UserExtraKYC?.CountryOfBirth?.toLowerCase() &&
        personalInfoData?.Nationality ===
          data?.UserExtraKYC?.Nationality.toLowerCase())
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [personalInfoData, bornCountry]);

  const handleSendOTP = useCallback(() => {
    sendOTPAction(phoneValue)(dispatch);
  }, [phoneValue]);

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
    setFormEmail(null);
  };

  const handleSetPrimary = payload => {
    setPhonePrimary(payload)(dispatch);
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
    if (OTP.length === 6) {
      verifyOTPAction(phoneValue, OTP)(dispatch);
    } else {
      setShouldVerifyOtp(false);
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

  const updatePhoneListHandler = useCallback(
    newPhone => {
      updateUserPhoneListAction({
        updatedPhoneList: new Set([...data?.Phones, newPhone]),
        Phones: [],
        newPhone,
      })(dispatch);
    },
    [data, dispatch],
  );
  useEffect(() => {
    if (verifyOTP.isValid && phoneValue) {
      const newPhone = {
        OTP,
        PhoneNumber: phoneValue
          ?.replace(/\D/g, '')
          .replace(/(\d{3})(\d{3})(\d{3})/, '+$1 $2 $3 '),
        Phone: phoneValue,
        Category: '1',
        CountryCode: phoneCountryCode,
        PhoneFlag: `https://celinemoneypicfiles.blob.core.windows.net/icons/${phoneCountryCode?.toLowerCase()}.png`,
      };
      updatePhoneListHandler(newPhone);
      clearVerifyOTP()(dispatch);
    }
  }, [verifyOTP, dispatch]);

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
        PhoneFlag: `https://celinemoneypicfiles.blob.core.windows.net/icons/${item.CountryCode?.toLowerCase() ??
          item.NumberCountryCode?.toLowerCase()}.png`,
        Primary: item.Primary,
      };
    });
    const filteredPhones = phones(newList, 'Phone');
    deletePhoneNumber({
      Phones: [...filteredPhones],
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
      };
    });
    const filteredEmails = emails(newList, 'Email');
    updateUserEmailListAction({ Emails: [...filteredEmails] })(
      dispatch,
    );
  };

  const handleAddPhoneNumber = useCallback(() => {
    verifyPhoneNumberExist(phoneValue)(dispatch);
  }, [phoneValue]);

  return {
    handleAddPhoneNumber,
    personalInfoData,
    setPersonalInfoData,
    errors,
    handleSubmit,
    handleInputChange,
    cropImgState,
    setCropImgState,
    currentOption,
    options,
    setCurrentOption,
    selectedDate,
    setSelectedDate,
    loading,
    openInfoModal,
    setOpenInfoModal,
    isEditing,
    disableButton,
    phoneValue,
    setPhoneValue,
    phoneCountryCode,
    setPhoneCountryCode,
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
    nationalityCountry,
    setNationalityCountry,
    setBornCountry,
    bornCountry,
    verifyOTP,
    deletePhone,
  };
};
