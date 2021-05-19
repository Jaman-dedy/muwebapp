import React, { useState, useEffect } from 'react';
import { Form, Button, Image, Input } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';
import WalletDropDown from 'components/common/WalletDropDown';
import getLinkedBankAccounts from 'redux/actions/walletsAndBanks/getLinkedBankAccounts';
import transferConfirmation, {
  clearConfirmation,
} from 'redux/actions/moneyTransfer/confirmTransaction';
import sendMoneyToBank, {
  clearSendMoneyToBank,
} from 'redux/actions/walletsAndBanks/sendMoneyToBank';
import PINConfirmationModal from 'components/common/PINConfirmationModal';
import MoneyIcon from 'assets/images/people-withdraw.svg';
import loadConfirmationImg from 'assets/images/withdraw/load-confirmation.svg';
import { updateMoneyTransferStep } from 'redux/actions/dashboard/dashboard';

import ErrorMessage from 'components/common/Alert/Danger';
import TransactionDetails from 'components/common/CashoutDetails';
import getWidth from 'utils/getWidth';

import './style.scss';

const SendMoneyToBank = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const deviceWidth = getWidth();
  const onClickHandler = () => history.goBack();
  const [currentOption, setCurrentOption] = useState({});
  const [bankOptions, setBankOptions] = useState([]);
  const [selectedBankAccount, setSelectedBankAccount] = useState({});
  const [openModal, setOPenModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [PIN, setPIN] = useState('');

  const { bankItem } = history.location.state;

  const userLocationData = useSelector(
    ({ user: { userLocationData } }) => userLocationData,
  );

  const moneyTransfer = useSelector(
    ({ dashboard: { moneyTransfer } }) => moneyTransfer,
  );

  const { confirmationError } = useSelector(
    ({ moneyTransfer: { confirmTransaction } }) => confirmTransaction,
  );

  const { checking, confirmationData } = useSelector(
    ({ moneyTransfer: { confirmTransaction } }) =>
      confirmTransaction || {},
  );

  const sendMoneyToBankAccount = useSelector(
    ({ walletsAndBanks: { sendMoneyToBankAccount } }) =>
      sendMoneyToBankAccount,
  );

  const handleTransferConfirmation = () => {
    const data = {
      SourceWallet: currentOption?.AccountNumber,
      CountryCode:
        userLocationData?.CountryCode ||
        selectedBankAccount?.CountryCode,
      TargetCurrency: selectedBankAccount?.Currency,
      TargetType: '4',
      Amount: amount,
    };
    transferConfirmation(data)(dispatch);
  };

  const { loadingUserData, walletList } = useSelector(
    ({
      user: {
        loading: loadingUserData,
        userData: {
          data: { Wallets },
        },
      },
    }) => ({ walletList: Wallets, loadingUserData }),
  );

  const { linkedBankAccounts } = useSelector(
    ({ walletsAndBanks }) => walletsAndBanks,
  );

  const selectBankHandler = (_, { value }) => {
    setSelectedBankAccount(value);
  };

  const handleOpenPINModal = () => {
    setOPenModal(true);
  };
  const handleClosePINModal = () => {
    setOPenModal(false);
  };

  const addMoneyToWalletHandler = () => {
    const data = {
      CountryCode:
        userLocationData?.CountryCode ||
        selectedBankAccount?.CountryCode,
      AccountNumber: selectedBankAccount?.AccountNumber,
      Amount: amount,
      BankCode: selectedBankAccount?.BankCode,
      Wallet: currentOption?.AccountNumber,
      PIN,
    };
    sendMoneyToBank(data)(dispatch);
  };

  useEffect(() => {
    clearSendMoneyToBank()(dispatch);
    clearConfirmation()(dispatch);
    updateMoneyTransferStep(1)(dispatch);
  }, [amount, currentOption, dispatch]);

  useEffect(() => {
    if (sendMoneyToBankAccount?.success) {
      setOPenModal(false);
      setPIN('');
      setAmount('');
      updateMoneyTransferStep(1)(dispatch);
      clearConfirmation()(dispatch);
      clearSendMoneyToBank()(dispatch);
      history.push({
        pathname: history.location.state.goBack
          ? '/wallets'
          : '/transactions',
        state: {
          activeTab: 1,
        },
      });
    }
  }, [sendMoneyToBankAccount?.success, history]);

  useEffect(() => {
    if (bankItem) {
      setSelectedBankAccount(bankItem);
    }
  }, [bankItem]);

  useEffect(() => {
    getLinkedBankAccounts()(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (walletList) {
      const defaultWallet = walletList.find(
        wallet => wallet.Default === 'YES',
      );
      setCurrentOption(defaultWallet);
    }
  }, [walletList]);

  useEffect(() => {
    if (Array.isArray(linkedBankAccounts?.data)) {
      setBankOptions(
        linkedBankAccounts?.data?.map(bank => ({
          key: bank?.AccountNumber,
          text: `${bank?.BankName} (${bank?.AccountNumber}) ${bank?.Currency}`,
          value: bank,
        })),
      );
    }
  }, [linkedBankAccounts?.data]);

  return (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title">
            {global.translate('Send money to your bank account')}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>

      <div className="send-to-bank">
        <h3 className="send-to-bank__title">
          {global.translate('Send money to your bank account')}
        </h3>

        <div className="send-money">
          <Form className="send-money__form">
            <Form.Field>
              <label>{global.translate('Select wallet')}</label>
              {!loadingUserData && walletList?.length && (
                <WalletDropDown
                  walletList={walletList}
                  setCurrentOption={setCurrentOption}
                  currentOption={currentOption}
                />
              )}
            </Form.Field>

            <Form.Field>
              <label>{global.translate('Select bank account')}</label>
              <Form.Dropdown
                options={bankOptions}
                onChange={selectBankHandler}
                value={selectedBankAccount}
                selection
                loading={linkedBankAccounts?.loading}
              />
            </Form.Field>
            <div className="form__field">
              <label>{global.translate('Amount')}</label>
              <Input
                value={amount}
                onChange={(_, { value }) => setAmount(value)}
                className="amount-input"
              />
            </div>

            {confirmationError?.error && (
              <ErrorMessage
                message={confirmationError?.error?.Description}
              />
            )}

            <div className="greater-than-600">
              <Button
                color="orange"
                loading={checking}
                disabled={
                  checking ||
                  (moneyTransfer?.step !== 2 && amount.length === 0)
                }
                onClick={
                  moneyTransfer?.step === 2
                    ? handleOpenPINModal
                    : handleTransferConfirmation
                }
              >
                {moneyTransfer?.step === 2
                  ? global.translate('Send money')
                  : global.translate('Verify')}
              </Button>
            </div>
          </Form>
          <div className="send-money__description">
            {checking && (
              <div className="right-side animate-placeholder">
                <Image src={loadConfirmationImg} />
              </div>
            )}
            {!confirmationData && !checking && (
              <div className="send-money__description--empty">
                <div className="greater-than-600">
                  <Image src={MoneyIcon} />
                </div>
                <p>
                  {global.translate(
                    'We are offering you the easiest and quickest way to cash out money from your digital wallet.',
                  )}
                </p>
              </div>
            )}
            {Array.isArray(confirmationData) &&
              moneyTransfer?.step === 2 && (
                <TransactionDetails
                  confirmationData={confirmationData}
                />
              )}

            <div className="less-than-600">
              <Button
                color="orange"
                loading={checking}
                style={{ marginTop: 10 }}
                disabled={
                  checking ||
                  (moneyTransfer?.step !== 2 && amount.length === 0)
                }
                onClick={
                  moneyTransfer?.step === 2
                    ? handleOpenPINModal
                    : handleTransferConfirmation
                }
              >
                {moneyTransfer?.step === 2
                  ? global.translate('Send money')
                  : global.translate('Verify')}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <PINConfirmationModal
        open={openModal}
        setOpen={setOPenModal}
        loading={sendMoneyToBankAccount?.loading}
        onPinConfirm={addMoneyToWalletHandler}
        oncClose={handleClosePINModal}
        PIN={PIN}
        setPIN={setPIN}
      />
    </DashboardLayout>
  );
};

export default SendMoneyToBank;
