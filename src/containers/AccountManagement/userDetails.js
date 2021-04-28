/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import isFileImage from 'utils/isFileImage';
import uploadDocs from 'helpers/uploadDocs';
import saveToBackend from 'helpers/uploadImages/saveToBackend';
import updateUserProfileImageAction from 'redux/actions/userAccountManagement/updateUserProfileImage';

export default () => {
  const { userData } = useSelector(({ user }) => user);
  const { saveUserData } = useSelector(
    ({ userAccountManagement }) => userAccountManagement,
  );

  const { loading, success } = saveUserData;
  const { data } = userData;

  const dispatch = useDispatch();

  const [userIdUrlData, setUserIdUrlData] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);

  const {
    sendOTP,
    professionList,
    language: { preferred },
  } = useSelector(({ user }) => user);

  const onImageChange = async ({ target }) => {
    const { name, files, value } = target;

    const file = (files && files[0]) || (value && value[0]);

    if (file) {
      if (isFileImage(file)) {
        setUploadingImg(true);
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
    if (userIdUrlData) {
      updateUserProfileImageAction(userIdUrlData.MediaSourceURL)(
        dispatch,
      );
      const { status, data: dataImg } = saveToBackend(
        userIdUrlData,
      ).then(res => {
        setUploadingImg(false);
        if (!res.status) {
          toast.error(data[0].Description);
        }
        toast.success(
          global.translate(
            'Profile picture uploaded successfully',
            2055,
          ),
        );
      });
    }
  }, [userIdUrlData]);

  return {
    loading,
    sendOTP,
    onImageChange,
    userIdUrlData,
    uploadingImg,
  };
};
