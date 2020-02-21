import React, { useState } from 'react';
import { Image, Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import './SideBar.scss';
import { Link } from 'react-router-dom';
import Logo from 'assets/images/whitelogo.png';
import HomeIcon from 'assets/images/home_icon.png';
import MoneyTransIcon from 'assets/images/money_trans_icon.png';
import AddMoneyIcon from 'assets/images/add_money.png';
import WalletIcon from 'assets/images/wallet_icon.png';
import ContactIcon from 'assets/images/contact_icon.png';
import toggleSideBar from 'redux/actions/dashboard/dashboard';

const SideBar = () => {
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(false);
  const [routeName, setRouteName] = useState('');

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
        style={{ height: '100%' }}
      >
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
            <p className="">MONEY </p>
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
                  <Link to="/" style={{ color: 'white' }}>Home</Link>
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
                <span className="main-option">Money Transfer</span>
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
                    <button type="button">
                      <i>
                        <Icon name="circle" />
                      </i>
                      <span className="sub-option"> Send Money</span>
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <i>
                        <Icon name="circle" />
                      </i>
                      <span className="sub-option"> Pay bills</span>
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <i>
                        <Icon name="circle" />
                      </i>
                      <span className="sub-option">
                        {' '}
                        Send a voucher
                      </span>
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <i>
                        <Icon name="circle" />
                      </i>
                      <span className="sub-option"> Send Cash</span>
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <i>
                        <Icon name="circle" />
                      </i>
                      <span className="sub-option">Paypal</span>
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <i>
                        <Icon name="circle" />
                      </i>
                      <span className="sub-option">
                        {' '}
                        Bank transfer
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
                <span className="main-option">Add Money</span>
              </button>
            </li>
            <li
              className={
                expand && routeName === 'MyWallets'
                  ? 'sidebar-dropdown active'
                  : 'sidebar-dropdown'
              }
            >
              <button
                type="button"
                onClick={() => toggleMenu('MyWallets')}
              >
                <i>
                  <Image
                    src={WalletIcon}
                    style={{ height: 31, display: 'inline' }}
                  />
                </i>
                <span className="main-option"> My Wallets </span>
                <Icon name="caret right" className="sidebar_caret" />
              </button>
              <div
                className={
                  expand && routeName === 'MyWallets'
                    ? 'sidebar-submenu active'
                    : 'sidebar-submenu'
                }
              >
                <ul>
                  <li>
                    <button type="button">
                      {' '}
                      <i>
                        <Icon name="circle" />
                      </i>
                      Add wallet
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <i>
                        <Icon name="circle" />
                      </i>
                      Rename wallet
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <i>
                        <Icon name="circle" />
                      </i>
                      Add money
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <i>
                        <Icon name="circle" />
                      </i>
                      Currency exchange
                    </button>
                  </li>
                </ul>
              </div>
            </li>
            <li className="sidebar-dropdown">
              <button type="button">
                <i>
                  <Image
                    src={ContactIcon}
                    style={{ height: 31, display: 'inline' }}
                  />
                </i>
                <span className="main-option">Contacts</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
