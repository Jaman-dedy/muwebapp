import React from 'react';
import { Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import PayLoanModal from '../PayLoanModal';

const PaymentAction = ({
  payLoanModal,
  setPayLoanModal,
  loan,
  paymentOption,
  setPaymentOption,
  handleConfirmPayLoan,
  confirmLoanLoading,
  payLoanLoading,
  confirmLoanData,
  walletList,
}) => {
  return (
    <div className="pay-detail-info">
      <h4>{global.translate('Pay prior to due date', 2448)}</h4>
      <div>
        {global.translate(
          'Pay on time helps you to increase your credit scores and stay on top of your finances.',
          2548,
        )}
      </div>
      <Button onClick={() => setPayLoanModal(true)}>
        <Icon name="plus" /> {global.translate('Repay now', 2449)}
      </Button>
      <PayLoanModal
        open={payLoanModal}
        setOpen={setPayLoanModal}
        loan={loan}
        paymentOption={paymentOption}
        setPaymentOption={setPaymentOption}
        handleConfirmPayLoan={handleConfirmPayLoan}
        confirmLoanLoading={confirmLoanLoading}
        payLoanLoading={payLoanLoading}
        confirmLoanData={confirmLoanData}
        walletList={walletList}
      />
    </div>
  );
};

PaymentAction.propTypes = {
  payLoanModal: PropTypes.bool,
  setPayLoanModal: PropTypes.func,
  loan: PropTypes.objectOf(PropTypes.any),
  setPaymentOption: PropTypes.func,
  paymentOption: PropTypes.string,
  handleConfirmPayLoan: PropTypes.func,
  confirmLoanLoading: PropTypes.func,
  payLoanLoading: PropTypes.func,
  confirmLoanData: PropTypes.objectOf(PropTypes.any),
  walletList: PropTypes.arrayOf(PropTypes.any),
};
PaymentAction.defaultProps = {
  payLoanModal: false,
  setPayLoanModal: () => {},
  loan: {},
  setPaymentOption: () => {},
  paymentOption: 'Total',
  handleConfirmPayLoan: () => {},
  confirmLoanLoading: () => {},
  payLoanLoading: () => {},
  confirmLoanData: {},
  walletList: [],
};

export default PaymentAction;
