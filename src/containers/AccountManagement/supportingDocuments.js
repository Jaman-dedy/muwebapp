import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import uploadDocs from 'helpers/uploadDocs/checkUpload';
import isFileImage from 'utils/isFileImage';
import saveToBackend from 'helpers/uploadImages/saveToBackend';
import saveUserDataAction from 'redux/actions/userAccountManagement/saveUserData';
import checkUploadSave from 'helpers/uploadDocs/checkUploadSave';

export default () => {
  const {
    userData: { data },
  } = useSelector(({ user }) => user);
  const { saveUserData } = useSelector(
    ({ userAccountManagement }) => userAccountManagement,
  );

  const { loading, success } = saveUserData;

  const [formData, setFormData] = useState(null);
  const [userIdUrlData, setUserIdUrlData] = useState(null);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [submittingDoc, setSubmittingDoc] = useState(false);
  const [country, setCountry] = useState('');
  const [openDocModal, setOpenDocModal] = useState(false);
  const [userDoc, setUserDoc] = useState({
    UserExtraDoc1URL: '',
    UserExtraDoc2URL: '',
    UserExtraDoc3URL: '',
    UserExtraDoc4URL: '',
    UserExtraDoc5URL: '',
  });

  const onInputChange = (target, { name, value }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onImageChange = async ({ target }) => {
    const { name, files, value } = target;
    setUploadingDoc(true);

    const file = (files && files[0]) || (value && value[0]);

    if (file) {
      if (isFileImage(file)) {
        uploadDocs(name, file, data, '/UploadKYCDocs').then(res => {
          if (res.MediaSourceURL) {
            setUserIdUrlData(res);
            setUploadingDoc(false);
          } else {
            setUploadingDoc(false);
            toast.error(
              global.translate(
                'Please, choose an image format',
              ),
            );
          }
        });
      } else
        toast.error(
          global.translate('Please, choose an image format'),
        );
    }
  };
  const onEditImage = async ({ target }) => {
    const { name, files, value } = target;
    setUploadingDoc(true);

    const file = (files && files[0]) || (value && value[0]);

    if (file) {
      if (isFileImage(file)) {
        const { status, imgData, options } = await checkUploadSave(
          name,
          file,
          data,
          '/UploadKYCDocs',
        );
        if (!status) {
          setUploadingDoc(false);
          toast.error(
            global.translate('Please, choose an image format'),
          );
        } else {
          setUserIdUrlData(options);
          setUploadingDoc(false);
          toast.success(
            global.translate('Document uploaded successfully'),
          );
        }
      } else
        toast.error(
          global.translate('Please, choose an image format'),
        );
    }
  };
  const handleSubmit = async () => {
    if (userIdUrlData) {
      setSubmittingDoc(true);
      const { status, data: dataImg } = await saveToBackend(
        userIdUrlData,
      );
      if (!status) {
        toast.error(data[0].Description);
      }
      setSubmittingDoc(false);
      setOpenDocModal(false);
      toast.success(
        global.translate('Document uploaded successfully'),
      );
      setUserIdUrlData(null);
    }
  };
  useEffect(() => {
    if (data) {
      setUserDoc({
        ...userDoc,
        UserExtraDoc1URL: data.UserExtraDoc1URL,
        UserExtraDoc2URL: data.UserExtraDoc2URL,
        UserExtraDoc3URL: data.UserExtraDoc3URL,
        UserExtraDoc4URL: data.UserExtraDoc4URL,
        UserExtraDoc5URL: data.UserExtraDoc5URL,
      });
    }
  }, [data]);

  useEffect(() => {
    if (userIdUrlData) {
      if (userIdUrlData.Type === '3') {
        setUserDoc({
          ...userDoc,
          UserExtraDoc1URL: userIdUrlData.MediaSourceURL,
        });
      }
      if (userIdUrlData.Type === '4') {
        setUserDoc({
          ...userDoc,
          UserExtraDoc2URL: userIdUrlData.MediaSourceURL,
        });
      }
      if (userIdUrlData.Type === '5') {
        setUserDoc({
          ...userDoc,
          UserExtraDoc3URL: userIdUrlData.MediaSourceURL,
        });
      }
      if (userIdUrlData.Type === '6') {
        setUserDoc({
          ...userDoc,
          UserExtraDoc4URL: userIdUrlData.MediaSourceURL,
        });
      }
      if (userIdUrlData.Type === '7') {
        setUserDoc({
          ...userDoc,
          UserExtraDoc5URL: userIdUrlData.MediaSourceURL,
        });
      }
    }
  }, [userIdUrlData]);

  return {
    formData,
    onInputChange,
    onImageChange,
    userIdUrlData,
    setUserIdUrlData,
    handleSubmit,
    loading,
    country,
    setCountry,
    openDocModal,
    setOpenDocModal,
    uploadingDoc,
    userDoc,
    setUserDoc,
    submittingDoc,
    onEditImage,
  };
};
