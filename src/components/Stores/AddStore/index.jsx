import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import MyWallets from 'components/common/WalletCarousselSelector';
import GoBack from 'components/common/GoBack';
import addStoreImage from 'assets/images/add-store.png';
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
        />
      </div>
    );
  }
  return (
    <>
      <DashboardLayout>
        <WelcomeBar loading={userData.loading}>
          <span className="lighter">
            {global.translate('Create a store', 1243)}
          </span>
        </WelcomeBar>
        <GoBack onClickHandler={onClickHandler} />
        <div className="add-store-container">
          <div className="add-store-image">
            <Image src={addStoreImage} size="medium" centered />
          </div>

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
          />
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
};
export default AddStore;
