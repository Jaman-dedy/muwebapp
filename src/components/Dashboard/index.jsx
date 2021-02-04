/* eslint-disable */
import './Dashboard.scss';
import ChartModal from 'components/Chat/ChatModal';
import DashboardLayout from 'components/common/DashboardLayout';
import GraphDataContainer from 'containers/Dashboard/cumulativeGraph';
import DefaultWalletContainer from 'containers/Dashboard/defaultWallet';
import UserCurrenciesContainer from 'containers/Dashboard/userCurrencies';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Image } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import Tour from 'reactour';
import RedeemVoucherModal from 'components/Stores/StoreDetailsComponent/RedeemVoucherModal';
import UserProfilePlaceholder from 'assets/images/avatarplaceholder.png';
import WelcomeProfilePlaceholder from 'assets/images/welcome-profile-placeholder.svg';
import QuickGetPaid from 'assets/images/quick-get-paid.svg';
import QuickQuickPay from 'assets/images/quick-quick-pay.svg';
import QuickSendVoucher from 'assets/images/quick-send-voucher.svg';
import QuickRedeemVoucher from 'assets/images/quick-redeem.svg';
import WalletAddWallet from 'assets/images/wallet-add-wallet.svg';
import ServiceTransfer from 'assets/images/moneyTrasferService.svg';
import ServiceMCard from 'assets/images/service-mcard.svg';
import ServiceContacts from 'assets/images/service-contact.svg';
import ServiceServices from 'assets/images/service-services.svg';
import WalletTopUp from 'assets/images/wallet-top-up.svg';
import Thumbnail from 'components/common/Thumbnail';
import StatusBar from './StatusBar';
import Contacts from './Contacts';
import TransactionHistory from './TransactionHistory';
import { Link } from 'react-router-dom';
import tourConfig from 'utils/TourSteps';

const Dashboard = ({
  userData,
  authData,
  chartList: { open },
  favoriteContacts,
  loadingFavoriteContacts,
  getTransactions,
  loadingTransaction,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isShowing, setShowing] = useState(true);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [
    isOpenRedeemVoucherModal,
    setIsOpenRedeemVoucherModal,
  ] = useState(false);

  useEffect(() => {
    if (userData?.data) {
      if (userData.data?.FirstTimeLogin === 'YES') {
        setIsTourOpen(true);
      }
    }
  }, [userData]);

  const history = useHistory();
  const getStatusMessage = () => {
    if (authData && authData.DOBSet === 'NO') {
      return {
        message: global.translate(
          'Your date of birth is not set yet.',
          465,
        ),
        type: 'DOB',
        tab: 'security',
      };
    }
    if (authData && authData.QuestionsSet === 'NO') {
      return {
        message: global.translate(
          'You have not set your security questions.',
          466,
        ),
        type: 'SecurityQuestion',
        tab: 'security',
      };
    }

    if (authData && authData.KYCDocReceived === 'NO') {
      return {
        message: global.translate(
          'You have not yet uploaded your Identification documents.',
          474,
        ),
        type: 'IdDocs',
        tab: 'documents',
      };
    }
    return null;
  };

  const onEdit = () => {
    if (getStatusMessage()) {
      history.push(
        `/account-management?tab=${getStatusMessage().tab}&target=${
          getStatusMessage().type
        }`,
      );
    }
  };

  const accentColor = '#5cb7b7';
  const closeTour = () => {
    setIsTourOpen(false);
  };
  return (
    <>
      <ChartModal open={open} />
      <DashboardLayout setTourStep={setIsTourOpen}>
        <Tour
          onRequestClose={closeTour}
          steps={tourConfig()}
          isOpen={isTourOpen}
          rounded={5}
          accentColor={accentColor}
        />
        <div className="dashboard">
          <div className="wrap-middle-dash">
            {getStatusMessage() && isShowing && (
              <div className="dash-card">
                <StatusBar
                  onEdit={onEdit}
                  message={global.translate(
                    getStatusMessage().message,
                  )}
                  isShowing={isShowing}
                  setShowing={setShowing}
                />
              </div>
            )}
            <div className="dash-card">
              {userData.data && (
                <div className="wrap-welcome">
                  <Thumbnail
                    style={{
                      width: '50px',
                      height: '50px',
                    }}
                    avatar={
                      userData?.data?.PictureSet === 'YES'
                        ? userData?.data?.PictureURL
                        : UserProfilePlaceholder
                    }
                    name={userData?.data?.FirstName}
                    secondName={userData?.data?.LastName}
                    alt={userData?.data?.LastName}
                    hasError={hasError}
                    setHasError={setHasError}
                  />
                  <div className="wrap-welcome-message">
                    <h3>
                      <span>
                        {global.translate('Welcome back', 1237)}
                        {', '}
                      </span>
                      <span className="bold">
                        {userData.data?.FirstName}!
                      </span>
                    </h3>
                    <div className="hide-on-small">
                      {global.translate(
                        'Welcome to the future of mobile money and money transfer',
                        1776,
                      )}
                    </div>
                  </div>
                </div>
              )}
              {!userData.data && (
                <div className="animate-placeholder">
                  <Image src={WelcomeProfilePlaceholder} />
                </div>
              )}
            </div>
            <div className="dash-card" data-tut="first-step">
              <h2>
                {global.translate(`MY WALLETS`, 68)}
                <Link to="/wallets">
                  {global.translate('SEE ALL', 2139).toUpperCase()}
                </Link>
              </h2>
              <div className="wrap-wallet-container">
                <div className="wrap-wallet">
                  <DefaultWalletContainer />
                </div>
                <div className="wrap-wallet-actions">
                  <div className="wrap-wallet-btn">
                    <Link to="/wallets?add=true">
                      <img src={WalletAddWallet} />
                      <div className="btn-info">
                        <h4>
                          {global.translate('Add wallet', 2169)}
                        </h4>
                        <div>
                          {global.translate(
                            'Create wallets and manage your money on the go',
                            2140,
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="wrap-wallet-btn">
                    <Link to="/add-money">
                      <img src={WalletTopUp} />
                      <div className="btn-info">
                        <h4>{global.translate(`Top up`, 542)}</h4>
                        <div>
                          {global.translate(
                            `Top up money into your wallet`,
                            2141,
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <UserCurrenciesContainer />
            <div className="dash-services">
              <div className="one-service has-submenu">
                <Link to="/money-transfer">
                  <div className="service-icon">
                    <img src={ServiceTransfer} />
                  </div>
                  <div className="service-text">
                    <h4>
                      {global.translate(`Money transfer`, 1950)}
                    </h4>
                    <div>
                      {global.translate(
                        `Transfer funds to a wallet`,
                        1951,
                      )}{' '}
                    </div>
                  </div>
                </Link>
              </div>
              <div className="one-service" data-tut="third-step">
                <Link to="/credit-cards">
                  <div className="service-icon">
                    <img src={ServiceMCard} />
                  </div>
                  <div className="service-text">
                    <h4>{global.translate(`M Card`)}</h4>
                    <div>
                      {global.translate(
                        `Order and manage your prepaid cards`,
                        2142,
                      )}
                    </div>
                  </div>
                </Link>
              </div>
              <div className="one-service" data-tut="eighth-step">
                <Link to="/contacts">
                  <div className="service-icon">
                    <img src={ServiceContacts} />
                  </div>
                  <div className="service-text">
                    <h4>{global.translate(`Contacts`, 109)}</h4>
                    <div>
                      {global.translate(`Manage my contacts`, 1195)}
                    </div>
                  </div>
                </Link>
              </div>
              <div
                className="one-service has-submenu"
                data-tut="ninth-step"
              >
                <Link to="/services">
                  <div className="service-icon">
                    <img src={ServiceServices} />
                  </div>
                  <div className="service-text">
                    <h4>{global.translate(`Our services`, 1224)}</h4>
                    <div>
                      {global.translate(
                        `Browse varieties of our services`,
                        2153,
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="wrap-right-dash">
            <div className="dash-card" data-tut="fourth-step">
              <div
                className="wrap-buttons-paying"
                data-tut="fourth-step"
              >
                <div className="paying-button">
                  <Link to="/get-paid">
                    <img src={QuickGetPaid} />
                    <div>{global.translate(`Get paid`, 482)}</div>
                  </Link>
                </div>
                <div className="paying-button">
                  <Link to="/quick-pay">
                    <img src={QuickQuickPay} />
                    <div>{global.translate(`Quick pay`, 431)}</div>
                  </Link>
                </div>
                <div className="paying-button">
                  <Link to="/contacts?ref=send-voucher">
                    <img src={QuickSendVoucher} />
                    <div>{global.translate(`Send voucher`, 863)}</div>
                  </Link>
                </div>
                <div className="paying-button">
                  <Link to="/my-stores?redeem=true">
                    <img src={QuickRedeemVoucher} />
                    <div>
                      {global.translate(`Redeem a voucher`, 810)}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="dash-card" data-tut="fifth-step">
              <h2>
                {global.translate(`TRANSFER MONEY TO`, 1950)}
                <Link to="/contacts">
                  {global.translate('SEE ALL', 2139).toUpperCase()}
                </Link>
              </h2>
              <Contacts
                loadingFavoriteContacts={loadingFavoriteContacts}
                favoriteContacts={
                  favoriteContacts && favoriteContacts.slice(0, 4)
                }
              />
            </div>
            <div
              className="dash-card card-transactions"
              data-tut="sixth-step"
            >
              <h2>
                {global.translate(`TRANSACTIONS`, 62)}
                <Link to="/transactions">
                  {global.translate('SEE ALL', 2139).toUpperCase()}
                </Link>
                <TransactionHistory
                  getTransactions={getTransactions}
                  loadingTransaction={loadingTransaction}
                />
              </h2>
            </div>
            <div className="dash-card card-graph">
              <h2>
                {global
                  .translate('TRANSACTIONS HISTORY', 1280)
                  .toUpperCase()}
              </h2>
              <GraphDataContainer />
            </div>
          </div>
        </div>
        <RedeemVoucherModal
          open={isOpenRedeemVoucherModal}
          setOpen={setIsOpenRedeemVoucherModal}
        />
      </DashboardLayout>
    </>
  );
};

Dashboard.propTypes = {
  authData: PropTypes.objectOf(PropTypes.any),
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  chartList: PropTypes.objectOf(PropTypes.any),
  favoriteContacts: PropTypes.objectOf(PropTypes.any),
  loadingFavoriteContacts: PropTypes.objectOf(PropTypes.any),
  getTransactions: PropTypes.objectOf(PropTypes.any),
  loadingTransaction: PropTypes.objectOf(PropTypes.any),
};

Dashboard.defaultProps = {
  authData: {},
  chartList: {
    open: false,
  },
};
export default Dashboard;
