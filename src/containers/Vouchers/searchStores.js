import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getRecentActiveContacts from 'redux/actions/contacts/getRecentActiveContacts';

export default ({ userData, setScreenNumber }) => {
  const dispatch = useDispatch();

  const handleNext = () => {
    setScreenNumber(2);
  };

  useEffect(() => {}, []);

  const goBack = () => {
    setScreenNumber(1);
  };

  return {
    handleNext,
    goBack,
  };
};
