import React from 'react';
import PropTypes from 'prop-types';

import { Image } from 'semantic-ui-react';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';
import VoucherWalletImg from 'assets/images/voucher_wallet_img.png';
import MyWallets from './MyWallets';

import './SearchStores.scss';

const SearchStores = ({ userData, searchStores }) => {
  const onClickHandler = () => searchStores.goBack();
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
          <GoBack onClickHandler={onClickHandler} />

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
  userData: PropTypes.objectOf(PropTypes.any),
  searchStores: PropTypes.objectOf(PropTypes.any),
};

SearchStores.defaultProps = {
  userData: null,
  searchStores: {
    goBack: () => true,
  },
};

export default SearchStores;
