import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import getContactList from 'redux/actions/contacts/getContactList';
import getMyWallets from 'redux/actions/users/getMyWallets';
import locateUser, {
  clearFoundUser,
} from 'redux/actions/contacts/locateUser';
import addNewContact from 'redux/actions/contacts/addNewContact';
import ManageContacts from 'components/contacts';
import getRecentActiveContacts from 'redux/actions/contacts/getRecentActiveContacts';
import getExternalContactList from 'redux/actions/contacts/getExternalContactList';

const Contacts = () => {
  const [form, setForm] = useState({});
  const [isSendingCash, setIsSendingCash] = useState(false);

  const [sendCashOpen, setSendCashOpen] = useState(false);
  const [isSendingMoney, setIsSendingMoney] = useState(false);
  const [sendMoneyOpen, setSendMoneyOpen] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const { userData } = useSelector(state => state.user);
  const [destinationContact, setDestinationContact] = useState(null);
  const DefaultWallet = useSelector(
    state =>
      state.user.userData.data &&
      state.user.userData.data.DefaultWallet,
  );
  const {
    allContacts,
    externalContacts,
    activeContacts,
  } = useSelector(state => state.contacts);
  const { data, loading, error } = isSendingCash
    ? externalContacts
    : allContacts;
  const searchData = useSelector(state => state.contacts.locateUser);
  const addNewUserData = useSelector(
    state => state.contacts.newContact,
  );

  const [open, setOpen] = useState(false);
  const [localError, setLocalError] = useState(null);

  const getContacts = () => {
    if (!data) {
      if (isSendingCash) {
        getExternalContactList()(dispatch);
      } else {
        getContactList()(dispatch);
      }
    }
  };

  const getRecentContacts = () => {
    if (isSendingCash) {
      getRecentActiveContacts(
        {
          PID: userData.data && userData.data.PID,
          MaxRecordsReturned: '8',
        },
        '/GetLastTransactionExternalContacts',
      )(dispatch);
    } else {
      getRecentActiveContacts(
        {
          PID: userData.data && userData.data.PID,
          MaxRecordsReturned: '8',
        },
        '/GetLastTransactionContacts',
      )(dispatch);
    }
  };

  useEffect(() => {
    const params = queryString.parse(history.location.search);
    if (params && params.ref && params.ref === 'send-cash') {
      setIsSendingCash(true);
    } else {
      setIsSendingMoney(true);
    }
    if (params && params.ref && params.ref === 'send-money') {
      setIsSendingMoney(true);
    } else {
      setIsSendingCash(false);
    }
  }, [history.location.search]);

  useEffect(() => {
    getMyWallets()(dispatch);
    getRecentContacts();
  }, [isSendingCash]);

  useEffect(() => {
    getContacts();
  }, [isSendingCash]);

  useEffect(() => {
    if (searchData.error) {
      setLocalError(searchData.error && searchData.error.Description);
    }
  }, [searchData.error]);

  const walletsArr =
    form &&
    form.wallets &&
    form.wallets.map((wallet, index) => {
      const key = `Wallet${index + 1}`;
      return {
        [key]: wallet,
      };
    });
  const contactData = {
    contactToAdd: searchData.data,
    Criteria: 'PID',
    ContactData: form && form.PID && form.PID.toUpperCase(),
  };
  const newobj =
    walletsArr &&
    walletsArr.map((item, index) => {
      return item[`Wallet${index + 1}`];
    });

  if (newobj) {
    for (let i = 0; i < newobj.length; i += 1) {
      const element = newobj[i];
      const key = `Wallet${i + 1}`;
      contactData[key] = element;
    }
  }

  const addToContact = () => {
    addNewContact(contactData, '/AddToContact')(dispatch);
  };
  const { walletList } = useSelector(state => state.user.myWallets);
  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const checkExists = () => {
    let exists = false;
    if (
      allContacts.data &&
      allContacts.data[0].ContactsFound !== 'NO'
    ) {
      allContacts.data.forEach(element => {
        if (
          element.ContactPID.toLowerCase() ===
          form.PID.trim().toLowerCase()
        ) {
          exists = true;
        }
      });
    }
    return exists;
  };

  const onSearchUser = () => {
    if (form.PID && userData.data) {
      if (
        form.PID.trim().toLowerCase() ===
        userData.data.PID.toLowerCase()
      ) {
        setLocalError(
          global.translate('You cannot add your self as a contact'),
        );
        return;
      }
      if (checkExists()) {
        setLocalError(
          form.PID.trim() +
            global.translate(' is already in your contacts'),
        );
        return;
      }
      setLocalError(null);
      locateUser({
        PID: form.PID.trim(),
        userPID: userData.data && userData.data.PID,
      })(dispatch);
    }
  };

  const clearSuccess = () => {
    setForm({});
    setOpen(false);
    clearFoundUser()(dispatch);
  };
  return (
    <ManageContacts
      walletList={walletList}
      history={history}
      onChange={onChange}
      addToContact={addToContact}
      open={open}
      userData={userData}
      loading={loading}
      error={error}
      form={form}
      setForm={setForm}
      setOpen={setOpen}
      data={data}
      searchData={searchData}
      getContacts={getContacts}
      addNewUserData={addNewUserData}
      activeContacts={activeContacts}
      getRecentContacts={getRecentContacts}
      clearSuccess={clearSuccess}
      onSearchUser={onSearchUser}
      localError={localError}
      isSendingCash={isSendingCash}
      sendCashOpen={sendCashOpen}
      setSendCashOpen={setSendCashOpen}
      destinationContact={destinationContact}
      setDestinationContact={setDestinationContact}
      DefaultWallet={DefaultWallet}
      setLocalError={setLocalError}
      isSendingMoney={isSendingMoney}
      sendMoneyOpen={sendMoneyOpen}
      setSendMoneyOpen={setSendMoneyOpen}
    />
  );
};

export default Contacts;
