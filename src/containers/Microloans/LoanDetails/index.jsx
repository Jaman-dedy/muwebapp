import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import confirmLoanAction, {
  clearConfirmLoan,
} from 'redux/actions/microloan/confirmLoan';
import payLoanAction from 'redux/actions/microloan/payLoan';
import { clearApplyLoan } from 'redux/actions/microloan/applyLoan';
import LoanDetailsComponent from 'components/Microloan/LoanDetails';

const LoanDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    confirmLoan: {
      data: confirmLoanData,
      loading: confirmLoanLoading,
    },
    payLoan: { data: payLoanData, loading: payLoanLoading },
  } = useSelector(({ microloan }) => microloan);
  const { myWallets } = useSelector(({ user }) => user);
  const [paymentOption, setPaymentOption] = useState('Total');
  const [openPinModal, setOpenPinModal] = useState(false);
  const [openPayLoanModal, setOpenPayLoanModal] = useState(false);
  const [PIN, setPIN] = useState('');
  const [loanItem, setLoanItem] = useState(null);

  const {
    state: { item },
  } = location;

  const handleConfirmPayLoan = () => {
    const confirmPaymentData = {
      PaymentType: paymentOption,
    };
    confirmLoanAction(confirmPaymentData)(dispatch);
  };

  useEffect(() => {
    clearConfirmLoan()(dispatch);
    clearApplyLoan()(dispatch);
  }, []);

  useEffect(() => {
    if (confirmLoanData) {
      setOpenPinModal(true);
      setOpenPayLoanModal(false);
      clearConfirmLoan()(dispatch);
    }
  }, [confirmLoanData]);

  useEffect(() => {
    if (payLoanData) {
      setOpenPinModal(false);
      setOpenPayLoanModal(false);
      setLoanItem(payLoanData);
    } else {
      setLoanItem(item);
    }
  }, [payLoanData, item]);

  const handlePayLoan = () => {
    const payLoanData = {
      PaymentType: paymentOption,
      PIN,
    };

    payLoanAction(payLoanData)(dispatch);
  };
  return (
    <LoanDetailsComponent
      loan={loanItem}
      setPaymentOption={setPaymentOption}
      paymentOption={paymentOption}
      handleConfirmPayLoan={handleConfirmPayLoan}
      confirmLoanLoading={confirmLoanLoading}
      payLoanLoading={payLoanLoading}
      handlePayLoan={handlePayLoan}
      payLoanModal={openPayLoanModal}
      setPayLoanModal={setOpenPayLoanModal}
      confirmLoanData={confirmLoanData}
      setOpenPinModal={setOpenPinModal}
      openPinModal={openPinModal}
      PIN={PIN}
      setPIN={setPIN}
      clearConfirmLoan={clearConfirmLoan}
      walletList={myWallets?.walletList}
    />
  );
};

export default LoanDetails;
