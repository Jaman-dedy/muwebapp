import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Image, Input, Button } from 'semantic-ui-react';

import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import PeopleWithdrawImg from 'assets/images/people-withdraw.svg';
import GoBack from 'components/common/GoBack';
import WalletDropDown from 'components/common/WalletDropDown';
import LoadWalletImg from 'assets/images/withdraw/load-wallet.svg';
import Info from 'components/common/Alert/Info';
import TransactionDetails from 'components/common/CashoutDetails';
import loadConfirmationImg from 'assets/images/withdraw/load-confirmation.svg';
import PINConfirmationModal from 'components/common/PINConfirmationModal';
import AlertDanger from 'components/common/Alert/Danger';
import useWindowSize from 'utils/useWindowSize';

const SendToPayPal = ({
  walletList,
  setCurrentOption,
  currentOption,
  onOptionChange,
  form,
  handleConfirmTransaction,
  checking,
  confirmationData,
  setOpenPinModal,
  openPinModal,
  pinData,
  loadMoveFund,
  handleCashOut,
  setPIN,
  PIN,
  confirmationError,
}) => {
  const history = useHistory();
  const onClickHandler = () => history.goBack();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (!currentOption || !form?.amount || !form?.email) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [currentOption, form]);

  return (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title">
            {global.translate('Transfer to a payPal account')}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className="cash-out-container">
        <div className="cash-out-forms">
          <div className="left-side">
            <h3>
              {global.translate('Transfer to a PayPal account')}
            </h3>
            {walletList?.length !== 0 ? (
              <>
                <div className="cash-out-title">
                  {global.translate('Select wallet')}
                </div>

                <div className="wallet-select">
                  <WalletDropDown
                    walletList={walletList}
                    setCurrentOption={setCurrentOption}
                    currentOption={currentOption}
                  />
                </div>
              </>
            ) : (
              <div className="load-data">
                <Image
                  src={LoadWalletImg}
                  className="animate-placeholder"
                />
              </div>
            )}

            <div>
              <div className="cash-out-title">
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
                  value={form?.amount}
                  onChange={onOptionChange}
                  placeholder={global.translate('Amount')}
                />
              </div>
            </div>

            <div>
              <div className="cash-out-title">
                {global.translate('Recipient email')}
              </div>
              <div className="amount-input">
                {' '}
                <Input
                  name="email"
                  value={form?.email}
                  placeholder={global.translate('Email')}
                  onChange={onOptionChange}
                />
              </div>
            </div>
            <Info
              message={global.translate(
                'The recipient email should be associated to a PayPal account',
              )}
            />
            {confirmationError && (
              <AlertDanger message={confirmationError.Description} />
            )}
          </div>
          {!confirmationData && !checking && width > 1100 && (
            <div className="right-side">
              <div className="right-placeHolder">
                <div>
                  <Image src={PeopleWithdrawImg} />
                </div>
                <div className="right-text">
                  {global.translate(
                    'We are offering you the easiest and quickest way to transfer money to your paypal account.',
                  )}
                </div>
              </div>
            </div>
          )}
          {confirmationData && !checking && (
            <TransactionDetails
              confirmationData={confirmationData}
              payPal
            />
          )}

          {checking && (
            <div className="right-side animate-placeholder">
              <Image src={loadConfirmationImg} />
            </div>
          )}
        </div>
        <Button
          disabled={buttonDisabled}
          onClick={() => {
            if (!confirmationData) {
              handleConfirmTransaction();
            } else {
              setOpenPinModal(true);
            }
          }}
          loading={checking}
        >
          {!confirmationData
            ? global.translate('Next')
            : global.translate('Send')}
        </Button>
      </div>
      <PINConfirmationModal
        setOpen={setOpenPinModal}
        open={openPinModal}
        pinData={pinData}
        onPinConfirm={handleCashOut}
        loading={loadMoveFund}
        setPIN={setPIN}
        PIN={PIN}
      />
    </DashboardLayout>
  );
};

SendToPayPal.propTypes = {
  walletList: PropTypes.arrayOf(PropTypes.any),
  setCurrentOption: PropTypes.func,
  currentOption: PropTypes.objectOf(PropTypes.any),
  onOptionChange: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any),
  handleConfirmTransaction: PropTypes.func,
  checking: PropTypes.bool,
  confirmationData: PropTypes.objectOf(PropTypes.any),
  setOpenPinModal: PropTypes.func,
  openPinModal: PropTypes.bool,
  pinData: PropTypes.objectOf(PropTypes.any),
  loadMoveFund: PropTypes.bool,
  handleCashOut: PropTypes.func,
  setPIN: PropTypes.func,
  PIN: PropTypes.string,
};
SendToPayPal.defaultProps = {
  walletList: [],
  setCurrentOption: () => {},
  currentOption: {},
  onOptionChange: () => {},
  form: {},
  handleConfirmTransaction: () => {},
  checking: false,
  confirmationData: {},
  setOpenPinModal: () => {},
  openPinModal: false,
  pinData: {},
  loadMoveFund: false,
  handleCashOut: () => {},
  setPIN: () => {},
  PIN: PropTypes.string,
};

export default SendToPayPal;
