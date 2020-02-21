import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dashboard from 'components/Dashboard';
import toggleSideBar from 'redux/actions/dashboard/dashboard';
import getUserInfo from 'redux/actions/users/getUserInfo';

const DashboardContainer = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    getUserInfo()(dispatch);
  }, []);
  const {
    userData,
    currentUser: { authData },
  } = useSelector(({ user }) => user);

  const handleToggleSideBar = () => {
    toggleSideBar(dispatch);
  };
  return (
    <Dashboard
      authData={authData}
      userData={userData}
      handleToggleSideBar={handleToggleSideBar}
    />
  );
};
export default DashboardContainer;
