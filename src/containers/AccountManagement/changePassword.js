/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import updatePasswordAction, {
  restoreUpdatePassword,
} from 'redux/actions/userAccountManagement/updatePassword';

export default () => {
  const dispatch = useDispatch();
  const { updatePassword } = useSelector(
    ({ userAccountManagement }) => userAccountManagement,
  );

  const [errors, setErrors] = useState({});
  const [changePasswordData, setChangePasswordData] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  });

  const clearError = name => {
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleInputChange = ({ target: { name, value } }) => {
    clearError(name);
    setChangePasswordData({
      ...changePasswordData,
      [name]: value,
    });
  };

  /**
   * @returns {bool} true if no error
   */
  const validate = () => {
    const {
      oldPassword,
      password,
      confirmPassword,
    } = changePasswordData;

    const oldPasswordError = oldPassword
      ? ''
      : global.translate('Please Enter the old password', 1940);

    const passwordError = password
      ? ''
      : global.translate('Please Enter your password', 2085);

    const confirmPasswordError = confirmPassword
      ? ''
      : global.translate('Please confirm your password', 2086);

    const confirmationError =
      password === confirmPassword
        ? ''
        : global.translate('The passwords do not match.');

    setErrors({
      ...errors,
      oldPassword: oldPasswordError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
      confirmation: confirmPasswordError ? '' : confirmationError,
    });
    return !(
      oldPasswordError ||
      passwordError ||
      confirmPasswordError ||
      confirmationError
    );
  };

  const handleSubmit = () => {
    if (!validate()) {
      return false;
    }
    // send to the backend
    const { oldPassword, password } = changePasswordData;
    updatePasswordAction({
      Pwd: oldPassword,
      NewPwd: password,
    })(dispatch);
    return true;
  };

  useEffect(() => {
    if (updatePassword.success) {
      toast.success(updatePassword.Description);
      setChangePasswordData({
        oldPassword: '',
        password: '',
        confirmPassword: '',
      });
      restoreUpdatePassword()(dispatch);
    }
    if (updatePassword.error) {
      toast.error(updatePassword.error.Description);
    }
  }, [updatePassword]);

  return {
    changePasswordData,
    handleSubmit,
    handleInputChange,
    errors,
    clearError,
    updatePassword,
  };
};
