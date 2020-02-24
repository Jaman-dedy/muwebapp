import React from 'react';
import './DashboardLayout.scss';
import PropTypes from 'prop-types';

import SideBar from './SideBar/SideBar';
import NavBar from './NavBar/NavBar';

const DashboardLayout = ({ children, welcomeMessage }) => (
  <div className="dashboard_layout">
    <div className="grid-container">
      <NavBar />
      <SideBar />
      <main className="main">
        <div className="xlarge-h-padding white welcome flex flex-center  align-items-center large-text">
          <span className="lighter">{welcomeMessage}</span>
        </div>
        {children}
      </main>
    </div>
  </div>
);

DashboardLayout.propTypes = {
  children: PropTypes.element.isRequired,
  welcomeMessage: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
};

DashboardLayout.defaultProps = {
  welcomeMessage: 'Welcome to 2U',
};

export default DashboardLayout;
