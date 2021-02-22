import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
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

  const params = queryString.parse(history.location.search);

  const getActiveIndex = ({ activeIndex }) => {
    switch (activeIndex) {
      case 1:
        return 'transaction-overview';
      case 0:
        return 'rewards';

      case 2:
        return 'referrals';
      default:
        return 'rewards';
    }
  };

  useEffect(() => {
    if (params.tab === 'referrals') {
      setActiveTabIndex(2);
    }
    if (params.tab === 'transaction-overview') {
      setActiveTabIndex(1);
    }
    if (params.tab === 'rewards') {
      setActiveTabIndex(0);
    }
    if (!params.tab) {
      setActiveTabIndex(0);
    }
  }, [params.tab]);

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

  if (isAppDisplayedInWebView()) {
    if (activeTabIndex === 2) {
      return (
        <DashboardLayout>
          <div className="wrap__container">
            <Tab.Pane
              className="bottom-tab-pane referral-contacts"
              attached={false}
            >
              <MyReferrals
                userData={userData}
                referrals={referreesList}
              />
            </Tab.Pane>
          </div>
        </DashboardLayout>
      );
    }
  }

  if (isAppDisplayedInWebView()) {
    if (activeTabIndex === 0) {
      return (
        <DashboardLayout>
          <div className="wrap__container">
            <Tab.Pane
              className="bottom-tab-pane referral-contacts"
              attached={false}
            >
              <MyRewards userData={userData} />
            </Tab.Pane>
          </div>
        </DashboardLayout>
      );
    }
  }

  return (
    <>
      <DashboardLayout>
        <WelcomeBar>
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
            menu={{
              secondary: true,
              pointing: true,
              className: 'fidelity__tab-menu',
            }}
            panes={panes}
            activeIndex={activeTabIndex}
            onTabChange={(event, data) => {
              setActiveTabIndex(data.activeIndex);
              history.push({
                pathname: history.location.pathname,
                search: `?tab=${getActiveIndex(data)}`,
              });
            }}
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
