import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Image, Table, Button } from 'semantic-ui-react';
import PhoneInput from 'react-phone-input-2';

import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';
import WalletDropDown from 'components/common/WalletDropDown';
import caretImg from 'assets/images/microloan/wallet-carret.svg';
import rwflag from 'assets/images/microloan/rw-flag.svg';
import loadConfirmationImg from 'assets/images/withdraw/load-confirmation.svg';
import countryOptions from 'utils/countries';
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
  // console.log('phone', userData?.MainPhoneNumber);
  const history = useHistory();
  const onClickHandler = () => history.goBack();

  useEffect(() => {
    if (userData) {
      setPhoneValue(userData.MainPhoneNumber);
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
                  country="rw"
                  enableSearch
                  className="new-phone-number"
                  value={phoneValue}
                  onChange={phone => {
                    setPhoneValue(phone);
                  }}
                />
              </div>
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
          {confirmationData && !checking && (
            <div className="right-side">
              <h3>{global.translate('Summary')}</h3>
              <Table basic="very">
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      {global.translate('Total amount')}
                      <div className="amount">
                        <strong>{confirmationData[0].Amount}</strong>{' '}
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
export default WithdrawMoney;
