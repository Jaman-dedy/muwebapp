import { useSelector } from 'react-redux';

export default () => {
  const { countryCurrencies, registerUser } = useSelector(
    ({ user }) => user,
  );

  return {
    registerUser,
    countryCurrencies,
  };
};
