import React, { useState } from 'react';
import { Image, Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import './SideBar.scss';
import { Link } from 'react-router-dom';
import Logo from 'assets/images/logo.png';
import HomeIcon from 'assets/images/home_icon.png';
import MoneyTransIcon from 'assets/images/money_trans_icon.png';
import TransactionIcon from 'assets/images/transactions.png';
import AddMoneyIcon from 'assets/images/add_money.png';
import WalletIcon from 'assets/images/wallet_icon.png';
import ContactIcon from 'assets/images/contact_icon.png';
import ServicesIcon from 'assets/images/services_white.png';
import toggleSideBar, {
  setIsSendingMoney,
  setIsendingCash,
  setManageContacts,
  setIsTopingUp,
  setIsSendingOhters,
  setIsSendingVoucher,
} from 'redux/actions/dashboard/dashboard';
import CurrencyExchangeContainer from 'containers/MoneyTransfer/Exchange/Exchange';

const SideBar = () => {
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
        className={`sidenav ${isSidebarActive ? 'active' : ''}`}
        style={{ height: '100%', position: 'fixed' }}
      >
        {sendMoneyOpen && (
          <CurrencyExchangeContainer
            setSendMoneyOpen={setSendMoneyOpen}
            sendMoneyOpen={sendMoneyOpen}
          />
        )}
        <button
          type="button"
          className="sidenav__close-icon"
          onClick={() => toggleSideBar(dispatch)}
        >
          <Icon name="close" size="small" />
        </button>
        <div className="sidebar-menu">
          <div className="dash_logo_container">
            <Image src={Logo} className="dash_logo" />
          </div>
          <ul>
            <li className="sidebar-dropdown">
              <button type="button">
                <i>
                  <Image
                    src={HomeIcon}
                    style={{ height: 32, display: 'inline' }}
                  />
                </i>
                <span>
                  <Link
                    to="/"
                    style={{ color: 'white' }}
                    onClick={() => toggleSideBar(dispatch)}
                  >
                    {global.translate('Home')}
                  </Link>
                </span>
              </button>
            </li>
            <li
              className={
                expand && routeName === 'MoneyTransfer'
                  ? 'sidebar-dropdown active'
                  : 'sidebar-dropdown'
              }
            >
              <button
                type="button"
                onClick={() => toggleMenu('MoneyTransfer')}
              >
                <i>
                  <Image
                    src={MoneyTransIcon}
                    style={{ height: 31, display: 'inline' }}
                  />
                </i>
                <span className="main-option">
                  {global.translate('Money Transfer')}
                </span>
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
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSendingMoney(dispatch);
                      }}
                    >
                      <i>
                        <Icon name="circle" />
                      </i>
                      <span className="sub-option">
                        {' '}
                        <Link to="/contacts?ref=send-money">
                          {global.translate('Send Money')}
                        </Link>
                      </span>
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <i>
                        <Icon name="circle" />
                      </i>
                      <span className="sub-option">
                        {' '}
                        <Link to="/money-transfer?ref=pay-bills">
                          {global.translate('Pay bills')}
                        </Link>
                      </span>
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSendingVoucher(dispatch);
                      }}
                    >
                      <i>
                        <Icon name="circle" />
                      </i>
                      <span className="sub-option">
                        {' '}
                        <Link to="/contacts?ref=send-voucher">
                          {global.translate('Send Voucher', 863)}
                        </Link>
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setIsendingCash(dispatch);
                      }}
                    >
                      <i>
                        <Icon name="circle" />
                      </i>
                      <span className="sub-option">
                        {' '}
                        <Link to="/contacts?ref=send-cash">
                          {global.translate('Send Cash')}
                        </Link>
                      </span>
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <i>
                        <Icon name="circle" />
                      </i>
                      <span className="sub-option">
                        {global.translate('Currency exchange')}
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSendingOhters(dispatch);
                      }}
                    >
                      <i>
                        <Icon name="circle" />
                      </i>
                      <span className="sub-option">
                        <Link to="/contacts?ref=to-others">
                          {global.translate('Mobile money')}
                        </Link>
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setIsTopingUp(dispatch);
                      }}
                    >
                      <i>
                        <Icon name="circle" />
                      </i>
                      <span className="sub-option">
                        <Link to="/contacts?ref=to-up">
                          {global.translate('Buy Airtime', 1552)}
                        </Link>
                      </span>
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <i>
                        <Icon name="circle" />
                      </i>
                      <span className="sub-option">
                        <Link to="/virtualCard">
                          {global.translate('Virtual card')}
                        </Link>
                      </span>
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <i>
                        <Icon name="circle" />
                      </i>
                      <span className="sub-option">
                        {' '}
                        {global.translate('Bank transfer')}
                      </span>
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <i>
                        <Icon name="circle" />
                      </i>
                      <span className="sub-option">
                        {global.translate('Paypal')}
                      </span>
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <i>
                        <Icon name="circle" />
                      </i>
                      <span className="sub-option">
                        {' '}
                        {global.translate('Bank transfer')}
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            </li>
            <li className="sidebar-dropdown">
              <button type="button">
                <i>
                  <Image
                    src={AddMoneyIcon}
                    style={{ height: 31, display: 'inline' }}
                  />
                </i>
                <span className="main-option">
                  <Link to="add-money">
                    {global.translate('Add Money')}
                  </Link>
                </span>
              </button>
            </li>

            <li className="sidebar-dropdown">
              <button type="button">
                <i>
                  <Image
                    src={WalletIcon}
                    style={{ height: 31, display: 'inline' }}
                  />
                </i>
                <span className="main-option">
                  <Link to="/wallets">
                    {global.translate('My Wallets')}{' '}
                  </Link>
                </span>
              </button>
            </li>
            <li className="sidebar-dropdown">
              <button type="button">
                <i>
                  <Image
                    src={TransactionIcon}
                    style={{ height: 31, display: 'inline' }}
                  />
                </i>
                <span className="main-option">
                  <Link to="/transactions">
                    {global.translate('Transactions', 62)}
                  </Link>
                </span>
              </button>
            </li>
            <li className="sidebar-dropdown">
              <button
                type="button"
                onClick={() => {
                  setManageContacts(dispatch);
                }}
              >
                <i>
                  <Image
                    src={ContactIcon}
                    style={{ height: 31, display: 'inline' }}
                  />
                </i>
                <span className="main-option">
                  <Link to="/contacts">
                    {global.translate('My Contacts', 71)}
                  </Link>
                </span>
              </button>
            </li>

            <li className="sidebar-dropdown">
              <button
                type="button"
                onClick={() => {
                  setManageContacts(dispatch);
                }}
              >
                <i>
                  <Image
                    src={ServicesIcon}
                    style={{ height: 31, display: 'inline' }}
                  />
                </i>
                <span className="main-option">
                  <Link to="/services">
                    {global.translate('Services')}
                  </Link>
                </span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
