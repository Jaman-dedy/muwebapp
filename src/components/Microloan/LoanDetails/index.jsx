import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import DashboardLayout from 'components/common/DashboardLayout';
import GoBack from 'components/common/GoBack';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import './style.scss';
import LoadItemImg from 'assets/images/microloan/load.svg';
import PINConfirmationModal from 'components/common/PINConfirmationModal';
import SingleLoanView from '../SingleLoanView';
import LoanTableDetails from './LoanTableDetails';
import PaymentHistory from './History';
import PaymentAction from './paymentAction';

const LoanDetails = ({
  loan,
  paymentOption,
  setPaymentOption,
  handleConfirmPayLoan,
  confirmLoanLoading,
  payLoanLoading,
  handlePayLoan,
  payLoanModal,
  setPayLoanModal,
  confirmLoanData,
  openPinModal,
  setOpenPinModal,
  setPIN,
  PIN,
  pinErrors,
  pinData,
  clearConfirmLoan,
  walletList,
}) => {
  const [hasPaidOnTime, SetHasPaidOnTime] = useState(true);
  const history = useHistory();
  const onClickHandler = () => history.goBack();

  return (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title">
            {global.translate('Microloans', 1918)}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className="loan-details-container">
        <SingleLoanView detail loan={loan} />
        {loan?.ActiveLoan === 'YES' && (
          <PaymentAction
            payLoanModal={payLoanModal}
            setPayLoanModal={setPayLoanModal}
            loan={loan}
            paymentOption={paymentOption}
            setPaymentOption={setPaymentOption}
            handleConfirmPayLoan={handleConfirmPayLoan}
            confirmLoanLoading={confirmLoanLoading}
            payLoanLoading={payLoanLoading}
            confirmLoanData={confirmLoanData}
            walletList={walletList}
          />
        )}

        <div className="loan-detail-table">
          <LoanTableDetails loan={loan} />
        </div>
        {!hasPaidOnTime && (
          <div className="alert-info">
            <div>
              <div className="actions">
                <div>{global.translate('Notice')}</div>
                <div className="dismiss">
                  {global.translate('Dismiss')}
                </div>
              </div>
              {global.translate(
                'Late payment affects your credit scores. To stay on top of your finances and get the best loans in future, we advise you to always pay on time and often use 2U Money to transfer money, pay bills, and other may more.',
              )}
            </div>
          </div>
        )}
        {loan?.PaymentHistory?.length !== 0 && (
          <div className="loan-detail-table">
            <PaymentHistory
              history={loan?.PaymentHistory}
              SetHasPaidOnTime={SetHasPaidOnTime}
              loan={loan}
            />
          </div>
        )}
        {loan?.PaymentHistory?.length > 10 && (
          <div className="load-more">
            <Image src={LoadItemImg} />
            {global.translate('Load more')}
          </div>
        )}
      </div>

      <PINConfirmationModal
        open={openPinModal}
        setOpen={setOpenPinModal}
        setPIN={setPIN}
        PIN={PIN}
        pinData={pinData}
        loading={payLoanLoading}
        onPinConfirm={handlePayLoan}
        onClose={clearConfirmLoan}
      />
    </DashboardLayout>
  );
};

LoanDetails.propTypes = {
  loan: PropTypes.objectOf(PropTypes.any),
  setPaymentOption: PropTypes.func,
  paymentOption: PropTypes.string,
  handleConfirmPayLoan: PropTypes.func,
  confirmLoanLoading: PropTypes.func,
  payLoanLoading: PropTypes.func,
  payLoanModal: PropTypes.bool,
  setPayLoanModal: PropTypes.func,
  confirmLoanData: PropTypes.objectOf(PropTypes.any),
  openPinModal: PropTypes.objectOf(PropTypes.any),
  setOpenPinModal: PropTypes.func,
  setUserPinDigit: PropTypes.func,
  userPinDigit: PropTypes.string,
  pinErrors: PropTypes.objectOf(PropTypes.any),
  pinData: PropTypes.objectOf(PropTypes.any),
  handlePayLoan: PropTypes.func,
  clearConfirmLoan: PropTypes.func,
  walletList: PropTypes.arrayOf(PropTypes.any),
};

LoanDetails.defaultProps = {
  loan: {},
  setPaymentOption: () => {},
  paymentOption: 'Total',
  handleConfirmPayLoan: () => {},
  confirmLoanLoading: () => {},
  payLoanLoading: () => {},
  payLoanModal: false,
  setPayLoanModal: () => {},
  confirmLoanData: {},
  openPinModal: {},
  setOpenPinModal: () => {},
  setUserPinDigit: () => {},
  userPinDigit: '',
  pinErrors: {},
  pinData: {},
  handlePayLoan: () => {},
  clearConfirmLoan: () => {},
  walletList: [],
};

export default LoanDetails;
