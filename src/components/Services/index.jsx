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

const MoneyTransfer = ({ userData }) => {
  const history = useHistory();
  const onClickHandler = () => history.goBack();

  return (
    <>
      <DashboardLayout>
        <WelcomeBar>
          <div className="head-content">
            <div className="go-back">
              <GoBack style onClickHandler={onClickHandler} />
            </div>
            <h2 className="head-title">
              <span className="bold">
                {userData.data && userData.data.FirstName}
              </span>
              , {global.translate('enjoy our services', 2020)}
            </h2>
            <div className="clear" />
          </div>
        </WelcomeBar>
        <div className="wrap__container">
          <div className="services">
            <div className="to-u-services">
              <CardComponent
                image={storeIcon}
                title={global.translate('My stores', 848)}
                to="/my-stores"
                subtitle={global.translate(
                  'Find store or create one.', 2021
                )}
              />
              <CardComponent
                image={findServicesIcon}
                to="/peer-services"
                title={global.translate(`Find a service`, 624)}
                subtitle={global.translate(
                  `Find services near you`,
                  1240,
                )}
              />
              <CardComponent
                image={offerServicesIcon}
                to="/user-services/me"
                title={global.translate('Offer a service', 625)}
                subtitle={global.translate(
                  'Offer services to people around you', 1919
                )}
              />
              <CardComponent
                isComingSoon
                image={agricultureIcon}
                title={global.translate('Farmers Corner', 2022)}
                subtitle={global.translate(
                  'Agriculture supply chain', 1920
                )}
              />
              <CardComponent
                isComingSoon
                image={crowdFundingIcon}
                title={global.translate('Crowdfunding', 1012)}
                subtitle={global.translate('Crowdfunding', 1012)}
              />
              <CardComponent
                isComingSoon
                image={microloanIcon}
                title={global.translate('Microloan', 1918)}
                subtitle={global.translate('Microloan', 1918)}
              />
              <CardComponent
                isComingSoon
                image={savingWalletIcon}
                title={global.translate('Saving wallet', 2023)}
                subtitle={global.translate('Saving wallet', 2023)}
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
