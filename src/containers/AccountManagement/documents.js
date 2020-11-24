import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import updateUserDocsAction from 'redux/actions/userAccountManagement/updateUserDocs';
import uploadFile from 'helpers/uploadImages/uploadFile';
import isFileImage from 'utils/isFileImage';
import { updateAuthData } from 'redux/actions/users/login';
import saveUserIdData from 'redux/actions/users/saveUserIdData';

export default () => {
  const dispatch = useDispatch();
  const {
    userData,
    userIdData: { loading, data: IdInfo },
  } = useSelector(({ user }) => user);

  const [iDCardInfo, setIDCardInfo] = useState({});
  const [userDocs, setUserDocs] = useState({});
  const [form, setForm] = useState({});
  const [expiryDate, setExpiryDate] = useState(
    userData?.data?.IDCardInfo?.ExpirationDate ?? new Date(),
  );
  const [issueDate, setIssueDate] = useState(
    userData?.data?.IDCardInfo?.IssueDate ?? new Date(),
  );
  const [errors, setErrors] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const [IDCountryCode, setIDCountryCode] = useState(null);

  const [imageUploadState, setImageUploadState] = useState({
    loading: false,
    name: '',
    error: null,
  });

  const uploadDocs = async (name, file) => {
    let type = '';

    switch (name) {
      case 'UserIDURL':
        type = '1';
        break;
      case 'UserProofOfAddressURL':
        type = '2';
        break;
      case 'UserExtraDoc1URL':
        type = '3';
        break;
      case 'UserExtraDoc2URL':
        type = '4';
        break;
      case 'UserExtraDoc3URL':
        type = '5';
        break;
      case 'UserExtraDoc4URL':
        type = '6';
        break;
      case 'UserExtraDoc5URL':
        type = '7';
        break;

      default:
        break;
    }

    setImageUploadState({
      ...imageUploadState,
      name,
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
      toast.error(data[0]?.Description);
      return setImageUploadState({
        ...imageUploadState,
        loading: false,
        name: '',
        error: data[0],
      });
    }
    if (!data) {
      toast.error(global.translate('Upload failed', 1744));
    }

    if (data) {
      toast.success(
        global.translate('Document uploaded successfully', 2055),
      );

      setUserDocs({
        ...userDocs,
        [name]: {
          imageUrl: URL.createObjectURL(file),
          image: file,
        },
      });
      updateAuthData({ UserVerified: 'YES' })(dispatch);
      setImageUploadState({
        ...imageUploadState,
        name: '',
        loading: false,
      });

      updateUserDocsAction(data[0].url, name)(dispatch);
    }
    return null;
  };
  useEffect(() => {
    if (userData?.data && IDCountryCode === null) {
      if (userData?.data?.IDCardInfo)
        setIDCountryCode(userData?.data?.IDCardInfo?.IDCountryCode);
    }
  }, [userData]);

  useEffect(() => {
    setIDCardInfo({ ...iDCardInfo, ...userData?.data?.IDCardInfo });
  }, [userData]);

  const onSelectFlag = countryCode => {
    setIDCountryCode(countryCode);
  };

  useEffect(() => {
    if (userData?.data?.IDCardInfo) {
      const {
        data: { IDCardInfo },
      } = userData;
      setIDCardInfo(userData.data.IDCardInfo);
      setForm({
        DOIssue: IDCardInfo.IssueDate,
        ExpirationDate: IDCardInfo.ExpirationDate,
        IDCountryCode: IDCardInfo.IDCountryCode,
        IDNumber: IDCardInfo.IDNumber,
        IDType: IDCardInfo.IDType,
      });
    }
  }, [userData]);

  useEffect(() => {
    if (IdInfo && Object.keys(IdInfo).length) {
      setIDCardInfo({
        ...iDCardInfo,
        ...IdInfo,
        IssueDate: IdInfo.DateIssue,
      });
    }
  }, [IdInfo]);

  const onOptionsChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
    if (errors) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const onImageChange = ({ target }) => {
    const { name, files, value } = target;

    const file = (files && files[0]) || (value && value[0]);

    if (file) {
      if (isFileImage(file)) {
        uploadDocs(name, file);
      } else
        toast.error(
          global.translate('Please, choose an image format', 2056),
        );
    }
  };
  const { IDType, IDNumber } = form;
  /**
   * @return {bool} true if no error
   */
  const validate = () => {
    const IDTypeError = IDType
      ? ''
      : global.translate('Please provide your Id type');
    const IDNumberError = IDNumber
      ? ''
      : global.translate('Please provide your Id number');

    setErrors({
      ...errors,
      IDType: IDTypeError,
      IDNumber: IDNumberError,
    });
    return !(IDTypeError, IDNumberError);
  };

  const submitHandler = () => {
    if (validate()) {
      const {
        data: { IDCardInfo },
      } = userData;
      const data = {
        IDNumber,
        IDType,
        ExpirationDate: expiryDate ?? IDCardInfo?.ExpirationDate,
        DOIssue: issueDate ?? IDCardInfo?.IssueDate,
        IDCountryCode,
      };
      saveUserIdData(data)(dispatch);
      setIsEditing(true);
    }
  };

  return {
    userDocs,
    onImageChange,
    imageUploadState,
    onOptionsChange,
    submitHandler,
    expiryDate,
    setExpiryDate,
    issueDate,
    setIssueDate,
    errors,
    setErrors,
    loading,
    iDCardInfo,
    isEditing,
    setIsEditing,
    onSelectFlag,
    form,
    IDCountryCode,
    IdInfo,
  };
};
