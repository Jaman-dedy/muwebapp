import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  Modal,
  Button,
  Input,
  Checkbox,
  Message as InfoMessage,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-input-2';
import NumberFormat from 'react-number-format';
import { clearConfirmation } from 'redux/actions/moneyTransfer/confirmTransaction';
import '../SendMoney/modal.scss';
import './TopUp.scss';

import ReusableDrowdown from 'components/common/Dropdown/ReusableDropdown';
import LoaderComponent from 'components/common/Loader';
import Message from 'components/common/Message';
import Wrapper from 'hoc/Wrapper';
import { updateMoneyTransferStep } from 'redux/actions/dashboard/dashboard';

import countryCodes from 'utils/countryCodes';
import formatNumber from 'utils/formatNumber';
import { getPossibleDates } from 'utils/monthdates';

import ConfirmationForm from '../../ConfirmationForm';
import TransactionEntity from '../SendMoney/TransactionEntity';

const countries = countryCodes;
const TopUpModal = ({
  open,
  userData,
  setOpen,
  walletList,
  destinationContact,
  setDestinationContact,
  errors,
  onOptionsChange,
  form,
  balanceOnWallet,
  setForm,
  currency,
  checkTransactionConfirmation,
  checking,
  confirmationError,
  confirmationData,
  moveFundsToToUWallet,
  loading,
  error,
  isSendingCash,
  setErrors,
  step,
  setPhonePrefix,
  resetState,
  appCountries,
  currentOption,
  setCurrentOption,
  userLocationData,
  transactionType,
  providersListOption,
  currentProviderOption,
  setCurrentProviderOption,
  loadProvidersList,
  isSelfBuying,
  dispatch,
  setIsSelfBuying,
  myPhoneNumbers,
  selectedPhoneNumber,
  setSelectedPhoneNumber,
  isTopingUp,
  isSendingOthers,
  loadProvidersCountries,
  currentPhone,
  setCurrentPhone,
  phoneValue,
  setPhoneValue,
  saveAccount,
  setSaveAccount,
  currentBankAccount,
  setCurrentBankAccount,
  setVerifyAccount,
  moveToNextStep,
  nextStep,
  setAccountValue,
  setNextStep,
}) => {
  const [buttonAction, setButtonAction] = useState();
  const defaultCountry = countries.find(
    country => country.flag === userLocationData.CountryCode,
  );
  const { language: { preferred } = {} } = useSelector(
    ({ user }) => user,
  );
  const [country, setCountry] = useState({});
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  const [options, setOptions] = useState([]);

  const [shouldClear, setShouldClear] = useState(false);

  useEffect(() => {
    if (error) {
      if (
        Array.isArray(error) &&
        error[0].UserLoginCorrect === 'FALSE'
      ) {
        setShouldClear(true);
      }
    }
  }, [error]);

  useEffect(() => {
    const newOptions =
      currentOption &&
      currentOption.Currencies &&
      currentOption.Currencies.map(i => {
        const v = Object.values(i);
        return {
          key: v[0],
          text: v[0],
          value: v[0],
        };
      });

    setOptions(newOptions);
  }, [currentOption]);

  useEffect(() => {
    if (defaultCountry) {
      setCountry(defaultCountry);
    } else if (destinationContact) {
      const phoneCountry =
        destinationContact.PhonePrefix !== ''
          ? countryCodes.find(
              item =>
                item.value === `+${destinationContact.PhonePrefix}`,
            )
          : null;
      const defaultCountry = phoneCountry
        ? countries.find(
            country =>
              country?.flag?.toLowerCase() ===
              phoneCountry?.flag?.toLowerCase(),
          )
        : {};
      setCountry(defaultCountry);
    }
  }, [defaultCountry, destinationContact]);

  useEffect(() => {
    setPhonePrefix(defaultCountry?.value);
  }, [defaultCountry]);

  useEffect(() => {
    if (userLocationData.CountryCode !== '') {
      setCountry(
        countries.find(
          country => country.flag === userLocationData.CountryCode,
        ),
      );
    }
  }, [userLocationData]);

  useEffect(() => {
    if (country) {
      setPhonePrefix(country.value);
    }
  }, [country]);

  useEffect(() => {
    if (!destinationContact) {
      onOptionsChange(
        {},
        {
          name: 'addToContact',
          value: checked,
        },
      );
    }
  }, [destinationContact]);

  const defaultOption =
    walletList && walletList.find(item => item.Default === 'YES');
  const [currentOpt, setCurrentOpt] = useState({});
  useEffect(() => {
    if (defaultOption) {
      setCurrentOpt(defaultOption);
    }
  }, [defaultOption]);
  useEffect(() => {
    if (step === 3) {
      setOpen(false);
      setErrors(null);

      setDestinationContact(null);
      if (isTopingUp) {
        resetState();
      }
      setForm({
        ...form,
        sourceWallet: userData?.data?.DefaultWallet,
      });

      setCurrentOpt(defaultOption);
    }
  }, [step]);
  useEffect(() => {
    if (
      destinationContact &&
      destinationContact?.CountryCode &&
      destinationContact?.CountryCode.length > 0
    ) {
      setCurrentOption(
        appCountries &&
          appCountries.find(
            c =>
              c?.CountryCode?.toUpperCase() ===
              destinationContact?.CountryCode?.toUpperCase(),
          ),
      );
    }
  }, [destinationContact]);
  useEffect(() => {
    if (
      destinationContact &&
      destinationContact.Country &&
      destinationContact.Country.length > 0
    ) {
      setCurrentOption(
        appCountries &&
          appCountries.find(
            country =>
              country.CountryCode?.toUpperCase() ===
              destinationContact.Country?.toUpperCase(),
          ),
      );
    }
  }, [destinationContact]);

  useEffect(() => {
    if (step === 1) {
      if (
        currentProviderOption?.Category === '0' ||
        currentProviderOption?.Category === '19'
      ) {
        setButtonAction(global.translate('Transfer money', 1950));
        setVerifyAccount(false);
      } else {
        setButtonAction(global.translate('Verify', 1296));
        setVerifyAccount(false);
      }
      if (
        confirmationData &&
        confirmationData?.[0]?.TargetAccountVerified === 'YES'
      ) {
        setButtonAction(global.translate('NEXT', 10));
        setVerifyAccount(true);
      }
    }
  }, [currentProviderOption, confirmationData]);

  const days = getPossibleDates().map(item => ({
    key: item.day,
    value: item.day,
    text: item.val,
  }));

  return (
    <Modal
      size="small"
      open={open}
      onClose={() => {
        resetState();
      }}
      closeOnDimmerClick={false}
      closeOnDocumentClick={false}
      onOpen={() => {
        setOpen(false);
      }}
    >
      {destinationContact && transactionType === 'TOP_UP' && (
        <Modal.Header centered className="modal-title">
          {isTopingUp && global.translate(`Buy Airtime for `, 1554)}
          {isSendingOthers &&
            global.translate(`Transfer money to `, 2154)}
          {<strong>&nbsp;{destinationContact.FirstName}</strong>}
        </Modal.Header>
      )}
      {step === 1 && (
        <Modal.Content className="entities">
          <div className="entities">
            <TransactionEntity
              data={userData}
              id={1}
              currentOption={currentOpt}
              setCurrentOption={setCurrentOpt}
              isSendingCash={isSendingCash}
              name="sourceWallet"
              form={form}
              walletList={walletList}
              onChange={onOptionsChange}
              destinationContact={destinationContact}
              isSelfBuying={isSelfBuying}
            />{' '}
          </div>
          <div className="remaining-money-shade">
            <h4 className="available">
              {global.translate(
                'Available Balance in the Selected Wallet',
                1223,
              )}
              <p className="available-value">
                {formatNumber(balanceOnWallet, {
                  locales: preferred,
                  currency,
                })}
              </p>
            </h4>
          </div>
          <div className="wrap-topup-form">
            <Wrapper>
              {appCountries?.[0].CountryFound !== 'NO' ? (
                <div className="dest-country-bank">
                  <div className="country">
                    <div className="choose-dest-country">
                      {global.translate('Destination Country', 689)}
                    </div>
                    {!loadProvidersCountries ? (
                      <ReusableDrowdown
                        options={appCountries}
                        currentOption={currentOption}
                        onChange={e => {
                          onOptionsChange(e, {
                            name: 'CountryCode',
                            value: e.target.value,
                          });
                        }}
                        search
                        setCurrentOption={setCurrentOption}
                        placeholder={global.translate(
                          'Select a country',
                          2179,
                        )}
                      />
                    ) : (
                      <LoaderComponent />
                    )}
                  </div>
                  <div className="currency">
                    <p className="choose-dest-country">
                      {global.translate(`Providers in `, 1733)}
                      &nbsp;
                      <strong>
                        {(currentOption &&
                          currentOption?.CountryName) ||
                          currentOption?.Title}
                      </strong>
                    </p>
                    {loadProvidersList ? (
                      <LoaderComponent />
                    ) : (
                      <ReusableDrowdown
                        options={providersListOption}
                        currentOption={currentProviderOption}
                        onChange={e => {
                          onOptionsChange(e, {
                            name: 'OperatorName',
                            value: e.target.value,
                          });
                        }}
                        setCurrentOption={setCurrentProviderOption}
                        placeholder={global.translate(
                          'Select a provider',
                          1734,
                        )}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="dest-country-bank">
                  <InfoMessage info>
                    <p>{global.translate(`No providers yet`)}</p>
                  </InfoMessage>
                </div>
              )}

              {!isTopingUp && (
                <div className="phone-bank">
                  {currentProviderOption?.Category === '4' ? (
                    <>
                      {destinationContact?.BankAccountCount !==
                        '0' && (
                        <>
                          {' '}
                          <div>
                            <span>
                              {global.translate(
                                `Select a bank account number`,
                              )}
                            </span>
                            <ReusableDrowdown
                              options={
                                destinationContact &&
                                destinationContact.BankAccounts
                              }
                              currentOption={
                                currentBankAccount &&
                                currentBankAccount
                              }
                              onChange={e => {
                                onOptionsChange(e, {
                                  name: 'AccountNumber',
                                  value: e.target.value,
                                });
                              }}
                              setCurrentOption={setCurrentBankAccount}
                            />
                          </div>
                        </>
                      )}
                      {!currentBankAccount && (
                        <div className="new-dest-bank">
                          <br />
                          <span>
                            {global.translate(
                              `Provide a new bank account number`,
                            )}
                          </span>
                          <br />
                          <NumberFormat
                            className="new-bank-account"
                            format={
                              currentProviderOption?.AccountPattern
                            }
                            mask="_"
                            onValueChange={values => {
                              const {
                                formattedValue,
                                value,
                              } = values;
                              setAccountValue({
                                number: formattedValue,
                              });
                            }}
                          />
                          <div>
                            <span>
                              {currentProviderOption?.AccountPattern}
                            </span>
                          </div>
                          <div>
                            {destinationContact?.ContactType ===
                              'INTERNAL' && (
                              <Checkbox
                                disabled={
                                  !form.AccountNumber ||
                                  !!currentBankAccount?.Title
                                }
                                style={{ marginTop: '10px' }}
                                label={global.translate(
                                  `Save bank account number`,
                                )}
                                checked={saveAccount}
                                onChange={() =>
                                  setSaveAccount(!saveAccount)
                                }
                              />
                            )}
                          </div>
                        </div>
                      )}

                      <div
                        style={{
                          marginTop: '5px',
                          marginBottom: '5px',
                        }}
                      >
                        {' '}
                        {confirmationData &&
                          confirmationData[0].AccountName && (
                            <span>Account name :</span>
                          )}
                        <strong>
                          &nbsp;
                          {confirmationData &&
                            confirmationData[0].AccountName}
                        </strong>
                      </div>
                      {confirmationData?.[0]?.VerificationError && (
                        <Message
                          style={{ marginTop: '-17px' }}
                          message={confirmationData?.[0]?.Description}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      {!currentPhone && (
                        <div className="add-new-phone">
                          <div style={{ margin: '10px 0 10px 0' }}>
                            {global.translate(
                              `Provide a new phone number`,
                              2168,
                            )}
                          </div>
                          <PhoneInput
                            enableSearch
                            value={phoneValue}
                            onChange={phone => setPhoneValue(phone)}
                          />
                        </div>
                      )}

                      <div>
                        {confirmationData &&
                          confirmationData[0].AccountName && (
                            <span> Account name :</span>
                          )}
                        <strong>
                          &nbsp;
                          {confirmationData &&
                            confirmationData[0].AccountName}
                        </strong>
                        {confirmationData?.[0]?.VerificationError && (
                          <Message
                            style={{
                              marginTop: '-17px',
                              width: '68%',
                            }}
                            message={global.translate(
                              'Account not found',
                            )}
                          />
                        )}
                      </div>
                    </>
                    // )
                  )}
                </div>
              )}
              {isSelfBuying && (
                <div className="dest-counties medium-padding-top">
                  <div className="small-padding-bottom">
                    {global.translate('Select a number', 1998)}
                  </div>{' '}
                  <ReusableDrowdown
                    options={myPhoneNumbers}
                    currentOption={selectedPhoneNumber}
                    onChange={e => {
                      onOptionsChange(e, {
                        name: 'PhoneNumber',
                        value: e.target.value,
                      });
                    }}
                    setCurrentOption={setSelectedPhoneNumber}
                  />
                </div>
              )}
              <div className="wrap-money-input">
                <div>{global.translate('Amount', 116)}</div>
                <div className="money-input">
                  <Input
                    type="number"
                    name="amount"
                    placeholder={global.translate('Amount', 116)}
                    onChange={onOptionsChange}
                    value={form.amount || null}
                  />
                  <span>{currency}</span>
                </div>
              </div>
              <div className="loader-section">
                {errors && <Message message={errors} />}
                {confirmationError && confirmationError[0] && (
                  <Message
                    message={
                      confirmationError[0].Description
                        ? global.translate(
                            confirmationError[0].Description,
                          )
                        : global.translate(confirmationError.error)
                    }
                  />
                )}
                {confirmationError && !confirmationError[0] && (
                  <Message
                    message={global.translate(
                      confirmationError.error,
                    )}
                  />
                )}
              </div>
            </Wrapper>
          </div>
        </Modal.Content>
      )}
      {step === 2 && confirmationData && confirmationData[0] && (
        <ConfirmationForm
          confirmationData={confirmationData[0]}
          onOptionsChange={onOptionsChange}
          form={form}
          shouldClear={shouldClear}
          setShouldClear={setShouldClear}
          errors={errors}
          error={error}
          loading={loading}
          days={days}
        />
      )}

      <Modal.Actions>
        <>
          {step !== 1 && step !== 3 && (
            <Button
              disabled={checking || loading}
              basic
              color="red"
              onClick={() => {
                updateMoneyTransferStep(1)(dispatch);
                clearConfirmation()(dispatch);
                setNextStep(false);
              }}
            >
              {global.translate('Back')}
            </Button>
          )}

          {step !== 3 && (
            <Button
              disabled={checking || loading}
              basic
              color="red"
              onClick={() => {
                setOpen(!open);
                setForm({
                  sourceWallet: userData?.data?.DefaultWallet,
                });
                setErrors(null);
                resetState();
                setDestinationContact(null);
                setCurrentProviderOption(null);
                setIsSelfBuying(false);
                setPhoneValue();
                setCurrentPhone(null);
                setCurrentBankAccount(null);
                setCurrentOpt(defaultOption || {});
                setAccountValue(null);
                setNextStep(false);

                if (history?.location?.state?.isFromContactInfo) {
                  history.goBack();
                }
              }}
            >
              {global.translate('Cancel', 86)}
            </Button>
          )}
          <Button
            positive
            disabled={checking || loading}
            loading={checking || loading}
            onClick={() => {
              if (step === 1) {
                checkTransactionConfirmation();
              }
              if (
                nextStep &&
                !confirmationData?.[0]?.VerificationError
              ) {
                moveToNextStep();
              }
              if (step === 2) {
                setCurrentProviderOption(null);
                moveFundsToToUWallet();
                setIsSelfBuying(false);
              }
            }}
          >
            <>
              {isTopingUp && global.translate('Buy Airtime', 1552)}
              {isSendingOthers && buttonAction}
            </>
          </Button>
        </>
      </Modal.Actions>
    </Modal>
  );
};

TopUpModal.propTypes = {
  open: PropTypes.bool,
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  setOpen: PropTypes.func,
  walletList: PropTypes.arrayOf(PropTypes.any),
  destinationContact: PropTypes.objectOf(PropTypes.any).isRequired,
  onOptionsChange: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  balanceOnWallet: PropTypes.string,
  setForm: PropTypes.func,
  currency: PropTypes.string,
  checkTransactionConfirmation: PropTypes.func,
  checking: PropTypes.bool,
  confirmationError: PropTypes.objectOf(PropTypes.any).isRequired,
  confirmationData: PropTypes.objectOf(PropTypes.any).isRequired,
  moveFundsToToUWallet: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  setErrors: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  setPhonePrefix: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired,
  setDestinationContact: PropTypes.func,
  errors: PropTypes.string,
  isSendingCash: PropTypes.bool,
  appCountries: PropTypes.arrayOf(PropTypes.any).isRequired,
  currentOption: PropTypes.objectOf(PropTypes.any).isRequired,
  setCurrentOption: PropTypes.func.isRequired,
  userLocationData: PropTypes.objectOf(PropTypes.any).isRequired,
  transactionType: PropTypes.string,
  providersListOption: PropTypes.objectOf(PropTypes.any),
  currentProviderOption: PropTypes.objectOf(PropTypes.any),
  setCurrentProviderOption: PropTypes.func,
  loadProvidersList: PropTypes.bool,
  canSetProviderPlaceHolder: PropTypes.bool,
  isSelfBuying: PropTypes.bool,
  setIsSelfBuying: PropTypes.func,
  myPhoneNumbers: PropTypes.string,
  selectedPhoneNumber: PropTypes.string,
  setSelectedPhoneNumber: PropTypes.func,
  isTopingUp: PropTypes.bool,
  isSendingOthers: PropTypes.bool,
  loadProvidersCountries: PropTypes.bool,
  phoneOptions: PropTypes.arrayOf(PropTypes.any).isRequired,
  currentPhone: PropTypes.objectOf(PropTypes.any).isRequired,
  setCurrentPhone: PropTypes.func.isRequired,
  phoneValue: PropTypes.string.isRequired,
  setPhoneValue: PropTypes.func.isRequired,
  saveAccount: PropTypes.bool.isRequired,
  setSaveAccount: PropTypes.func.isRequired,
  currentBankAccount: PropTypes.objectOf(PropTypes.any).isRequired,
  setCurrentBankAccount: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  setVerifyAccount: PropTypes.func.isRequired,
  moveToNextStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  setAccountValue: PropTypes.func.isRequired,
  setNextStep: PropTypes.func.isRequired,
};

TopUpModal.defaultProps = {
  moveFundsToToUWallet: () => {},
  loading: false,
  errors: null,
  setDestinationContact: () => {},
  currency: null,
  checkTransactionConfirmation: () => {},
  checking: false,
  balanceOnWallet: 0,
  setForm: () => {},
  onOptionsChange: () => {},
  setOpen: () => {},
  walletList: [],
  open: false,
  isSendingCash: PropTypes.bool,
  transactionType: null,
  providersListOption: {},
  currentProviderOption: {},
  setCurrentProviderOption: () => {},
  loadProvidersList: false,
  canSetProviderPlaceHolder: false,
  isSelfBuying: false,
  setIsSelfBuying: false,
  myPhoneNumbers: null,
  selectedPhoneNumber: {},
  setSelectedPhoneNumber: () => {},
  isTopingUp: false,
  isSendingOthers: false,
  loadProvidersCountries: false,
};
export default TopUpModal;
