/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import updateUserProfileImageAction from 'redux/actions/userAccountManagement/updateUserProfileImage';
import uploadFile from 'helpers/uploadImages/uploadFile';
import isFileImage from 'utils/isFileImage';

export default () => {
  const { userData } = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [profileImage, setProfileImage] = useState({
    imageUrl: '',
    image: null,
  });

  const [profileImageState, setProfileImageState] = useState({
    loading: false,
    error: null,
  });

  const uploadProfileImage = async () => {
    setProfileImageState({
      ...profileImage,
      loading: true,
    });
    const { status, data } = await uploadFile(
      {
        ProfileImage: profileImage.image,
      },
      '/UploadUserPicture',
      null,
      userData.data?.PID,
    );
    if (!status) {
      toast.error(data[0].Description);
      return setProfileImageState({
        ...profileImage,
        loading: false,
        error: data,
      });
    }
    if (data) {
      updateUserProfileImageAction(data[0].url)(dispatch);
    }
    toast.success(
      global.translate('Profile image updated successfully', 2059),
    );
    setOpen(false);
    return setProfileImageState({
      ...profileImage,
      loading: false,
    });
  };

  const onImageChange = file => {
    setProfileImage({
      imageUrl: URL.createObjectURL(file),
      image: file,
    });
  };

  useEffect(() => {
    if (userData.data && profileImage.imageUrl === '') {
      setProfileImage({
        ...profileImage,
        imageUrl: userData.data?.PictureURL,
      });
    }
  }, [userData]);

  useEffect(() => {
    if (profileImage.imageUrl && profileImage.image) {
      uploadProfileImage();
    }
  }, [profileImage]);

  return {
    profileImage,
    onImageChange,
    profileImageState,
    setOpen,
    open,
  };
};
