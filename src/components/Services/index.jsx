/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import findServicesIcon from 'assets/images/ServFindIcon.svg';
import microloanIcon from 'assets/images/ServLoanIcon.svg';
import offerServicesIcon from 'assets/images/ServOfferIcon.svg';
import agricultureIcon from 'assets/images/ServFarmIcon.svg';
import crowdFundingIcon from 'assets/images/ServFundingIcon.svg';
import storeIcon from 'assets/images/ServShopIcon.svg';
import savingWalletIcon from 'assets/images/DashWalletIcon.svg';
import CardComponent from 'components/common/BottomMenu/Card';
import GoBack from 'components/common/GoBack';
import { Global } from 'recharts';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';

const MoneyTransfer = ({ userData }) => {
  const history = useHistory();
  const onClickHandler = () => history.goBack();

  return (
    <>
      <DashboardLayout>
        {!isAppDisplayedInWebView() && (
          <WelcomeBar>
            <div className="head-content">
              <div className="go-back">
                <GoBack style onClickHandler={onClickHandler} />
              </div>
              <h2 className="head-title">
                <span className="bold">
                  {userData.data && userData.data?.FirstName}
                </span>
                , {global.translate('enjoy our services', 2020)}
              </h2>
              <div className="clear" />
            </div>
          </WelcomeBar>
        )}
        <div className="wrap__container">
          <div className="services">
            <div className="to-u-services">
              <CardComponent
                image={storeIcon}
                title={global.translate('My stores', 848)}
                to="/my-stores"
                subtitle={global.translate(
                  'Find store or create one.',
                  2021,
                )}
              />
              <CardComponent
                image={findServicesIcon}
                to="/marketplace"
                title={global.translate(`Marketplace`)}
                subtitle={global.translate(
                  `Buy or sell any product or services`,
                  2181,
                )}
              />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

MoneyTransfer.propTypes = {
  userData: PropTypes.instanceOf(Object),
};

MoneyTransfer.defaultProps = {
  userData: {
    data: {},
  },
};
export default MoneyTransfer;
