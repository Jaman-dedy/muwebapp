import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import MyWallets from 'components/common/WalletCarousselSelector';
import GoBack from 'components/common/GoBack';
import './editStore.scss';
import './AddStore.scss';
import getStoreCategoriesAction from 'redux/actions/stores/getStoreCategories';
import getMyWalletsAction from 'redux/actions/users/getMyWallets';
import addUpdateStoreAction from 'redux/actions/stores/addUpdateStore';
import restoreAddUpdateStoreAction from 'redux/actions/stores/restoreAddUpdateStore';
import uploadFile from 'helpers/uploadImages/uploadFile';
import isFileImage from 'utils/isFileImage';
import AddEditStoreForm from './AddEditStoreForm';

const AddStore = ({ currentStore }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const onClickHandler = () => history.goBack();
  const isEditing = location.pathname !== '/add-store';
  const [errors, setErrors] = useState({});
  const [imageLoading, setImageLoading] = useState({});
  const [logoUrl, setLogoUrl] = useState(null);
  const [bannerUrl, setBannerUrl] = useState(null);
  const [accountNumber, setAccountNumber] = useState('');
  const editing = !!currentStore;
  const {
    userData,
    myWallets,
    myStores,
    language: { preferred } = {},
  } = useSelector(({ user }) => user);
  const { addUpdateStore } = useSelector(({ stores }) => stores);

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
  useEffect(() => {
    if (accountNumber) {
      setAddStoreData({
        ...addStoreData,
        WalletNumber: accountNumber,
      });
    }
  }, [accountNumber]);
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

  const clearError = name => {
    setErrors({
      ...errors,
      [name]: '',
    });
  };
  const handlePhoneChange = phone => {
    return setAddStoreData({
      ...addStoreData,
      PhoneNumber: phone,
    });
  };
  const handleInputChange = ({ target: { name, value } }) => {
    return setAddStoreData({
      ...addStoreData,
      [name]: value,
    });
  };
  const handleLocation = ({ target: { name, value } }) => {
    clearError(name);
    return setAddStoreData({
      ...addStoreData,
      Latitude: value.Latitude.toString(),
      Longitude: value.Longitude.toString(),
      CountryCode: value.CountryCode.toLowerCase(),
      City: value.City,
      PhoneNumberCode: value.PhoneNumberCode,
    });
  };
  const handleImageUpload = async ({ target: { name, value } }) => {
    clearError(name);
    if (isFileImage(value)) {
      setImageLoading({ ...imageLoading, [name]: true });
      const { status, data } = await uploadFile({ [name]: value });

      if (status) {
        if (name === 'LogoURL') {
          setLogoUrl(data?.[0]?.url);
        } else {
          setBannerUrl(data?.[0]?.url);
        }

        setImageLoading({ ...imageLoading, [name]: false });
        return setAddStoreData({
          ...addStoreData,
          [name]: data?.[0]?.url,
        });
      }
      setImageLoading({ ...imageLoading, [name]: false });
    }
    return toast.error(
      global.translate(
        'Please, choose a image for the profile picture',
      ),
    );
  };
  const selectWallet = ({ AccountNumber }) => {
    setAccountNumber(AccountNumber);
    setAddStoreData({
      ...addStoreData,
      WalletNumber: AccountNumber,
    });
  };
  const validateForm = () => {
    const StoreName = addStoreData.StoreName
      ? ''
      : global.translate('The store name cannot be empty.');
    const ShortDesc = addStoreData.ShortDesc
      ? ''
      : global.translate('Enter a short description');
    const OpeningHour = addStoreData.OpeningHour
      ? ''
      : global.translate('Enter the opening hours');
    const ClosingHour = addStoreData.ClosingHour
      ? ''
      : global.translate('Enter the closing hours');

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
    addUpdateStoreAction(addStoreData, editing)(dispatch);
    return true;
  };
  if (isEditing) {
    return (
      <div className="edit-store-container">
        <AddEditStoreForm
          errors={errors}
          addStoreData={addStoreData}
          handleSubmit={handleSubmit}
          currentStore={currentStore}
          addUpdateStore={addUpdateStore}
          handleInputChange={handleInputChange}
          handlePhoneChange={handlePhoneChange}
          handleLocation={handleLocation}
          handleImageUpload={handleImageUpload}
          isEditing
          imageLoading={imageLoading}
          logoUrl={logoUrl}
          bannerUrl={bannerUrl}
        />
      </div>
    );
  }
  return (
    <>
      <DashboardLayout>
        <WelcomeBar loading={userData.loading}>
          <div className="head-content">
            <div className="go-back">
              <GoBack style onClickHandler={onClickHandler} />
            </div>
            <h2 className="head-title">
              {global.translate('Create a store')}
            </h2>
            <div className="clear" />
          </div>
        </WelcomeBar>
        <div className="wrap__container">
          <div className="add-store-container">
            <MyWallets
              myWallets={myWallets}
              selectWallet={selectWallet}
              selectedWalletNumber={addStoreData.WalletNumber}
            />
            <AddEditStoreForm
              errors={errors}
              addStoreData={addStoreData}
              handleSubmit={handleSubmit}
              addUpdateStore={addUpdateStore}
              handleInputChange={handleInputChange}
              handlePhoneChange={handlePhoneChange}
              handleLocation={handleLocation}
              handleImageUpload={handleImageUpload}
              imageLoading={imageLoading}
              logoUrl={logoUrl}
              bannerUrl={bannerUrl}
            />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

AddStore.propTypes = {
  currentStore: PropTypes.instanceOf(Object),
};

AddStore.defaultProps = {
  currentStore: {},
};

export default AddStore;
