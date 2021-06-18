/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import { useHistory, Prompt, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import PayPalForm from './PayPalForm';
import './AddMoney.scss';
import DashboardLayout from 'components/common/DashboardLayout';
import GoBack from 'components/common/GoBack';
import BankForm from './BankForm';
import getLinkedBankAccounts from 'redux/actions/walletsAndBanks/getLinkedBankAccounts';
import InfoMessage from 'components/common/InfoMessage';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import MyWallets from 'components/common/WalletCarousselSelector';
import 'react-datepicker/dist/react-datepicker.css';
import DisplayProviders from 'components/common/DisplayProviders';
import TopUpCreditCardImg from 'assets/images/topup-credit.svg';
import PaypalImg from 'assets/images/paypal-provider.svg';
import BankImg from 'assets/images/bankImg.svg';
import ConfirmAddMoney from './ConfirmAddMoney';
import CreditCardForm from './CreditCardForm';
import ShowStep from './ShowStep';
import Step1Img from 'assets/images/step1.svg';
import Step2Img from 'assets/images/step2.svg';
import Step3Img from 'assets/images/step3.svg';
import levelOneVisited from 'assets/images/level-one-visited.svg';
import levelTwoVisited from 'assets/images/level-two-visited.svg';
import levelThreeVisited from 'assets/images/level-three-visited.svg';
import ConfirmTopUpFromBank from './ConfirmTopUpFromBank';
import ConfirmPayPal from './ConfirmPayPal';

const defaultOptions = [
  { key: 'usd', text: 'USD', value: 'USD' },
  { key: 'eur', text: 'EUR', value: 'EUR' },
  { key: 'gbp', text: 'GBP', value: 'GBP' },
  { key: 'cad', text: 'CAD', value: 'CAD' },
  { key: 'aud', text: 'AUD', value: 'AUD' },
];

const AddMoney = ({
  handleInputChange,
  addMoneyData,
  userData,
  myWallets,
  selectWallet,
  cardOperationFees,
  addMoneyFromCreditCard,
  errors,
  handleSubmit,
  clearAddMoneyData,
  setAddMoneyData,
  handlePullPayPal,
  addMoneyFromPayPal,
  handleSubmitPayPal,
  payPalOperationFees,
  handleTopUpFromBank,
  onBankFormChange,
  bankForm,
  setBankForm,
  PIN,
  setPIN,
  selectedWallet,
}) => {
  const [date, setDate] = useState('');
  const [oneSuccess, setOneSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [selectedWalletNumber, setSelectedWalletNumber] = useState(
    '',
  );
  const [topUpFromCreditCard, setTopUpFromCreditCard] = useState(
    false,
  );
  const [step, setStep] = useState(1);
  const [levelOne, setLevelOne] = useState(false);
  const [levelTwo, setLevelTwo] = useState(false);
  const [levelThree, setLevelThree] = useState(false);
  const [topUpPaypalCard, setTopUpPaypalCard] = useState(false);
  const [topUpFromBank, setTopUpFromBank] = useState(false);
  const cvvRef = useRef(null);
  const { loading, success, error } = addMoneyFromCreditCard;
  const [openPINModal, setOpenPINModal] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const onClickHandler = () => history.goBack();
  const { Currency } = addMoneyData;

  const { justAdded } = addMoneyFromCreditCard;

  useEffect(() => {
    if (location.state?.wallet) {
      const { AccountNumber } = location.state.wallet;
      setSelectedWalletNumber(AccountNumber);
    }
  }, [myWallets]);

  useEffect(() => {
    if (justAdded) {
      setOneSuccess(true);
    }
  }, [justAdded]);

  const handleDateChange = () => {
    handleInputChange({
      target: { name: 'date', value: date },
    });
  };

  useEffect(() => {
    handleDateChange();
    if (cardOperationFees.success) setOpen(true);
  }, [date, cardOperationFees]);

  useEffect(() => {
    const option = defaultOptions.find(
      option => option.value === Currency,
    );

    const newOptions = option
      ? defaultOptions
      : [
          ...defaultOptions,
          {
            key: Currency.toLowerCase(),
            text: Currency,
            value: Currency,
          },
        ];

    setOptions(newOptions);
  }, [Currency]);
  const { MM, YYYY } = addMoneyData;

  const justSuccessful = !!MM?.length && !!YYYY?.length && oneSuccess;

  const formIsHalfFilledOut =
    Object.values(addMoneyData).filter(item => item && item !== '')
      .length > 2 && !justSuccessful;
  const [selectedMonth, setSelectedMonth] = useState();

  const CustomInput = ({ value, onClick }) => {
    useEffect(() => {
      if (value !== date) {
        setDate(value);
      }
    }, [value]);
    return (
      <Form.Input
        value={date}
        onClick={onClick}
        error={errors.date || false}
        placeholder={global.translate('Date')}
      />
    );
  };

  useEffect(() => {
    getLinkedBankAccounts()(dispatch);
  }, []);

  const handleBackEvent = () => {
    setStep(step - 1);
    setLevelTwo(false);
  };
  const checkTopUpCreditCard = () => {
    setTopUpFromCreditCard(true);
    setTopUpPaypalCard(false);
    setTopUpFromBank(false);
  };
  const checkTopUpPayPal = () => {
    setTopUpFromCreditCard(false);
    setTopUpPaypalCard(true);
    setTopUpFromBank(false);
  };
  const checkTopUpBank = () => {
    setTopUpFromCreditCard(false);
    setTopUpPaypalCard(false);
    setTopUpFromBank(true);
  };
  useEffect(() => {
    if (success) {
      setTopUpFromCreditCard(false);
      setTopUpPaypalCard(false);
      setTopUpFromBank(false);
      setLevelOne(true);
      setLevelTwo(false);
      setLevelThree(false);
    }
  }, [success]);
  useEffect(() => {
    if (location?.state?.bankItem) {
      setBankForm(form => ({
        ...form,
        bankAccount: location?.state?.bankItem,
      }));
      checkTopUpBank();
    }
  }, [location?.state?.bankItem]);
  useEffect(() => {
    if (step === 1) {
      setLevelOne(true);
      setLevelTwo(false);
      setLevelThree(false);
    }
  }, [step]);
  useEffect(() => {
    if (step === 2) {
      setLevelTwo(true);
      setLevelThree(false);
    }
  }, [step]);
  useEffect(() => {
    if (step === 3) {
      setLevelThree(true);
    }
  }, [step]);

  const handleNavigateSteps = step => {
    setStep(step);
  };

  const linkedBankAccounts = useSelector(
    ({
      walletsAndBanks: {
        linkedBankAccounts: { data },
      },
    }) => data,
  );

  return (
    <>
      <Prompt
        when={formIsHalfFilledOut}
        message={JSON.stringify({
          header: global.translate('Confirm', 1750),
          content: global.translate(
            'You have unsaved changes, Are you sure you want to leave?',
            1751,
          ),
        })}
      />

      <DashboardLayout>
        <WelcomeBar loading={userData.loading}>
          <div className="head-content">
            <div className="go-back">
              <GoBack style onClickHandler={onClickHandler} />
            </div>
            <h2 className="head-title">
              {global.translate('Top Up your wallet', 1209)}
            </h2>
            <div className="clear" />
          </div>
        </WelcomeBar>
        <div className="clear" />
        <div className="wrap__container">
          <div className="display-steps">
            <ShowStep
              title={global.translate('Select', 2129)}
              subTitle={global.translate(
                'Choose a provider and wallet',
                2130,
              )}
              levelNumber={levelOne ? levelOneVisited : Step1Img}
              visited={levelOne}
              onClick={handleNavigateSteps}
              number={1}
            />
            <ShowStep
              title={global.translate('Top Up', 542)}
              subTitle={global.translate(
                'Add money to your wallet',
                2131,
              )}
              levelNumber={levelTwo ? levelTwoVisited : Step2Img}
              visited={levelTwo}
              onClick={handleNavigateSteps}
              number={2}
            />
            <ShowStep
              title={global.translate('Confirm', 1750)}
              subTitle={global.translate('Review and confirm', 2138)}
              levelNumber={levelThree ? levelThreeVisited : Step3Img}
              visited={levelThree}
              onClick={handleNavigateSteps}
              number={3}
            />
          </div>

          <div className="add-money-container">
            {step === 1 && (
              <div className="providers-box">
                <MyWallets
                  myWallets={myWallets}
                  selectWallet={selectWallet}
                  selectedWalletNumber={selectedWalletNumber}
                />

                <h3>{global.translate('Choose a provider', 2170)}</h3>
                <DisplayProviders
                  providerLogo={TopUpCreditCardImg}
                  title={global.translate('Prepaid card')}
                  subTitle={global.translate(
                    'Top up money from any major credit card',
                    2133,
                  )}
                  onClick={checkTopUpCreditCard}
                  ticked={topUpFromCreditCard}
                />
                <DisplayProviders
                  providerLogo={PaypalImg}
                  title={global.translate('Paypal')}
                  subTitle={global.translate(
                    'Top Up money from your paypal account',
                  )}
                  onClick={checkTopUpPayPal}
                  ticked={topUpPaypalCard}
                />

                {linkedBankAccounts?.length === 0 && (
                  <InfoMessage
                    description={global.translate(
                      'To top up from a bank account, you need to have at least one bank account linked to your 2U Money account',
                    )}
                    actionLabel={global.translate('Link an account')}
                    actionHandler={() =>
                      history.push({
                        pathname: '/wallets',
                        state: {
                          activeTab: 1,
                          openModal: true,
                        },
                      })
                    }
                  />
                )}
                <DisplayProviders
                  providerLogo={BankImg}
                  title={global.translate("Bank account")}
                  subTitle={global.translate(
                    'Top Up money from your bank account',
                    2135,
                  )}
                  onClick={checkTopUpBank}
                  ticked={topUpFromBank}
                  disabled={linkedBankAccounts?.length === 0}
                />
                <Button
                  disabled={
                    !topUpFromBank &&
                    !topUpPaypalCard &&
                    !topUpFromCreditCard
                  }
                  positive
                  onClick={() => setStep(step + 1)}
                >
                  {global.translate('Next', 10)}
                </Button>
              </div>
            )}
            {step === 2 && topUpFromCreditCard && (
              <CreditCardForm
                errors={errors}
                addMoneyData={addMoneyData}
                handleInputChange={handleInputChange}
                options={options}
                cvvRef={cvvRef}
                cardOperationFees={cardOperationFees}
                handleSubmit={handleSubmit}
                step={step}
                setStep={setStep}
                handleBackEvent={handleBackEvent}
                addMoneyFromCreditCard={addMoneyFromCreditCard}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                CustomInput={CustomInput}
              />
            )}
            {step === 2 && topUpPaypalCard && (
              <PayPalForm
                errors={errors}
                addMoneyData={addMoneyData}
                handleInputChange={handleInputChange}
                options={options}
                step={step}
                setStep={setStep}
                handleBackEvent={handleBackEvent}
                setAddMoneyData={setAddMoneyData}
                addMoneyFromPayPal={addMoneyFromPayPal}
                handleSubmitPayPal={handleSubmitPayPal}
                payPalOperationFees={payPalOperationFees}
              />
            )}

            {step === 3 && topUpFromCreditCard && (
              <ConfirmAddMoney
                step={step}
                setStep={setStep}
                addMoneyData={addMoneyData}
                cardOperationFees={cardOperationFees}
                addMoneyFromCreditCard={addMoneyFromCreditCard}
                clearAddMoneyData={clearAddMoneyData}
                setLevelThree={setLevelThree}
              />
            )}

            {step === 2 && topUpFromBank && (
              <BankForm
                form={bankForm}
                onChange={onBankFormChange}
                setStep={setStep}
              />
            )}

            {step === 3 && topUpFromBank && (
              <ConfirmTopUpFromBank
                step={step}
                setStep={setStep}
                addMoneyData={bankForm}
                topUpFromBank={handleTopUpFromBank}
                PIN={PIN}
                setPIN={setPIN}
                openPINModal={openPINModal}
                setOpenPINModal={setOpenPINModal}
              />
            )}
            {step === 3 && payPalOperationFees?.success && (
              <ConfirmPayPal
                step={step}
                setStep={setStep}
                addMoneyData={addMoneyData}
                payPalOperationFees={payPalOperationFees}
                addMoneyFromPayPal={addMoneyFromPayPal}
                handlePullPayPal={handlePullPayPal}
                clearAddMoneyData={clearAddMoneyData}
                setLevelThree={setLevelThree}
              />
            )}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

AddMoney.propTypes = {
  userData: PropTypes.instanceOf(Object),
  addMoneyData: PropTypes.instanceOf(Object).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  errors: PropTypes.instanceOf(Object),
  handleSubmit: PropTypes.func.isRequired,
  myWallets: PropTypes.instanceOf(Object).isRequired,
  cardOperationFees: PropTypes.instanceOf(Object),
  addMoneyFromCreditCard: PropTypes.instanceOf(Object),
  selectWallet: PropTypes.func.isRequired,
  clearAddMoneyData: PropTypes.func,
};

AddMoney.defaultProps = {
  userData: {
    data: {},
  },
  errors: {},
  cardOperationFees: {
    success: false,
  },
  addMoneyFromCreditCard: {
    success: false,
  },
  clearAddMoneyData: () => null,
};
export default AddMoney;
