/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './Dashboard.scss';
import DashboardLayout from 'components/common/DashboardLayout';
import MoneyTransferIcon from 'assets/images/DashTransferIcon.svg';
import AddMoneyIcon from 'assets/images/DashMoneyIcon.svg';
import MyWalletIcon from 'assets/images/DashWalletIcon.svg';
import ContactIcon from 'assets/images/DashContactsIcon.svg';
import ServicesIcon from 'assets/images/DashServicesIcon.svg';
import DashCreditCardIcon from 'assets/images/TransCreditCard.svg';
import DefaultWalletContainer from 'containers/Dashboard/defaultWallet';
import GraphDataContainer from 'containers/Dashboard/cumulativeGraph';
import UserCurrenciesContainer from 'containers/Dashboard/userCurrencies';
import ChartModal from 'components/Chat/ChatModal';
import StatusBar from './StatusBar';
import CardComponent from '../common/BottomMenu/Card';
import TourSteps from './tourSteps';

const Dashboard = ({ userData, authData, chartList: { open } }) => {
  const [tourStep, setTourStep] = useState(null);
  const [firstTourStep, setFirstTourStep] = useState(false);
  const [secondTourStep, setSecondTourStep] = useState(false);
  const [thirdTourStep, setThirdTourStep] = useState(false);
  const [fourthTourStep, setFourthTourStep] = useState(false);
  const [fithTourStep, setFithTourStep] = useState(false);
  const [sixthTourStep, setSixthTourStep] = useState(false);
  const [seventhTourStep, setSeventhTourStep] = useState(false);

  useEffect(() => {
    if (userData?.data) {
      if (userData.data?.FirstTimeLogin === 'YES') {
        setTourStep(1);
      }
    }
  }, [userData]);
  useEffect(() => {
    if (tourStep === 1) {
      setFirstTourStep(true);
    }
    if (tourStep === 2) {
      setFirstTourStep(false);
      setSecondTourStep(true);
    }
    if (tourStep === 3) {
      setSecondTourStep(false);
      setThirdTourStep(true);
    }
    if (tourStep === 4) {
      setThirdTourStep(false);
      setFourthTourStep(true);
    }
    if (tourStep === 5) {
      setFourthTourStep(false);
      setFithTourStep(true);
    }
    if (tourStep === 6) {
      setFithTourStep(false);
      setSixthTourStep(true);
    }
    if (tourStep === 7) {
      setSixthTourStep(false);
      setSeventhTourStep(true);
    }
    if (tourStep === 8) {
      setSeventhTourStep(false);
      setTourStep(null);
    }
  }, [tourStep]);

  const handleNextStep = () => {
    setTourStep(tourStep + 1);
  };
  const history = useHistory();
  const getStatusMessage = () => {
    if (authData && authData.DOBSet === 'NO') {
      return {
        message: global.translate(
          'Your date of birth is not set yet.',
          465,
        ),
        type: 'DOB',
      };
    }
    if (authData && authData.QuestionsSet === 'NO') {
      return {
        message: global.translate(
          'You have not set your security questions.',
          466,
        ),
        type: 'SecurityQuestion',
      };
    }

    if (authData && authData.KYCDocReceived === 'NO') {
      return {
        message: global.translate(
          'You have not yet uploaded your Identification documents.',
          474,
        ),
        type: 'IdDocs',
      };
    }
    return null;
  };

  const onEdit = () => {
    if (getStatusMessage()) {
      history.push(
        `/account-management?target=${getStatusMessage().type}`,
      );
    }
  };
  const tourStepHeader = `Hello ${userData?.data?.FirstName}`;
  const firstStepBodyContent = (
    <p style={{ textAlign: 'justify' }}>
      {global.translate(`Click on this Money transfer button to start transacting with your contacts`, 1923)}
      <span aria-label="enjoy" role="img">
        😀
      </span>
    </p>
  );
  const secondStepBodyContent = (
    <p style={{ textAlign: 'justify' }}>
      {global.translate(`Add money to your wallets using your credit card`, 1924)}{' '}
      <span aria-label="enjoy" role="img">
        😀
      </span>
    </p>
  );
  const thirdStepBodyContent = (
    <p style={{ textAlign: 'justify' }}>
      {global.translate(`Click on this button to manage your wallets`, 1925)}{' '}
      <span aria-label="enjoy" role="img">
        😀
      </span>
    </p>
  );
  const fourthStepBodyContent = (
    <p style={{ textAlign: 'justify' }}>
      {global.translate(`Transact with and manage your contacts`, 1926)}{' '}
      <span aria-label="enjoy" role="img">
        😀
      </span>
    </p>
  );
  const fithStepBodyContent = (
    <p style={{ textAlign: 'justify' }}>
      {global.translate(`Find services offered by people near you. Offer your services`, 1927)}{' '}
      <span aria-label="enjoy" role="img">
        😀
      </span>
    </p>
  );
  const sithStepBodyContent = (
    <p style={{ textAlign: 'justify' }}>
      {global.translate(`View and manage your credit cards`, 1928)}{' '}
      <span aria-label="enjoy" role="img">
        😀
      </span>
    </p>
  );
  const seventhStepBodyContent = (
    <p style={{ textAlign: 'justify' }}>
      {global.translate(`View your transactions`, 1929)},{' '}
      <span aria-label="enjoy" role="img">
        {' '}
        😄{' '}
      </span>
      enjoy
    </p>
  );
  return (
    <>
      <ChartModal open={open} />
      <DashboardLayout>
        <div className="dashboard">
          {getStatusMessage() && (
            <div className="dashboard-content-wrapper">
              <StatusBar
                onEdit={onEdit}
                message={global.translate(getStatusMessage().message)}
              />
            </div>
          )}
          <div className="dashboard-content-wrapper">
            <div className="dash__left">
              <div className="dash_welcome">
                <div loading={userData.loading}>
                  <h2 className="dash-title">
                    <span className="font-light">
                      {global.translate('Hello,', 1237)}
                    </span>{' '}
                    <br />
                    <span className="bold">
                      {userData.data
                        ? `${userData.data.FirstName}`
                        : ''}
                      !
                    </span>
                  </h2>
                  <div>
                    {global.translate(
                      'Welcome to the future of mobile money and money transfer',
                      1776,
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="dash__right">
              <div className="dash__card">
                <DefaultWalletContainer />
              </div>
            </div>
          </div>
          <div className="dashboard-content-wrapper position-switcher">
            <div className="dash__left">
              <div className="services">
                <h2 className="bold dash-title medium-v-padding">
                  {global.translate(
                    'What would you like to do?',
                    1706,
                  )}
                </h2>
                <div className="to-u-services">
                  <TourSteps
                    bodyContent={firstStepBodyContent}
                    setOpen={setSecondTourStep}
                    userData={userData}
                    open={secondTourStep}
                    content={tourStepHeader}
                    tourStep={tourStep}
                    setTourStep={setTourStep}
                    handleNextStep={handleNextStep}
                    trigger={
                      <CardComponent
                        image={MoneyTransferIcon}
                        title="Money transfer"
                        to="/money-transfer"
                        subtitle={global.translate(
                          `Transfer funds to a wallet`,
                          1951,
                        )}
                      />
                    }
                  />
                  <TourSteps
                    bodyContent={secondStepBodyContent}
                    setOpen={setSecondTourStep}
                    userData={userData}
                    open={secondTourStep}
                    content={tourStepHeader}
                    tourStep={tourStep}
                    setTourStep={setTourStep}
                    handleNextStep={handleNextStep}
                    trigger={
                      <CardComponent
                        image={AddMoneyIcon}
                        title={global.translate('Add money', 89)}
                        to="/add-money"
                        subtitle={global.translate(`Add money to your wallet using your credit card`, 1921)}
                      />
                    }
                  />

                  <TourSteps
                    bodyContent={thirdStepBodyContent}
                    userData={userData}
                    open={thirdTourStep}
                    setOpen={setThirdTourStep}
                    content={tourStepHeader}
                    tourStep={tourStep}
                    setTourStep={setTourStep}
                    handleNextStep={handleNextStep}
                    trigger={
                      <CardComponent
                        image={MyWalletIcon}
                        title={global.translate('My wallets', 68)}
                        subtitle={global.translate(
                          'Manage my wallets',
                          142,
                        )}
                        to="/wallets"
                      />
                    }
                  />

                  <TourSteps
                    bodyContent={fourthStepBodyContent}
                    userData={userData}
                    open={fourthTourStep}
                    setOpen={setFourthTourStep}
                    content={tourStepHeader}
                    tourStep={tourStep}
                    setTourStep={setTourStep}
                    handleNextStep={handleNextStep}
                    trigger={
                      <CardComponent
                        image={ContactIcon}
                        title={global.translate('Contacts', 109)}
                        subtitle={global.translate(
                          'Manage my Contacts',
                          1195,
                        )}
                        to="/contacts"
                      />
                    }
                  />

                  <TourSteps
                    bodyContent={fithStepBodyContent}
                    open={fithTourStep}
                    setOpen={setFithTourStep}
                    content={tourStepHeader}
                    tourStep={tourStep}
                    setTourStep={setTourStep}
                    handleNextStep={handleNextStep}
                    trigger={
                      <CardComponent
                        image={ServicesIcon}
                        title={global.translate('Services', 1754)}
                        subtitle={global.translate(
                          'Find or offer a service',
                          1763,
                        )}
                        to="/services"
                      />
                    }
                  />

                  <TourSteps
                    bodyContent={sithStepBodyContent}
                    open={sixthTourStep}
                    setOpen={setSixthTourStep}
                    content={tourStepHeader}
                    tourStep={tourStep}
                    setTourStep={setTourStep}
                    handleNextStep={handleNextStep}
                    trigger={
                      <CardComponent
                        image={DashCreditCardIcon}
                        title={global.translate('Credit card', 726)}
                        subtitle={global.translate(
                          'View your credit card list',1770,
                        )}
                        to="/credit-cards"
                      />
                    }
                  />
                </div>
              </div>
            </div>
            <div className="dash__right">
              <div className="dash__card">
                <div className="currencies-container">
                  <UserCurrenciesContainer />
                </div>
              </div>
              <div className="dash__card">
                <div className="wrap__graph">
                  <h3 className="dash-title small-v-padding">
                    {global.translate('Transaction history')}
                  </h3>
                  <GraphDataContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

Dashboard.propTypes = {
  authData: PropTypes.objectOf(PropTypes.any),
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  chartList: PropTypes.objectOf(PropTypes.any),
};

Dashboard.defaultProps = {
  authData: {},
  chartList: {
    open: false,
  },
};
export default Dashboard;
