import React from 'react';
import PropTypes from 'prop-types';

import { Image } from 'semantic-ui-react';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import backIcon from 'assets/images/back.png';
import VoucherWalletImg from 'assets/images/voucher_wallet_img.png';
import MyWallets from './MyWallets';

import './SearchStores.scss';

const SearchStores = ({ userData, searchStores }) => {
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

SearchStores.propTypes = {
  userData: PropTypes.instaceOf(Object),
  searchStores: PropTypes.instaceOf(Object),
};

SearchStores.defaultProps = {
  userData: {},
  searchStores: {
    goBack: () => true,
  },
};

export default SearchStores;
