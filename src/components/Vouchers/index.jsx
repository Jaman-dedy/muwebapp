import React, { useEffect, useState } from 'react';

import {
  Image,
  Table,
  Icon,
  Menu,
  Pagination,
  Tab,
} from 'semantic-ui-react';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import backIcon from 'assets/images/back.png';
import RecentlyContacted from 'components/Vouchers/RecentlyContacted';
import AddBig from 'assets/images/addBig.png';
import SendVoucherModal from './SendVoucherModal';

import './Vouchers.scss';

const Vouchers = ({
  userData,
  history,
  setOpenSendVoucherModalFx,
  openSendVoucherModal,
}) => {
  const panes = [
    {
      menuItem: '2U contacts',
      render: () => (
        <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>
      ),
    },
    {
      menuItem: 'External contacts',
      render: () => (
        <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>
      ),
    },
  ];
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

        <RecentlyContacted />

        <Image
          height={90}
          className="addImage"
          src={AddBig}
          onClick={() => setOpenSendVoucherModalFx()}
        />
        <p className="title">Select contact to send a voucher to</p>

        <div className="tab-block">
          <Tab
            menu={{ secondary: true }}
            panes={panes}
            className="tab"
          />
        </div>

        <SendVoucherModal
          open={openSendVoucherModal}
          setOpen={setOpenSendVoucherModalFx}
        />
      </div>
    </DashboardLayout>
  );
};

export default Vouchers;
