/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import getReferreesList from 'redux/actions/contacts/getReferreesList';

export default () => {
  const dispatch = useDispatch();
  const { referreesList } = useSelector(state => state.contacts);
  useEffect(() => {
    getReferreesList()(dispatch);
  }, []);

  return {
    referreesList,
  };
};
