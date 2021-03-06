/* eslint-disable */
import './SideBar.scss';

import Logo from 'assets/images/logo.png';
import NavAddMoney from 'assets/images/NavAddMoney.svg';
import CreditCardIcon from 'assets/images/ManageCard.svg';
import NavContactIcon from 'assets/images/NavContactIcon.svg';
import HomeIcon from 'assets/images/NavHomeIcon.svg';
import NavReportBugIcon from 'assets/images/NavReportBug.svg';
import NavServicesIcon from 'assets/images/NavServicesIcon.svg';
import NavTransaction from 'assets/images/NavTransactionIcon.svg';
import NavTransferIcon from 'assets/images/money-transfer.svg';
import NavWalletIcon from 'assets/images/NavWalletIcon.svg';
import CurrencyExchangeContainer from 'containers/MoneyTransfer/Exchange/Exchange';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import AppStore from 'assets/images/app-store.svg';
import GooglePlay from 'assets/images/google-play.svg';
import NavMicroloan from 'assets/images/microloan/microloan-icon.svg';
import toggleSidebar, {
  setIsendingCash,
  setIsSendingMoney,
  setIsSendingOhters,
  setIsSendingVoucher,
  setIsTopingUp,
  setManageContacts,
} from 'redux/actions/dashboard/dashboard';
import { clearSelectedStore } from 'redux/actions/vouchers/selectedStore';
import { Icon, Image } from 'semantic-ui-react';
import PINConfirmationModal from 'components/common/PINConfirmationModal';
const SideBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(false);
  const [routeName, setRouteName] = useState('');
  const [sendMoneyOpen, setSendMoneyOpen] = useState(false);
  // TESTING MODAL

  const [openPinModal, setOpenPinModal] = useState(false);

  const { isSidebarActive } = useSelector(
    ({ dashboard }) => dashboard.dashboardData,
  );
  const toggleMenu = name => {
    setExpand(!expand);
    setRouteName(name);
  };

  return (
    <>
      <PINConfirmationModal
        open={openPinModal}
        setOpen={setOpenPinModal}
      />
      <aside
        className={`sidenav ${
          isSidebarActive ? 'active-sidebar' : ''
        }`}
        style={{ height: '100%', position: 'fixed' }}
      >
        <CurrencyExchangeContainer
          setSendMoneyOpen={setSendMoneyOpen}
          sendMoneyOpen={sendMoneyOpen}
        />

        <button type="button" className="sidenav__close-icon">
          <Icon name="close" size="large" />
        </button>
        <div
          onClick={() => {
            toggleSidebar(dispatch);
          }}
          className="sidebar"
        >
          <div
            onClick={() => {
              toggleSidebar(dispatch);
              history.push({
                pathname: '/',
              });
            }}
            className="dash_logo"
          >
            <Image src={Logo} />
          </div>
          <ul>
            <li>
              <Link
                to="/"
                onClick={() => {
                  toggleSidebar(dispatch);
                  setManageContacts(dispatch);
                }}
              >
                <i>
                  <Image src={HomeIcon} />
                </i>
                {global.translate('Home')}
              </Link>
            </li>
            <li
              className={
                expand && routeName === 'MoneyTransfer'
                  ? 'active'
                  : ''
              }
            >
              <button
                type="button"
                onClick={() => {
                  toggleMenu('MoneyTransfer');
                }}
              >
                <i>
                  <Image src={NavTransferIcon} />
                </i>
                {global.translate('Money Transfer')}
                <Icon name="caret right" className="sidebar_caret" />
              </button>

              <div
                className={
                  expand && routeName === 'MoneyTransfer'
                    ? 'sidebar-submenu active'
                    : 'sidebar-submenu'
                }
              >
                <ul>
                  <li
                    onClick={() => {
                      setIsSendingMoney(dispatch);
                      toggleSidebar(dispatch);
                    }}
                  >
                    <Link to="/contacts?ref=send-money">
                      {global.translate('Transfer Money')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/money-transfer?ref=pay-bills"
                      onClick={() => {
                        toggleSidebar(dispatch);
                      }}
                    >
                      {global.translate('Pay bills')}
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/contacts?ref=send-voucher"
                      onClick={() => {
                        setIsSendingVoucher(dispatch);
                        clearSelectedStore(dispatch);
                        toggleSidebar(dispatch);
                      }}
                    >
                      {global.translate('Send Voucher')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contacts?ref=send-cash"
                      onClick={() => {
                        setIsendingCash(dispatch);
                        toggleSidebar(dispatch);
                      }}
                    >
                      {global.translate('Send Cash')}
                    </Link>
                  </li>
                  <li
                    className={
                      (location.pathname + location.search).substr(
                        1,
                      ) === 'paypal'
                        ? 'sub-nav-visited'
                        : null
                    }
                  >
                    <Link
                      to="/push-paypal"
                      onClick={() => {
                        toggleSidebar(dispatch);
                      }}
                    >
                      {global.translate('PayPal')}
                    </Link>
                  </li>
                  <li
                    onClick={() => {
                      setIsSendingMoney(dispatch);
                      setSendMoneyOpen(!sendMoneyOpen);
                      toggleSidebar(dispatch);
                    }}
                  >
                    {global.translate('Cash pooling')}
                  </li>
                  <li>
                    <Link
                      to="/contacts?ref=to-others"
                      onClick={() => {
                        setIsSendingOhters(dispatch);
                        toggleSidebar(dispatch);
                      }}
                    >
                      {global.translate('Other networks')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contacts?ref=to-up"
                      onClick={() => {
                        setIsTopingUp(dispatch);
                        toggleSidebar(dispatch);
                      }}
                    >
                      {global.translate('Buy Airtime')}
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link
                to="microloan"
                className={
                  (location.pathname + location.search).substr(1) ===
                  'microloan'
                    ? 'nav-visited'
                    : null
                }
                onClick={() => {
                  toggleSidebar(dispatch);
                }}
              >
                <i>
                  <Image src={NavMicroloan} />
                </i>
                {global.translate('Microloan')}
              </Link>
            </li>
            <li>
              <Link
                to="add-money"
                onClick={() => {
                  toggleSidebar(dispatch);
                }}
              >
                <i>
                  <Image src={NavAddMoney} />
                </i>
                {global.translate('Top Up')}
              </Link>
            </li>
            <li>
              <Link
                to="/wallets"
                onClick={() => {
                  toggleSidebar(dispatch);
                }}
              >
                <i>
                  <Image src={NavWalletIcon} />
                </i>
                {global.translate('My Wallets')}{' '}
              </Link>
            </li>
            <li>
              <Link
                to="/transactions"
                onClick={() => {
                  toggleSidebar(dispatch);
                }}
              >
                <i>
                  <Image src={NavTransaction} />
                </i>
                {global.translate('Transactions')}
              </Link>
            </li>
            <li>
              <Link
                to="/credit-cards"
                onClick={() => {
                  toggleSidebar(dispatch);
                }}
              >
                <i>
                  <Image src={CreditCardIcon} />
                </i>
                {global.translate('M-Card')}
              </Link>
            </li>
            <li>
              <Link
                to="/contacts"
                onClick={() => {
                  toggleSidebar(dispatch);
                  setManageContacts(dispatch);
                }}
              >
                <i>
                  <Image src={NavContactIcon} />
                </i>
                {global.translate('My Contacts')}
              </Link>
            </li>

            <li>
              <Link
                to="/services"
                onClick={() => {
                  toggleSidebar(dispatch);
                  setManageContacts(dispatch);
                }}
              >
                <i>
                  <Image src={NavServicesIcon} />
                </i>
                {global.translate('Services')}
              </Link>
            </li>
            <li>
              <Link
                to="/get-help"
                onClick={() => {
                  toggleSidebar(dispatch);
                  setManageContacts(dispatch);
                }}
              >
                <i>
                  <Image src={NavReportBugIcon} />
                </i>
                {global.translate('Report a bug')}
              </Link>
            </li>
            <li>
              <div className="mobile-apps">
                <h4>
                  {global.translate('Download our mobile app.')}
                </h4>
                <a
                  href="https://play.google.com/store/apps/details?id=technology.ossix.m2umoney"
                  target="_blank"
                  alt="Android"
                >
                  <Image src={GooglePlay} />
                </a>
                <a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  alt="iOS"
                >
                  <Image src={AppStore} />
                </a>
                <div className="clear" />
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
