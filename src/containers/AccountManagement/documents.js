import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import updateUserDocsAction from 'redux/actions/userAccountManagement/updateUserDocs';
import uploadFile from 'helpers/uploadImages/uploadFile';
import isFileImage from 'utils/isFileImage';

export default () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(({ user }) => user);

  const [userDocs, setUserDocs] = useState({});

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
      userData.data.PID,
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
    toast.success(global.translate('Document uploaded successfully'));
    setImageUploadState({
      ...imageUploadState,
      loading: false,
    });

    if (data) {
      updateUserDocsAction(data[0].url, name)(dispatch);
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
          global.translate('Please, choose an image format'),
        );
    }
  };

  return {
    userDocs,
    onImageChange,
    imageUploadState,
  };
};
