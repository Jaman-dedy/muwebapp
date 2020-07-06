/* eslint-disable import/no-named-as-default */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CurrencyExchangeIcon from 'assets/images/currencyexchange.png';

import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';

import PayBills from 'components/PayBills';

import moneyTransferImage from 'assets/images/transfer_money.png';

import payBillsIcon from 'assets/images/pay-bills-icon.png';
import MoneyTransferIcon from 'assets/images/transactionsimage.png';
import TopUpIcon from 'assets/images/top-up.png';
import ToOtherIcon from 'assets/images/to_other_provider.png';
import SendCashIcon from 'assets/images/sendCashIcon.png';
import CreditCard from 'assets/images/credit-card.png';
import AddMoneyIcon from 'assets/images/add_money_dash.png';
import bankTransferIcon from 'assets/images/bank_transfer.png';
import sendVoucherIcon from 'assets/images/voucher.png';
import CardComponent from 'components/common/BottomMenu/Card';
import ExchangeContainer from 'containers/MoneyTransfer/Exchange/Exchange';
import {
  setIsendingCash,
  setIsSendingMoney,
  setIsSendingOhters,
  setIsTopingUp,
} from 'redux/actions/dashboard/dashboard';
import GoBack from 'components/common/GoBack';

const MoneyTransfer = ({ userData, payBills }) => {
  const [sendMoneyOpen, setSendMoneyOpen] = useState(false);
  const { openPayBills, setOpenPayBills } = payBills;
  const dispatch = useDispatch();
  const history = useHistory();
  const onClickHandler = () => history.goBack();

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
        <GoBack onClickHandler={onClickHandler} />
        <div className="add-money-container">
          <div>
            <Image src={moneyTransferImage} size="medium" centered />
          </div>
        </div>
        <PayBills
          open={openPayBills}
          setOpen={setOpenPayBills}
          payBills={payBills}
        />
        <div className="services">
          <p className="sub-title">
            {global.translate('Our Services', 1224)}
          </p>
          <div className="to-u-services">
            <CardComponent
              image={MoneyTransferIcon}
              onClick={() => {
                setIsSendingMoney(dispatch);
                history.push('/contacts');
              }}
              title={global.translate('Send Money', 65)}
              subtitle={global.translate(
                'Transfer funds to your 2UMoney contacts',
                585,
              )}
            />
            <CardComponent
              image={payBillsIcon}
              title={global.translate('Pay bills', 67)}
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
              title={global.translate('Send Cash', 915)}
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
              }}
              title={global.translate('Currency exchange', 87)}
              subtitle={global.translate(
                'The easiest way to do your currency exchange',
                569,
              )}
            />

            <CardComponent
              image={ToOtherIcon}
              title={global.translate('2U to others', 581)}
              onClick={() => {
                setIsSendingOhters(dispatch);
                history.push('/contacts?ref=to-others');
              }}
              subtitle={global.translate(
                'Send money from your wallet to other providers',
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
              to="/contacts"
              title={global.translate('Credit card', 726)}
              subtitle={global.translate(
                'Get one time use Credit card number for online payment',
                672,
              )}
            />
            <CardComponent
              image={bankTransferIcon}
              to="/contacts"
              title={global.translate('Bank transfer', 169)}
              subtitle={global.translate(
                'Transfer fund to a bank account',
                670,
              )}
            />
            <CardComponent
              image={AddMoneyIcon}
              title={global.translate('Paypal', 170)}
              to="/add-money"
              subtitle={global.translate(
                'Transfer funds to a PayPal account',
                669,
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
