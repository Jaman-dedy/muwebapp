import { useSelector } from 'react-redux';

export default () => {
  const { resetPassword } = useSelector(({ user }) => user);

  return {
    resetPassword,
  };
};
