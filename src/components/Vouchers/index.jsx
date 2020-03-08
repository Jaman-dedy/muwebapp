import React, { useEffect, useState } from 'react';

import {
  Image,
  Table,
  Icon,
  Menu,
  Pagination,
} from 'semantic-ui-react';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import backIcon from 'assets/images/back.png';

import './Vouchers.scss';

const Vouchers = ({ userData, history }) => {
  return (
    <DashboardLayout>
      <div className="vouchers">
        <WelcomeBar loading={userData.loading}>
          <span className="lighter">
            <span className="bold">
              {userData.data && userData.data.FirstName}
            </span>
            , send vouchers to your contacts
          </span>
        </WelcomeBar>
      </div>

      <div className="voucher">
        <Image
          className="backButton"
          src={backIcon}
          height={30}
          onClick={() => history.goBack()}
        />
        <div></div>
      </div>
    </DashboardLayout>
  );
};

export default Vouchers;
