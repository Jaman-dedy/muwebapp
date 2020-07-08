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
            , {global.translate('enjoy our services')}
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
              title={global.translate('My stores')}
              to="/my-stores"
              subtitle={global.translate('Find store or create one.')}
            />
            <CardComponent
              isComingSoon
              image={findServicesIcon}
              title="Find a service"
              subtitle="Find services near you"
            />
            <CardComponent
              isComingSoon
              image={offerServicesIcon}
              title={global.translate('Offer a service', 625)}
              subtitle={global.translate(
                'Offer services to people around you',
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
              title={global.translate('Crowdfunding')}
              subtitle={global.translate('Crowdfunding')}
            />
            <CardComponent
              isComingSoon
              image={microloanIcon}
              title={global.translate('Microloan')}
              subtitle={global.translate('Microloan')}
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
