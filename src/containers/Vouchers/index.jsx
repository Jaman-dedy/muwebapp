import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import storeComments from 'redux/actions/stores/getComments';
import getMyWalletsAction from 'redux/actions/users/getMyWallets';
import VoucherComponent from 'components/Vouchers';

import getStoreCategoriesAction from 'redux/actions/stores/getStoreCategories';
import searchStoreAction from 'redux/actions/vouchers/searchStores';
import clearCreateVoucherAction from 'redux/actions/vouchers/clearCreateStore';
import clearSearchStoreAction from 'redux/actions/vouchers/clearSearchStore';
import getUserLocationData from 'redux/actions/users/userLocationData';
import postCommentAction from 'redux/actions/stores/postComment';
import storeDetails from './storeDetails';
import SendVoucherModal from './sendVoucherModal';

const Vouchers = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { storeCategories, comments, postComment } = useSelector(
    ({ stores }) => stores,
  );

  const { confirmationData } = useSelector(
    state => state.moneyTransfer.confirmTransaction,
  );

  const DefaultWallet = useSelector(
    state =>
      state.user.userData.data &&
      state.user.userData.data.DefaultWallet,
  );

  const { userData, language: { preferred } = {} } = useSelector(
    state => state.user,
  );

  const { userLocationData } = useSelector(({ user }) => user);
  const [localError, setLocalError] = useState(null);
  const searchData = useSelector(state => state.contacts.locateUser);
  const { newContact: addNewUserData } = useSelector(
    state => state.contacts,
  );

  const myWallets = useSelector(state => state.user.myWallets);

  const { walletList } = myWallets;

  const { countries, stores, searchStore } = useSelector(
    state => state.voucher,
  );

  const [screenNumber, setScreenNumber] = useState(2);

  const [selectedContact, setSelectedContact] = useState({});

  const [errors, setErrors] = useState({});

  const [selectedStore, setSelectedStore] = useState({});

  const [form, setForm] = useState({
    CountryCode: '',
    StoreName: '',
    Category: '',
    City: '',
    Scope: 'OR',
    StoreID: '',
    ContactPID: '',
    PhoneNumber: '',
    FirstName: '',
    LastName: '',
    Amount: '',
    SourceWallet: '',
    wallets: [],
  });

  const handleInputChange = async ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const selectingStore = item => {
    setSelectedStore(item);
    setScreenNumber(4);

    storeComments({ StoreID: item.StoreID })(dispatch);

    // FOR TESTING PURPOSE
    // storeComments({ StoreID: 'ST-08-AGO' })(dispatch);
  };

  const clearSearchStoreFx = () => {
    clearSearchStoreAction()(dispatch);
  };

  const clearCreateVoucherFx = () => {
    clearCreateVoucherAction()(dispatch);
  };

  const searchStoresFx = () => {
    clearSearchStoreFx();
    const postData = {};
    postData.CountryCode = form.CountryCode;
    postData.StoreName = form.StoreName;
    postData.Category = form.Category;
    postData.City = form.City;
    postData.Scope = form.Scope;
    searchStoreAction(postData)(dispatch).then(response => {
      if (
        response.voucher.searchStore.data &&
        response.voucher.searchStore.data[0].StoreFound === 'No'
      ) {
        toast.error(response.voucher.searchStore.data[0].Description);
      }

      if (response.voucher.searchStore === null) {
        toast.error('No Store found.');
      }
    });
  };

  const postCommentFx = () => {
    const postData = { Anonymous: 'Yes' };
    postData.StoreID = selectedStore.StoreID;
    postData.Comment = form.comment;
    postCommentAction(postData)(dispatch)
      .catch(() => {
        setForm({ ...form, Comment: '' });
      })
      .then(() => {
        setForm({ ...form, Comment: '' });
      });
  };

  const goToSearchStorePage = () => {
    setForm({ ...form, Scope: 'OR' });
    setScreenNumber(2);
  };

  const clearError = ({ target: { name } }) => {
    setErrors({
      ...errors,
      [name]: '',
    });
  };

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

  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    getMyWalletsAction()(dispatch);
    getStoreCategoriesAction(preferred)(dispatch);
    getUserLocationData()(dispatch);
  }, []);

  useEffect(() => {
    if (selectedStore.StoreID) {
      storeComments({ StoreID: selectedStore.StoreID })(dispatch);
    }
  }, []);

  return (
    <VoucherComponent
      screenNumber={screenNumber}
      setScreenNumber={setScreenNumber}
      form={form}
      userData={userData}
      walletList={walletList}
      countries={countries}
      stores={stores.data}
      handleInputChange={handleInputChange}
      myWallets={myWallets}
      searchStoresFx={searchStoresFx}
      storeCategories={storeCategories}
      comments={comments}
      storeDetails={storeDetails({ setScreenNumber })}
      searchStoreData={searchStore}
      searchStoreList={searchStore.data}
      selectedStore={selectedStore}
      selectingStore={selectingStore}
      confirmationData={confirmationData}
      setSelectedContact={setSelectedContact}
      selectedContact={selectedContact}
      history={history}
      searchStoreAction={searchStoreAction}
      clearSearchStoreAction={clearSearchStoreFx}
      clearCreateVoucherAction={clearCreateVoucherFx}
      errors={errors}
      clearError={clearError}
      userLocationData={userLocationData}
      goToSearchStorePage={goToSearchStorePage}
      DefaultWallet={DefaultWallet}
      postCommentFx={postCommentFx}
      postComment={postComment}
      searchData={searchData}
      addNewUserData={addNewUserData}
      setLocalError={setLocalError}
      localError={localError}
      onChange={onChange}
      SendVoucherModal={SendVoucherModal({
        userData,
        walletList,
        selectedContact: history?.location?.state?.contact,
        selectedStore,
        form,
        handleInputChange,
        setForm,
        setScreenNumber,
        setSelectedContact,
        setSelectedStore,
        searchData,
      })}
    />
  );
};

export default Vouchers;
