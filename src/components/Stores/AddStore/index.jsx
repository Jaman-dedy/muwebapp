import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import MyWallets from 'components/common/WalletCarousselSelector';
import GoBack from 'components/common/GoBack';
import AddEditStoreForm from './AddEditStoreForm';
import './editStore.scss';
import './AddStore.scss';

const AddStore = ({
  userData,
  myWallets,
  storeCategories,
  addStoreData,
  handleInputChange,
  selectWallet,
  errors,
  handleSubmit,
  addUpdateStore,
  imageLoading,
  currentStore,
  logoUrl,
  bannerUrl,
}) => {
  const history = useHistory();
  const location = useLocation();
  const onClickHandler = () => history.goBack();
  const isEditing = location.pathname !== '/add-store';

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
          isEditing
          imageLoading={imageLoading}
          storeCategories={storeCategories}
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
              {global.translate('Create a store', 1243)}
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
              imageLoading={imageLoading}
              storeCategories={storeCategories}
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
  userData: PropTypes.instanceOf(Object),
  myWallets: PropTypes.instanceOf(Object).isRequired,
  storeCategories: PropTypes.instanceOf(Object),
  addStoreData: PropTypes.instanceOf(Object).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  selectWallet: PropTypes.func.isRequired,
  errors: PropTypes.instanceOf(Object),
  handleSubmit: PropTypes.func.isRequired,
  addUpdateStore: PropTypes.instanceOf(Object),
  imageLoading: PropTypes.instanceOf(Object),
  currentStore: PropTypes.instanceOf(Object),
  logoUrl: PropTypes.string,
  bannerUrl: PropTypes.string,
};

AddStore.defaultProps = {
  userData: {
    data: {},
  },
  storeCategories: {
    data: {},
  },

  errors: {},
  addUpdateStore: {
    success: false,
  },
  imageLoading: {},
  currentStore: {},
  logoUrl: '',
  bannerUrl: '',
};

export default AddStore;
