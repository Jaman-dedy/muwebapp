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
import RedeemVoucherModal from 'components/Stores/StoreDetailsComponent/RedeemVoucherModal';
import UserProfilePlaceholder from 'assets/images/avatarplaceholder.png';
import WelcomeProfilePlaceholder from 'assets/images/welcome-profile-placeholder.svg';
import QuickGetPaid from 'assets/images/quick-get-paid.svg';
import QuickQuickPay from 'assets/images/quick-quick-pay.svg';
import QuickSendVoucher from 'assets/images/quick-send-voucher.svg';
import QuickRedeemVoucher from 'assets/images/quick-redeem.svg';
import WalletAddWallet from 'assets/images/wallet-add-wallet.svg';
import ServiceTransfer from 'assets/images/service-transfer.svg';
import ServiceMCard from 'assets/images/service-mcard.svg';
import ServiceContacts from 'assets/images/service-contact.svg';
import ServiceServices from 'assets/images/service-services.svg';
import WalletTopUp from 'assets/images/wallet-top-up.svg';
import StatusBar from './StatusBar';
import TourSteps from './tourSteps';
import Contacts from './Contacts';
import TransactionHistory from './TransactionHistory';
import { Link } from 'react-router-dom';
import Img from 'components/Chat/ChatMessage/Img';

const Dashboard = ({
  userData,
  authData,
  chartList: { open },
  favoriteContacts,
  loadingFavoriteContacts,
  getTransactions,
  loadingTransaction,
}) => {
  const [tourStep, setTourStep] = useState(null);
  const [isShowing, setShowing] = useState(true);
  const [
    isOpenRedeemVoucherModal,
    setIsOpenRedeemVoucherModal,
  ] = useState(false);

  useEffect(() => {
    if (userData?.data) {
      if (userData.data?.FirstTimeLogin === 'YES') {
        setTourStep(1);
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

  return (
    <>
      <ChartModal open={open} />
      <DashboardLayout>
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
                  <Image
                    src={
                      userData?.data?.PictureSet === 'YES'
                        ? userData?.data?.PictureURL
                        : UserProfilePlaceholder
                    }
                    width={15}
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
                  <Img src={WelcomeProfilePlaceholder} compress />
                </div>
              )}
            </div>
            <div className="dash-card">
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
                          {global.translate('Add wallets', 111)}
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
                      {global.translate(`Transfer money`, 1950)}
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
              <div className="one-service">
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
              <div className="one-service">
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
              <div className="one-service has-submenu">
                <Link to="/services">
                  <div className="service-icon">
                    <img src={ServiceServices} />
                  </div>
                  <div className="service-text">
                    <h4>{global.translate(`Our services`, 1224)}</h4>
                    <div>
                      {global.translate(
                        `Browse varieties of our services`,
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="wrap-right-dash">
            <div className="dash-card">
              <div className="wrap-buttons-paying">
                <div className="paying-button">
                  <Link to="/get-paid">
                    <img src={QuickGetPaid} />
                    <div>{global.translate(`Get paid`, 1975)}</div>
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
            <div className="dash-card">
              <h2>
                {global.translate(`TRANSFER MONEY TO`, 1950)}
                <Link to="/contacts">
                  {global.translate('SEE ALL', 2139).toUpperCase()}
                </Link>
              </h2>
              <Contacts
                loadingFavoriteContacts={loadingFavoriteContacts}
                favoriteContacts={favoriteContacts}
              />
            </div>
            <div className="dash-card card-transactions">
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
