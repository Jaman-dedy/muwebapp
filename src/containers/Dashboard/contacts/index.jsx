import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import getContactList from 'redux/actions/contacts/getContactList';
import getMyWallets from 'redux/actions/users/getMyWallets';
import locateUser, {
  clearFoundUser,
} from 'redux/actions/contacts/locateUser';
import addNewContact from 'redux/actions/contacts/addNewContact';
import ManageContacts from 'components/contacts';
import getRecentActiveContacts from 'redux/actions/contacts/getRecentActiveContacts';

const Contacts = () => {
  const { userData } = useSelector(state => state.user);
  const [form, setForm] = useState({});

  const { allContacts, activeContacts } = useSelector(
    state => state.contacts,
  );
  const { data, loading, error } = allContacts;
  const searchData = useSelector(state => state.contacts.locateUser);
  const addNewUserData = useSelector(
    state => state.contacts.newContact,
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [localError, setLocalError] = useState(null);
  const getContacts = () => {
    if (!data) {
      getContactList()(dispatch);
    }
  };

  const getRecentContacts = () => {
    if (!activeContacts.data) {
      getRecentActiveContacts({
        PID: userData.data && userData.data.PID,
        MaxRecordsReturned: '8',
      })(dispatch);
    }
  };

  useEffect(() => {
    getMyWallets()(dispatch);
    getContacts();
    getRecentContacts();
  }, []);

  useEffect(() => {
    if (searchData.error) {
      setLocalError(searchData.error && searchData.error.Description);
    }
  }, [searchData.error]);

  const walletsArr =
    form &&
    form.wallets &&
    form.wallets.map((wallet, index) => {
      const key = `Wallet${index}`;
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
      return item[`Wallet${index}`];
    });
  if (newobj) {
    for (let i = 0; i < newobj.length; i += 1) {
      const element = newobj[i];
      const key = `Wallet${i}`;
      contactData[key] = element;
    }
  }

  const addToContact = () => {
    addNewContact(contactData)(dispatch);
  };
  const { walletList } = useSelector(state => state.user.myWallets);
  const history = useHistory();
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
        userPID: userData.dat && userData.data.PID,
      })(dispatch);
    }
  };

  const clearSuccess = () => {
    setForm({});
    getContactList()(dispatch);
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
    />
  );
};

export default Contacts;
