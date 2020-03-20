import React, { useEffect, useState } from 'react';

import {
  Image,
  Table,
  Icon,
  Menu,
  Pagination,
  Tab,
} from 'semantic-ui-react';
import Thumbnail from 'components/common/Thumbnail';
import WelcomeBar from 'components/Dashboard/WelcomeSection';

import backIcon from 'assets/images/back.png';
import RecentlyContacted from '../RecentlyContacted/';
import AddBig from 'assets/images/addBig.png';
import VoucherWalletImg from 'assets/images/voucher_wallet_img.png';
import MyWallets from './MyWallets';

import './SearchStores.scss';

const SearchStores = ({
  userData,
  countries,
  form,
  onChange,
  searchStores,
}) => {
  return (
    <>
      <div>
        <div className="vouchers">
          <WelcomeBar loading={userData.loading}>
            <span className="lighter">
              <span className="bold">
                {userData.data && userData.data.FirstName}
              </span>
              , send a voucher.
            </span>
          </WelcomeBar>
        </div>
        <div className="searchStores">
          <Image
            className="backButton"
            src={backIcon}
            height={30}
            onClick={() => searchStores.goBack()}
          />

          <Image
            src={VoucherWalletImg}
            className="voucherWalletImg"
          />
          <div>
            <MyWallets
              myWallets={searchStores.myWallets}
              selectWallet={searchStores.selectWallet}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchStores;
