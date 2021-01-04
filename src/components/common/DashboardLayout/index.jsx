/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './DashboardLayout.scss';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router';
import toggleSidebar from 'redux/actions/dashboard/dashboard';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';

import useWindowSize from 'utils/useWindowSize';
import SideBar from './SideBar/SideBar';
import NavBar from './NavBar/NavBar';
import Fab from './Fab';

const DashboardLayout = ({
  children,
  openStorePublicity,
  publicityOpen,
  publicityData,
  setTourStep,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    dashboardData: { isSidebarActive },
  } = useSelector(({ dashboard }) => dashboard);

  const { width } = useWindowSize();

  const goToVoucher = () => {
    history.push({
      pathname: '/contacts',
      search: '?ref=send-voucher',
    });
  };
  const goToSendCash = () => {
    history.push({
      pathname: '/contacts',
      search: '?ref=send-cash',
    });
  };
  const goToGetPaid = () => {
    history.push('/get-paid');
  };
  const goToQuickPay = () => {
    history.push('/quick-pay');
  };
  const goToSendMoney = () => {
    history.push({
      pathname: '/contacts',
      search: '?ref=send-money',
    });
  };

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
              setTourStep={setTourStep}
            />
            <SideBar />
          </>
        )}

        <main className="main">
          {children}
          {width < 775 && !isAppDisplayedInWebView() && (
            <Fab
              goToVoucher={goToVoucher}
              goToSendCash={goToSendCash}
              goToGetPaid={goToGetPaid}
              goToQuickPay={goToQuickPay}
              goToSendMoney={goToSendMoney}
            />
          )}
        </main>
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
