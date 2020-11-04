/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import AddStore from 'components/Stores/AddStore';
import getStoreCategoriesAction from 'redux/actions/stores/getStoreCategories';
import getMyWalletsAction from 'redux/actions/users/getMyWallets';
import addUpdateStoreAction from 'redux/actions/stores/addUpdateStore';
import restoreAddUpdateStoreAction from 'redux/actions/stores/restoreAddUpdateStore';
import uploadFile from 'helpers/uploadImages/uploadFile';
import isFileImage from 'utils/isFileImage';

const AddStoreContainer = ({ currentStore }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const {
    userData,
    myWallets,
    myStores,
    language: { preferred } = {},
  } = useSelector(({ user }) => user);

  const { storeCategories, addUpdateStore } = useSelector(
    ({ stores }) => stores,
  );

  const isEditing = !!currentStore;

  const [logoUrl, setLogoUrl] = useState(null);
  const [bannerUrl, setBannerUrl] = useState(null);

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
        PhoneNumber: `${addStoreData.PhoneNumberCode || ''}${value}`,
      });
    }

    if (name === 'LogoURL' || name === 'BannerURL') {
      if (isFileImage(value)) {
        setImageLoading({ ...imageLoading, [name]: true });
        const { status, data } = await uploadFile({ [name]: value });

        if (status) {
          if (name === 'LogoURL') {
            setLogoUrl(data[0].url);
          } else {
            setBannerUrl(data[0].url);
          }

          setImageLoading({ ...imageLoading, [name]: false });
          return setAddStoreData({
            ...addStoreData,
            [name]: data[0].url,
          });
        }
        setImageLoading({ ...imageLoading, [name]: false });
      }
      return toast.error(
        global.translate(
          'Please, choose a image for the profile picture',
        ),
      );
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

      history.push({
        pathname: '/store-details',
        search: '?tab=details',
        state: { store: addUpdateStore.StoreID },
      });
    }

    if (!addUpdateStore.loading) {
      getStoreCategoriesAction(preferred)(dispatch);
      if (myWallets.walletList.length === 0)
        getMyWalletsAction()(dispatch);
    }
  }, [addUpdateStore]);

  useEffect(() => {
    const weAreOnUpdate = () => location.pathname !== '/add-store';

    if (weAreOnUpdate()) {
      const store =
        myStores.storeList.find(
          ({ StoreID }) => StoreID === currentStore.StoreID,
        ) || {};

      setAddStoreData({
        StoreID: store.StoreID || '',
        StoreName: store.StoreName || '',
        ShortDesc: store.ShortDesc || '',
        Description: store.Description || '',
        WalletNumber: store.AccountNumber || '',
        OpeningHour: store.OpeningHour || '',
        ClosingHour: store.ClosingHour || '',
        Address: store.Address || '',
        Category: store.Category || '',
        City: store.City || '',
        Country: store.Country || '',
        CountryCode: store.CountryCode
          ? store.CountryCode.toLowerCase()
          : '',
        OpenOnWE: store.OpenOnWEText || '',
        Longitude: store.Longitude || '',
        Latitude: store.Latitude || '',
        PhoneNumber: `+${store.PhonePrefix ||
          ''}${store.PhoneNumber || ''}`,
        PhoneNumberCode: store.PhonePrefix || '',
      });
    }
  }, []);

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
      : global.translate('The store name cannot be empty.', 813);
    const ShortDesc = addStoreData.ShortDesc
      ? ''
      : global.translate('Enter a short description', 2092);
    const OpeningHour = addStoreData.OpeningHour
      ? ''
      : global.translate('Enter the opening hours', 2092);
    const ClosingHour = addStoreData.ClosingHour
      ? ''
      : global.translate('Enter the closing hours', 2094);

    const Category = addStoreData.Category
      ? ''
      : global.translate('Choose a category for your store', 2095);

    const Address = addStoreData.Address
      ? ''
      : global.translate('Enter the Address of your store', 2096);

    const CountryCode = addStoreData.CountryCode
      ? ''
      : global.translate('Choose a Country for your store', 2097);

    const City = addStoreData.City
      ? ''
      : global.translate('Enter the city of your store', 2098);
    const position =
      addStoreData.Longitude || addStoreData.Latitude
        ? ''
        : global.translate('Pick the position of the store');

    setErrors({
      ...errors,
      StoreName,
      ShortDesc,
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
    addUpdateStoreAction(addStoreData, isEditing)(dispatch);
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
      currentStore={currentStore}
      addUpdateStore={addUpdateStore}
      imageLoading={imageLoading}
      logoUrl={logoUrl}
      bannerUrl={bannerUrl}
    />
  );
};

AddStoreContainer.propTypes = {
  currentStore: PropTypes.instanceOf(PropTypes.object),
};

AddStoreContainer.defaultProps = {
  currentStore: null,
};

export default AddStoreContainer;
