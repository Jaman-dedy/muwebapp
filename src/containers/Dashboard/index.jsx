import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Dashboard from 'components/Dashboard';
import toggleSideBar from 'redux/actions/dashboard/dashboard';
import getFavoritesList from 'redux/actions/contacts/getFavoritesList';
import getWalletTransactions from 'redux/actions/transactions/getWalletTransactions';
import updatePasswordAction from 'redux/actions/userAccountManagement/updatePassword';

const DashboardContainer = () => {
  const dispatch = useDispatch();
  const {
    userData,
    currentUser: { authData },
  } = useSelector(({ user }) => user);
  const {
    updatePassword: {
      loading: loadSetPwd,
      success: setPwdSuccess,
      error: setPwdError,
    },
  } = useSelector(
    ({ userAccountManagement }) => userAccountManagement,
  );

  const { chatList } = useSelector(state => state.dashboard);
  const handleToggleSideBar = () => {
    toggleSideBar(dispatch);
  };
  const [form, setForm] = useState({
    password: '',
  });
  const [openSetPasswordModal, setOpenSetPasswordModal] = useState(
    false,
  );

  const onInputChange = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const { favoriteContacts } = useSelector(
    ({ contacts }) => contacts,
  );

  const getFavorites = () => {
    getFavoritesList()(dispatch);
  };

  useEffect(() => {
    if (!favoriteContacts.data) {
      getFavorites();
    }
  }, []);

  const { walletTransactions } = useSelector(
    ({ transactions }) => transactions,
  );

  useEffect(() => {
    if (!walletTransactions.data) {
      getWalletTransactions({
        WalletNumber: '',
        PageNumber: '1',
        RecordPerPage: '7',
        DateFrom: moment()
          .subtract(12, 'months')
          .format('YYYY-MM-DD'),
        DateTo: moment().format('YYYY-MM-DD'),
        Proxy: 'Yes',
      })(dispatch);
    }
  }, []);

  useEffect(() => {
    if (setPwdSuccess || setPwdError) {
      setOpenSetPasswordModal(false);
    }
  }, [setPwdSuccess, setPwdError]);

  const handleSetPassword = () => {
    const data = {
      NewPwd: form?.password,
      OTP: authData?.OTP,
    };
    updatePasswordAction(data)(dispatch);
  };

  return (
    <Dashboard
      authData={authData}
      userData={userData}
      chartList={chatList}
      handleToggleSideBar={handleToggleSideBar}
      favoriteContacts={favoriteContacts?.data}
      loadingFavoriteContacts={favoriteContacts.loading}
      getTransactions={walletTransactions?.data}
      loadingTransaction={walletTransactions.loading}
      form={form}
      onInputChange={onInputChange}
      handleSetPassword={handleSetPassword}
      loadSetPwd={loadSetPwd}
      openSetPasswordModal={openSetPasswordModal}
      setOpenSetPasswordModal={setOpenSetPasswordModal}
    />
  );
};
export default DashboardContainer;
