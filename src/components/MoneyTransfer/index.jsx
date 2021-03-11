/* eslint-disable import/no-named-as-default */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TopUpIcon from 'assets/images/services/top-u-service.svg';
import CurrencyExchangeIcon from 'assets/images/services/currency-e-service.svg';
import payBillsIcon from 'assets/images/services/pay-b-service.svg';
import withDrawMoneyIcon from 'assets/images/withdraw-money.svg';

import SendCashIcon from 'assets/images/services/send-c-service.svg';
import MoneyTransferIcon from 'assets/images/services/money-t-service.svg';
import ToOtherIcon from 'assets/images/services/other-n-service.svg';
import sendVoucherIcon from 'assets/images/services/send-v-service.svg';
import CardComponent from 'components/common/BottomMenu/Card';
import DashboardLayout from 'components/common/DashboardLayout';
import GoBack from 'components/common/GoBack';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import PayBills from 'components/PayBills';
import ExchangeContainer from 'containers/MoneyTransfer/Exchange/Exchange';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';
import {
  setIsendingCash,
  setIsSendingMoney,
  setIsSendingOhters,
  setIsTopingUp,
} from 'redux/actions/dashboard/dashboard';
import './style.scss';

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
          <div className="services-container">
            <h3>{global.translate('Money transfer')}</h3>
            <div className="container-subtitle">
              {global.translate(
                'From your digital wallet to any destination of your choice',
              )}
            </div>
            <div className="services-cards">
              <CardComponent
                image={MoneyTransferIcon}
                onClick={() => {
                  setIsSendingMoney(dispatch);
                  history.push('/contacts?ref=send-money');
                }}
                title={global.translate('Transfer Money', 1950)}
                subtitle={global.translate(
                  'Transfer funds to your M2UMoney contacts',
                  585,
                )}
              />
              <CardComponent
                image={SendCashIcon}
                title={global.translate('Send cash', 915)}
                onClick={() => {
                  setIsendingCash(dispatch);
                  history.push('/contacts?ref=send-cash');
                }}
                subtitle={global.translate(
                  'Send cash to be picked up at a cashpoint',
                  915,
                )}
              />
              <CardComponent
                image={withDrawMoneyIcon}
                title={global.translate('Withdraw money')}
                onClick={() => history.push('/withdraw-money')}
                subtitle={global.translate(
                  'Withdraw money from your wallet',
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
                image={TopUpIcon}
                onClick={() => {
                  setIsTopingUp(dispatch);
                  history.push('/contacts?ref=to-up');
                }}
                title={global.translate('Buy Airtime', 539)}
                subtitle={global.translate('Buy Airtime', 539)}
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
                title={global.translate('Cash pooling', 87)}
                subtitle={global.translate(
                  'Move funds from one of your M2U wallets to another M2U wallet',
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
                image={payBillsIcon}
                title={global.translate('Pay bills', 2005)}
                onClick={() => setOpenPayBills(true)}
                subtitle={global.translate(
                  'Pay your bills to registered providers',
                  668,
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
