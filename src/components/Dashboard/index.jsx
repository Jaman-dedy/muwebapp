import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './Dashboard.scss';
import DashboardLayout from 'components/common/DashboardLayout';
import MoneyTransferIcon from 'assets/images/transactionsimage.png';
import AddMoneyIcon from 'assets/images/add_money_dash.png';
import MyWalletIcon from 'assets/images/my_wallet_dash.png';
import ContactIcon from 'assets/images/contact_icon_dash.png';
import CreditCardIcon from 'assets/images/white-c-card.svg';
import TransactionIcon from 'assets/images/lending.svg';
import ServicesIcon from 'assets/images/services.png';
import DefaultWalletContainer from 'containers/Dashboard/defaultWallet';
import GraphDataContainer from 'containers/Dashboard/cumulativeGraph';
import UserCurrenciesContainer from 'containers/Dashboard/userCurrencies';
import NetworthContainer from 'containers/Dashboard/networth';
import ChartModal from 'components/MessagingComponent/ChatModal';
import StatusBar from './StatusBar';
import WelcomeBar from './WelcomeSection';
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

    if (authData && authData.UserVerified === 'NO') {
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
      You can click on this Money transfert button to start
      transacting with your contacts{' '}
      <span aria-label="enjoy" role="img">
        😀
      </span>
    </p>
  );
  const secondStepBodyContent = (
    <p style={{ textAlign: 'justify' }}>
      let &apos;s get some money from your credit card to your wallet
      for your transactions{' '}
      <span aria-label="enjoy" role="img">
        😀
      </span>
    </p>
  );
  const thirdStepBodyContent = (
    <p style={{ textAlign: 'justify' }}>
      Click on this button to manage your wallets{' '}
      <span aria-label="enjoy" role="img">
        😀
      </span>
    </p>
  );
  const fourthStepBodyContent = (
    <p style={{ textAlign: 'justify' }}>
      You can now transact with and manage all your contacts by
      clicking on this button{' '}
      <span aria-label="enjoy" role="img">
        😀
      </span>
    </p>
  );
  const fithStepBodyContent = (
    <p style={{ textAlign: 'justify' }}>
      Now you can find services offered by people around you, you can
      also offer yours{' '}
      <span aria-label="enjoy" role="img">
        😀
      </span>
    </p>
  );
  const sithStepBodyContent = (
    <p style={{ textAlign: 'justify' }}>
      Click on this button to view and manage your credit cards{' '}
      <span aria-label="enjoy" role="img">
        😀
      </span>
    </p>
  );
  const seventhStepBodyContent = (
    <p style={{ textAlign: 'justify' }}>
      Find all your transactions by clicking on this button,{' '}
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
          <WelcomeBar loading={userData.loading}>
            <span className="welcome-text">
              {global.translate('Welcome', 1237)} &nbsp;
              <span className="bold">
                {userData.data ? `  ${userData.data.FirstName}` : ''}
              </span>
              ,
            </span>
          </WelcomeBar>
          {getStatusMessage() && (
            <StatusBar
              onEdit={onEdit}
              message={global.translate(getStatusMessage().message)}
            />
          )}
          <div className="dashboard-content-wrapper">
            <div className="top-section">
              <div className="wallet">
                <DefaultWalletContainer />
              </div>
              <div className="dash_graph1">
                <GraphDataContainer />
              </div>
            </div>
            <div className="currencies-container">
              <UserCurrenciesContainer />
            </div>
            <div className="networth-container">
              <NetworthContainer scope="WALLET" />
            </div>
            <div className="networth-container">
              <NetworthContainer scope="TOTAL" />
            </div>
          </div>
          <div className="services">
            <p className="sub-title">
              {global.translate('What would you like to do?', 1706)}
            </p>
            <div className="to-u-services">
              <TourSteps
                bodyContent={firstStepBodyContent}
                open={firstTourStep}
                setOpen={setFirstTourStep}
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
                      `Send money to your contacts`,
                      1198,
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
                    subtitle="Add money to your wallet using your credit card"
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
                    image={CreditCardIcon}
                    title={global.translate('Credit card', 726)}
                    subtitle={global.translate(
                      'View your credit card list',
                    )}
                    to="/credit-card-list"
                  />
                }
              />

              <TourSteps
                bodyContent={seventhStepBodyContent}
                userData={userData}
                open={seventhTourStep}
                setOpen={setSeventhTourStep}
                content={tourStepHeader}
                tourStep={tourStep}
                setTourStep={setTourStep}
                handleNextStep={handleNextStep}
                trigger={
                  <CardComponent
                    image={TransactionIcon}
                    title={global.translate('Transactions', 62)}
                    subtitle={global.translate(
                      'Transactions overview',
                    )}
                    to="/transactions"
                  />
                }
              />
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
