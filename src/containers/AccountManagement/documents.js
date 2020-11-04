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
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [issueDate, setIssueDate] = useState(new Date());
  const [errors, setErrors] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const [IDCountryCode, setIDCountryCode] = useState(null);

  const [imageUploadState, setImageUploadState] = useState({
    loading: false,
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
    updateAuthData({ UserVerified: 'YES' })(dispatch);
    setImageUploadState({
      ...imageUploadState,
      loading: false,
    });

    if (data) {
      updateUserDocsAction(data[0].url, name)(dispatch);
    }
    return null;
  };
  const onSelectFlag = countryCode => {
    setIDCountryCode(countryCode);
  };

  useEffect(() => {
    if (userData?.data?.IDCardInfo) {
      setIDCardInfo(userData.data.IDCardInfo);
    }
  }, [userData]);

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
        setUserDocs({
          ...userDocs,
          [name]: {
            imageUrl: URL.createObjectURL(file),
            image: file,
          },
        });
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
      const data = {
        IDNumber,
        IDType,
        ExpirationDate: expiryDate,
        DOIssue: issueDate,
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
    IdInfo,
    isEditing,
    setIsEditing,
    onSelectFlag,
  };
};
