import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserCurrencies from 'components/Dashboard/Currencies/userCurrencies';
import getUserCurrencies from 'redux/actions/users/getUserCurrencies';

const UserCurrenciesContainer = () => {
  const dispatch = useDispatch();
  const { currencies, userData } = useSelector(state => state.user);
  useEffect(() => {
    if (userData.data) {
      getUserCurrencies({
        CountryCode: userData.data.Country,
      })(dispatch);
    }
  }, [userData]);

  return (
    <UserCurrencies
      currencies={currencies}
      userData={userData}
      dispatch={dispatch}
    />
  );
};

export default UserCurrenciesContainer;
