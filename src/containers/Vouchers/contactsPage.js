import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getRecentActiveContacts from 'redux/actions/contacts/getRecentActiveContacts';
import getInternalContacts from 'redux/actions/vouchers/getInternalContacts';
import getExternalContacts from 'redux/actions/vouchers/getExternalContacts';

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

  useEffect(() => {
    getInternalContacts()(dispatch);
    getExternalContacts()(dispatch);
    getRecentContacts();
  }, []);

  return {
    handleNext,
    externalContacts,
    internalContacts,
    getRecentContacts,
    activeContacts,
  };
};
