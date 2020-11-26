/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import WelcomeBar from 'components/Dashboard/WelcomeSection';

import GoBack from 'components/common/GoBack';
import Stores from 'components/Vouchers/SearchStores/VoucherStores';
import SendVoucherModalComp from 'components/Vouchers/SendVoucherModal';

import ViewEyeImage from 'assets/images/vieweye.png';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';
import ViewVouchersImage from 'assets/images/gift.png';
import SearchStoreForm from './SearchStoreForm/SearchStoresForm';
import './SearchStore.scss';
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
  recentStores,
}) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const onClickHandler = () => {
    history.push('/contacts?ref=send-voucher');
  };
  const [hasSearched, setHasSearched] = useState(false);

  const toggleOpenSendModal = () => {
    SendVoucherModal.setSendMoneyOpen(
      !SendVoucherModal.sendMoneyOpen,
    );
  };

  const options = item => {
    return [
      {
        name: global.translate('View Details', 1256),
        image: ViewEyeImage,
        onClick: () => {
          selectingStore(item);
        },
      },
      {
        name: global.translate('Send Voucher', 863),
        image: ViewVouchersImage,
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
      <WelcomeBar loading={false}>
        <div className="head-content">
          {!isAppDisplayedInWebView && (
            <div className="go-back">
              <GoBack style onClickHandler={onClickHandler} />
            </div>
          )}
          <h2 className="head-title">
            <span>
              {global.translate('Choose the voucher store', 2036)}
            </span>
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className="clear" />
      <div className="searchStorePage">
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
          setHasSearched={() => setHasSearched(true)}
        />
        <div className="searchStorePage__stores-list">
          {!hasSearched && (
            <div className="searchStorePage__stores-list__item">
              <Stores
                searchStoreList={recentStores?.data}
                selectingStore={selectingStore}
                options={options}
                title={global.translate(
                  'Recently visited stores',
                  1739,
                )}
              />
            </div>
          )}

          <div className="searchStorePage__stores-list__item">
            <Stores
              searchStoreList={searchStoreList}
              options={options}
              selectingStore={selectingStore}
              title={global.translate('Stores', 1624)}
            />
          </div>
        </div>
        <SendVoucherModalComp SendVoucherModal={SendVoucherModal} />{' '}
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
  searchStoreList: PropTypes.arrayOf(PropTypes.object),
  selectingStore: PropTypes.func.isRequired,
  clearSearchStoreAction: PropTypes.func.isRequired,
  clearCreateVoucherAction: PropTypes.func.isRequired,
  recentStores: PropTypes.objectOf(PropTypes.any),
  SendVoucherModal: PropTypes.objectOf(PropTypes.any),
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
  searchStoreList: [],
  recentStores: null,
  SendVoucherModal: {},
  setSelectedStore: () => {},
  selectedStore: {},
};

export default SearchStores;
