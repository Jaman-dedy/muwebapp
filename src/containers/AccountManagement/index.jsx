/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import AccountManagement from 'components/AccountManagement';

import profileImage from './profileImage';
import personalInfo from './personaInfo';
import changePIN from './changePIN';
import documents from './documents';
import changeUserPresence from './changeUserPresence';
import identityConfirmation from './identityConfirmation';
import residenceData from './residenceData';
import userDetails from './userDetails';
import switchAccount from './switchAccount';
import supportingDocuments from './supportingDocuments';

const AccountManagementContainer = () => {
  const { userData } = useSelector(({ user }) => user);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  useEffect(() => {
    let activeTabIndex = 0;

    switch (queryParams.tab) {
      case 'personalInfo':
        activeTabIndex = 1;
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
      changePIN={changePIN()}
      documents={documents()}
      changeUserPresence={changeUserPresence()}
      identityConfirmation={identityConfirmation()}
      residenceData={residenceData()}
      userDetails={userDetails()}
      switchAccount={switchAccount()}
      supportingDocuments={supportingDocuments()}
    />
  );
};

export default AccountManagementContainer;
