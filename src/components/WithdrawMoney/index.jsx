import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Image, Table, Button } from 'semantic-ui-react';
import PhoneInput from 'react-phone-input-2';
import PropTypes from 'prop-types';

import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';
import WalletDropDown from 'components/common/WalletDropDown';
import PeopleWithdrawImg from 'assets/images/people-withdraw.svg';
import loadConfirmationImg from 'assets/images/withdraw/load-confirmation.svg';
import CustomDropdown from 'components/common/Dropdown/CountryDropdown';
import './style.scss';
import PinModal from './PinModal';

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
  setUserPinDigit,
  userPinDigit,
  allErrors,
  pinData,
  form,
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
            {global.translate('Withdraw your money', 142)}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className="withdraw-container">
        <div className="withdraw-forms">
          <div className="left-side">
            <h3>
              {global.translate(
                'Withdraw money from a nearby cashpoint',
              )}
            </h3>
            <div className="withdraw-title">
              {global.translate('Select wallet')}
            </div>
            <div className="wallet-select">
              <WalletDropDown
                walletList={walletList}
                setCurrentOption={setCurrentOption}
                currentOption={currentOption}
              />
            </div>
            <div className="select-day">
              <div className="withdraw-title">
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
            <div>
              <div className="withdraw-title">
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

            <div>
              <div className="withdraw-title">
                {global.translate('Phone number')}
              </div>
              <div className="phone-input">
                <PhoneInput
                  disableDropdown
                  disabled
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
            <div className="right-side">
              <h3>{global.translate('Summary')}</h3>
              <Table basic="very">
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      {global.translate('Total amount')}
                      <div className="amount">
                        <strong>
                          {confirmationData[0].TotalAmount}
                        </strong>{' '}
                      </div>
                    </Table.Cell>
                    <Table.Cell />
                    <Table.Cell />
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      {global.translate('Amount to withdraw')}
                      <div className="amount">
                        <strong>
                          {confirmationData[0].AmountToBeSent}
                        </strong>{' '}
                      </div>
                    </Table.Cell>
                    <Table.Cell />
                    <Table.Cell />
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      {global.translate('Fees')}
                      <div className="amount">
                        <strong>{confirmationData[0].Fees}</strong>{' '}
                      </div>
                    </Table.Cell>
                    <Table.Cell />
                    <Table.Cell />
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      {global.translate('Exchange fees')}
                      <div className="amount">
                        <strong>
                          {confirmationData[0].ExchangeFees}
                        </strong>{' '}
                      </div>
                    </Table.Cell>
                    <Table.Cell />
                    <Table.Cell />
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      {global.translate('Exchange rate')}
                      <div className="amount">
                        <strong>
                          {confirmationData[0].ExchangeRate}
                        </strong>{' '}
                      </div>
                    </Table.Cell>
                    <Table.Cell />
                    <Table.Cell />
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
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
      <PinModal
        setOpenPinModal={setOpenPinModal}
        openPinModal={openPinModal}
        setUserPinDigit={setUserPinDigit}
        userPinDigit={userPinDigit}
        errors={allErrors}
        pinData={pinData}
        handleCashout={handleCashout}
        loading={loadMoveFund}
      />
    </DashboardLayout>
  );
};
WithdrawMoney.propTypes = {
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
  setUserPinDigit: () => {},
  userPinDigit: '',
  allErrors: {},
  pinData: {},
  form: {},
};
WithdrawMoney.defaultProps = {
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
  setUserPinDigit: PropTypes.func,
  userPinDigit: PropTypes.string,
  allErrors: PropTypes.objectOf(PropTypes.any),
  pinData: PropTypes.objectOf(PropTypes.any),
  form: PropTypes.objectOf(PropTypes.any),
};
export default WithdrawMoney;
