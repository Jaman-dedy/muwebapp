import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import Thumbnail from 'components/common/Thumbnail';
import './ProfileDropdown.scss';

const ProfileDropdown = ({ profileData }) => {
  return (
    <Dropdown
      className="profile-dropdown"
      trigger={
        <Thumbnail
          avatar={profileData && profileData.PictureURL}
          size="small"
          name={profileData && profileData.FirstName}
          secondName={profileData && profileData.LastName}
          circular
          className="header_2u_avatar"
          style={{
            height: '40px',
            width: '40px',
            marginRight: '4px',
          }}
        />
      }
      icon={null}
    >
      <Dropdown.Menu direction="left">
        <Dropdown.Header className="dropdown-header">
          <div className="dropdown-header__content">
            <Thumbnail
              avatar={profileData && profileData.PictureURL}
              size="small"
              name={profileData && profileData.FirstName}
              secondName={profileData && profileData.LastName}
              circular
              className="header_2u_avatar"
              style={{
                height: '60px',
                width: '60px',
                marginRight: '0px',
              }}
            />
            <div className="name">
              {`${profileData &&
                profileData.FirstName} ${profileData &&
                profileData.LastName}`}
            </div>
            <div className="default-wallet">
              <Image
                src={profileData && profileData.CurrencyFlag}
                size="tiny"
                alt={profileData && profileData.currency}
                inline
              />
              <span>{profileData && profileData.DefaultWallet}</span>
            </div>
          </div>
        </Dropdown.Header>
        {[
          {
            label: global.translate('Manage my account', 1269),
            to: '/account-management',
          },
          {
            label: global.translate('Manage my wallets', 142),
            to: '/wallets',
          },
        ].map(({ label, to }) => (
          <Dropdown.Item key={label} className="dropdown-menu__item">
            <Link to={to}>
              <p>{label}</p>
            </Link>
          </Dropdown.Item>
        ))}
        <Dropdown.Item className="dropdown-menu__item">
          <Link
            to="/login"
            onClick={async () => {
              localStorage.token = '';
              localStorage.refresh_token = '';
              return window.location.replace('/');
            }}
          >
            <p>{global.translate('Log out')}</p>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item className="dropdown-footer">
          <div>
            <span>{global.translate('Terms and Conditions')}</span>
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

ProfileDropdown.defaultProps = {
  profileData: {},
};

ProfileDropdown.propTypes = {
  profileData: PropTypes.instanceOf(Object),
};

export default ProfileDropdown;
