/* eslint-disable no-nested-ternary */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Image, Tab } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import './AccountManagement.scss';

import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import PREVIOUS_ICON from 'assets/images/back.png';
import cameraIcon from 'assets/images/camera-icon.png';
import Thumbnail from 'components/common/Thumbnail';
import VerifiedIcon from 'assets/images/verified.png';
import General from './General';
import EmailPhone from './EmailAndPhone';
import Security from './Security';
import Documents from './Documents';

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
}) => {
  const history = useHistory();
  const imageInputRef = useRef(null);
  const { data } = userData;
  const { profileImage, onImageChange } = profileImageData;

  const panes = [
    {
      menuItem: global.translate('General'),
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
      menuItem: global.translate('Security'),
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
      menuItem: global.translate('Documents'),
      render: () => (
        <Tab.Pane
          className="bottom-tab-pane documents"
          attached={false}
        >
          <Documents userData={userData} documents={documents} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <DashboardLayout>
        <WelcomeBar loading={userData.loading}>
          <span className="lighter">
            Hey <span className="bold">{data && data.FirstName}</span>
            , {global.translate('manage your 2U account')}
          </span>
        </WelcomeBar>
        <Image
          src={PREVIOUS_ICON}
          height={30}
          className="goBack"
          onClick={() => history.goBack()}
        />
        <div className="account-management-container">
          <div className="top-info">
            <div className="avatar-image">
              <Thumbnail
                avatar={profileImage ? profileImage.imageUrl : ''}
                size="medium"
                name={data && data.FirstName}
                secondName={data && data.LastName}
                circular
                className="header_2u_avatar"
                style={{
                  height: '105px',
                  width: '105px',
                  marginRight: 0,
                  objectFit: 'cover',
                }}
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
              <div>
                {data && `${data.FirstName} ${data.LastName}`}{' '}
                {data && data.AccountVerified === 'YES' && (
                  <span title={global.translate('Account verified')}>
                    <Image
                      src={VerifiedIcon}
                      height={15}
                      style={{ display: 'inline' }}
                      width={15}
                      className="user-verified-icon"
                    />
                  </span>
                )}
              </div>
              <div>
                {data &&
                  `+(${data.MainPhonePrefix}) ${data.MainPhoneNumber}`}
              </div>
              <div>{data && data.MainEmail}</div>
            </div>
          </div>
          <div className="bottom-info">
            <Tab
              menu={{ secondary: true, pointing: true }}
              panes={panes}
              activeIndex={activeTabIndex}
              onTabChange={(_, { activeIndex }) =>
                setActiveTabIndex(activeIndex)
              }
              className="bottom-tab"
            />
          </div>
        </div>
      </DashboardLayout>
    </>
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
