import React, { useState, useEffect } from 'react';
import { Tab } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import DashboardLayout from 'components/common/DashboardLayout';
import GoBack from 'components/common/GoBack';
import DefaultWalletContainer from 'containers/Dashboard/DefaultWallet';
import GraphDataContainer from 'containers/Dashboard/cumulativeGraph';
import UserCurrenciesContainer from 'containers/Dashboard/userCurrencies';
import WalletsTab from './WalletsTab';
import BankAccountTab from './BankAccountTab';
import './Wallets.scss';

const WalletsAndBanks = ({ userWallets, bankAccounts }) => {
  const history = useHistory();
  const onClickHandler = () => history.goBack();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { setOpenAddWalletModal, clearForm } = userWallets;
  const { setOpenLinkBankModal } = bankAccounts;

  const openAddModalFX = () => {
    setOpenAddWalletModal(true);
    clearForm();
    setActiveTabIndex(0);
  };

  const openAddBankModal = () => {
    setActiveTabIndex(1);
    setOpenLinkBankModal(true);
  };

  const panes = [
    {
      menuItem: global.translate('Wallet'),
      render: () => (
        <Tab.Pane attached={false}>
          <WalletsTab userWallets={userWallets} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: global.translate('Bank accounts'),
      render: () => (
        <Tab.Pane attached={false}>
          <BankAccountTab bankAccount={bankAccounts} />
        </Tab.Pane>
      ),
    },
  ];

  useEffect(() => {
    const { openModal } = history?.location?.state ?? {};

    if (openModal) {
      history.replace({
        ...history.location,
        state: {
          ...history.location.state,
          openModal: false,
        },
      });
      bankAccounts.setOpenLinkBankModal(true);
    }
  }, [history.location.state]);

  useEffect(() => {
    const { activeTab } = history?.location?.state ?? {};
    if (activeTab) {
      setActiveTabIndex(activeTab);
    }

    return () => {
      setActiveTabIndex(0);
    };
  }, [history.location.state]);

  return (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title">
            {global.translate('Manage wallets and banks')}
          </h2>
          <div className="head-buttons">
            <button type="button" onClick={openAddModalFX}>
              {global.translate('Add wallets')}
            </button>
            <button type="button" onClick={openAddBankModal}>
              {global.translate('Add a bank account')}
            </button>
          </div>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className="clear" />
      <div className="account">
        <div className="account__statistics">
          <div className="wallet__card">
            <DefaultWalletContainer />
          </div>
          <div className="wallet__card">
            <div className="wrap__graph">
              <h3 className="dash-title small-v-padding">
                {global.translate('Transaction history')}
              </h3>
              <GraphDataContainer />
            </div>
          </div>
          <div className="wallet__card">
            <UserCurrenciesContainer />
          </div>
        </div>

        <div className="account__wallets-and-banks">
          <Tab
            menu={{ secondary: true }}
            panes={panes}
            onTabChange={(_, { activeIndex }) =>
              setActiveTabIndex(activeIndex)
            }
            activeIndex={activeTabIndex}
            defaultActiveIndex={0}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};
WalletsAndBanks.propTypes = {
  userWallets: PropTypes.objectOf(PropTypes.any).isRequired,
  bankAccounts: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default WalletsAndBanks;
