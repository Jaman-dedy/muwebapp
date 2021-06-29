import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Image, Button } from 'semantic-ui-react';
import PhoneInput from 'react-phone-input-2';
import PropTypes from 'prop-types';

import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';
import WalletDropDown from 'components/common/WalletDropDown';
import PeopleWithdrawImg from 'assets/images/people-withdraw.svg';
import loadConfirmationImg from 'assets/images/withdraw/load-confirmation.svg';
import CustomDropdown from 'components/common/Dropdown/CountryDropdown';
import LoadWalletImg from 'assets/images/withdraw/load-wallet.svg';
import LoadCountryImg from 'assets/images/withdraw/load-country.svg';
import AlertDanger from 'components/common/Alert/Danger';
import PINConfirmationModal from 'components/common/PINConfirmationModal';
import TransactionDetails from 'components/common/CashoutDetails';
import './style.scss';

const WithdrawMoney = ({
  walletList,
  setCurrentOption,
  currentOption,
  onOptionChange,
  setSelectedCountry,
  selectedCountry,
  phoneValue,
  setPhoneValue,
  supportedCountries,
  onCountryChange,
  buttonDisabled,
  confirmTransaction,
  checking,
  confirmationData,
  handleCashout,
  loadMoveFund,
  userData,
  setOpenPinModal,
  openPinModal,
  setPIN,
  PIN,
  form,
  confirmationError,
}) => {
  const history = useHistory();
  const onClickHandler = () => history.goBack();
  useEffect(() => {
    if (userData) {
      setPhoneValue(userData?.MainPhone);
    }
  }, [userData]);

  return (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title">
            {global.translate('Withdraw your money')}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className="cash-out-container">
        <div className="cash-out-forms">
          <div className="left-side">
            <h3>
              {global.translate(
                'Withdraw money from a nearby cashpoint',
              )}
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

            {supportedCountries ? (
              <div className="select-day">
                <div className="cash-out-title">
                  {global.translate('Pickup country')}
                </div>

                <CustomDropdown
                  options={supportedCountries}
                  currentOption={selectedCountry}
                  onChange={e => {
                    onCountryChange(e, {
                      name: 'CountryCode',
                      value: e.target.value,
                    });
                  }}
                  search
                  setCurrentOption={setSelectedCountry}
                />
              </div>
            ) : (
              <div
                className="load-data"
                style={{ marginTop: '10px' }}
              >
                <Image
                  src={LoadCountryImg}
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
                />
              </div>
            </div>
            {Object.keys(confirmationError)?.length !== 0 && (
              <AlertDanger message={confirmationError?.Description} />
            )}

            <div>
              <div className="cash-out-title">
                {global.translate('Phone number')}
              </div>
              <div className="phone-input">
                <PhoneInput
                  enableSearch
                  className="new-phone-number"
                  value={phoneValue}
                  onChange={phone => {
                    setPhoneValue(phone);
                  }}
                />
              </div>
            </div>
          </div>
          {!confirmationData && !checking && (
            <div className="right-side">
              <div className="right-placeHolder">
                <div>
                  <Image src={PeopleWithdrawImg} />
                </div>
                <div className="right-text">
                  {global.translate(
                    'We are offering you the easiest and quickest way to cashout money from your digital wallet.',
                  )}
                </div>
              </div>
            </div>
          )}
          {confirmationData && !checking && (
            <TransactionDetails confirmationData={confirmationData} />
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
              confirmTransaction();
            } else {
              setOpenPinModal(true);
            }
          }}
          loading={checking}
        >
          {' '}
          {!confirmationData
            ? global.translate('Next')
            : global.translate('Withdraw money')}
        </Button>
      </div>

      <PINConfirmationModal
        open={openPinModal}
        setOpen={setOpenPinModal}
        onPinConfirm={handleCashout}
        loading={loadMoveFund}
        PIN={PIN}
        setPIN={setPIN}
      />
    </DashboardLayout>
  );
};
WithdrawMoney.defaultProps = {
  walletList: [],
  setCurrentOption: () => {},
  currentOption: {},
  onOptionChange: () => {},
  setSelectedCountry: () => {},
  selectedCountry: {},
  phoneValue: '',
  setPhoneValue: () => {},
  supportedCountries: [],
  onCountryChange: () => {},
  buttonDisabled: false,
  confirmTransaction: () => {},
  checking: false,
  confirmationData: {},
  handleCashout: () => {},
  loadMoveFund: false,
  userData: {},
  setOpenPinModal: () => {},
  openPinModal: false,
  confirmationError: {},
  form: {},
  setPIN: () => {},
  PIN: '',
};
WithdrawMoney.propTypes = {
  walletList: PropTypes.arrayOf(PropTypes.any),
  setCurrentOption: PropTypes.func,
  currentOption: PropTypes.objectOf(PropTypes.any),
  onOptionChange: PropTypes.func,
  setSelectedCountry: PropTypes.func,
  selectedCountry: PropTypes.objectOf(PropTypes.any),
  phoneValue: PropTypes.string,
  setPhoneValue: PropTypes.func,
  supportedCountries: PropTypes.arrayOf(PropTypes.any),
  onCountryChange: PropTypes.func,
  buttonDisabled: PropTypes.bool,
  confirmTransaction: PropTypes.func,
  checking: PropTypes.bool,
  confirmationData: PropTypes.objectOf(PropTypes.any),
  handleCashout: PropTypes.func,
  loadMoveFund: PropTypes.bool,
  userData: PropTypes.objectOf(PropTypes.any),
  setOpenPinModal: PropTypes.func,
  openPinModal: PropTypes.bool,
  confirmationError: PropTypes.objectOf(PropTypes.any),
  form: PropTypes.objectOf(PropTypes.any),
  setPIN: PropTypes.func,
  PIN: PropTypes.string,
};
export default WithdrawMoney;
