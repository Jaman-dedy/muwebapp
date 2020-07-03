/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from 'react-redux';
import getRecentActiveContacts from 'redux/actions/contacts/getRecentActiveContacts';

export default ({ userData, setScreenNumber }) => {
  const dispatch = useDispatch();

  const { externalContacts, internalContacts } = useSelector(
    state => state.voucher,
  );

  const handleNext = () => {
    setScreenNumber(2);
  };

  const { activeContacts } = useSelector(state => state.contacts);

  const getRecentContacts = () => {
    if (!activeContacts.data) {
      getRecentActiveContacts({
        PID: userData.data && userData.data.PID,
        MaxRecordsReturned: '5',
      })(dispatch);
    }
  };

  return {
    handleNext,
    externalContacts,
    internalContacts,
    getRecentContacts,
    activeContacts,
  };
};
