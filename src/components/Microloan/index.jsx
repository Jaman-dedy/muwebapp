import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Image, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import DashboardLayout from 'components/common/DashboardLayout';
import GoBack from 'components/common/GoBack';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import microLoanImg from 'assets/images/microloan/micro-loan.svg';
import dangerCross from 'assets/images/microloan/danger-cross.svg';
import listPlaceHolder from 'assets/images/microloan/load-loans.svg';
import ModalInfo from 'components/common/ModalInfo';
import ListLoan from './ListLoan';
import './style.scss';

const MicroLoan = ({ listData, listLoading, userData }) => {
  const {
    applyLoan: { data: applyLoanData },
    payLoan: { data: payLoanData },
  } = useSelector(({ microloan }) => microloan);

  const [isEligible, setIsEligible] = useState(true);
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [modalIcon, setModalIcon] = useState(null);
  const [buttonText, setButtonText] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [accountVerify, setAccountVerify] = useState(null);
  const [hasAnOpenLoan, setHasAnOpenLoan] = useState(null);
  const [
    accountAgeSuitableForLoan,
    setAccountAgeSuitableForLoan,
  ] = useState(null);

  useEffect(() => {
    if (userData) {
      setAccountVerify(userData?.AccountVerified);
      setAccountAgeSuitableForLoan(
        userData?.AccountAgeSuitableForLoan,
      );
      setHasAnOpenLoan(userData?.HasAnOpenLoan);
    }
  }, [userData]);

  useEffect(() => {
    if (applyLoanData) {
      setAccountVerify(applyLoanData.AccountVerified);
      setAccountAgeSuitableForLoan(
        applyLoanData.AccountAgeSuitableForLoan,
      );
      setHasAnOpenLoan(applyLoanData.ActiveLoan);
    }
    if (payLoanData) {
      setAccountVerify(payLoanData.AccountVerified);
      setAccountAgeSuitableForLoan(
        payLoanData.AccountAgeSuitableForLoan,
      );
      setHasAnOpenLoan(payLoanData.ActiveLoan);
    }
  }, [applyLoanData, payLoanData]);

  const history = useHistory();
  const onClickHandler = () => history.goBack();

  useEffect(() => {
    if (
      accountAgeSuitableForLoan === 'YES' &&
      accountVerify === 'YES' &&
      hasAnOpenLoan === 'NO'
    ) {
      setIsEligible(true);
      const disclaimerText = global.translate('Disclaimer');
      setTitle(disclaimerText);
      setBody(
        <>
          <p>
            {global.translate(
              'Please note that short term loans are intended as a short-term measure to help cover urgent financials needs.',
            )}
          </p>{' '}
          <p>
            {global.translate(
              'They are not intended as an ongoing solution to long-term credit problems. Customers experiencing protracted financial difficulties should consult a professional credit counselor for a permanent solution',
            )}
          </p>
        </>,
      );
      const text = global.translate('Agree & Continue');
      setButtonText(text);
    }
    if (
      accountAgeSuitableForLoan === 'YES' &&
      accountVerify === 'YES' &&
      hasAnOpenLoan === 'YES'
    ) {
      setIsEligible(false);
      const titleText = global.translate('You are not eligible yet');
      setTitle(titleText);
      const bodyText = global.translate(
        'Your account has an active loan. Only accounts that have not active loan can apply for a loan',
      );
      setBody(bodyText);
      setModalIcon(dangerCross);
      setButtonText('Okay', 2554);
    }
    if (
      accountAgeSuitableForLoan === 'NO' &&
      accountVerify === 'YES' &&
      hasAnOpenLoan === 'YES'
    ) {
      setIsEligible(false);
      const titleText = global.translate('You are not eligible yet');
      setTitle(titleText);
      const bodyText = global.translate(
        'Your account is not yet suitable for a loan. Only six months old or older accounts can apply for a loan. Months left to be eligible: 1',
      );
      setBody(bodyText);
      setModalIcon(dangerCross);
      setButtonText('Okay');
    }
    if (accountVerify === 'NO') {
      setIsEligible(false);
      const titleText = global.translate('You are not eligible yet');
      setTitle(titleText);
      const bodyText = global.translate(
        'Your account is not yet suitable for a loan. Only verified accounts can apply for a loan. Upload all the necessary document for your account to be verified',
      );
      setBody(bodyText);
      setModalIcon(dangerCross);
      setButtonText('Okay', 2554);
    }
  }, [hasAnOpenLoan, accountVerify, accountAgeSuitableForLoan]);
  return (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title">
            {global.translate('Microloans')}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className="micro-container">
        {listLoading && (
          <div className="loan-placeholder ">
            <Image
              src={listPlaceHolder}
              className="animate-placeholder"
            />
          </div>
        )}
        {listData?.length === 0 && !listLoading && (
          <div className="request-loan-container">
            <div className="micro-img">
              <Image src={microLoanImg} />
            </div>
            <div>
              <h3>{global.translate('Microloans')}</h3>
              <div>
                {global.translate(
                  'Request a microloan and get your money directly into your wallet just in seconds',
                )}
              </div>
              <Button
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                <Icon name="plus" />
                {global.translate('Request a loan')}
              </Button>
            </div>
          </div>
        )}
        {!listLoading && listData?.length !== 0 && (
          <ListLoan
            listData={listData}
            setOpenModal={setOpenModal}
            loading={listLoading}
          />
        )}
      </div>
      <ModalInfo
        open={openModal}
        setOpen={setOpenModal}
        title={title}
        body={body}
        icon={modalIcon}
        isEligible={isEligible}
        buttonText={buttonText}
      />
    </DashboardLayout>
  );
};
MicroLoan.propTypes = {
  listData: PropTypes.arrayOf(PropTypes.any),
  listLoading: PropTypes.bool,
  userData: PropTypes.objectOf(PropTypes.any),
};
MicroLoan.defaultProps = {
  listData: [],
  listLoading: false,
  userData: {},
};

export default MicroLoan;
