import { useSelector } from 'react-redux';

export default ({ userData, setScreenNumber }) => {
  const { externalContacts, internalContacts } = useSelector(
    state => state.voucher,
  );

  const handleNext = () => {
    setScreenNumber(2);
  };

  const { activeContacts } = useSelector(state => state.contacts);

  const getRecentContacts = () => {};
  return {
    handleNext,
    externalContacts,
    internalContacts,
    getRecentContacts,
    activeContacts,
  };
};
