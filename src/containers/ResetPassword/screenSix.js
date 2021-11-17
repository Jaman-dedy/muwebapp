import { useSelector, useDispatch } from 'react-redux';

import { setResetPasswordDataAction } from 'redux/actions/users/resetPassword';
import { clearResetPasswordPreData } from 'redux/actions/users/resetPasswordPrequalification';

export default () => {
  const { resetPassword } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  const resetSuccess = () => {
    setResetPasswordDataAction({ success: false })(dispatch);
    clearResetPasswordPreData({ success: false })(dispatch);
  };

  return {
    resetPassword,
    resetSuccess,
  };
};
