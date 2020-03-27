import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import AddStore from 'components/Stores/AddStore';
import getStoreCategoriesAction from 'redux/actions/stores/getStoreCategories';
import getMyWalletsAction from 'redux/actions/users/getMyWallets';
import addUpdateStoreAction from 'redux/actions/stores/addUpdateStore';
import restoreAddUpdateStoreAction from 'redux/actions/stores/restoreAddUpdateStore';
import uploadFile from 'helpers/uploadImages/uploadFile';

const AddStoreContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const {
    userData,
    myWallets,
    myStores,
    language: { preferred } = {},
  } = useSelector(({ user }) => user);

  const { storeCategories, addUpdateStore } = useSelector(
    ({ stores }) => stores,
  );

  const [addStoreData, setAddStoreData] = useState({
    StoreID: '',
    StoreName: '',
    ShortDesc: '',
    Description: '',
    OpeningHour: '',
    ClosingHour: '',
    Category: '',
    LogoURL: '',
    BannerURL: '',
    WalletNumber: '',
    Country: '',
    CountryCode: '',
    OpenOnWE: 'NO',
    Address: '',
    City: '',
    Longitude: '',
    Latitude: '',
    PhoneNumber: '',
    PhoneNumberCode: '',
  });

  const [errors, setErrors] = useState({});
  const [imageLoading, setImageLoading] = useState({});

  const clearError = name => {
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleInputChange = async ({ target: { name, value } }) => {
    clearError(name);
    if (name === 'position') {
      return setAddStoreData({
        ...addStoreData,
        Latitude: value.Latitude.toString(),
        Longitude: value.Longitude.toString(),
        CountryCode: value.CountryCode.toLowerCase(),
        City: value.City,
        PhoneNumberCode: value.PhoneNumberCode,
      });
    }

    if (name === 'PhoneNumber') {
      return setAddStoreData({
        ...addStoreData,
        PhoneNumber: addStoreData.PhoneNumberCode + value,
      });
    }

    if (name === 'LogoURL' || name === 'BannerURL') {
      setImageLoading({ ...imageLoading, [name]: true });
      const { status, data } = await uploadFile({ [name]: value });
      if (status) {
        setImageLoading({ ...imageLoading, [name]: false });
        return setAddStoreData({
          ...addStoreData,
          [name]: data[0].url,
        });
      }
      setImageLoading({ ...imageLoading, [name]: false });
    }

    return setAddStoreData({
      ...addStoreData,
      [name]: value,
    });
  };

  const selectWallet = ({ AccountNumber }) => {
    setAddStoreData({
      ...addStoreData,
      WalletNumber: AccountNumber,
    });
  };

  useEffect(() => {
    if (addUpdateStore.success) {
      restoreAddUpdateStoreAction()(dispatch);
      history.push('/my-stores');
    }
    if (queryParams.StoreID && myStores.storeList.length !== 0) {
      const store =
        myStores.storeList.find(
          ({ StoreID }) => StoreID === queryParams.StoreID,
        ) || {};

      setAddStoreData({
        StoreID: store.StoreID,
        StoreName: store.StoreName,
        ShortDesc: store.ShortDesc,
        Description: store.Description,
        WalletNumber: store.AccountNumber,
        OpeningHour: store.OpeningHour,
        ClosingHour: store.ClosingHour,
        Address: store.Address,
        Category: store.Category,
        City: store.City,
        Country: store.Country,
        CountryCode: store.CountryCode.toLowerCase(),
        OpenOnWE: store.OpenOnWEText,
        Longitude: store.Longitude || '',
        Latitude: store.Latitude || '',
      });
    }
    if (!addUpdateStore.loading) {
      getStoreCategoriesAction(preferred)(dispatch);
      if (myWallets.walletList.length === 0)
        getMyWalletsAction()(dispatch);
    }
  }, [addUpdateStore]);

  const clearAddStoreData = () => {
    setAddStoreData({
      StoreID: '',
      StoreName: '',
      ShortDesc: '',
      Description: '',
      OpeningHour: '',
      ClosingHour: '',
      Category: '',
      LogoURL: '',
      BannerURL: '',
      WalletNumber: '',
      CountryCode: '',
      OpenOnWE: 'NO',
      Address: '',
      Longitude: '',
      Latitude: '',
    });
  };

  const validateForm = () => {
    const StoreName = addStoreData.StoreName
      ? ''
      : global.translate('The store name cannot be empty.');
    const ShortDesc = addStoreData.ShortDesc
      ? ''
      : global.translate('Enter a short description');
    const Description = addStoreData.Description
      ? ''
      : global.translate(
          'The store Full description cannot be empty.',
        );
    const OpeningHour = addStoreData.OpeningHour
      ? ''
      : global.translate('Enter the opening time');
    const ClosingHour = addStoreData.ClosingHour
      ? ''
      : global.translate('Enter the closing time');

    const Category = addStoreData.Category
      ? ''
      : global.translate('Choose a category for your store');

    const Address = addStoreData.Address
      ? ''
      : global.translate('Enter the Address of your store');

    const CountryCode = addStoreData.CountryCode
      ? ''
      : global.translate('Choose a Country for your store');

    const City = addStoreData.City
      ? ''
      : global.translate('Enter the city of your store');
    const position =
      addStoreData.Longitude || addStoreData.Latitude
        ? ''
        : global.translate('Pick the position of the store');

    setErrors({
      ...errors,
      StoreName,
      ShortDesc,
      Description,
      OpeningHour,
      ClosingHour,
      Category,
      Address,
      position,
      City,
      CountryCode,
    });
    return !(
      StoreName ||
      ShortDesc ||
      Description ||
      OpeningHour ||
      ClosingHour ||
      Category ||
      Address ||
      position ||
      City ||
      CountryCode
    );
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return false;
    }
    addUpdateStoreAction(addStoreData)(dispatch);
    return true;
  };

  return (
    <AddStore
      userData={userData}
      myWallets={myWallets}
      storeCategories={storeCategories}
      addStoreData={addStoreData}
      handleInputChange={handleInputChange}
      selectWallet={selectWallet}
      clearAddStoreData={clearAddStoreData}
      handleSubmit={handleSubmit}
      errors={errors}
      addUpdateStore={addUpdateStore}
      imageLoading={imageLoading}
    />
  );
};

export default AddStoreContainer;
