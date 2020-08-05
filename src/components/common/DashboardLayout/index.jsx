/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './DashboardLayout.scss';
import PropTypes from 'prop-types';

import toggleSidebar from 'redux/actions/dashboard/dashboard';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';
import SideBar from './SideBar/SideBar';
import NavBar from './NavBar/NavBar';

const DashboardLayout = ({
  children,
  openStorePublicity,
  publicityOpen,
  publicityData,
}) => {
  const dispatch = useDispatch();
  const {
    dashboardData: { isSidebarActive },
  } = useSelector(({ dashboard }) => dashboard);

  return (
    <div className="dashboard_layout">
      <div
        onClick={() => {
          if (isSidebarActive) {
            toggleSidebar(dispatch);
          }
        }}
        className="grid-container"
      >
        {isAppDisplayedInWebView() ? null : (
          <>
            <NavBar
              openStorePublicity={openStorePublicity}
              publicityOpen={publicityOpen}
              publicityData={publicityData}
            />
            <SideBar />
          </>
        )}

        <main className="main">{children}</main>
      </div>
    </div>
  );
};
DashboardLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  openStorePublicity: PropTypes.func,
  publicityOpen: PropTypes.bool,
  publicityData: PropTypes.instanceOf(Object),
};

DashboardLayout.defaultProps = {
  openStorePublicity: () => null,
  publicityOpen: false,
  publicityData: {},
};

export default DashboardLayout;
