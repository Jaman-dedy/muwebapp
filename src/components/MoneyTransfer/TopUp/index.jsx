import React, { useEffect, useState } from 'react';
import {
  Modal,
  Button,
  Icon,
  Input,
  Dropdown,
  TransitionablePortal,
} from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import PropTypes from 'prop-types';
import '../SendMoney/modal.scss';
import ToggleSwitch from 'components/common/ToggleButton';
import PinCodeForm from 'components/common/PinCodeForm';
import { getPossibleDates } from 'utils/monthdates';
import LoaderComponent from 'components/common/Loader';
import Message from 'components/common/Message';

import countries from 'utils/countryCodes';
import ReusableDrowdown from 'components/common/Dropdown/ReusableDropdown';
import countryCodes from 'utils/countryCodes';
import TransactionEntity from '../SendMoney/TransactionEntity';
import Wrapper from 'hoc/Wrapper';

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
  isSendingMoney,
  data,
  setErrors,
  step,
  setStep,
  setPhonePrefix,
  resetState,
  appCountries,
  currentOption,
  setCurrentOption,
  userLocationData,
  isEditing,
  updating,
  updatingError,
  defaultDestinationCurrency,
  transactionType,
  providersListOption,
  currentProviderOption,
  setCurrentProviderOption,
  loadProvidersList,
  canSetProviderPlaceHolder,
  isSelfBuying,
  setIsSelfBuying,
  myPhoneNumbers,
  selectedPhoneNumber,
  setSelectedPhoneNumber,
  isTopingUp,
  isSendingOthers,
  loadProvidersCountries,
}) => {
  const defaultCountry = countries.find(
    country => country.flag === userLocationData.CountryCode,
  );
  const [country, setCountry] = useState({});

  const [checked, setChecked] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const newOptions =
      currentOption &&
      currentOption.Currencies &&
      currentOption.Currencies.map(i => {
        const [keys, v] = [Object.keys(i), Object.values(i)];
        return {
          key: v[0],
          text: v[0],
          value: v[0],
        };
      });

    setOptions(newOptions);
  }, [currentOption]);

  useEffect(() => {
    if (defaultCountry && !isEditing) {
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
  }, [defaultCountry, isEditing, destinationContact]);

  useEffect(() => {
    if (!isEditing) {
      setPhonePrefix(defaultCountry && defaultCountry.value);
    }
  }, [isEditing]);

  useEffect(() => {
    if (userLocationData.CountryCode !== '') {
      if (!isEditing) {
        setCountry(
          countries.find(
            country => country.flag === userLocationData.CountryCode,
          ),
        );
      }
    }
  }, [userLocationData, isEditing]);

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

  useEffect(() => {
    if (data && data[0]) {
      setStep(step + 1);
    }
  }, [data]);

  useEffect(() => {
    return () => {
      setStep(1);
    };
  }, []);
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
      setStep(1);
      setOpen(false);
      setErrors(null);
      if (!isEditing) {
        setDestinationContact(null);
        if (isTopingUp) {
          resetState();
        }
        setForm({
          sourceWallet: userData?.data?.DefaultWallet,
          destCurrency: defaultDestinationCurrency,
        });
      }

      setCurrentOpt(defaultOption);
    }
  }, [step]);
  useEffect(() => {
    if (
      destinationContact &&
      destinationContact.CountryCode &&
      destinationContact.CountryCode.length > 0
    ) {
      setCurrentOption(
        appCountries &&
          appCountries.find(
            c =>
              c.CountryCode.toUpperCase() ===
              destinationContact.CountryCode.toUpperCase(),
          ),
      );
    }
  }, [destinationContact]);

  const days = getPossibleDates().map(item => ({
    key: item.day,
    value: item.day,
    text: item.val,
  }));
  return (
    <TransitionablePortal
      transition={{
        duration: 400,
        animation: 'fade',
      }}
      onClose={() => setOpen(false)}
      open={open}
    >
      <Modal
        size="small"
        open={open}
        onOpen={() => {
          setOpen(false);
        }}
      >
        {destinationContact && transactionType === 'TOP_UP' && (
          <Modal.Header centered className="modal-title">
            {isEditing && global.translate(`Edit toUp transaction`)}
            {!isEditing &&
              isTopingUp &&
              global.translate(`Buy Airtime for `, 1554)}
            {!isEditing &&
              isSendingOthers &&
              global.translate(`Send money to `, 1225)}
            {!isEditing && (
              <strong>{destinationContact.FirstName}</strong>
            )}
          </Modal.Header>
        )}
        {step === 1 && (
          <Modal.Content className="entities">
            {!isEditing && (
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
            )}

            {!isEditing && (
              <div className="remaining-money-shade">
                <h4 className="available">
                  {global.translate(
                    'Available Balance in the Selected Wallet',
                  )}
                  <p className="available-value">{balanceOnWallet}</p>
                </h4>
              </div>
            )}
            {!isEditing && (
              <Wrapper>
                <div className="dest-country">
                  <div className="country">
                    <p className="choose-dest-country">
                      {global.translate('Destination Country')}
                    </p>
                    {loadProvidersCountries ? (
                      <LoaderComponent />
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
                        search
                        setCurrentOption={setCurrentOption}
                      />
                    )}
                  </div>
                  <div className="currency">
                    <p className="choose-dest-country">
                      {global.translate('Providers in ')}
                      <strong>
                        {currentOption && currentOption.CountryName}
                      </strong>
                    </p>
                    {loadProvidersList ? (
                      <LoaderComponent />
                    ) : (
                      <ReusableDrowdown
                        placeholder={canSetProviderPlaceHolder}
                        options={providersListOption}
                        currentOption={currentProviderOption}
                        onChange={e => {
                          onOptionsChange(e, {
                            name: 'OperatorName',
                            value: e.target.value,
                          });
                        }}
                        setCurrentOption={setCurrentProviderOption}
                      />
                    )}
                  </div>
                </div>
                {isSelfBuying && (
                  <div
                    style={{
                      textAlign: 'center',
                      margin: 'auto',
                      width: '30%',
                    }}
                    className="dest-counties"
                  >
                    <div>Select a number</div>{' '}
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
              </Wrapper>
            )}
            {!isEditing && (
              <div className="money-section">
                <div className="amount">
                  <span>{global.translate('Amount', 116)}</span>
                </div>
                <div className="amount-value">
                  <div className="form-information">
                    <Input
                      type="number"
                      disabled={isEditing}
                      name="amount"
                      placeholder={global.translate('Amount')}
                      onChange={onOptionsChange}
                      value={form.amount || null}
                    />
                    <strong>{currency}</strong>
                  </div>
                </div>

                <div className="plus-minus-icons">
                  <div
                    role="button"
                    tabIndex="0"
                    onKeyPress={() => {}}
                    className="icon"
                    onClick={() => {
                      setForm({
                        ...form,
                        amount: parseInt(form.amount, 10) - 1,
                      });
                    }}
                  >
                    <Icon name="minus" className="inner-icon" />
                  </div>
                  <div
                    className="icon"
                    role="button"
                    tabIndex="0"
                    onClick={() => {
                      setForm({
                        ...form,
                        amount: parseInt(form.amount, 10) + 1,
                      });
                    }}
                    onKeyPress={() => {}}
                  >
                    <Icon name="add" className="inner-icon" />
                  </div>
                </div>
              </div>
            )}

            <div className="load-stuff">
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
              {checking && (
                <LoaderComponent
                  loaderContent={global.translate('Working…', 412)}
                />
              )}
            </div>
          </Modal.Content>
        )}
        {step === 2 && (
          <Modal.Content className="ss-content">
            {confirmationData && confirmationData[0] && (
              <>
                <div className="ss-amount">
                  <p>{global.translate('Amount', 116)}: </p>{' '}
                  &nbsp;&nbsp;
                  <p>
                    <strong>{confirmationData[0].Amount}</strong>
                  </p>
                </div>
                <div className="fees">
                  <div className="fees-list">
                    <p>{global.translate('Fees', 117)}</p>

                    <div className="fees-item">
                      <p className="left">
                        {global.translate('Fees', 117)}:
                      </p>
                      <p className="right">
                        {confirmationData[0].Fees}
                      </p>
                    </div>
                    <div className="fees-item">
                      <p className="left">
                        {global.translate('External fees', 121)}:
                      </p>
                      <p className="right">
                        {confirmationData[0].ExternalFees}
                      </p>
                    </div>
                    <div className="fees-item">
                      <p className="left">
                        {global.translate('Exchange fees', 120)}:
                      </p>
                      <p className="right">
                        {' '}
                        {confirmationData[0].ExchangeFees}
                      </p>
                    </div>
                    <div className="fees-item">
                      <p className="left">
                        {global.translate('Taxes', 965)}:
                      </p>
                      <p className="right">
                        {confirmationData[0].Taxes}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="exchange-rate">
                  <p>
                    {global.translate('Exchange Rate', 80)}=
                    {confirmationData[0].ExchangeRate}
                  </p>
                </div>
                <div className="amount-to-be-recieved-break-down">
                  <div className="fees-item">
                    <p className="left" style={{ marginTop: '13px' }}>
                      {global.translate('Total', 269)}:
                    </p>
                    <p className="right">
                      <strong
                        className="bolder"
                        style={{
                          fontSize: '20px',
                          fontWeight: 500,
                        }}
                      >
                        {confirmationData[0].TotalAmount}
                      </strong>
                    </p>
                  </div>
                  <div className="fees-item">
                    <p className="left" style={{ marginTop: '13px' }}>
                      {global.translate('Amount to be received', 397)}
                      :
                    </p>
                    <p className="right">
                      {' '}
                      <strong
                        className="bolder"
                        style={{
                          fontSize: '20px',
                          fontWeight: 500,
                        }}
                      >
                        {confirmationData[0].AmountToBeSent}
                      </strong>
                    </p>
                  </div>
                </div>
                <div className="confirm-form">
                  <Input
                    name="reference"
                    onChange={onOptionsChange}
                    value={form.reference || ''}
                    placeholder={global.translate(
                      'Enter reference here',
                      433,
                    )}
                  />
                  <Input
                    name="description"
                    onChange={onOptionsChange}
                    value={form.description || ''}
                    placeholder={global.translate(
                      'Enter description here',
                      434,
                    )}
                  />
                </div>
                <div className="one-tme-transfer">
                  <p>{global.translate('Recurring transfer', 265)}</p>
                  <ToggleSwitch
                    id="isRecurring"
                    name="isRecurring"
                    value={form.isRecurring || false}
                    onChange={checked => {
                      onOptionsChange(checked, {
                        name: 'isRecurring',
                        value: checked,
                      });
                    }}
                  />
                </div>
                {form.isRecurring && (
                  <div className="recurring">
                    <div className="repeat-date">
                      <p className="repeated-on">
                        {global.translate('Repeat Payment on Every')}:{' '}
                      </p>

                      <Dropdown
                        className="custom-dropdown2"
                        search
                        name="day"
                        value={form.day || ''}
                        onChange={onOptionsChange}
                        selection
                        options={days}
                      />
                    </div>
                    <div className="from-to-dates">
                      <p className="from">
                        {' '}
                        {global.translate('From')}:
                      </p>
                      <DateInput
                        icon="dropdown"
                        popupPosition="top left"
                        animation="fade"
                        placeholder={global.translate(
                          'Start date',
                          338,
                        )}
                        iconPosition="right"
                        dateFormat="YYYY-MM-DD"
                        name="startDate"
                        value={
                          form.startDate
                            ? new Date(form.startDate).toDateString()
                            : ''
                        }
                        onChange={onOptionsChange}
                      />

                      <p className="from to-now">
                        {global.translate('to')}:
                      </p>
                      <DateInput
                        icon="dropdown"
                        popupPosition="top left"
                        animation="fade"
                        placeholder={global.translate(
                          'End date',
                          398,
                        )}
                        iconPosition="right"
                        dateFormat="YYYY-MM-DD"
                        name="endDate"
                        value={
                          form.endDate
                            ? new Date(form.endDate).toDateString()
                            : ''
                        }
                        onChange={onOptionsChange}
                      />
                    </div>

                    <div className="send-now">
                      <p>
                        {global.translate(
                          'Do not send the money now',
                        )}
                      </p>

                      <ToggleSwitch
                        id="sendNow"
                        name="sendNow"
                        value={form.sendNow}
                        onChange={checked => {
                          onOptionsChange(checked, {
                            name: 'sendNow',
                            value: checked,
                          });
                        }}
                      />
                    </div>
                  </div>
                )}
                <hr />
              </>
            )}
            <>
              <div className="pin-number">
                <PinCodeForm
                  label={global.translate(
                    'Confirm  your PIN number',
                    941,
                  )}
                  onChange={onOptionsChange}
                  name="pin"
                  value={form.pin || ''}
                />
              </div>
              <div
                className="load-stuff"
                style={{ alignSelf: 'center' }}
              >
                {' '}
                {errors && <Message message={errors} />}
                {!isEditing && (
                  <>
                    {' '}
                    {error && error[0] && (
                      <Message
                        message={
                          error[0].Description
                            ? global.translate(error[0].Description)
                            : global.translate(error.error)
                        }
                      />
                    )}
                    {error && !error[0] && (
                      <Message
                        message={global.translate(error.error)}
                      />
                    )}
                  </>
                )}
                {isEditing && (
                  <>
                    {' '}
                    {updatingError && updatingError[0] && (
                      <Message
                        message={
                          updatingError[0].Description
                            ? global.translate(
                                updatingError[0].Description,
                              )
                            : global.translate(updatingError.error)
                        }
                      />
                    )}
                    {updatingError && !updatingError[0] && (
                      <Message
                        message={global.translate(
                          updatingError.error,
                        )}
                      />
                    )}
                  </>
                )}
                {(loading || (updating && isEditing)) && (
                  <LoaderComponent
                    style={{ paddingLeft: '50px' }}
                    loaderContent={global.translate('Working…', 412)}
                  />
                )}
              </div>
            </>
          </Modal.Content>
        )}
        <Modal.Actions>
          <>
            {step !== 1 && step !== 3 && (
              <Button
                disabled={checking || loading}
                negative
                onClick={() => {
                  setStep(step - 1);
                }}
              >
                {global.translate('Back', 174)}
              </Button>
            )}

            {step !== 3 && (
              <Button
                disabled={checking || loading}
                negative
                onClick={() => {
                  setOpen(!open);
                  setStep(1);
                  setForm({
                    sourceWallet: userData?.data?.DefaultWallet,
                    destCurrency: defaultDestinationCurrency,
                  });
                  setErrors(null);
                  if (!isEditing) {
                    resetState();
                  }
                  setDestinationContact(null);
                  setCurrentProviderOption(null);
                  setIsSelfBuying(false);
                }}
              >
                {global.translate('Cancel', 86)}
              </Button>
            )}
            <Button
              positive
              disabled={checking || loading}
              onClick={() => {
                if (step === 1) {
                  checkTransactionConfirmation();
                } else if (step === 2) {
                  setCurrentProviderOption(null);
                  moveFundsToToUWallet();
                  setIsSelfBuying(false);
                }
              }}
            >
              {!isEditing
                ? (isTopingUp &&
                    global.translate('Buy Airtime', 1552)) ||
                  (isSendingOthers &&
                    global.translate('Send money', 65))
                : global.translate('Submit')}
            </Button>
          </>
        </Modal.Actions>
      </Modal>
    </TransitionablePortal>
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
  setStep: PropTypes.func.isRequired,
  setPhonePrefix: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired,
  setDestinationContact: PropTypes.func,
  errors: PropTypes.string,
  isSendingCash: PropTypes.bool,
  appCountries: PropTypes.arrayOf(PropTypes.any).isRequired,
  currentOption: PropTypes.objectOf(PropTypes.any).isRequired,
  setCurrentOption: PropTypes.func.isRequired,
  userLocationData: PropTypes.objectOf(PropTypes.any).isRequired,
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
};
export default TopUpModal;