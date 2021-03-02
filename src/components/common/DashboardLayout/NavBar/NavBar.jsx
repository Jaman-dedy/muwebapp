/* eslint-disable */
import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import SelectLanguage from 'components/common/SelectLanguage';
import StorePublicity from 'components/common/DashboardLayout/StorePublicity';
import './NavBar.scss';
import toggleSideBar, {
  closeProfileDropDown,
} from 'redux/actions/dashboard/dashboard';
import { openChatList } from 'redux/actions/chat/globalchat';
import ProfileDropdown from '../ProfileDropdwn';
import Help from '../HelpDropDown';
import Notifications from '../NotificationDropdown';
import Trigger from '../Messages/Trigger';
import OutsideClickHandler from 'react-outside-click-handler';
import GButton from './GButton';
import {
  setIsendingCash,
  setIsSendingMoney,
} from 'redux/actions/dashboard/dashboard';
import isAuth from 'utils/isAuth';

const NavBar = ({
  openStorePublicity,
  publicityOpen,
  publicityData,
  setTourStep,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isSidebarActive } = useSelector(
    ({ dashboard }) => dashboard.dashboardData,
  );

  const { open } = useSelector(
    ({ dashboard }) => dashboard.profileDropDown,
  );

  const {
    userData: { data },
    notifications,
  } = useSelector(state => state.user);

  const [storePublicityOpen, setStorePublicityOpen] = useState(false);
  const [storePublicityData, setStorePublicityData] = useState({});
  const [openProfile, setOpenProfile] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);

  const openNotifStorePublicity = (open, linkData) => {
    if (open) setStorePublicityData(linkData);
    setStorePublicityOpen(open);
    openStorePublicity(open);
  };

  const goToSendMoney = () => {
    history.push('/contacts');
    setIsSendingMoney(dispatch);
  };
  const goToQuickPay = () => {
    history.push('/quick-pay');
  };
  const goToGetPaid = () => {
    history.push('/get-paid');
  };
  const goToSendCash = () => {
    history.push('/contacts');
    setIsendingCash(dispatch);
  };
  const goToSendVoucher = () => {
    history.push({
      pathname: '/contacts',
      search: '?ref=send-voucher',
    });
  };
  const goToWithDrawMoney = () => {
    history.push('/withdraw-money');
  };
  return (
    <>
      <header
        className="app-header"
        onClick={() => {
          if (open) {
            closeProfileDropDown(dispatch);
          }
        }}
      >
        <div className="btns-shortcut ">
          <GButton
            goToSendMoney={goToSendMoney}
            goToQuickPay={goToQuickPay}
            goToGetPaid={goToGetPaid}
            goToSendCash={goToSendCash}
            goToSendVoucher={goToSendVoucher}
            goToWithDrawMoney={goToWithDrawMoney}
          />
        </div>
        <div className="btns-header-actions">
          <ul>
            <li>
              <StorePublicity
                open={publicityOpen || storePublicityOpen}
                setOpen={openNotifStorePublicity}
                publicityData={
                  Object.keys(publicityData).length
                    ? publicityData
                    : storePublicityData
                }
              />
            </li>
            <li>
              <button
                type="button"
                className="menu-icon cursor-pointer no-border no-outline transparent"
                onClick={() => toggleSideBar(dispatch)}
              >
                <Icon name="bars" size="big" />
              </button>
            </li>
            <li>
              <span className="navbar_item_icon cursor-pointer">
                <Trigger
                  onClick={() => {
                    openChatList()(dispatch);
                  }}
                />
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  setOpenLanguage(false);
                }}
                className="navbar_item_icon"
              >
                <SelectLanguage
                  white
                  hasLabel={false}
                  setOpen={setOpenLanguage}
                  open={openLanguage}
                />
              </span>
            </li>
            <li>
              <span className="notification navbar_item_icon cursor-pointer">
                <Notifications
                  openStorePublicity={openNotifStorePublicity}
                  notifications={notifications}
                />
              </span>
            </li>
            <li>
              <span className="notification navbar_item_icon">
                <Help setTourStep={setTourStep} />
              </span>
            </li>
            <li>
              <OutsideClickHandler
                onOutsideClick={() => {
                  setOpenProfile(false);
                }}
              >
                <span
                  className=" navbar_item_icon  cursor-pointer"
                  onClick={() => {
                    closeProfileDropDown(dispatch);
                    if (!openProfile) {
                      setOpenProfile(true);
                    } else {
                      setOpenProfile(false);
                    }
                  }}
                >
                  {isAuth() && (
                    <ProfileDropdown
                      setOpenProfile={setOpenProfile}
                      openProfile={openProfile}
                      profileData={data}
                    />
                  )}
                </span>
              </OutsideClickHandler>
            </li>
          </ul>
        </div>
      </header>
      <button
        onClick={() => toggleSideBar(dispatch)}
        label="dark-layer"
        className={`${isSidebarActive ? 'darken-side' : 'hide'}`}
        type="button"
      />
    </>
  );
};

NavBar.propTypes = {
  openStorePublicity: PropTypes.func,
  publicityOpen: PropTypes.bool,
  publicityData: PropTypes.instanceOf(Object),
};

NavBar.defaultProps = {
  openStorePublicity: () => null,
  publicityOpen: false,
  publicityData: {},
};

export default NavBar;
