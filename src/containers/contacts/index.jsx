/* eslint-disable no-case-declarations */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
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
import deleteContact, {
  clearDeleteContact,
} from 'redux/actions/contacts/deleteContact';
import getActiveExternalContacts from 'redux/actions/contacts/getRecentActiveExternalContacts';
import getRecentActiveExternalContacts from 'redux/actions/contacts/getRecentActiveExternalContacts';

const Contacts = () => {
  const [form, setForm] = useState({});
  const [editForm, setEditForm] = useState({});
  const [editErrors, setEditErrors] = useState(null);

  const {
    isSendingCash,
    isManagingContacts,
    isSendingMoney,
  } = useSelector(state => state.dashboard.contactActions);
  const [sendCashOpen, setSendCashOpen] = useState(false);
  const [sendMoneyOpen, setSendMoneyOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const { userData } = useSelector(state => state.user);
  const [destinationContact, setDestinationContact] = useState(null);

  const [isSharingNewWallet, setIsSharingNewWallet] = useState(false);

  const [isDetail, setIsDetail] = useState(false);
  const DefaultWallet = useSelector(
    state =>
      state.user.userData.data &&
      state.user.userData.data.DefaultWallet,
  );
  const {
    allContacts,
    externalContacts,
    activeContacts,
    activeExternalContacts,
  } = useSelector(state => state.contacts);
  const { data, loading, error } = isSendingCash
    ? externalContacts
    : allContacts;
  const searchData = useSelector(state => state.contacts.locateUser);

  const { walletList } = useSelector(state => state.user.myWallets);
  const {
    newContact: addNewUserData,
    deleteContact: deleteContactData,
  } = useSelector(state => state.contacts);

  const [open, setOpen] = useState(false);
  const [localError, setLocalError] = useState(null);

  const [contact, setContact] = useState(null);

  const removeUserContact = contact => {
    if (!isSendingCash) {
      deleteContact(
        { Criteria: 'PID', ContactData: contact.ContactPID },
        '/DeleteContact',
      )(dispatch);
    } else {
      deleteContact(
        { ContactPhoneNum: contact.PhoneNumber },
        '/DeleterExternalContact',
      )(dispatch);
    }
  };
  const clearRemoveContact = () => {
    clearDeleteContact()(dispatch);
  };

  const getContacts = (forceRefresh = false) => {
    if (forceRefresh) {
      if (isSendingCash) {
        getExternalContactList()(dispatch);
      } else {
        getContactList()(dispatch);
      }
    }
    if (!data) {
      if (isSendingCash) {
        getExternalContactList()(dispatch);
      } else {
        getContactList()(dispatch);
      }
    }
  };

  const getRecentContacts = () => {
    if (isSendingCash && !activeExternalContacts.data) {
      getActiveExternalContacts({
        PID: userData.data && userData.data.PID,
        MaxRecordsReturned: '8',
      })(dispatch);
    } else if (!activeContacts.data) {
      getRecentActiveContacts({
        PID: userData.data && userData.data.PID,
        MaxRecordsReturned: '8',
      })(dispatch);
    }
  };

  useEffect(() => {
    if (walletList.length === 0) {
      getMyWallets()(dispatch);
    }

    getRecentContacts();
  }, [isSendingCash, isSendingMoney]);

  useEffect(() => {
    getContacts();
  }, [isSendingCash]);

  useEffect(() => {
    if (searchData.error) {
      setLocalError(searchData.error && searchData.error.Description);
    }
  }, [searchData.error]);

  useEffect(() => {
    if (queryParams.ref === 'send-money' && queryParams.PID) {
      const contact =
        allContacts.data &&
        allContacts.data.find(
          ({ ContactPID }) => ContactPID === queryParams.PID,
        );

      if (contact) {
        setSendMoneyOpen(true);
        setDestinationContact(contact);
      }
    }
  }, [allContacts]);

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
  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const checkExists = () => {
    let exists = false;
    if (
      allContacts.data &&
      allContacts.data[0] &&
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
          global.translate('You cannot be your own contact', 1197),
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

  useEffect(() => {
    if (addNewUserData.success) {
      getActiveExternalContacts({
        PID: userData.data && userData.data.PID,
        MaxRecordsReturned: '8',
      })(dispatch);
    }
  }, [addNewUserData]);

  useEffect(() => {
    if (addNewUserData.success) {
      if (addNewUserData.data && addNewUserData.data[0].ContactPID) {
        getContacts(true);
        setContact(addNewUserData.data[0]);

        if (isSharingNewWallet) {
          toast.success(
            global.translate('Wallet Lists updated successfully'),
          );
          setIsSharingNewWallet(false);
        } else {
          setOpen(false);
          toast.success(
            global.translate(
              'Your contact is added successfully.',
              996,
            ),
            setIsDetail(true),
          );
        }
      }

      clearSuccess();
    }
  }, [addNewUserData.success]);
  const onEditChange = (e, { name, value }) => {
    setEditForm({ ...editForm, [name]: value });
  };
  const handleEditInfo = (type, contact) => {
    switch (type) {
      case 'external':
        if (!editForm.firstName || editForm.firstName === '') {
          setEditErrors(
            global.translate(
              'Please provide the recipient’s first and last names',
              762,
            ),
          );
          break;
        } else {
          setEditErrors(null);
        }
        if (!editForm.lastName || editForm.lastName === '') {
          setEditErrors(
            global.translate(
              'Please provide the recipient’s first and last names',
              762,
            ),
          );
          break;
        } else {
          setEditErrors(null);
        }

        if (!editForm.phoneNumber || editForm.phoneNumber === '') {
          setEditErrors(
            global.translate(
              'Please provide the recipient phone number.',
              1123,
            ),
          );
          break;
        } else {
          setEditErrors(null);
        }

        if (!editErrors) {
          const externalContactData = {
            ...contact,
            FirstName: editForm.firstName,
            LastName: editForm.lastName,
          };
          addNewContact(
            externalContactData,
            '/AddToExternalContact',
            'isEditingExternal',
          )(dispatch);
          setContact(externalContactData);
        }
        break;
      case 'default':
        if (editForm.wallets.length === 0) {
          toast.error(
            global.translate(
              'You must select at least one wallet to make visible to ',
              633,
            ) + contact.FirstName,
          );
          break;
        }
        const walletsArr =
          editForm &&
          editForm.wallets &&
          editForm.wallets.map((wallet, index) => {
            const key = `Wallet${index + 1}`;
            return {
              [key]: wallet,
            };
          });
        const contactData = {
          contactToAdd: contact,
          Criteria: 'PID',
          ContactData: contact.ContactPID,
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

          addNewContact(
            contactData,
            '/AddToContact',
            'isEditing',
          )(dispatch);
        }
        break;

      default:
        return null;
    }
  };

  return (
    <ManageContacts
      setEditForm={setEditForm}
      editForm={editForm}
      walletList={walletList}
      history={history}
      onEditChange={onEditChange}
      onChange={onChange}
      addToContact={addToContact}
      open={open}
      userData={userData}
      loading={loading}
      error={error}
      form={form}
      setEditErrors={setEditErrors}
      editErrors={editErrors}
      handleEditInfo={handleEditInfo}
      setForm={setForm}
      setOpen={setOpen}
      data={data}
      searchData={searchData}
      getContacts={getContacts}
      addNewUserData={addNewUserData}
      activeContacts={activeContacts}
      activeExternalContacts={activeExternalContacts}
      getRecentContacts={getRecentContacts}
      clearSuccess={clearSuccess}
      onSearchUser={onSearchUser}
      localError={localError}
      isManagingContacts={isManagingContacts}
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
      removeUserContact={removeUserContact}
      deleteContactData={deleteContactData}
      clearDeleteContact={clearRemoveContact}
      contact={contact}
      setContact={setContact}
      isDetail={isDetail}
      setIsDetail={setIsDetail}
      setIsSharingNewWallet={setIsSharingNewWallet}
      isSharingNewWallet={isSharingNewWallet}

      // setSendMoneyOpen={setSendMoneyOpen}
      // sendMoneyOpen={sendMoneyOpen}
      // destinationContact={destinationContact}
      // setDestinationContact={setDestinationContact}
    />
  );
};

export default Contacts;
