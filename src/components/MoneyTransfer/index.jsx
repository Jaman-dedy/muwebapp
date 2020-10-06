/* eslint-disable import/no-named-as-default */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import PayBills from 'components/PayBills';
import CurrencyExchangeIcon from 'assets/images/TransExchange.svg';
import payBillsIcon from 'assets/images/TransPay.svg';
import MoneyTransferIcon from 'assets/images/TransSendMoney.svg';
import TopUpIcon from 'assets/images/TransAirtime.svg';
import ToOtherIcon from 'assets/images/TransToothers.svg';
import SendCashIcon from 'assets/images/TransSendCash.svg';
import CreditCard from 'assets/images/TransCreditCard.svg';
import AddMoneyIcon from 'assets/images/TransPaypal.svg';
import bankTransferIcon from 'assets/images/TransBank.svg';
import sendVoucherIcon from 'assets/images/TransVoucher.svg';
import CardComponent from 'components/common/BottomMenu/Card';
import ExchangeContainer from 'containers/MoneyTransfer/Exchange/Exchange';
import {
  setIsendingCash,
  setIsSendingMoney,
  setIsSendingOhters,
  setIsTopingUp,
} from 'redux/actions/dashboard/dashboard';
import GoBack from 'components/common/GoBack';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';

const MoneyTransfer = ({ payBills }) => {
  const [sendMoneyOpen, setSendMoneyOpen] = useState(false);
  const { openPayBills, setOpenPayBills } = payBills;
  const dispatch = useDispatch();
  const history = useHistory();
  const onClickHandler = () => history.goBack();

  return (
    <>
      <DashboardLayout>
        <WelcomeBar>
          <div className="head-content">
            {!isAppDisplayedInWebView() && (
              <div className="go-back">
                <GoBack style onClickHandler={onClickHandler} />
              </div>
            )}
            <h2 className="head-title">
              {global.translate('Money transfer', 1249)}
            </h2>
            <div className="clear" />
          </div>
        </WelcomeBar>
        <div className="wrap__container">
          <PayBills
            open={openPayBills}
            setOpen={setOpenPayBills}
            payBills={payBills}
          />
          <div className="services">
            <h2 style={{ marginLeft: '4px' }}>
              {global.translate('What would you like to do?', 1706)}
            </h2>
            <div className="to-u-services">
              <CardComponent
                image={MoneyTransferIcon}
                onClick={() => {
                  setIsSendingMoney(dispatch);
                  history.push('/contacts');
                }}
                title={global.translate('Transfer Money', 1950)}
                subtitle={global.translate(
                  'Transfer funds to your 2UMoney contacts',
                  585,
                )}
              />
              <CardComponent
                image={payBillsIcon}
                title={global.translate('Pay bills', 2005)}
                onClick={() => setOpenPayBills(true)}
                subtitle={global.translate(
                  'Pay your bills to registered providers',
                  668,
                )}
              />
              <CardComponent
                image={sendVoucherIcon}
                title={global.translate('Send a voucher', 863)}
                onClick={() =>
                  history.push('/contacts?ref=send-voucher')
                }
                subtitle={global.translate(
                  'Create a voucher or a gift card',
                  764,
                )}
              />
              <CardComponent
                image={SendCashIcon}
                title={global.translate('Send cash', 915)}
                onClick={() => {
                  setIsendingCash(dispatch);

                  history.push('/contacts');
                }}
                subtitle={global.translate(
                  'Send cash to external contact',
                  915,
                )}
              />

              {sendMoneyOpen && (
                <ExchangeContainer
                  setSendMoneyOpen={setSendMoneyOpen}
                  sendMoneyOpen={sendMoneyOpen}
                />
              )}
              <CardComponent
                image={CurrencyExchangeIcon}
                onClick={() => {
                  setSendMoneyOpen(!sendMoneyOpen);
                  setIsSendingMoney(dispatch);
                }}
                title={global.translate('Currency exchange', 87)}
                subtitle={global.translate(
                  'The easiest way to do your currency exchange',
                  569,
                )}
              />

              <CardComponent
                image={ToOtherIcon}
                title={global.translate('Other networks', 581)}
                onClick={() => {
                  setIsSendingOhters(dispatch);
                  history.push('/contacts?ref=to-others');
                }}
                subtitle={global.translate(
                  'Transfer money from your wallet to other providers',
                  581,
                )}
              />
              <CardComponent
                image={TopUpIcon}
                onClick={() => {
                  setIsTopingUp(dispatch);
                  history.push('/contacts?ref=to-up');
                }}
                title={global.translate('Buy Airtime', 539)}
                subtitle={global.translate('Buy Airtime', 539)}
              />
              <CardComponent
                image={CreditCard}
                onClick={() => {
                  history.push('/virtual-card');
                }}
                title={global.translate('Virtual card', 1999)}
                subtitle={global.translate(
                  'Get a Virtual card number for online payment',
                  2000,
                )}
              />
              <CardComponent
                isComingSoon
                image={bankTransferIcon}
                to="/"
                title={global.translate('Bank transfer', 169)}
                subtitle={global.translate(
                  'Transfer fund to a bank account',
                  670,
                )}
              />
              <CardComponent
                isComingSoon
                image={AddMoneyIcon}
                title={global.translate('Paypal', 170)}
                to="/"
                subtitle={global.translate(
                  'Transfer funds to a PayPal account',
                  669,
                )}
              />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

MoneyTransfer.propTypes = {
  payBills: PropTypes.instanceOf(Object),
};

MoneyTransfer.defaultProps = {
  payBills: {},
};
export default MoneyTransfer;
