/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Thumbnail from 'components/common/Thumbnail';
import logout from 'redux/actions/users/logout';
import VerifiedIcon from 'assets/images/verified.png';
import './ProfileDropdown.scss';
import { CONTACT_PRESENCE_CHANGED } from 'constants/events/userPresence';
import createNotification from 'redux/actions/users/createNotification';
import Img from 'components/common/Img';
import ImageLevel from './ImageLevel';

const ProfileDropdown = ({ profileData }) => {
  const [hasError, setHasError] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    allContacts: { data },
  } = useSelector(state => state.contacts);

  const handleUserLogout = () => {
    localStorage.removeItem('userWasIdle');
    const notificationPayload = {
      PID: data
        ?.filter(item => item.ContactPID)
        .map(item => item.ContactPID),
      type: CONTACT_PRESENCE_CHANGED,
      data: {
        contact: profileData?.PID,
        action: {
          PresenceStatus: '4',
        },
      },
      save: false,
    };

    if (profileData?.PresenceStatus === '0') {
      createNotification(notificationPayload)(dispatch);
    }
    logout()(dispatch);
  };
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
              <Img
                format="png"
                height="15px"
                width="15px"
                style={{ width: '0px', height: '0px' }}
                compress
                src={VerifiedIcon}
                className="top-verified-icon"
                hasError={hasError}
                setHasError={setHasError}
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
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  history.push('/fidelity');
                }}
                className="my-rewards"
              >
                <ImageLevel
                  imageLevelNumber={profileData?.Rewards?.StatusCode}
                />
                <span>
                  {profileData?.Rewards?.StatusText}
                  {',  '}
                  <strong>
                    {profileData?.Rewards?.TotalPoints?.PointsValue}
                  </strong>{' '}
                  points{' '}
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
            onClick={e => {
              handleUserLogout(e);
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
