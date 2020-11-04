import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Tab, Dropdown, Grid } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import './AccountManagement.scss';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import cameraIcon from 'assets/images/camera-icon.png';
import onlineIcon from 'assets/images/presence/online.png';
import offlineIcon from 'assets/images/presence/offline.png';
import dndIcon from 'assets/images/presence/dnd.png';
import awayIcon from 'assets/images/presence/away.png';
import Thumbnail from 'components/common/Thumbnail';
import VerifiedIcon from 'assets/images/verified.png';
import GoBack from 'components/common/GoBack';
import setUserPresenceText from 'utils/setUserPresenceText';
import {
  ONLINE,
  INVISIBLE,
  AWAY,
  DO_NOT_DISTURB,
} from 'constants/general';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';
import ImageCroper from 'components/common/ImageCroper/CropImage';
import General from './General';
import EmailPhone from './EmailAndPhone';
import Security from './Security';
import Documents from './Documents';
import OtherDoc from './Documents/OtherDoc';

const AccountManagement = ({
  userData,
  activeTabIndex,
  setActiveTabIndex,
  target,
  profileImageData,
  general,
  emailAndPhone,
  securityQuestions,
  changePassword,
  changePIN,
  changeDOB,
  changeGender,
  documents,
  changeUserPresence: { changeUserPresence, loading },
}) => {
  const history = useHistory();
  const imageInputRef = useRef(null);
  const { data } = userData;

  const {
    profileImage,
    onImageChange: uploadImage,
  } = profileImageData;

  const [hasError, setHasError] = useState(false);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();

  const onClickHandler = () => history.goBack();

  const handleSelectFile = () => {
    imageInputRef.current.click();
  };
  const onImageChange = ({ target }) => {
    const { files } = target;
    if (files[0]) {
      setFile(files[0]);
      setOpen(true);
    }
  };

  const onImageUpload = file => {
    uploadImage(file);
    setOpen(false);
  };

  const panes = [
    {
      menuItem: global.translate('General', 293),
      render: () => (
        <Tab.Pane
          className="bottom-tab-pane general"
          attached={false}
        >
          <General userData={userData} general={general} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: `${global.translate(
        'Emails',
        638,
      )} & ${global.translate('Phones', 639)}`,
      render: () => (
        <Tab.Pane
          className="bottom-tab-pane email-phone"
          attached={false}
        >
          <EmailPhone
            userData={userData}
            emailAndPhone={emailAndPhone}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: global.translate('Security', 84),
      render: () => (
        <Tab.Pane
          className="bottom-tab-pane security"
          attached={false}
        >
          <Security
            securityQuestions={securityQuestions}
            changePassword={changePassword}
            changePIN={changePIN}
            changeDOB={changeDOB}
            changeGender={changeGender}
            target={target}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: global.translate('Identity'),
      render: () => (
        <Tab.Pane
          className="bottom-tab-pane documents"
          attached={false}
        >
          <Documents userData={userData} documents={documents} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: global.translate('Other supporting documents'),
      render: () => (
        <Tab.Pane
          className="bottom-tab-pane documents"
          attached={false}
        >
          <OtherDoc userData={userData} documents={documents} />
        </Tab.Pane>
      ),
    },
  ];
  const isCurrentStatus = item => item === data?.PresenceStatus;
  return (
    <DashboardLayout>
      <ImageCroper
        open={open}
        setOpen={setOpen}
        loading={loading}
        file={file}
        uploadImage={onImageUpload}
        chooseImage={handleSelectFile}
      />

      <WelcomeBar loading={userData.loading}>
        <div className="head-content">
          {!isAppDisplayedInWebView() && (
            <div className="go-back">
              <GoBack style onClickHandler={onClickHandler} />
            </div>
          )}
          <h2 className="head-title">
            {global.translate('My Account', 1947)}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className="wrap__container">
        <div className="profile__wrapper">
          <Grid>
            <Grid.Column mobile={16} tablet={16} computer={5}>
              <div className="wallet__card">
                <div className="user__card">
                  <div className="avatar-image">
                    <Thumbnail
                      avatar={
                        profileImage ? profileImage.imageUrl : ''
                      }
                      size="medium"
                      name={data && data.FirstName}
                      secondName={data && data.LastName}
                      circular
                      className="header_2u_avatar"
                      height="100px"
                      width="100px"
                      style={{
                        height: '100px',
                        width: '100px',
                        marginRight: 0,
                        objectFit: 'cover',
                        color: 'white',
                        borderRadius: '50%',
                      }}
                      hasError={hasError}
                      setHasError={setHasError}
                    />
                    <div className="camera-input">
                      <input
                        type="file"
                        accept="image/*"
                        ref={imageInputRef}
                        onChange={onImageChange}
                        style={{ display: 'none' }}
                      />
                      <Image
                        src={cameraIcon}
                        width={18}
                        onClick={() => imageInputRef.current.click()}
                      />
                    </div>
                  </div>
                  <div className="user-info">
                    <h2>
                      {data && `${data.FirstName} ${data.LastName}`}{' '}
                      {data && data.AccountVerified === 'YES' && (
                        <span
                          title={global.translate(
                            'Account verified',
                            1458,
                          )}
                        >
                          <Image
                            src={VerifiedIcon}
                            height={15}
                            style={{ display: 'inline' }}
                            width={15}
                            className="user-verified-icon"
                          />
                        </span>
                      )}
                    </h2>
                    <div>
                      {data &&
                        `+(${data.MainPhonePrefix}) ${data.MainPhoneNumber}`}
                    </div>
                    <div>{data && data.MainEmail}</div>
                    <div className="presence-status">
                      <span>
                        {global.translate(
                          'Your presence status is set to',
                          1668,
                        )}
                      </span>
                      <Dropdown
                        loading={loading}
                        disabled={loading}
                        text={setUserPresenceText(
                          data?.PresenceStatus,
                          true,
                        )}
                        inline
                      >
                        <Dropdown.Menu>
                          <Dropdown.Item
                            inline
                            image={onlineIcon}
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
                            text={global.translate(
                              'Do not disturb',
                              592,
                            )}
                            onClick={() => {
                              changeUserPresence(DO_NOT_DISTURB);
                            }}
                          />
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={11}>
              <div className="wallet__card">
                <Tab
                  menu={{ secondary: true, pointing: true }}
                  panes={panes}
                  activeIndex={activeTabIndex}
                  onTabChange={(_, { activeIndex }) => {
                    let tab = '';

                    switch (activeIndex) {
                      case 0:
                        tab = 'general';
                        break;
                      case 1:
                        tab = 'emails-phones';
                        break;
                      case 2:
                        tab = 'security';
                        break;
                      case 3:
                        tab = 'documents';
                        break;
                      default:
                        break;
                    }

                    history.push(`/account-management?tab=${tab}`);
                    setActiveTabIndex(activeIndex);
                  }}
                />
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    </DashboardLayout>
  );
};

AccountManagement.propTypes = {
  userData: PropTypes.instanceOf(Object),
  activeTabIndex: PropTypes.number,
  setActiveTabIndex: PropTypes.func,
  target: PropTypes.string,
  profileImageData: PropTypes.instanceOf(Object).isRequired,
  general: PropTypes.instanceOf(Object).isRequired,
  emailAndPhone: PropTypes.instanceOf(Object).isRequired,
  securityQuestions: PropTypes.instanceOf(Object).isRequired,
  changePassword: PropTypes.instanceOf(Object).isRequired,
  changePIN: PropTypes.instanceOf(Object).isRequired,
  changeDOB: PropTypes.instanceOf(Object).isRequired,
  changeGender: PropTypes.instanceOf(Object).isRequired,
  documents: PropTypes.instanceOf(Object).isRequired,
  changeUserPresence: PropTypes.instanceOf(Object).isRequired,
};

AccountManagement.defaultProps = {
  userData: {
    data: {},
  },
  activeTabIndex: 0,
  setActiveTabIndex: () => null,
  target: null,
};

export default AccountManagement;
