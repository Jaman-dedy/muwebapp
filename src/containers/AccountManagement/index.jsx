/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import AccountManagement from 'components/AccountManagement';
import profileImage from './profileImage';
import personalInfo from './personaInfo';
import securityQuestions from './securityQuestions';
import changePIN from './changePIN';
import documents from './documents';
import changeUserPresence from './changeUserPresence';
import identityConfirmation from './identityConfirmation';
import residenceData from './residenceData';
import userDetails from './userDetails';
import switchAccount from './switchAccount';

const AccountManagementContainer = () => {
  const { userData } = useSelector(({ user }) => user);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  useEffect(() => {
    if (queryParams.target) {
      switch (queryParams.target) {
        case 'DOB':
          setActiveTabIndex(2);
          break;

        case 'SecurityQuestion':
          setActiveTabIndex(2);
          break;
        case 'IdDocs':
          setActiveTabIndex(3);
          break;

        default:
          break;
      }
    }
  }, []);

  useEffect(() => {
    let activeTabIndex = 0;

    switch (queryParams.tab) {
      case 'personalInfo':
        activeTabIndex = 0;
        break;
      case 'emails-phones':
        activeTabIndex = 1;
        break;
      case 'security':
        activeTabIndex = 2;
        break;
      case 'documents':
        activeTabIndex = 3;
        break;

      default:
        break;
    }

    setActiveTabIndex(activeTabIndex);
  }, []);

  return (
    <AccountManagement
      userData={userData}
      activeTabIndex={activeTabIndex}
      setActiveTabIndex={setActiveTabIndex}
      target={queryParams.target || null}
      profileImageData={profileImage()}
      personalInfo={personalInfo()}
      securityQuestions={securityQuestions()}
      changePIN={changePIN()}
      documents={documents()}
      changeUserPresence={changeUserPresence()}
      identityConfirmation={identityConfirmation()}
      residenceData={residenceData()}
      userDetails={userDetails()}
      switchAccount={switchAccount()}
    />
  );
};

export default AccountManagementContainer;
