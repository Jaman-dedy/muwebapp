/* eslint-disable */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Image, Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import './SideBar.scss';
import { Link } from 'react-router-dom';
import Logo from 'assets/images/logo-admin.svg';
import HomeIcon from 'assets/images/NavHomeIcon.svg';
import NavTransferIcon from 'assets/images/NavTransferIcon.svg';
import NavTransaction from 'assets/images/NavTransactionIcon.svg';
import NavAddMoney from 'assets/images/NavAddMoney.svg';
import NavWalletIcon from 'assets/images/NavWalletIcon.svg';
import NavContactIcon from 'assets/images/NavContactIcon.svg';
import NavServicesIcon from 'assets/images/NavServicesIcon.svg';
import CreditCardIcon from 'assets/images/NavCardsIcon.svg';
import { clearSelectedStore } from 'redux/actions/vouchers/selectedStore';
import toggleSidebar, {
  setIsSendingMoney,
  setIsendingCash,
  setManageContacts,
  setIsTopingUp,
  setIsSendingOhters,
  setIsSendingVoucher,
} from 'redux/actions/dashboard/dashboard';
import CurrencyExchangeContainer from 'containers/MoneyTransfer/Exchange/Exchange';

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
                onClick={() => toggleMenu('MoneyTransfer')}
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
                    {global.translate('Currency exchange')}
                  </li>
                  <li>
                    <Link
                      to="/contacts?ref=to-others"
                      onClick={() => {
                        setIsSendingOhters(dispatch);
                        toggleSidebar(dispatch);
                      }}
                    >
                      {global.translate('Mobile money')}
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
                      {global.translate('Virtual card', 1999)}
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
                {global.translate('Add Money')}
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
                {global.translate('Credit card', 726)}
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
                {global.translate('Services')}
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
