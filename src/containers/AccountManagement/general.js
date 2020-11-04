/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import saveUserDataAction from 'redux/actions/userAccountManagement/saveUserData';
import restoreSaveUserDataAction from 'redux/actions/userAccountManagement/restoreSaveUserData';
import uploadFile from 'helpers/uploadImages/uploadFile';
import updateUserDocsAction from 'redux/actions/userAccountManagement/updateUserDocs';

export default () => {
  const { userData } = useSelector(({ user }) => user);

  const [userDocs, setUserDocs] = useState({});
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

  const [imageUploadState, setImageUploadState] = useState({
    loading: false,
    error: null,
  });
  const [errors, setErrors] = useState({});
  const [infoOrEdit, setInfoOrEdit] = useState('info');
  const [cropImgState, setCropImgState] = useState(false);
  const [imgName, setImgName] = useState('');
  const [imgFile, setImgFile] = useState(null);

  const clearError = name => {
    setErrors({
      ...errors,
      [name]: '',
    });
  };
  const uploadDocs = async (name, file) => {
    const type = '2';

    setImageUploadState({
      ...imageUploadState,
      loading: true,
    });
    const { status, data } = await uploadFile(
      {
        [name]: file,
      },
      '/UploadKYCDocs',
      type,
      userData.data?.PID,
      true,
    );

    if (!status) {
      toast.error(data[0].Description);
      return setImageUploadState({
        ...imageUploadState,
        loading: false,
        error: data[0],
      });
    }
    toast.success(
      global.translate('Document uploaded successfully', 2055),
    );

    if (data) {
      updateUserDocsAction(data[0].url, name)(dispatch);

      setImageUploadState({
        ...imageUploadState,
        loading: false,
      });
      setCropImgState(false);
    }
    return null;
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
      : global.translate('Please select your country', 2058);

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

  const onImageChange = ({ target }) => {
    const { name, files, value } = target;
    setImgName(name);

    const file = (files && files[0]) || (value && value[0]);
    setImgFile(file);
    setCropImgState(true);
  };

  useEffect(() => {
    if (saveUserData.success) {
      setInfoOrEdit('info');
      restoreSaveUserDataAction()(dispatch);
    }
  }, [saveUserData]);

  const uploadProofImages = file => {
    setUserDocs({
      ...userDocs,
      [imgName]: {
        imageUrl: URL.createObjectURL(file),
        image: file,
      },
    });
    uploadDocs(imgName, file);
  };

  return {
    generalData,
    errors,
    handleSubmit,
    handleInputChange,
    infoOrEdit,
    setInfoOrEdit,
    saveUserData,
    userData,
    onImageChange,
    userDocs,
    cropImgState,
    setCropImgState,
    loadingImg: imageUploadState.loading,
    imgFile,
    uploadProofImages,
  };
};
