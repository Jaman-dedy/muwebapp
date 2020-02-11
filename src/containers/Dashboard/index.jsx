import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dashboard from 'components/Dashboard';
import toggleSideBar from 'redux/actions/dashboard/dashboard';

const DashboardContainer = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user);

  const handleToggleSideBar = () => {
    toggleSideBar(dispatch);
  };
  return (
    <Dashboard
      currentUser={currentUser}
      handleToggleSideBar={handleToggleSideBar}
    />
  );
};
export default DashboardContainer;
