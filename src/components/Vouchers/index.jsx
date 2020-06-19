import React from 'react';

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
  storesPage,
  storeDetails,
  storeCategories,
  searchStoresFx,
  searchStoreList,
  selectedStore,
  selectingStore,
  confirmationData,
  setSelectedContact,
  onChangeCountry,
  selectedContact,
  history,
  errors,
  clearError,
  userLocationData,
  goToSearchStorePage,
  handleInputChangeContact,
  goToStoreDetailsPage,
  DefaultWallet,
  SendVoucherModal,
  comments,
  postCommentFx,
  postComment,
  onSearchUser,
  addToContact,
  clearSuccess,
  searchData,
  addNewUserData,
  localError,
  setLocalError,
  onChange,

  contacts,
  setContacts,
  clearSearchStoreAction,
  clearCreateVoucherAction,
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
  };

  return (
    <DashboardLayout>
      <div className="voucher-page">{renderForm()}</div>
    </DashboardLayout>
  );
};

export default Vouchers;
