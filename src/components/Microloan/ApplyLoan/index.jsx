import React, { useState, useEffect } from 'react';
import {
  Table,
  Input,
  Dropdown,
  Image,
  Button,
} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import PeopleWithdrawImg from 'assets/images/people-loan.svg';
import DashboardLayout from 'components/common/DashboardLayout';
import GoBack from 'components/common/GoBack';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import WalletDropDown from 'components/common/WalletDropDown';
import caretImg from 'assets/images/microloan/wallet-carret.svg';
import confirmationPlaceholder from 'assets/images/microloan/load-confirmation.svg';
import './style.scss';
import InfoMessage from 'components/common/Alert/InfoMessage';
import DangerMessage from 'components/common/Alert/DangerMessage';
import { getPossibleDates } from 'utils/monthLoansdates';
import useWindowSize from 'utils/useWindowSize';
import PINConfirmationModal from 'components/common/PINConfirmationModal';
import DayMonth from '../DayMonth';

const ApplyLoan = ({
  walletList,
  setCurrentOption,
  currentOption,
  onOptionChange,
  handleOnClick,
  duration,
  setPayDay,
  payDay,
  buttonDisabled,
  checkLoanLoading,
  checkLoanData,
  checkLoanEligibility,
  checkLoanError,
  applyForALoan,
  applyLoanLoading,
  openPinModal,
  setOpenPinModal,
  setPIN,
  PIN,
}) => {
  const history = useHistory();
  const { width } = useWindowSize();

  const [checkLoanErrorMessage, setCheckLoanErrorMessage] = useState(
    null,
  );
  const [displayLimit, setDisplayLimit] = useState(null);
  const onClickHandler = () => history.goBack();
  const days = getPossibleDates().map(item => ({
    key: item.day,
    value: item.day,
    text: item.val,
  }));

  useEffect(() => {
    if (checkLoanError?.error) {
      if (checkLoanError?.error[0]?.MaxLoanAmount) {
        setDisplayLimit(checkLoanError?.error[0]?.MaxLoanAmount);
      }
      if (checkLoanError?.error[0]?.Text1) {
        const errorMessage = `${checkLoanError?.error[0]?.Text1} ${
          checkLoanError?.error?.[0]?.Text2
            ? checkLoanError?.error?.[0]?.Text2
            : ''
        } ${
          checkLoanError?.error?.[0]?.Text3
            ? checkLoanError?.error?.[0]?.Text3
            : ''
        }`;
        setCheckLoanErrorMessage(errorMessage);
      } else {
        const errorMessage = checkLoanError?.error[0]?.Description;
        setCheckLoanErrorMessage(errorMessage);
      }
    }
  }, [checkLoanError]);

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
      <div className="apply-loan-container">
        <h3>{global.translate('Apply for an instant loan')}</h3>
        <div className="apply-loan-content">
          <div className="apply-left-side">
            <div className="apply-box-item">
              {global.translate('Select a wallet')}
            </div>
            <div className="apply-box-wallet">
              {walletList && walletList.length > 0 && (
                <WalletDropDown
                  walletList={walletList}
                  setCurrentOption={setCurrentOption}
                  currentOption={currentOption}
                />
              )}
            </div>
            <div>
              <div className="apply-box-item">
                {global.translate('Amount')}
              </div>
              <div className="amount-input">
                <Input
                  label={{
                    basic: true,
                    content: currentOption?.CurrencyCode,
                  }}
                  labelPosition="right"
                  name="amount"
                  onChange={onOptionChange}
                />
              </div>
              <div className="apply-info-message">
                <InfoMessage
                  description={global.translate(
                    'The monthly payment amount will be withdrawn automatically from your wallet every month.',
                  )}
                />
              </div>
              <div>
                <div className="apply-box-item">
                  {global.translate('Loan term')}
                </div>
                <div className="date-box-flex">
                  <DayMonth
                    day="3"
                    onClick={handleOnClick}
                    selected={duration === '3'}
                  />
                  <DayMonth
                    day="6"
                    onClick={handleOnClick}
                    selected={duration === '6'}
                  />
                  <DayMonth
                    day="9"
                    onClick={handleOnClick}
                    selected={duration === '9'}
                  />
                  <DayMonth
                    day="12"
                    onClick={handleOnClick}
                    selected={duration === '12'}
                  />
                  <DayMonth
                    day="24"
                    onClick={handleOnClick}
                    selected={duration === '24'}
                  />
                </div>
              </div>
              <div>
                <div className="apply-box-item">
                  {global.translate('Day of payment')}
                </div>
                <div className="select-day">
                  <Dropdown
                    text={
                      <div className="text-content">
                        <div className="wallet-content">
                          <div>{payDay?.text}</div>
                        </div>
                        <Image src={caretImg} />
                      </div>
                    }
                    className="select-pay-wallet"
                  >
                    <Dropdown.Menu>
                      <Dropdown.Menu scrolling>
                        {days.map(option => (
                          <>
                            {' '}
                            <Dropdown.Item
                              onClick={() => {
                                setPayDay(option);
                              }}
                              key={option.value}
                              {...option}
                            />
                            <Dropdown.Divider />
                          </>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              {checkLoanError && (
                <div className="apply-info-message">
                  <DangerMessage
                    description={checkLoanErrorMessage}
                  />
                </div>
              )}
            </div>
            <div className="show__on-big">
              <Button
                disabled={buttonDisabled}
                loading={checkLoanLoading}
                onClick={() => {
                  checkLoanEligibility();
                  if (checkLoanData) {
                    setOpenPinModal(true);
                  }
                }}
              >
                {checkLoanData
                  ? global.translate('Apply now')
                  : global.translate('Next')}
              </Button>
            </div>
          </div>
          {checkLoanLoading && (
            <div className="load-confirm-loan">
              {' '}
              <Image
                src={confirmationPlaceholder}
                className="animate-placeholder"
              />
            </div>
          )}
          {!checkLoanData && !checkLoanLoading && width > 1439 && (
            <div className="apply-right-side">
              <div className="right-placeHolder">
                <div>
                  <Image src={PeopleWithdrawImg} />
                </div>
                <div className="right-text">
                  {global.translate(
                    'We are offering you the easiest and quickest way to get a loan.',
                  )}
                </div>
              </div>
            </div>
          )}
          {checkLoanData && (
            <div className="apply-right-side">
              <h3>{global.translate('Summary')}</h3>
              <Table basic="very">
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      {global.translate('Wallet number')}
                      <div className="amount">
                        <strong>{checkLoanData?.WalletNumber}</strong>{' '}
                      </div>
                    </Table.Cell>
                    <Table.Cell />
                    <Table.Cell />
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      {global.translate('Interest amount')}
                      <div className="amount">
                        {checkLoanData?.Currency}{' '}
                        <strong>
                          {checkLoanData?.TotalInterrest}
                        </strong>{' '}
                      </div>
                    </Table.Cell>
                    <Table.Cell />
                    <Table.Cell />
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      {global.translate('Monthly payment')}
                      <div className="amount">
                        <strong>
                          {checkLoanData?.MonthlyPayment}
                        </strong>
                      </div>
                    </Table.Cell>
                    <Table.Cell />
                    <Table.Cell />
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      {global.translate('Total amount to be paid')}
                      <div className="amount">
                        {checkLoanData?.Currency}{' '}
                        <strong>
                          {checkLoanData?.TotalToPayBack}
                        </strong>
                      </div>
                    </Table.Cell>
                    <Table.Cell />
                    <Table.Cell />
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          )}

          <div className="show__on-small">
            <Button
              disabled={buttonDisabled}
              loading={checkLoanLoading}
              onClick={() => {
                checkLoanEligibility();
                if (checkLoanData) {
                  setOpenPinModal(true);
                }
              }}
            >
              {checkLoanData
                ? global.translate('Apply now')
                : global.translate('Next')}
            </Button>
          </div>
        </div>
      </div>
      <PINConfirmationModal
        open={openPinModal}
        setOpen={setOpenPinModal}
        setPIN={setPIN}
        PIN={PIN}
        loading={applyLoanLoading}
        onPinConfirm={applyForALoan}
        onClose={() => setOpenPinModal(false)}
      />
    </DashboardLayout>
  );
};

ApplyLoan.propTypes = {
  walletList: PropTypes.func,
  setCurrentOption: PropTypes.func,
  currentOption: PropTypes.objectOf(PropTypes.any),
  onOptionChange: PropTypes.func,
  handleOnClick: PropTypes.func,
  duration: PropTypes.string,
  setPayDay: PropTypes.func,
  payDay: PropTypes.string,
  buttonDisabled: PropTypes.bool,
  checkLoanLoading: PropTypes.bool,
  checkLoanData: PropTypes.objectOf(PropTypes.any),
  checkLoanEligibility: PropTypes.func,
  checkLoanError: PropTypes.objectOf(PropTypes.any),
  applyForALoan: PropTypes.func,
  applyLoanLoading: PropTypes.bool,
  openPinModal: PropTypes.bool,
  setOpenPinModal: PropTypes.func,
  setUserPinDigit: PropTypes.func,
  userPinDigit: PropTypes.string,
  pinErrors: PropTypes.objectOf(PropTypes.any),
  pinData: PropTypes.objectOf(PropTypes.any),
  clearCheckEligibility: PropTypes.func,
  setPIN: PropTypes.func.isRequired,
  PIN: PropTypes.string.isRequired,
};
ApplyLoan.defaultProps = {
  walletList: () => {},
  setCurrentOption: () => {},
  currentOption: {},
  onOptionChange: () => {},
  handleOnClick: () => {},
  duration: '',
  setPayDay: () => {},
  payDay: '',
  buttonDisabled: false,
  checkLoanLoading: false,
  checkLoanData: {},
  checkLoanEligibility: () => {},
  checkLoanError: {},
  applyForALoan: () => {},
  applyLoanLoading: false,
  openPinModal: false,
  setOpenPinModal: () => {},
  setUserPinDigit: () => {},
  userPinDigit: '',
  pinErrors: {},
  pinData: {},
  clearCheckEligibility: () => {},
};

export default ApplyLoan;
