import React from 'react';
import './DashboardLayout.scss';
import PropTypes from 'prop-types';

import SideBar from './SideBar/SideBar';
import NavBar from './NavBar/NavBar';

const DashboardLayout = ({
  children,
  openStorePublicity,
  publicityOpen,
  publicityData,
}) => {
  return (
    <div className="dashboard_layout">
      <div className="grid-container">
        <NavBar
          openStorePublicity={openStorePublicity}
          publicityOpen={publicityOpen}
          publicityData={publicityData}
        />
        <SideBar />
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
