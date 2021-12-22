/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import StoreDetailsComponent from 'components/Stores/StoreDetailsComponent';
import getMyStoresAction from 'redux/actions/stores/getMyStores';
import getPendingVouchers from 'redux/actions/vouchers/getPendingVouchers';
import listStoreAgents from 'redux/actions/stores/listStoreAgents';
import cancelStoreVoucher from 'redux/actions/vouchers/cancelStoreVoucher';
import setStoreStatus, {
  clearStoreStatus,
} from 'redux/actions/stores/setStoreStatus';
import deleteStore, {
  clearDeleteStore,
} from 'redux/actions/stores/deleteStore';

const StoreDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const queryParams = queryString.parse(location.search);
  const {
    userData,
    myStores,
    deleteStore: deleteStoreData,
  } = useSelector(({ user }) => user);

  const setStoreStatusStore = useSelector(
    state => state.user.setStoreStatus,
  );
  const { storePendingVouchers, rejectStoreVoucher } = useSelector(
    state => state.voucher,
  );

  const [currentStore, setCurrentStore] = useState({});
  const [activeTab, setActiveTab] = useState(0);

  const storeId = location?.state?.store;

  useEffect(() => {
    if (deleteStoreData.data) {
      toast.success(global.translate('Store deleted', 987));
      history.replace('/my-stores');
      clearDeleteStore()(dispatch);
    }
  }, [deleteStoreData]);

  useEffect(() => {
    if (storeId && myStores.storeList.length) {
      const store = myStores.storeList.find(
        item => item.StoreID === storeId,
      );

      setCurrentStore(store);
    }
  }, [myStores, storeId]);

  const getVoucherTransactions = () => {
    getPendingVouchers({ StoreID: storeId })(dispatch);
  };

  const getStoreAgentsFn = () => {
    listStoreAgents({ StoreID: storeId })(dispatch);
  };

  const deleteMyStore = storedId => {
    deleteStore({ StoreID: storedId })(dispatch);
  };

  const { data, error, loading } = setStoreStatusStore;
  useEffect(() => {
    if (!loading && data) {
      toast.success(global.translate(data[0].Description));
      clearStoreStatus()(dispatch);
    }

    if (!loading && error) {
      if (!Array.isArray(error.error)) {
        toast.error(global.translate(error.error.error));
      } else {
        toast.error(global.translate(error.error[0].Description));
      }
      clearStoreStatus()(dispatch);
    }
  }, [setStoreStatusStore]);

  const [form, setForm] = useState({});
  const onChange = (e, { name, checked }) => {
    setForm({ ...form, [name]: checked });
  };

  useEffect(() => {
    const data = {
      Status: form.storeAvailable ? 'OFF' : 'ON',
      StoreID: currentStore.StoreID,
    };
    if (typeof form.storeAvailable === 'boolean') {
      setStoreStatus(data)(dispatch);
    }
  }, [form]);

  useEffect(() => {
    if (storeId) {
      getVoucherTransactions();
      getStoreAgentsFn();
    }
  }, [storeId]);
  const onRejectVoucher = ({ item, PIN }) => {
    const body = {
      PIN,
      StoreID: item.StoreSID,
      TransactionID: item.TransactionID,
    };
    cancelStoreVoucher(body)(dispatch);
  };

  const fetchStores = () => {
    if (myStores.storeList.length === 0) {
      getMyStoresAction()(dispatch);
    }
  };
  useEffect(() => {
    fetchStores();
  }, []);

  useEffect(() => {
    let activeTabIndex = 0;

    switch (queryParams.tab) {
      case 'details':
        activeTabIndex = 0;
        break;
      case 'pending-voucher':
        activeTabIndex = 1;
        break;
      case 'settings':
        activeTabIndex = 2;
        break;
      case 'agents':
        activeTabIndex = 3;
        break;
      default:
        break;
    }
    setActiveTab(activeTabIndex);
  }, [queryParams.tab]);

  return (
    <StoreDetailsComponent
      userData={userData}
      myStores={myStores}
      pendingVouchers={storePendingVouchers}
      getPendingStoreVouchers={getVoucherTransactions}
      onRejectVoucher={onRejectVoucher}
      rejectStoreVoucher={rejectStoreVoucher}
      onEditChange={onChange}
      form={form}
      deleteStoreData={deleteStoreData}
      currentStore={currentStore}
      setForm={setForm}
      deleteStore={deleteMyStore}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  );
};

export default StoreDetails;
