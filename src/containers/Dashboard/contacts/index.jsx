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

const Contacts = () => {
  const { userData } = useSelector(state => state.user);
  const [form, setForm] = useState({});

  const allContacts = useSelector(
    state => state.contacts.allContacts,
  );
  const { data, loading, error } = allContacts;
  const searchData = useSelector(state => state.contacts.locateUser);
  const addNewUserData = useSelector(
    state => state.contacts.newContact,
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const getContacts = () => {
    if (!data) {
      getContactList()(dispatch);
    }
  };

  useEffect(() => {
    getMyWallets()(dispatch);
    getContacts();
  }, []);

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
    ContactData: form && form.PID,
    ...walletsArr,
  };
  const AddToContact = () => {
    addNewContact(contactData)(dispatch);
  };
  const { walletList } = useSelector(state => state.user.myWallets);
  const history = useHistory();
  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
    if (name === 'PID' && value.length > 0) {
      locateUser({ PID: value })(dispatch);
    } else if (name === 'PID' && value.length === 0) {
      clearFoundUser()(dispatch);
    }
  };

  useEffect(() => {
    if (addNewUserData.success) {
      setOpen(false);
    } else {
      clearFoundUser()(dispatch);
    }
  }, [addNewUserData.success]);

  return (
    <ManageContacts
      walletList={walletList}
      history={history}
      onChange={onChange}
      AddToContact={AddToContact}
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
    />
  );
};

export default Contacts;
