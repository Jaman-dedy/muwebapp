import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Tab,
  Grid,
  Menu,
  Label,
  Segment,
  Image,
} from 'semantic-ui-react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import PendingVoucherTable from 'components/common/PendingVoucherTable';
import useWindowSize from 'utils/useWindowSize';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import './style.scss';
import NewAgentModal from 'components/Stores/StoreDetailsComponent/AgentsView/New/AddNewAgentModal';
import AgentsView from 'components/Stores/StoreDetailsComponent/AgentsView';
import locateUser from 'redux/actions/contacts/locateUser';
import addStoreAgentAction from 'redux/actions/stores/addStoreAgents';
import AddStoreContainer from 'containers/Stores/AddStore';
import GoBack from 'components/common/GoBack';
import loadTransactions from 'assets/images/placeholders/table-placeholder.svg';
import EmptyCard from 'components/common/EmptyTransaction';
import StoreInfoTab from './StoreInfoTab';
import NotificationSettingsTab from './NotificationSettingsTab';
import StoreAvailabilitySettings from './StoreAvailabilitySettings';
import StoreWalletSettingsTab from './StoreWalletSettingsTab';

const SettingView = props => {
  const { width } = useWindowSize();
  const history = useHistory();
  const {
    activeSettingTab,
    setActiveSettingTab,
    currentStore,
  } = props;

  const settingsPanes = [
    {
      menuItem:
        width > 700
          ? `${global.translate('Edit', 820)} ${global
              .translate('Your store', 897)
              .toLowerCase()}`
          : global.translate('Edit', 820),
      render: ({ currentStore }) => (
        <Tab.Pane>
          <Grid>
            <Grid.Column>
              <AddStoreContainer currentStore={currentStore} />
            </Grid.Column>
          </Grid>
        </Tab.Pane>
      ),
    },
    {
      menuItem: global.translate('Notifications', 771),
      render: props => {
        return <NotificationSettingsTab {...props} />;
      },
    },

    {
      menuItem: global.translate('Wallets', 61),
      render: props => {
        return <StoreWalletSettingsTab {...props} />;
      },
    },
    {
      menuItem: global.translate('General', 293),
      render: props => {
        return <StoreAvailabilitySettings {...props} />;
      },
    },
  ];
  return (
    <Tab
      className="settings-tabs"
      menu={{ fluid: true, vertical: width > 800, tabular: true }}
      panes={settingsPanes}
      activeIndex={activeSettingTab}
      onTabChange={(event, data) => {
        let tabHash = '';

        switch (data.activeIndex) {
          case 0:
            tabHash = 'edit';
            break;
          case 1:
            tabHash = 'notifications';
            break;
          case 2:
            tabHash = 'wallets';
            break;
          case 3:
            tabHash = 'general';
            break;
          default:
            break;
        }

        history.push({
          pathname: '/store-details',
          search: '?tab=settings',
          hash: `#${tabHash}`,
          state: { store: currentStore.StoreID },
        });
        setActiveSettingTab(data.activeIndex);
      }}
      {...props}
    />
  );
};

const StoreDetailsComponent = ({
  pendingVouchers,
  onCancelTransactionConfirm,
  store,
  onRejectVoucher,
  form,
  setForm,
  onEditChange,
  getPendingStoreVouchers,
  currentStore,
  deleteStore,
  deleteStoreData,
  activeTab,
  setActiveTab,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [cancelOpen, setCancelOpen] = useState(false);
  const { setStoreStatus } = useSelector(state => state.user);
  const [activeSettingTab, setActiveSettingTab] = useState(0);
  const [isOpenAddAgent, setIsOpenAddAgent] = useState(false);
  const history = useHistory();

  const [localError, setLocalError] = useState(null);

  const {
    data: addNewUserData,
    loading: addAgentsLoading,
  } = useSelector(state => state.stores.addStoreAgents);

  const {
    loading: loadingPendingVouchers,
    error: pendingVoucherError,
    data: storeVouchers,
  } = useSelector(({ voucher }) => voucher.storePendingVouchers);

  const activeStore =
    currentStore || history?.location?.state?.storeInfo;

  const onItemClick = item => {
    const encodedUrl = btoa(item?.TransactionID);
    history.push({
      pathname: `/my-stores/pending-vouchers/${encodedUrl}`,
      state: {
        item,
        urlArgument: item.TransactionNumber,
        store: currentStore,
      },
    });
  };
  const panes = [
    {
      menuItem: global.translate('Details', 94),
      render: ({ currentStore, onChangeTab }) => (
        <Tab.Pane>
          <StoreInfoTab
            currentStore={currentStore ?? activeStore}
            onChangeTab={onChangeTab}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item key="'Pending Vouchers'">
          {global.translate('Pending vouchers', 2030)}
          {!loadingPendingVouchers && (
            <Label as={Link} color="orange">
              {storeVouchers?.length ?? 0}
            </Label>
          )}
        </Menu.Item>
      ),
      render: props => {
        const { pendingVouchers } = props;
        return (
          <Segment
            style={{
              padding:
                !loadingPendingVouchers &&
                !pendingVouchers?.data?.length
                  ? 10
                  : 0,
              border: '1px solid #ccc',
              boxShadow: ' none',
            }}
          >
            {!loadingPendingVouchers &&
              pendingVouchers?.data?.length > 0 && (
                <PendingVoucherTable
                  onClick={onItemClick}
                  pendingVoucherData={pendingVouchers?.data}
                />
              )}

            {loadingPendingVouchers && (
              <Image
                style={{ width: '100%' }}
                className="animate-placeholder"
                src={loadTransactions}
              />
            )}

            {!loadingPendingVouchers &&
              !pendingVouchers?.data?.length > 0 && (
                <EmptyCard
                  message={global.translate(
                    'This store has no pending vouchers',
                    2555,
                  )}
                />
              )}
          </Segment>
        );
      },
    },
    {
      menuItem: global.translate('Settings', 1560),
      render: ({
        form,
        onEditChange,
        setStoreStatus,
        deleteStore,
        currentStore,
        deleteStoreData,
        activeSettingTab,
        setActiveSettingTab,
      }) => (
        <Tab.Pane attached={false}>
          <SettingView
            form={form}
            onEditChange={onEditChange}
            setStoreStatus={setStoreStatus}
            currentStore={currentStore}
            deleteStore={deleteStore}
            deleteStoreData={deleteStoreData}
            activeSettingTab={activeSettingTab}
            setActiveSettingTab={setActiveSettingTab}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: global.translate('Agents', 2221),
      render: ({
        form,
        onEditChange,
        isOpenAddAgent,
        setIsOpenAddAgent,
      }) => (
        <Tab.Pane attached={false}>
          <AgentsView
            form={form}
            onEditChange={onEditChange}
            currentStore={currentStore}
            isOpenAddAgent={isOpenAddAgent}
            setIsOpenAddAgent={setIsOpenAddAgent}
          />
        </Tab.Pane>
      ),
    },
  ];

  const tabRef = useRef(null);
  const location = useLocation();
  const queryParams = queryString.parseUrl(window.location.href, {
    parseFragmentIdentifier: true,
  });

  useEffect(() => {
    if (activeTab === 2) {
      if (queryParams.fragmentIdentifier) {
        let activeSettingTabIndex = 0;

        switch (queryParams.fragmentIdentifier) {
          case 'edit':
            activeSettingTabIndex = 0;
            break;
          case 'notifications':
            activeSettingTabIndex = 1;
            break;
          case 'wallets':
            activeSettingTabIndex = 2;
            break;
          case 'general':
            activeSettingTabIndex = 3;
            break;
          default:
            break;
        }

        setActiveSettingTab(activeSettingTabIndex);
      }
    }
  }, [activeTab]);

  const { userData } = useSelector(state => state.user);
  const searchData = useSelector(state => state.contacts.locateUser);
  const dispatch = useDispatch();
  const { data: agentsData, loading: agentsLoading } = useSelector(
    state => state.stores.listStoreAgents,
  );

  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };
  const checkExists = () => {
    let exists = false;
    if (agentsData) {
      agentsData.forEach(element => {
        if (
          element.ContactPID &&
          element.ContactPID.toLowerCase() ===
            form.PID.trim().toLowerCase()
        ) {
          exists = true;
        }
      });
    }
    return exists;
  };
  const onSearchUser = () => {
    if (form.PID && userData.data) {
      if (
        form.PID.trim().toLowerCase() ===
        userData.data.PID.toLowerCase()
      ) {
        setLocalError(
          global.translate('You cannot add your self', 2222),
        );
        return;
      }
      if (checkExists()) {
        setLocalError(
          form.PID.trim() +
            global.translate('is already your agent', 2223),
        );
        return;
      }
      setLocalError(null);
      locateUser({
        PID: form.PID.trim(),
        userPID: userData.data && userData.data.PID,
      })(dispatch)();
    }
  };

  const addAgentFn = () => {
    addStoreAgentAction(form)(dispatch);
  };

  const onTabChange = (e, data = {}) => {
    const { activeIndex = 2 } = data;
    let tab = '';

    switch (activeIndex) {
      case 0:
        tab = 'details';
        break;
      case 1:
        tab = 'pending-voucher';
        break;
      case 2:
        tab = 'settings';
        break;
      case 3:
        tab = 'agents';
        break;
      default:
        break;
    }
    history.push({
      pathname: '/store-details',
      search: `?tab=${tab}`,
      state: { store: currentStore.StoreID },
    });

    setActiveTab(activeIndex);
  };

  React.useEffect(() => {
    if (location.state && location.state.detailTab) {
      onTabChange({}, { activeIndex: location.state.detailTab });
    }
  }, []);
  const onClickHandler = () => history.goBack();

  return (
    <DashboardLayout>
      <WelcomeBar loading={false}>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title">
            {global.translate('Manage: ', 131)}
            {currentStore.StoreName}
          </h2>
          <div className="clear" />
          {activeTab === 3 && (
            <div className="head-buttons">
              <button
                type="button"
                onClick={() => setIsOpenAddAgent(!isOpenAddAgent)}
              >
                {global.translate('Add store agent', 2224)}
              </button>
            </div>
          )}
        </div>
      </WelcomeBar>
      <></>
      {currentStore && (
        <>
          <div className="my-store-container">
            <Tab
              ref={tabRef}
              onTabChange={onTabChange}
              onChangeTab={onTabChange}
              activeIndex={activeTab}
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
              currentStore={currentStore}
              setStoreStatus={setStoreStatus}
              getPendingStoreVouchers={getPendingStoreVouchers}
              onEditChange={onEditChange}
              setForm={setForm}
              deleteStore={deleteStore}
              deleteStoreData={deleteStoreData}
              activeSettingTab={activeSettingTab}
              setActiveSettingTab={setActiveSettingTab}
              isOpenAddAgent={isOpenAddAgent}
              setIsOpenAddAgent={setIsOpenAddAgent}
            />
          </div>
          <NewAgentModal
            open={isOpenAddAgent}
            setOpen={setIsOpenAddAgent}
            onChange={onChange}
            onSearchUser={onSearchUser}
            form={form}
            setForm={setForm}
            onSubmit={addAgentFn}
            searchData={searchData}
            localError={localError}
            setLocalError={setLocalError}
            addNewUserData={addNewUserData}
            currentStore={currentStore}
            addAgentsLoading={addAgentsLoading}
          />
        </>
      )}
    </DashboardLayout>
  );
};

StoreDetailsComponent.propTypes = {
  currentStore: PropTypes.objectOf(PropTypes.any),
  pendingVouchers: PropTypes.objectOf(PropTypes.any),
  onCancelTransactionConfirm: PropTypes.func,
  store: PropTypes.objectOf(PropTypes.any),
  onRejectVoucher: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any),
  setForm: PropTypes.func,
  onEditChange: PropTypes.func,
  getPendingStoreVouchers: PropTypes.func,
  deleteStore: PropTypes.objectOf(PropTypes.any),
  deleteStoreData: PropTypes.objectOf(PropTypes.any),
  setStoreStatus: PropTypes.func,
  activeTab: PropTypes.number,
  setActiveTab: PropTypes.func,
  isOpenAddAgent: PropTypes.bool,
  setIsOpenAddAgent: PropTypes.func,
};

StoreDetailsComponent.defaultProps = {
  currentStore: {},
  pendingVouchers: {},
  deleteStore: {},
  deleteStoreData: {},
  onCancelTransactionConfirm: () => null,
  store: {},
  onRejectVoucher: () => null,
  form: {},
  setForm: () => null,
  onEditChange: () => null,
  getPendingStoreVouchers: () => null,
  setStoreStatus: () => {},
  activeTab: 1,
  setActiveTab: () => {},
  isOpenAddAgent: false,
  setIsOpenAddAgent: () => {},
};
export default StoreDetailsComponent;
