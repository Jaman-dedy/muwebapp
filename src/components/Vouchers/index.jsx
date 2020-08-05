import React from 'react';

import PropTypes from 'prop-types';
import DashboardLayout from 'components/common/DashboardLayout';

import SearchStores from './SearchStores';

import StoreDetails from './StoreDetails';

const Vouchers = ({
  screenNumber,
  userData,
  walletList,
  countries,
  stores,
  form,
  handleInputChange,
  searchStores,
  myWallets,
  selectWallet,
  storeDetails,
  storeCategories,
  searchStoresFx,
  searchStoreList,
  selectedStore,
  selectingStore,
  confirmationData,
  onChangeCountry,
  history,
  DefaultWallet,
  SendVoucherModal,
  comments,
  postCommentFx,
  postComment,
  clearSearchStoreAction,
  clearCreateVoucherAction,
  setSelectedStore,
  recentStores,
}) => {
  const renderForm = () => {
    switch (screenNumber) {
      case 1:
        history.push('/contacts?ref=send-voucher');
        break;
      case 2:
        return (
          <SearchStores
            selectWallet={selectWallet}
            myWallets={myWallets}
            userData={userData}
            walletList={walletList}
            countries={countries}
            stores={stores}
            form={form}
            storeCategories={storeCategories}
            handleInputChange={handleInputChange}
            searchStores={searchStores}
            searchStoresFx={searchStoresFx}
            onChangeCountry={onChangeCountry}
            searchStoreList={searchStoreList}
            selectingStore={selectingStore}
            clearCreateVoucherAction={clearCreateVoucherAction}
            clearSearchStoreAction={clearSearchStoreAction}
            SendVoucherModal={SendVoucherModal}
            setSelectedStore={setSelectedStore}
            selectedStore={selectedStore}
            recentStores={recentStores}
          />
        );

      case 4:
        return (
          <StoreDetails
            userData={userData}
            walletList={walletList}
            countries={countries}
            stores={stores}
            form={form}
            handleInputChange={handleInputChange}
            storeDetails={storeDetails}
            selectedStore={selectedStore}
            confirmationData={confirmationData}
            myWallets={myWallets}
            DefaultWallet={DefaultWallet}
            SendVoucherModal={SendVoucherModal}
            comments={comments}
            postCommentFx={postCommentFx}
            postComment={postComment}
          />
        );
      default:
        return null;
    }
    return null;
  };

  return (
    <DashboardLayout>
      <div>{renderForm()}</div>
    </DashboardLayout>
  );
};

Vouchers.propTypes = {
  screenNumber: PropTypes.number,
  userData: PropTypes.objectOf(PropTypes.any),
  walletList: PropTypes.objectOf(PropTypes.any),
  countries: PropTypes.objectOf(PropTypes.any),
  stores: PropTypes.objectOf(PropTypes.any),
  form: PropTypes.objectOf(PropTypes.any),
  handleInputChange: PropTypes.func,
  searchStores: PropTypes.func,
  myWallets: PropTypes.objectOf(PropTypes.any),
  selectWallet: PropTypes.func,
  storeDetails: PropTypes.objectOf(PropTypes.any),
  storeCategories: PropTypes.objectOf(PropTypes.any),
  searchStoresFx: PropTypes.func,
  searchStoreList: PropTypes.objectOf(PropTypes.any),
  selectedStore: PropTypes.objectOf(PropTypes.any),
  selectingStore: PropTypes.func,
  confirmationData: PropTypes.objectOf(PropTypes.any),
  onChangeCountry: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.any),
  DefaultWallet: PropTypes.objectOf(PropTypes.any),
  SendVoucherModal: PropTypes.func,
  comments: PropTypes.objectOf(PropTypes.any),
  postCommentFx: PropTypes.func,
  postComment: PropTypes.objectOf(PropTypes.any),
  clearSearchStoreAction: PropTypes.func,
  clearCreateVoucherAction: PropTypes.func,
  setSelectedStore: PropTypes.func,
  recentStores: PropTypes.objectOf(PropTypes.any),
};

Vouchers.defaultProps = {
  screenNumber: 0,
  userData: {},
  walletList: {},
  countries: {},
  stores: {},
  form: {},
  handleInputChange: () => {},
  searchStores: () => {},
  myWallets: {},
  selectWallet: () => {},
  storeDetails: {},
  storeCategories: {},
  searchStoresFx: () => {},
  searchStoreList: {},
  selectedStore: {},
  selectingStore: () => {},
  confirmationData: {},
  onChangeCountry: () => {},
  history: {},
  DefaultWallet: {},
  SendVoucherModal: () => {},
  comments: {},
  postCommentFx: () => {},
  postComment: {},
  clearSearchStoreAction: () => {},
  clearCreateVoucherAction: () => {},
  setSelectedStore: () => {},
  recentStores: {},
};
export default Vouchers;
