import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { Tab, Image } from 'semantic-ui-react';

import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';

import getReferreesList from 'redux/actions/contacts/getReferreesList';
import './style.scss';
import UserDetailsPlaceHolder from 'assets/images/profile/load-user-details.svg';
import ProfilePlaceHolder from 'assets/images/profile/load-profile-data.svg';
import LoadReferrals from 'assets/images/profile/load-referrals.svg';
import BusinessInfoTab from './BusinessInfoTab';
import UserProfile from './Profile';
import TransactionLimit from './TransactionLimit';
import ReferralTab from './ReferralTab';
import SecurityTab from './SecurityTab';
import SettingsTab from './SettingsTab';
import PersonalInfoTab from './PersonalInfoTab';
import DocumentTab from './DocumentTab';
import UserDetails from './UserDetails';

const Profile = ({
  userData,
  personalInfo,
  identityConfirmation,
  residenceData,
  userDetails,
  changeUserPresence,
  switchAccount,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const { referreesList } = useSelector(state => state.contacts);
  const [isABusinessAccount, setIsABusinessAccount] = useState(false);
  const onTabChange = (_, { activeIndex }) => {
    setActiveTabIndex(activeIndex);
  };
  useEffect(() => {
    getReferreesList()(dispatch);
  }, []);

  useEffect(() => {
    if (location.state && location.state.detailTab) {
      setActiveTabIndex(location.state.detailTab);
    }
  }, []);

  const onClickHandler = () => history.goBack();
  const handleSwitchAccount = () => {
    setIsABusinessAccount(!isABusinessAccount);
  };
  let businessInfoPane = null;

  if (
    userData &&
    userData?.data &&
    userData?.data?.BusinessAccount === 'YES'
  ) {
    businessInfoPane = {
      menuItem: global.translate('Business info'),
      render: () => (
        <Tab.Pane attached={false}>
          <BusinessInfoTab
            userData={userData?.data}
            switchAccount={switchAccount}
          />
        </Tab.Pane>
      ),
    };
  }
  const panes = [
    {
      menuItem: global.translate('Profile'),
      render: () => (
        <Tab.Pane attached={false}>
          <UserProfile
            isABusinessAccount={isABusinessAccount}
            setIsABusinessAccount={setIsABusinessAccount}
            onClick={handleSwitchAccount}
            userData={userData.data}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: !isABusinessAccount
        ? global.translate('Personal information')
        : global.translate('Business information'),
      render: () => (
        <Tab.Pane attached={false}>
          <PersonalInfoTab
            isABusinessAccount={isABusinessAccount}
            userData={userData.data}
            personalInfo={personalInfo}
            identityConfirmation={identityConfirmation}
            residenceData={residenceData}
          />{' '}
        </Tab.Pane>
      ),
    },
    businessInfoPane,

    {
      menuItem: global.translate('Referrals'),
      render: () => (
        <Tab.Pane attached={false}>
          {referreesList.loading ? (
            <div>
              <Image
                className="animate-placeholder"
                src={LoadReferrals}
              />
            </div>
          ) : (
            <ReferralTab
              userData={userData.data}
              referreesList={referreesList}
            />
          )}
        </Tab.Pane>
      ),
    },
    {
      menuItem: global.translate('Security'),
      render: () => (
        <Tab.Pane attached={false}>
          <SecurityTab />
        </Tab.Pane>
      ),
    },
    {
      menuItem: global.translate('Supporting documents'),
      render: () => (
        <Tab.Pane attached={false}>
          <DocumentTab />
        </Tab.Pane>
      ),
    },
    {
      menuItem: global.translate('Transaction limits'),
      render: () => (
        <Tab.Pane attached={false}>
          <TransactionLimit userData={userData.data} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: global.translate('Settings'),
      render: () => (
        <Tab.Pane attached={false}>
          <SettingsTab switchAccount={switchAccount} />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>

          <h2 className="head-title">
            {global.translate('My Account', 1947)}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className="profile-container">
        {userData?.loading ? (
          <div className="load-user-details">
            {' '}
            <Image
              className="animate-placeholder"
              src={UserDetailsPlaceHolder}
            />
          </div>
        ) : (
          <UserDetails
            userData={userData?.data}
            userDetails={userDetails}
            changeUserPresence={changeUserPresence}
          />
        )}

        <div className="user-info-details">
          {userData.loading ? (
            <div className="load-info-details">
              <Image
                className="animate-placeholder"
                src={ProfilePlaceHolder}
              />
            </div>
          ) : (
            <Tab
              menu={{ secondary: true }}
              activeIndex={activeTabIndex}
              defaultActiveIndex={0}
              panes={panes}
              onTabChange={onTabChange}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

Profile.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any),
  switchAccount: PropTypes.objectOf(PropTypes.any).isRequired,
};
Profile.defaultProps = {
  userData: {},
};

export default Profile;
