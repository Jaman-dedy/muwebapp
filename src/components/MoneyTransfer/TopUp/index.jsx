import PropTypes from 'prop-types';
import 'react-phone-input-2/lib/style.css';
import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import PhoneInput from 'react-phone-input-2';
import { useSelector } from 'react-redux';
import {
  Button,
  Checkbox,
  Input,
  Label,
  Modal,
  Image,
} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import ReusableDrowdown from 'components/common/Dropdown/ReusableDropdown';
import LoaderComponent from 'components/common/Loader';
import Message from 'components/common/Message';
import Wrapper from 'hoc/Wrapper';
import { updateMoneyTransferStep } from 'redux/actions/dashboard/dashboard';
import { clearConfirmation } from 'redux/actions/moneyTransfer/confirmTransaction';
import countryCodes from 'utils/countryCodes';
import formatNumber from 'utils/formatNumber';
import { getPossibleDates } from 'utils/monthdates';
import { BANK_TRANSFER, PAYPAL, WARI } from 'constants/general';
import '../SendMoney/modal.scss';
import './TopUp.scss';
import InputLoader from 'assets/images/LoaderRectangle.svg';
import ConfirmationForm from '../../ConfirmationForm';
import TransactionEntity from '../SendMoney/TransactionEntity';
/* eslint-disable no-unused-vars */

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
  data,
  setErrors,
  step,
  setPhonePrefix,
  resetState,
  appCountries,
  currentOption,
  setCurrentOption,
  userLocationData,
  defaultDestinationCurrency,
  transactionType,
  providersListOption,
  currentProviderOption,
  setCurrentProviderOption,
  loadProvidersList,
  canSetProviderPlaceHolder,
  isSelfBuying,
  dispatch,
  setIsSelfBuying,
  myPhoneNumbers,
  selectedPhoneNumber,
  setSelectedPhoneNumber,
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
  accountValue,
  setNextStep,
}) => {
  const [buttonAction, setButtonAction] = useState();
  const defaultCountry = countries.find(
    country => country.flag === userLocationData.CountryCode,
  );
  const history = useHistory();

  const { language: { preferred } = {} } = useSelector(
    ({ user }) => user,
  );

  const {
    contactActions: { isTopingUp },
  } = useSelector(({ dashboard }) => dashboard);
  const [country, setCountry] = useState({});

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
              country.flag.toLowerCase() ===
              phoneCountry.flag.toLowerCase(),
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
        sourceWallet: userData?.data?.DefaultWallet,
        destCurrency: defaultDestinationCurrency,
      });

      setCurrentOpt(defaultOption);
    }
  }, [step, isTopingUp]);
  useEffect(() => {
    if (
      destinationContact &&
      destinationContact.CountryCode &&
      destinationContact.CountryCode.length > 0
    ) {
      setCurrentOption(
        appCountries &&
          appCountries?.find(
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
      destinationContact?.Country &&
      destinationContact?.Country?.length > 0
    ) {
      setCurrentOption(
        appCountries &&
          appCountries.find(
            c =>
              c.CountryCode.toUpperCase() ===
              destinationContact.Country.toUpperCase(),
          ),
      );
    }
  }, [destinationContact]);

  useEffect(() => {
    if (step === 1) {
      if (
        currentProviderOption?.Category === '0' ||
        currentProviderOption?.Category === WARI ||
        currentProviderOption?.Category === PAYPAL
      ) {
        setButtonAction(global.translate('Transfer money'));
        setVerifyAccount(false);
      } else {
        setButtonAction(global.translate('Verify'));
        setVerifyAccount(false);
      }
      if (
        confirmationData &&
        confirmationData?.[0]?.TargetAccountVerified === 'YES' &&
        nextStep
      ) {
        setButtonAction(global.translate('NEXT'));
        setVerifyAccount(true);
      }
    } else {
      setButtonAction(global.translate('Transfer money'));
    }
  }, [currentProviderOption, confirmationData, nextStep, step]);

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
          {isTopingUp && global.translate(`Buy Airtime for `)}
          {isSendingOthers && global.translate(`Transfer money to `)}
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
              )}
              {balanceOnWallet ? (
                <p className="available-value">
                  {formatNumber(balanceOnWallet, {
                    locales: preferred,
                    currency,
                  })}
                </p>
              ) : (
                <div className="wallet-loader-container">
                  <LoaderComponent className="wallet-loader" />
                </div>
              )}
            </h4>
          </div>
          <Wrapper>
            <div className="dest-country-bank">
              <div className="country">
                <p className="choose-dest-country">
                  {global.translate('Destination Country')}
                </p>
                {loadProvidersCountries ? (
                  <Image
                    className="animate-placeholder loader-others"
                    src={InputLoader}
                  />
                ) : (
                  <ReusableDrowdown
                    options={appCountries}
                    currentOption={currentOption}
                    onChange={e => {
                      onOptionsChange(e, {
                        name: 'CountryCode',
                        value: e.target.value,
                      });
                    }}
                    customstyle
                    search
                    setCurrentOption={setCurrentOption}
                    placeholder={global.translate('Select a country')}
                  />
                )}
              </div>
              <div className="currency">
                <p className="choose-dest-country">
                  {global.translate(`Providers in `)}
                  &nbsp;
                  <strong>
                    {(currentOption && currentOption?.CountryName) ||
                      currentOption?.Title}
                  </strong>
                </p>
                {!loadProvidersList && providersListOption ? (
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
                    search
                    customstyle
                    placeholder={global.translate(
                      'Select a provider',
                      1734,
                    )}
                  />
                ) : (
                  <Image
                    className="animate-placeholder loader-others"
                    src={InputLoader}
                  />
                )}
              </div>
            </div>

            <div className="phone-bank">
              {currentProviderOption?.Category === BANK_TRANSFER ? (
                <>
                  {destinationContact?.BankAccountCount !== '0' &&
                    !accountValue && (
                      <>
                        {' '}
                        <div>
                          <span>
                            {global.translate(
                              `Select a bank account number`,
                            )}
                          </span>

                          <div className="select-bank-account">
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
                            {confirmationData?.[0]
                              ?.AccountCurrency && (
                              <Label
                                className="currency-label"
                                size="large"
                              >
                                {confirmationData[0].AccountCurrency}
                              </Label>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  {!currentBankAccount && (
                    <div className="new-dest-bank">
                      <span>
                        {global.translate(
                          `Provide a new bank account number`,
                        )}
                      </span>

                      <div>
                        <NumberFormat
                          className="new-bank-account"
                          format={
                            currentProviderOption?.AccountPattern
                          }
                          mask="_"
                          onValueChange={values => {
                            const { formattedValue, value } = values;
                            setAccountValue({
                              number: formattedValue,
                            });
                          }}
                        />
                        {confirmationData?.[0]?.AccountCurrency && (
                          <Label size="large">
                            {confirmationData[0].AccountCurrency}
                          </Label>
                        )}
                      </div>

                      <div>
                        <span>
                          {currentProviderOption?.AccountPattern}
                        </span>
                      </div>
                      <div>
                        <Checkbox
                          disabled={
                            !accountValue ||
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
                        <span>
                          {global.translate('Account name')} :
                        </span>
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
                  {!currentPhone &&
                    currentProviderOption?.Category !== PAYPAL && (
                      <div className="add-new-phone">
                        <span>
                          {global.translate(
                            `Provide a new phone number`,
                          )}
                        </span>

                        <PhoneInput
                          enableSearch
                          className="new-phone-number"
                          value={
                            phoneValue || currentOption?.PhoneAreaCode
                          }
                          onChange={phone => {
                            setPhoneValue(phone);
                            setNextStep(false);
                          }}
                        />
                      </div>
                    )}
                  {currentProviderOption?.Category === PAYPAL && (
                    <div className="add-new-phone">
                      <span>
                        {global.translate(
                          `Provide you email address`,
                        )}
                      </span>
                      <div className="form-information">
                        <Input
                          name="email"
                          onChange={onOptionsChange}
                          placeholder={global.translate('Email')}
                        />
                      </div>
                    </div>
                  )}

                  <div
                    style={{
                      marginTop: '5px',
                      marginBottom: '5px',
                    }}
                  >
                    {confirmationData &&
                      confirmationData[0].AccountName && (
                        <span>
                          {global.translate('Account name')} :
                        </span>
                      )}
                    <strong>
                      &nbsp;
                      {confirmationData &&
                        confirmationData[0].AccountName}
                    </strong>
                    {confirmationData?.[0]?.VerificationError && (
                      <Message
                        style={{ marginTop: '-17px', width: '68%' }}
                        message={global.translate(
                          'Account not found',
                        )}
                      />
                    )}
                  </div>
                </>
              )}
            </div>

            {currentProviderOption?.Category !== BANK_TRANSFER &&
            isSelfBuying ? (
              <div className="dest-counties medium-padding-top">
                <div className="small-padding-bottom">
                  {global.translate('Select a number')}
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
            ) : null}
          </Wrapper>
          <div className="money-sections">
            <div className="amount">
              <span>{global.translate('Amount')}</span>
            </div>
            <div className="amount-value">
              <div className="form-information">
                <Input
                  type="number"
                  name="amount"
                  placeholder={global.translate('Amount')}
                  onChange={onOptionsChange}
                  value={form.amount || null}
                />
                {currency && <Label size="large">{currency}</Label>}
              </div>
            </div>
          </div>
          <div className="loader-section">
            {parseInt(form.amount, 10) >
            parseInt(
              formatNumber(balanceOnWallet).replace(/[^\w\s]/gi, ''),
              10,
            ) ? (
              <Message
                message={global.translate(
                  'The amount entered is greater than your available balance',
                )}
              />
            ) : null}
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
                message={global.translate(confirmationError.error)}
              />
            )}
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
          checking={checking}
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
                setErrors(null);
              }}
            >
              {global.translate('Back', 174)}
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
                  destCurrency: defaultDestinationCurrency,
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
            disabled={
              checking ||
              loading ||
              !form.amount ||
              parseInt(form.amount, 10) >
                parseInt(
                  formatNumber(balanceOnWallet).replace(
                    /[^\w\s]/gi,
                    '',
                  ),
                  10,
                )
            }
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
                moveFundsToToUWallet();
                setIsSelfBuying(false);
              }
            }}
          >
            <>
              {isTopingUp && global.translate('Buy Airtime')}
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
  isRecurring: PropTypes.bool,
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
  defaultDestinationCurrency: PropTypes.objectOf(PropTypes.any),
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
  accountValue: PropTypes.string.isRequired,
  setNextStep: PropTypes.func.isRequired,
};

TopUpModal.defaultProps = {
  moveFundsToToUWallet: () => {},
  loading: false,
  errors: null,
  setDestinationContact: () => {},
  currency: null,
  isRecurring: false,
  checkTransactionConfirmation: () => {},
  checking: false,
  balanceOnWallet: 0,
  setForm: () => {},
  onOptionsChange: () => {},
  setOpen: () => {},
  walletList: [],
  open: false,
  isSendingCash: PropTypes.bool,
  defaultDestinationCurrency: {},
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
