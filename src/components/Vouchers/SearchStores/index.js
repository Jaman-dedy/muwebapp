/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import WelcomeBar from 'components/Dashboard/WelcomeSection';

import Stores from 'components/Vouchers/SearchStores/VoucherStores';
import GoBack from 'components/common/GoBack';
import SearchStoreForm from './SearchStoreForm/SearchStoresForm';

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
}) => {
  const history = useHistory();

  const onClickHandler = () => {
    history.push('/contacts?ref=send-voucher');
  };

  useEffect(() => {
    clearSearchStoreAction();
    clearCreateVoucherAction();
  }, []);

  return (
    <>
      <div className="vouchers">
        <WelcomeBar loading={userData.loading}>
          <span className="lighter">
            <GoBack style onClickHandler={onClickHandler} />{' '}
            <span className="bold">
              {' '}
              {userData.data && userData.data.FirstName}{' '}
            </span>
            , send a voucher.{' '}
          </span>{' '}
        </WelcomeBar>{' '}
      </div>{' '}
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
        />{' '}
        <Stores
          searchStoreList={searchStoreList}
          selectingStore={selectingStore}
        />{' '}
      </div>{' '}
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
  searchStoreList: PropTypes.bool.isRequired,
  selectingStore: PropTypes.objectOf(PropTypes.any).isRequired,
  clearSearchStoreAction: PropTypes.bool.isRequired,
  clearCreateVoucherAction: PropTypes.bool.isRequired,
};

SearchStores.defaultProps = {
  userData: null,
  myWallets: {},
  searchStores: {
    goBack: () => true,
  },
  form: {},
  storeCategories: {},
};

export default SearchStores;
