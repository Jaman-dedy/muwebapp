/* eslint-disable import/no-named-as-default */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import CurrencyExchangeIcon from 'assets/images/currencyexchange.png';

import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';

import PayBills from 'components/PayBills';

import moneyTransferImage from 'assets/images/transfer_money.png';

import payBillsIcon from 'assets/images/pay-bills-icon.png';
import MoneyTransferIcon from 'assets/images/transactionimage.png';
import AddMoneyIcon from 'assets/images/add_money_dash.png';
import MyWalletIcon from 'assets/images/my_wallet_dash.png';
import ContactIcon from 'assets/images/contact_icon_dash.png';
import CardComponent from 'components/common/BottomMenu/Card';
import ExchangeContainer from 'containers/MoneyTransfer/Exchange/Exchange';

const MoneyTransfer = ({ userData, payBills }) => {
  const [open, setOpen] = useState(false);
  const [sendMoneyOpen, setSendMoneyOpen] = useState(false);

  return (
    <>
      <DashboardLayout>
        <WelcomeBar>
          <span className="lighter">
            <span className="bold">
              {userData.data && userData.data.FirstName}
            </span>
            , {global.translate('enjoy our services')}
          </span>
        </WelcomeBar>
        <div className="add-money-container">
          <div>
            <Image src={moneyTransferImage} size="medium" centered />
          </div>
        </div>
        <PayBills open={open} setOpen={setOpen} payBills={payBills} />
        <div className="services">
          <p className="sub-title">
            {global.translate('Our Services')}
          </p>
          <div className="to-u-services">
            <CardComponent
              image={MoneyTransferIcon}
              title="Send Money"
              to="/contacts?ref=send-money"
              subtitle="Transfer funds to your 2U contacts"
            />
            <CardComponent
              image={payBillsIcon}
              title={global.translate('Pay bills', 67)}
              onClick={() => setOpen(true)}
              subtitle={global.translate(
                'Pay your bills to registered providers',
                668,
              )}
            />
            <CardComponent
              image={MyWalletIcon}
              title={global.translate('Send a voucher', 863)}
              subtitle={global.translate(
                'Create a voucher or a gift card',
                764,
              )}
            />
            <CardComponent
              image={ContactIcon}
              title={global.translate('Send Cash', 915)}
              to="/contacts?ref=send-cash"
              subtitle={global.translate(
                'Cash sent could be retrieved from any affiliate CashPoint in the country of destination',
                918,
              )}
            />
            <CardComponent
              image={AddMoneyIcon}
              title={global.translate('Paypal', 170)}
              to="/add-money"
              subtitle="Transfer funds to a PayPal account"
            />
            <CardComponent
              image={MyWalletIcon}
              title={global.translate('My wallets', 68)}
              subtitle={global.translate('Manage my wallets', 142)}
            />
            <CardComponent
              image={ContactIcon}
              to="/contacts"
              title={global.translate('Contacts', 109)}
              subtitle={global.translate('Manage my Contacts')}
            />

            {sendMoneyOpen && (
              <ExchangeContainer
                setSendMoneyOpen={setSendMoneyOpen}
                sendMoneyOpen={sendMoneyOpen}
              />
            )}
            <CardComponent
              image={CurrencyExchangeIcon}
              onClick={e => {
                setSendMoneyOpen(!sendMoneyOpen);
              }}
              title={global.translate('Currency exchange', 87)}
              subtitle={global.translate(
                'The easiest way to do your currency exchange',
              )}
            />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

MoneyTransfer.propTypes = {
  userData: PropTypes.instanceOf(Object),
  payBills: PropTypes.instanceOf(Object),
};

MoneyTransfer.defaultProps = {
  userData: {
    data: {},
  },
  payBills: {},
};
export default MoneyTransfer;
