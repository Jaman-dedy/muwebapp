/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MyStores from 'components/Stores/MyStores';
import getMyStoresAction from 'redux/actions/stores/getMyStores';

const MyStoresContainer = () => {
  const dispatch = useDispatch();
  const { userData, myStores } = useSelector(({ user }) => user);

  const fetchStores = () => {
    if (myStores.storeList.length === 0) {
      getMyStoresAction()(dispatch);
    }
  };
  useEffect(() => {
    fetchStores();
  }, []);
  return <MyStores userData={userData} myStores={myStores} />;
};

export default MyStoresContainer;
