import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getUserLocationDataAction from 'redux/actions/users/userLocationData';

export default function() {
  const dispatch = useDispatch();
  const { success } = useSelector(
    state => state.user.userLocationData,
  );
  useEffect(() => {
    if (success) {
      getUserLocationDataAction()(dispatch);
    }
  }, []);

  return localStorage.countryName;
}
