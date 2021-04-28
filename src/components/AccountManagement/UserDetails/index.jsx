import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Image, Dropdown } from 'semantic-ui-react';

import UploadImg from 'assets/images/profile/upload-img.svg';
import ShareImg from 'assets/images/profile/share-img.svg';
import './style.scss';
import formatNumber from 'utils/formatNumber';
import UploadImgButton from 'components/common/UploadImgButton';
import validateImg from 'helpers/image/validateImg';
import Thumbnail from 'components/common/Thumbnail';
import onlineIcon from 'assets/images/presence/online.svg';
import offlineIcon from 'assets/images/presence/offline.svg';
import dndIcon from 'assets/images/presence/dnd.svg';
import awayIcon from 'assets/images/presence/away.svg';
import setUserPresenceText from 'utils/setUserPresenceText';

import {
  ONLINE,
  INVISIBLE,
  AWAY,
  DO_NOT_DISTURB,
} from 'constants/general';

const UserDetails = ({
  userData,
  userDetails,
  changeUserPresence: { changeUserPresence, loading },
}) => {
  const [isImgCorrect, setIsImgCorrect] = useState(false);
  const { onImageChange, userIdUrlData, uploadingImg } = userDetails;
  const [hasError, setHasError] = useState(false);
  const { language: { preferred } = {} } = useSelector(
    ({ user }) => user,
  );

  const { data } = useSelector(({ user }) => user?.userData);

  const defaultWallet = userData?.Wallets.find(
    wallet => wallet.Default === 'YES',
  );

  useEffect(() => {
    if (userData?.PictureURL) {
      validateImg(userData?.PictureURL).then(
        function fulfilled(img) {
          setIsImgCorrect(true);
        },

        function rejected() {
          setIsImgCorrect(false);
        },
      );
    }
  }, [userData]);

  const isCurrentStatus = item => item === data?.PresenceStatus;
  const getStatusIcon = status => {
    if (status === '0') return onlineIcon;
    if (status === '1') return awayIcon;
    if (status === '2') return dndIcon;
    return offlineIcon;
  };

  return (
    <div className="user-details">
      <div>
        <div>
          <div className="upload-images">
            <Thumbnail
              avatar={
                userIdUrlData?.MediaSourceURL || userData?.PictureURL
              }
              size="medium"
              height="100px"
              width="100px"
              name={userData && userData.FirstName}
              secondName={userData && userData.LastName}
              circular
              hasError={hasError}
              setHasError={setHasError}
              className="header_2u_avatar"
              style={{
                height: '91px',
                width: '100px',
                marginRight: 0,
                objectFit: 'cover',
                color: 'white',
              }}
            />
            <UploadImgButton
              name="UserProofOfAddressURL"
              onChooseFile={onImageChange}
              img
              src={UploadImg}
              circular
              loading={uploadingImg}
            />
          </div>

          <h3>
            {userData?.FirstName}&nbsp;{userData?.LastName}
          </h3>
          {userData?.AccountVerified === 'YES' ? (
            <div className="verified-user">
              {global.translate('Verified')}
            </div>
          ) : null}
          <div className="list-items">
            <div className="user-contact">
              {userData?.MainPhone && `+${userData?.MainPhone}`}
              {userData?.MainPhone && <Image src={ShareImg} />}
            </div>
            <div className="user-contact">
              {userData?.MainEmail}
              {userData?.MainEmail && <Image src={ShareImg} />}
            </div>
          </div>
        </div>
      </div>
      <div className="list-items">
        <div>{global.translate('Default wallet balance')}</div>
        <div className="title-display">
          {formatNumber(defaultWallet?.Balance, {
            locales: preferred,
          })}
          {defaultWallet?.CurrencyCode}
        </div>
      </div>
      <div className="list-items">
        <div>{global.translate('Unique ID')}</div>
        <div className="title-display">{userData?.BankUnikID}</div>
      </div>

      <div className="presence-status">
        <span>
          {global.translate('Your presence status is set to', 1668)}
        </span>
        <div className="flex flex-row align-items-center">
          <div style={{ marginRight: '5px' }}>
            <Image
              height={15}
              width={15}
              src={getStatusIcon(userData?.PresenceStatus)}
            />
          </div>
          <Dropdown
            loading={loading}
            disabled={loading}
            text={setUserPresenceText(userData?.PresenceStatus, true)}
            inline
          >
            <Dropdown.Menu className="presence-status_menu">
              <Dropdown.Item
                inline
                image={onlineIcon}
                className="presence-status_menu_item"
                selected={isCurrentStatus(ONLINE)}
                text={global.translate('Online', 590)}
                onClick={() => {
                  changeUserPresence(ONLINE);
                }}
              />

              <Dropdown.Item
                image={offlineIcon}
                selected={isCurrentStatus(INVISIBLE)}
                text={global.translate('Invisible', 593)}
                onClick={() => {
                  changeUserPresence(INVISIBLE);
                }}
              />
              <Dropdown.Item
                image={awayIcon}
                selected={isCurrentStatus(AWAY)}
                text={global.translate('Away', 591)}
                onClick={() => {
                  changeUserPresence(AWAY);
                }}
              />

              <Dropdown.Item
                image={dndIcon}
                selected={isCurrentStatus(DO_NOT_DISTURB)}
                text={global.translate('Do not disturb', 592)}
                onClick={() => {
                  changeUserPresence(DO_NOT_DISTURB);
                }}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

UserDetails.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any),
  userDetails: PropTypes.objectOf(PropTypes.any),
  changeUserPresence: PropTypes.instanceOf(Object).isRequired,
};
UserDetails.defaultProps = {
  userData: {},
  userDetails: {},
};

export default UserDetails;
