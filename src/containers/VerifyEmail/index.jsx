import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';

import verifyEmailAction from 'redux/actions/users/verifyEmail';
import VerifyEmail from 'components/VerifyEmail';

const VerifyEmailContainer = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { verifyEmail: verifyEmailState } = useSelector(
    ({ user }) => user,
  );

  useEffect(() => {
    const { key = '', Key = '' } = queryString.parse(location.search);

    if (Key || key) {
      verifyEmailAction(Key || key)(dispatch);
    }
  }, [location.search]);

  return <VerifyEmail verifyEmailState={verifyEmailState} />;
};

export default VerifyEmailContainer;
