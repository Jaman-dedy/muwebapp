import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

import AccountManagement from 'components/AccountManagement';
import profileImage from './profileImage';
import general from './general';
import emailAndPhone from './emailAndPhone';
import securityQuestions from './securityQuestions';
import changePassword from './changePassword';
import changePIN from './changePIN';
import changeDOB from './changeDOB';
import changeGender from './changeGender';
import documents from './documents';

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

  return (
    <AccountManagement
      userData={userData}
      activeTabIndex={activeTabIndex}
      setActiveTabIndex={setActiveTabIndex}
      target={queryParams.target || null}
      profileImageData={profileImage()}
      general={general()}
      emailAndPhone={emailAndPhone()}
      securityQuestions={securityQuestions()}
      changePassword={changePassword()}
      changePIN={changePIN()}
      changeDOB={changeDOB()}
      changeGender={changeGender()}
      documents={documents()}
    />
  );
};

export default AccountManagementContainer;
