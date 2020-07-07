import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import WelcomeBar from 'components/Dashboard/WelcomeSection';

import GoBack from 'components/common/GoBack';

import Stores from 'components/Vouchers/SearchStores/VoucherStores';
import SendVoucherModalComp from 'components/Vouchers/SendVoucherModal';

import ViewEyeImage from 'assets/images/vieweye.png';
import ViewVochersImage from 'assets/images/gift.png';
import SearchStoreForm from './SearchStoreForm.scss/SearchStoresForm';

const SearchStores = ({
  userData,
  form,
  handleInputChange,
  searchStores,
  myWallets,
  selectWallet,
  storeCategories,
  onChangeCountry,
  searchStoresFx,
  searchStoreList,
  selectingStore,
  clearSearchStoreAction,
  clearCreateVoucherAction,
  SendVoucherModal,
  setSelectedStore,
  selectedStore,
}) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const onClickHandler = () => {
    history.push('/contacts?ref=send-voucher');
  };

  const toggleOpenSendModal = () => {
    SendVoucherModal.setStep(1);
    SendVoucherModal.setSendMoneyOpen(
      !SendVoucherModal.sendMoneyOpen,
    );
  };

  const options = item => {
    return [
      {
        name: global.translate('View Details'),
        image: ViewEyeImage,
        onClick: () => {
          selectingStore(item);
        },
      },
      {
        name: global.translate('Send Voucher'),
        image: ViewVochersImage,
        onClick: () => {
          setSelectedStore(dispatch, item, false);
          toggleOpenSendModal();
        },
      },
    ];
  };

  useEffect(() => {
    clearCreateVoucherAction();
    if (selectedStore?.skipSearchPage) {
      toggleOpenSendModal();
    }
  }, []);

  return (
    <>
      <div className="vouchers">
        <WelcomeBar loading={userData.loading}>
          <span className="lighter">
            <GoBack style onClickHandler={onClickHandler} />
            <span className="bold">
              {userData.data && userData.data.FirstName}
            </span>
            , {global.translate('Send a Voucher')}
          </span>
        </WelcomeBar>
      </div>
      <div>
        <SearchStoreForm
          handleInputChange={handleInputChange}
          userData={userData}
          form={form}
          searchStores={searchStores}
          myWallets={myWallets}
          selectWallet={selectWallet}
          storeCategories={storeCategories}
          onChangeCountry={onChangeCountry}
          searchStoresFx={searchStoresFx}
          clearSearchStoreAction={clearSearchStoreAction}
        />

        <div className="add-money-container">
          <Stores
            searchStoreList={searchStoreList}
            options={options}
            selectingStore={selectingStore}
            title={global.translate('Stores', 1624)}
          />
        </div>

        <SendVoucherModalComp SendVoucherModal={SendVoucherModal} />
      </div>
    </>
  );
};

SearchStores.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any),
  searchStores: PropTypes.objectOf(PropTypes.any),
  form: PropTypes.objectOf(PropTypes.any),
  handleInputChange: PropTypes.func.isRequired,
  myWallets: PropTypes.objectOf(PropTypes.any),
  selectWallet: PropTypes.func.isRequired,
  storeCategories: PropTypes.objectOf(PropTypes.any),
  onChangeCountry: PropTypes.func.isRequired,
  searchStoresFx: PropTypes.func.isRequired,
  searchStoreList: PropTypes.func,
  selectingStore: PropTypes.func,
  clearSearchStoreAction: PropTypes.func,
  clearCreateVoucherAction: PropTypes.func,
  SendVoucherModal: PropTypes.func,
  setSelectedStore: PropTypes.func,
  selectedStore: PropTypes.objectOf(PropTypes.any),
};

SearchStores.defaultProps = {
  userData: null,
  myWallets: {},
  searchStores: {
    goBack: () => true,
  },
  form: {},
  storeCategories: {},
  searchStoreList: () => {},
  selectingStore: () => {},
  clearSearchStoreAction: () => {},
  clearCreateVoucherAction: () => {},
  SendVoucherModal: () => {},
  setSelectedStore: () => {},
  selectedStore: {},
};

export default SearchStores;
