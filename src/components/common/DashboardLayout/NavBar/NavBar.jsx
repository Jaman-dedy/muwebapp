/* eslint-disable */
import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
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

const NavBar = ({
  openStorePublicity,
  publicityOpen,
  publicityData,
}) => {
  const dispatch = useDispatch();

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

  const openNotifStorePublicity = (open, linkData) => {
    if (open) setStorePublicityData(linkData);
    setStorePublicityOpen(open);
    openStorePublicity(open);
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
        <div className="btns-shortcut">
          <Link to="contacts?add-money">
            <button>{global.translate('Transfer Money', 674)}</button>
          </Link>
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
              <span className="navbar_item_icon">
                <SelectLanguage
                  white
                  hasLabel={false}
                  // position="static"
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
                <Help />
              </span>
            </li>
            <li>
              <OutsideClickHandler
                onOutsideClick={() => {
                  setOpenProfile(false);
                }}
              >
                <span
                  className="avatar-profile navbar_item_icon  cursor-pointer"
                  onClick={() => {
                    closeProfileDropDown(dispatch);
                    setOpenProfile(true);
                  }}
                >
                  {data && (
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
