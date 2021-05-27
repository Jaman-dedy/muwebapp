import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import uploadDocs from 'helpers/uploadDocs/checkUpload';
import isFileImage from 'utils/isFileImage';
import saveToBackend from 'helpers/uploadImages/saveToBackend';
import saveUserDataAction from 'redux/actions/userAccountManagement/saveUserData';

export default () => {
  const dispatch = useDispatch();

  const {
    userData: { data },
  } = useSelector(({ user }) => user);
  const { saveUserData } = useSelector(
    ({ userAccountManagement }) => userAccountManagement,
  );

  const { loading, success } = saveUserData;

  const [formData, setFormData] = useState(null);
  const [userIdUrlData, setUserIdUrlData] = useState(null);
  const [openResidenceModal, setOpenResidenceModal] = useState(false);
  const [country, setCountry] = useState('');

  const onInputChange = (target, { name, value }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (success) {
      setOpenResidenceModal(false);
    }
  }, [success]);

  useEffect(() => {
    if (data) {
      setCountry(data.Country);
      setFormData({
        ...formData,
        City: data?.City,
        POBox: data?.POBox,
        Address1: data?.Address1,
        Address2: data?.Address2,
      });
    }
  }, [data]);
  const onImageChange = ({ target }) => {
    const { name, files, value } = target;

    const file = (files && files[0]) || (value && value[0]);

    if (file) {
      if (isFileImage(file)) {
        uploadDocs(name, file, data, '/UploadKYCDocs').then(res => {
          setUserIdUrlData(res);
        });
      } else
        toast.error(
          global.translate('Please, choose an image format', 2056),
        );
    }
  };
  const handleSubmit = async () => {
    const data = {
      Country: country?.toLowerCase(),
      City: formData.City,
      POBox: formData.POBox,
      Address1: formData.Address1,
      Address2: formData.Address2,
    };
    saveUserDataAction(data)(dispatch);
    if (userIdUrlData) {
      const { status, data: dataImg } = await saveToBackend(
        userIdUrlData,
      );
      if (!status) {
        toast.error(data[0]?.Description);
      }
      toast.success(
        global.translate('Document uploaded successfully', 2055),
      );
    }
  };

  console.log('Country', country);
  return {
    formData,
    onInputChange,
    onImageChange,
    userIdUrlData,
    handleSubmit,
    openResidenceModal,
    setOpenResidenceModal,
    loading,
    country,
    setCountry,
  };
};
