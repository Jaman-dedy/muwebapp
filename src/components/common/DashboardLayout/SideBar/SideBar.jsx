/* eslint-disable */
import './SideBar.scss';

import Logo from 'assets/images/logo_colored.svg';
import NavAddMoney from 'assets/images/NavAddMoney.svg';
import CreditCardIcon from 'assets/images/NavCardsIcon.svg';
import NavContactIcon from 'assets/images/NavContactIcon.svg';
import HomeIcon from 'assets/images/NavHomeIcon.svg';
import NavReportBugIcon from 'assets/images/NavReportBug.svg';
import NavServicesIcon from 'assets/images/NavServicesIcon.svg';
import NavTransaction from 'assets/images/NavTransactionIcon.svg';
import NavTransferIcon from 'assets/images/NavTransferIcon.svg';
import NavWalletIcon from 'assets/images/NavWalletIcon.svg';
import CurrencyExchangeContainer from 'containers/MoneyTransfer/Exchange/Exchange';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import AppStore from 'assets/images/app-store.svg';
import GooglePlay from 'assets/images/google-play.svg';
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

const SideBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(false);
  const [routeName, setRouteName] = useState('');
  const [sendMoneyOpen, setSendMoneyOpen] = useState(false);

  const { isSidebarActive } = useSelector(
    ({ dashboard }) => dashboard.dashboardData,
  );
  const toggleMenu = name => {
    setExpand(!expand);
    setRouteName(name);
  };

  return (
    <>
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
                {global.translate('Home', 134)}
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
                onClick={() => toggleMenu('MoneyTransfer')}
              >
                <i>
                  <Image src={NavTransferIcon} />
                </i>
                {global.translate('Money Transfer', 1249)}
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
                      {global.translate('Transfer Money', 1950)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/money-transfer?ref=pay-bills"
                      onClick={() => {
                        toggleSidebar(dispatch);
                      }}
                    >
                      {global.translate('Pay bills', 2005)}
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
                      {global.translate('Send Voucher', 863)}
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
                      {global.translate('Send Cash', 1948)}
                    </Link>
                  </li>
                  <li
                    onClick={() => {
                      setIsSendingMoney(dispatch);
                      setSendMoneyOpen(!sendMoneyOpen);
                      toggleSidebar(dispatch);
                    }}
                  >
                    {global.translate('Currency exchange', 87)}
                  </li>
                  <li>
                    <Link
                      to="/contacts?ref=to-others"
                      onClick={() => {
                        setIsSendingOhters(dispatch);
                        toggleSidebar(dispatch);
                      }}
                    >
                      {global.translate('Other networks', 2148)}
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
                      {global.translate('Buy Airtime', 1552)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/virtual-card"
                      onClick={() => {
                        toggleSidebar(dispatch);
                      }}
                    >
                      {global.translate('O-Card')}
                    </Link>
                  </li>
                </ul>
              </div>
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
                {global.translate('Add Money', 89)}
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
                {global.translate('My Wallets', 68)}{' '}
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
                {global.translate('Transactions', 62)}
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
                {global.translate('My Contacts', 71)}
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
                {global.translate('Services', 1754)}
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
                {global.translate('Report a bug', 2137)}
              </Link>
            </li>
            <li>
              <div className="mobile-apps">
                <h4>Download our mobile app.</h4>
                <a
                  href="https://play.google.com/store/apps/details?id=technology.ossix.toumoney"
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
