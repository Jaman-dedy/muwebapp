import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dashboard from 'components/Dashboard';
import toggleSideBar from 'redux/actions/dashboard/dashboard';

const DashboardContainer = () => {
  const dispatch = useDispatch();
  const {
    userData,
    currentUser: { authData },
  } = useSelector(({ user }) => user);
  const { chatList } = useSelector(state => state.dashboard);
  const handleToggleSideBar = () => {
    toggleSideBar(dispatch);
  };

  return (
    <Dashboard
      authData={authData}
      userData={userData}
      chartList={chatList}
      handleToggleSideBar={handleToggleSideBar}
    />
  );
};
export default DashboardContainer;
