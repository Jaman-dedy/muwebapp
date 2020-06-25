import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dropdown, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Thumbnail from 'components/common/Thumbnail';
import logout from 'redux/actions/users/logout.js';
import Myrewards from 'assets/images/my-reward.png';
import VerifiedIcon from 'assets/images/verified.png';
import './ProfileDropdown.scss';

const ProfileDropdown = ({ profileData }) => {
  const dispatch = useDispatch();
  return (
    <>
      <Dropdown
        loading
        className="profile-dropdown"
        trigger={
          <>
            <Thumbnail
              avatar={profileData && profileData.PictureURL}
              size="small"
              name={profileData && profileData.FirstName}
              secondName={profileData && profileData.LastName}
              circular
              className="header_2u_avatar"
              style={{
                height: '50px',
                width: '50px',
                marginRight: '4px',
                borderRadius: '50%',
              }}
            />

            {profileData && profileData.AccountVerified === 'YES' && (
              <Image
                src={VerifiedIcon}
                height={15}
                width={15}
                className="top-verified-icon"
              />
            )}
          </>
        }
        icon={null}
      >
        <Dropdown.Menu direction="left">
          <Dropdown.Header className="dropdown-header">
            <div
              className="dropdown-header__content"
              title={global.translate('My Profile')}
            >
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
              {profileData && profileData.AccountVerified === 'YES' && (
                <div
                  className="verified-icon"
                  title={global.translate('Account verified')}
                >
                  <Image src={VerifiedIcon} width={14} />
                </div>
              )}
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
                <span>
                  {profileData && profileData.DefaultWallet}
                </span>
              </div>
              <div className="my-rewards">
                <Image src={Myrewards} height={20} />
                <span>
                  Explorer <strong>890</strong> points{' '}
                </span>
              </div>
            </div>
          </Dropdown.Header>
          {[
            {
              label: global.translate('My profile', 83),
              to: '/account-management',
            },
            {
              label: global.translate('Manage my wallets', 142),
              to: '/wallets',
            },
            {
              label: global.translate('2U and I', 1316),
              to: '/fidelity',
            },
          ].map(({ label, to }) => (
            <Dropdown.Item
              key={label}
              className="dropdown-menu__item"
            >
              <Link to={to}>
                <p>{label}</p>
              </Link>
            </Dropdown.Item>
          ))}
          <Dropdown.Item
            className="dropdown-menu__item"
            onClick={() => {
              localStorage.removeItem('userWasIdle');
              logout()(dispatch);
            }}
          >
            <p>{global.translate('Log out')}</p>
          </Dropdown.Item>
          <Dropdown.Item className="dropdown-footer">
            <div>
              <span>{global.translate('Terms and Conditions')}</span>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {/* <div className="top-verified-icon">
        <Image src={VerifiedIcon} width={10} />
      </div> */}
    </>
  );
};

ProfileDropdown.defaultProps = {
  profileData: {},
};

ProfileDropdown.propTypes = {
  profileData: PropTypes.instanceOf(Object),
};

export default ProfileDropdown;
