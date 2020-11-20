import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import './Fidelity.scss';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';
import MyReferrals from './MyReferrals';
import MyRewards from './MyRewards';
import TransacOverview from './TransacOverview';

const Fidelity = ({
  userData,
  activeTabIndex,
  setActiveTabIndex,
  referrals,
  transactionOverview,
}) => {
  const history = useHistory();
  const { referreesList } = referrals;
  const onClickHandler = () => history.goBack();

  const panes = [
    {
      menuItem: global.translate('My rewards', 1990),
      render: () => (
        <Tab.Pane
          className="bottom-tab-pane rewards"
          attached={false}
        >
          <MyRewards userData={userData} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: global.translate('Transactions overview', 1771),
      render: () => (
        <Tab.Pane
          className="bottom-tab-pane transactions-overview"
          attached={false}
        >
          <TransacOverview
            userData={userData}
            transactionOverview={transactionOverview}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: `${global.translate('My referral List', 1988)}`,
      render: () => (
        <Tab.Pane
          className="bottom-tab-pane referral-contacts"
          attached={false}
        >
          <MyReferrals
            userData={userData}
            referrals={referreesList}
          />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <DashboardLayout>
        <WelcomeBar loading={userData.loading}>
          <div className="head-content">
            {!isAppDisplayedInWebView() && (
              <div className="go-back">
                <GoBack style onClickHandler={onClickHandler} />
              </div>
            )}
            <h2 className="head-title">
              {global.translate('Fidelity', 1989)}
            </h2>
            <div className="clear" />
          </div>
        </WelcomeBar>
        <div className="wrap__container">
          <Tab
            menu={{ secondary: true, pointing: true }}
            panes={panes}
            activeIndex={activeTabIndex}
            onTabChange={(_, { activeIndex }) =>
              setActiveTabIndex(activeIndex)
            }
            className="bottom-tab"
          />
        </div>
      </DashboardLayout>
    </>
  );
};

Fidelity.propTypes = {
  userData: PropTypes.instanceOf(Object),
  activeTabIndex: PropTypes.number,
  setActiveTabIndex: PropTypes.func,
  referrals: PropTypes.instanceOf(Object).isRequired,
  transactionOverview: PropTypes.instanceOf(Object).isRequired,
};

Fidelity.defaultProps = {
  userData: {
    data: {},
  },
  activeTabIndex: 0,
  setActiveTabIndex: () => null,
};

export default Fidelity;
