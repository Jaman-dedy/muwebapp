import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import SelectLanguage from 'components/common/SelectLanguage';
import StorePublicity from 'components/common/DashboardLayout/StorePublicity';
import './NavBar.scss';
import toggleSideBar from 'redux/actions/dashboard/dashboard';
import { openChatList } from 'redux/actions/chat/globalchat';
import ProfileDropdown from '../ProfileDropdwn';
import Nofications from '../NotificationDropdown';
import Trigger from '../Messages/Trigger';

const NavBar = ({
  openStorePublicity,
  publicityOpen,
  publicityData,
}) => {
  const dispatch = useDispatch();

  const { isSidebarActive } = useSelector(
    ({ dashboard }) => dashboard.dashboardData,
  );

  const {
    userData: { data },
    notifications,
  } = useSelector(state => state.user);

  const [storePublicityOpen, setStorePublicityOpen] = useState(false);
  const [storePublicityData, setStorePublicityData] = useState({});

  const openNotifStorePublicity = (open, linkData) => {
    if (open) setStorePublicityData(linkData);
    setStorePublicityOpen(open);
    openStorePublicity(open);
  };

  return (
    <>
      <header className="app-header large-v-padding">
        <StorePublicity
          open={publicityOpen || storePublicityOpen}
          setOpen={openNotifStorePublicity}
          publicityData={
            Object.keys(publicityData).length
              ? publicityData
              : storePublicityData
          }
        />
        <button
          type="button"
          className="menu-icon cursor-pointer no-border no-outline transparent"
          onClick={() => toggleSideBar(dispatch)}
        >
          <Icon name="bars" size="big" />
        </button>
        <span className="navbar_item_icon cursor-pointer">
          <Trigger
            onClick={() => {
              openChatList()(dispatch);
            }}
          />
        </span>
        <span className="navbar_item_icon">
          <SelectLanguage white hasLabel={false} position="static" />
        </span>
        <span className="notification navbar_item_icon">
          <Nofications
            openStorePublicity={openNotifStorePublicity}
            notifications={notifications}
          />
        </span>
        <span className="header__avatar navbar_item_icon">
          {data && <ProfileDropdown profileData={data} />}
        </span>
      </header>
      <button
        onClick={() => toggleSideBar(dispatch)}
        label="dark-layer"
        className={`${isSidebarActive ? 'darken-side' : ''}`}
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
