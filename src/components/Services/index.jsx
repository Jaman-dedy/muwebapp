/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';

import servicesImage from 'assets/images/services-image.png';

import findServicesIcon from 'assets/images/find-service.png';
import microloanIcon from 'assets/images/loan.svg';
import savingWalletIcon from 'assets/images/bank.svg';
import offerServicesIcon from 'assets/images/support.svg';
import agricultureIcon from 'assets/images/agriculture.svg';
import crowdFundingIcon from 'assets/images/crowdfunding.svg';
import storeIcon from 'assets/images/store-icon.png';
import CardComponent from 'components/common/BottomMenu/Card';
import GoBack from 'components/common/GoBack';
import useWindowSize from 'utils/useWindowSize';

const MoneyTransfer = ({ userData }) => {
  const history = useHistory();
  const onClickHandler = () => history.goBack();
  const { width } = useWindowSize();

  return (
    <>
      <DashboardLayout>
        <WelcomeBar>
          <span className="lighter">
            &nbsp;&nbsp;
            {width < 600 && <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}
            <span className="bold">
              {userData.data && userData.data.FirstName}
            </span>
            ,{global.translate('Services', 1754)}
          </span>
        </WelcomeBar>
        <GoBack onClickHandler={onClickHandler} />

        <div className="add-money-container">
          <div>
            <Image src={servicesImage} size="medium" centered />
          </div>
        </div>

        <div className="services">
          <p className="sub-title">
            {global.translate('Our Services', 1224)}
          </p>
          <div className="to-u-services">
            <CardComponent
              image={storeIcon}
              title={global.translate('My stores', 848)}
              to="/my-stores"
              subtitle={global.translate('Find store or create one.')}
            />
            <CardComponent
              isComingSoon
              image={findServicesIcon}
              title={global.translate('Find a service', 624)}
              subtitle={global.translate(
                'Find services near you',
                1240,
              )}
            />
            <CardComponent
              isComingSoon
              image={offerServicesIcon}
              title={global.translate('Offer a service', 625)}
              subtitle={global.translate(
                'Offer services to people around you',
                1241,
              )}
            />
            <CardComponent
              isComingSoon
              image={agricultureIcon}
              title={global.translate('Farmers Corner', 625)}
              subtitle={global.translate('Agriculture supply chain')}
            />
            <CardComponent
              isComingSoon
              image={crowdFundingIcon}
              title={global.translate('Crowdfunding', 108)}
              subtitle={global.translate('Crowdfunding', 108)}
            />
            <CardComponent
              isComingSoon
              image={microloanIcon}
              title={global.translate('Microloan', 66)}
              subtitle={global.translate('Microloan', 66)}
            />
            <CardComponent
              isComingSoon
              image={savingWalletIcon}
              title={global.translate('Saving wallet')}
              subtitle={global.translate('Saving wallet')}
            />
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
