/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tab, Grid } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GoBack from 'components/common/GoBack';
import useWindowSize from 'utils/useWindowSize';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import './style.scss';
import PublicityInfoTab from './PublicityInfoTab';
import CustomisedAudienceTab from './CustomisedAudienceTab';
import PublicityGeneralSettings from './PublicityGeneralSettings';
import AddPublicityForm from '../AddPublicity/AddPublicityForm';

const SettingView = props => {
  const { width } = useWindowSize();

  const settingsPanes = [
    {
      menuItem:
        width > 700
          ? `${global.translate('Edit', 820)} ${global
              .translate('Your campaign', 2011)
              .toLowerCase()}`
          : global.translate('Edit', 820),
      render: ({ currentPublicity }) => (
        <Tab.Pane>
          <Grid>
            <Grid.Column>
              {' '}
              <AddPublicityForm
                currentPublicity={currentPublicity}
                {...props}
              />
            </Grid.Column>
          </Grid>
        </Tab.Pane>
      ),
    },
    {
      menuItem: global.translate('General', 293),
      render: props => {
        return <PublicityGeneralSettings {...props} />;
      },
    },
  ];
  return (
    <Tab
      className="settings-tabs"
      menu={{ fluid: true, vertical: width > 800, tabular: true }}
      panes={settingsPanes}
      {...props}
    />
  );
};

const PublicityDetailsComponent = ({
  pendingVouchers,
  onCancelTransactionConfirm,
  store,
  publicities,
  userData,
  onRejectVoucher,
  form,
  setForm,
  onEditChange,
  getPendingStoreVouchers,
  currentPublicity,
  deleteStore,
  deleteStoreData,
  executeCampaing,
  executePublicityData,
  handleInputChange,
  errors,
  customAudience,
  handleSubmit,
  setOpen,
  open,
  createCampaing,
  activeTabIndex,
  setActiveTabIndex,
  deletePublicity,
  deleteCampaignData,
  item,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [cancelOpen, setCancelOpen] = useState(false);
  const { setStoreStatus } = useSelector(state => state.user);

  const panes = [
    {
      menuItem: global.translate('Details', 94),
      render: ({ currentPublicity }) => (
        <Tab.Pane>
          <PublicityInfoTab
            currentPublicity={currentPublicity}
            publicities={publicities}
            executeCampaing={executeCampaing}
            item={item}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: global.translate(
        'Share with a customized audience',
        1561,
      ),
      render: () => {
        return (
          <CustomisedAudienceTab
            userData={userData}
            currentPublicity={currentPublicity}
            executePublicityData={executePublicityData}
            handleInputChange={handleInputChange}
            errors={errors}
            customAudience={customAudience}
            handleSubmit={handleSubmit}
            executeCampaing={executeCampaing}
            open={open}
            setOpen={setOpen}
            item={item}
          />
        );
      },
    },
    {
      menuItem: global.translate('Settings', 1560),
      render: ({
        onEditChange,
        currentPublicity,
        handleInputChange,
        userData,
      }) => (
        <Tab.Pane attached={false}>
          <SettingView
            onEditChange={onEditChange}
            currentPublicity={currentPublicity}
            userData={userData}
            handleInputChange={handleInputChange}
            createCampaing={createCampaing}
            deletePublicity={deletePublicity}
            deleteCampaignData={deleteCampaignData}
            item={item}
          />
        </Tab.Pane>
      ),
    },
  ];

  const history = useHistory();
  const onClickHandler = () => history.goBack();

  return (
    <DashboardLayout>
      <WelcomeBar loading={false}>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title">
            {global.translate('Manage', 131)} &nbsp;
            <span className="bold">{currentPublicity.Title}</span>
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>
      {currentPublicity && (
        <div className="publicity-detail-tab">
          <Tab
            activeIndex={activeTabIndex}
            onTabChange={(_, { activeIndex }) =>
              setActiveTabIndex(activeIndex)
            }
            menu={{ secondary: true, pointing: true, fluid: true }}
            panes={panes}
            pendingVouchers={pendingVouchers}
            onCancelTransactionConfirm={onCancelTransactionConfirm}
            store={store}
            setSelectedItem={setSelectedItem}
            selectedItem={selectedItem}
            setCancelOpen={setCancelOpen}
            cancelOpen={cancelOpen}
            onRejectVoucher={onRejectVoucher}
            form={form}
            currentPublicity={currentPublicity}
            setStoreStatus={setStoreStatus}
            getPendingStoreVouchers={getPendingStoreVouchers}
            onEditChange={onEditChange}
            setForm={setForm}
            deleteStore={deleteStore}
            deleteStoreData={deleteStoreData}
            item={item}
          />
        </div>
      )}
    </DashboardLayout>
  );
};

SettingView.propTypes = {
  currentPublicity: PropTypes.objectOf(PropTypes.any),
};

SettingView.defaultProps = {
  currentPublicity: {},
};

PublicityDetailsComponent.propTypes = {
  currentPublicity: PropTypes.objectOf(PropTypes.any),
  pendingVouchers: PropTypes.objectOf(PropTypes.any),
  userData: PropTypes.objectOf(PropTypes.any),
  onCancelTransactionConfirm: PropTypes.func,
  store: PropTypes.objectOf(PropTypes.any),
  publicities: PropTypes.objectOf(PropTypes.any),
  onRejectVoucher: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any),
  setForm: PropTypes.func,
  onEditChange: PropTypes.func,
  getPendingStoreVouchers: PropTypes.func,
  deleteStore: PropTypes.objectOf(PropTypes.any),
  deleteStoreData: PropTypes.objectOf(PropTypes.any),
  executeCampaing: PropTypes.func,
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  executePublicityData: PropTypes.objectOf(PropTypes.any),
  errors: PropTypes.objectOf(PropTypes.any),
  customAudience: PropTypes.objectOf(PropTypes.any),
  createCampaing: PropTypes.objectOf(PropTypes.any),
  setOpen: PropTypes.func,
  open: PropTypes.bool,
  activeTabIndex: PropTypes.number,
  setActiveTabIndex: PropTypes.func,
  deletePublicity: PropTypes.func,
  deleteCampaignData: PropTypes.objectOf(PropTypes.any),
  item: PropTypes.objectOf(PropTypes.any),
};

PublicityDetailsComponent.defaultProps = {
  currentPublicity: {},
  pendingVouchers: {},
  userData: {},
  deleteStore: {},
  deleteStoreData: {},
  onCancelTransactionConfirm: () => null,
  store: {},
  publicities: {},
  onRejectVoucher: () => null,
  form: {},
  setForm: () => null,
  onEditChange: () => null,
  getPendingStoreVouchers: () => null,
  executeCampaing: () => null,
  handleInputChange: () => null,
  handleSubmit: () => null,
  executePublicityData: {},
  errors: {},
  customAudience: {},
  createCampaing: {},
  setOpen: () => false,
  open: false,
  activeTabIndex: 0,
  setActiveTabIndex: () => null,
  deletePublicity: () => null,
  deleteCampaignData: {},
  item: {},
};
export default PublicityDetailsComponent;
