import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Home from 'components/Home';
import searchUser from 'redux/actions/users/searchUser';

const HomeContainer = () => {
  const dispatch = useDispatch();
  const handleSearchUser = ({ target: { value } }) => {
    return value && searchUser(value)(dispatch);
  };

  const { currentUser } = useSelector(({ user }) => user);

  return (
    <Home
      currentUser={currentUser}
      handleSearchUser={handleSearchUser}
    />
  );
};

export default HomeContainer;
