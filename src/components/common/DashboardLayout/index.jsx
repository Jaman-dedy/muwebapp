import React from 'react';
import './DashboardLayout.scss';
import PropTypes from 'prop-types';

import SideBar from './SideBar/SideBar';
import NavBar from './NavBar/NavBar';

const DashboardLayout = ({ children }) => (
  <div className="dashboard_layout">
    <div className="grid-container">
      <NavBar />
      <SideBar />
      <main className="main">{children}</main>
    </div>
  </div>
);

DashboardLayout.propTypes = {
  children: PropTypes.element.isRequired,
};


export default DashboardLayout;
