/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import './Fidelity.scss';

import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';
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
  const { data } = userData;
  const { referreesList } = referrals;
  const onClickHandler = () => history.goBack();

  const panes = [
    {
      menuItem: global.translate('Transactions overview'),
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
      menuItem: global.translate('My rewards'),
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
      menuItem: `${global.translate('My referral List')}`,
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
          <span className="lighter">
            Hey{' '}
            <span className="bold">
              &nbsp;{data && data.FirstName}
            </span>
            , {global.translate('Thanks for your fidelity')}
          </span>
        </WelcomeBar>
        <GoBack onClickHandler={onClickHandler} />
        <div className="fidelity-container">
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
