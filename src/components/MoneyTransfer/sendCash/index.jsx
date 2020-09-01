/* eslint-disable import/no-duplicates */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Modal,
  Button,
  Icon,
  Input,
  Dropdown,
  Form,
} from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { DateInput } from 'semantic-ui-calendar-react';
// eslint-disable-next-line no-unused-vars
import moment from 'moment';
import 'moment/locale/fr';
import PropTypes from 'prop-types';
import '../SendMoney/modal.scss';
import PinCodeForm from 'components/common/PinCodeForm';
import { getPossibleDates } from 'utils/monthdates';
import LoaderComponent from 'components/common/Loader';
import Message from 'components/common/Message';
import ToggleSwitch from 'components/common/ToggleButton';
import './style.scss';

import countries from 'utils/countryCodes';
import CustomDropdown from 'components/common/Dropdown/CountryDropdown';

import countryCodes from 'utils/countryCodes';
import SelectCountryCode from 'components/common/SelectCountryCode';
import formatNumber from 'utils/formatNumber';
import TransactionEntity from '../SendMoney/TransactionEntity';

const SendCashModal = ({
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
  isEditing,
  updating,
  updatingError,
  defaultDestinationCurrency,
  transactionType,
  preferredLanguage,
}) => {
  const defaultCountry = countries.find(
    country => country.flag === userLocationData.CountryCode,
  );
  const [country, setCountry] = useState({});

  const [checked, setChecked] = useState(false);
  const [options, setOptions] = useState([]);
  const { isTopingUp } = useSelector(
    state => state.dashboard.contactActions,
  );
  const { language: { preferred } = {} } = useSelector(
    ({ user }) => user,
  );

  const [shouldClear, setShouldClear] = useState(false);

  useEffect(() => {
    if (error) {
      if (error && error[0].UserLoginCorrect === 'FALSE') {
        setShouldClear(true);
      }
    }
  }, [error]);

  useEffect(() => {}, []);

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

  const defaultOption =
    walletList && walletList.find(item => item.Default === 'YES');
  const [currentOpt, setCurrentOpt] = useState({});
  useEffect(() => {
    if (defaultOption) {
      setCurrentOpt(defaultOption);
    }
  }, [defaultOption]);

  useEffect(() => {
    if (data && data[0]) {
      setOpen(false);
      setErrors(null);
      if (!isEditing && !isTopingUp) {
        setDestinationContact(null);
        setForm({ destCurrency: defaultDestinationCurrency });
      }

      setCurrentOpt(defaultOption);
      resetState();
    }
  }, [data]);

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
    <Modal
      size="small"
      open={open}
      onOpen={() => {
        setOpen(false);
      }}
    >
      {transactionType === 'CASH_TRANSACTION' && destinationContact && (
        <Modal.Header centered className="modal-title">
          {isEditing && global.translate(`Edit Cash Transaction `)}
          {!isEditing && global.translate(`Send cash to `)}
          {!isEditing && (
            <strong>{destinationContact.FirstName}</strong>
          )}
        </Modal.Header>
      )}
      {!destinationContact && transactionType === 'CASH_TRANSACTION' && (
        <Modal.Header centered className="modal-title">
          {global.translate(`Send cash`, 1948)}
        </Modal.Header>
      )}
      {destinationContact && transactionType !== 'CASH_TRANSACTION' && (
        <Modal.Header centered className="modal-title">
          {global.translate(`T opup bla bla bla`)}
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
              />{' '}
            </div>
          )}

          {!isEditing && (
            <div className="remaining-money-shade">
              <h4 className="available">
                {global.translate(
                  'Available Balance in the Selected Wallet',
                )}
                <p className="available-value">
                  {formatNumber(balanceOnWallet, {
                    locales: preferred,
                    currency,
                  })}
                </p>
              </h4>
            </div>
          )}
          {!isEditing && (
            <div className="dest-country">
              <div className="country">
                <p className="choose-dest-country">
                  {global.translate('Destination Country')}
                </p>
                <CustomDropdown
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
              </div>

              <div className="currency">
                <p className="choose-dest-country">
                  {global.translate('Destination Currency')}
                </p>
                <Form.Select
                  className="currency-chooser"
                  name="destCurrency"
                  value={form.destCurrency || ''}
                  onChange={onOptionsChange}
                  options={options}
                />
              </div>
            </div>
          )}

          {isEditing && (
            <div className="confirm-form">
              <Input
                name="firstName"
                onChange={onOptionsChange}
                disabled={destinationContact && !isEditing}
                value={form.firstName || ''}
                placeholder={global.translate('First Name', 8)}
              />
              <Input
                name="lastName"
                onChange={onOptionsChange}
                disabled={destinationContact && !isEditing}
                value={form.lastName || ''}
                placeholder={global.translate('Last Name', 9)}
              />

              <div className="tel-area">
                <Input
                  type="tel"
                  disabled={destinationContact && !isEditing}
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={form.phoneNumber || ''}
                  onChange={onOptionsChange}
                  className="phone-number-input"
                  style={isEditing ? { width: '100%' } : {}}
                  required
                  label={
                    !destinationContact || isEditing ? (
                      <SelectCountryCode
                        country={country}
                        setCountry={setCountry}
                        iconClass="inline-block small-h-margin dropdown-flag"
                      >
                        <span className="country-code">
                          {country && country.value}
                        </span>
                      </SelectCountryCode>
                    ) : null
                  }
                  labelPosition="left"
                />
              </div>
            </div>
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
                      style={{ fontSize: '20px', fontWeight: 500 }}
                    >
                      {confirmationData[0].TotalAmount}
                    </strong>
                  </p>
                </div>
                <div className="fees-item">
                  <p className="left" style={{ marginTop: '13px' }}>
                    {global.translate('Amount to be received', 397)}:
                  </p>
                  <p className="right">
                    {' '}
                    <strong
                      className="bolder"
                      style={{ fontSize: '20px', fontWeight: 500 }}
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
                      {global.translate(
                        'Repeat Payment on Every',
                        2037,
                      )}
                      :{' '}
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
                      localization={preferredLanguage}
                    />

                    <p className="from to-now">
                      {global.translate('to')}:
                    </p>
                    <DateInput
                      icon="dropdown"
                      popupPosition="top left"
                      animation="fade"
                      placeholder={global.translate('End date', 398)}
                      iconPosition="right"
                      dateFormat="YYYY-MM-DD"
                      name="endDate"
                      value={
                        form.endDate
                          ? new Date(form.endDate).toDateString()
                          : ''
                      }
                      onChange={onOptionsChange}
                      localization={preferredLanguage}
                    />
                  </div>

                  <div className="send-now">
                    <p>
                      {global.translate('Do not send the money now')}
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

          {step === 2 && (
            <>
              <div className="pin-number">
                <PinCodeForm
                  label={global.translate(
                    'Confirm  your PIN number',
                    941,
                  )}
                  onChange={onOptionsChange}
                  shouldClear={shouldClear}
                  setShouldClear={setShouldClear}
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
          )}
        </Modal.Content>
      )}
      <Modal.Actions>
        <>
          {step !== 1 && (
            <Button
              disabled={checking || loading}
              basic
              color="red"
              onClick={() => {
                resetState();
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
                resetState();
                setForm({
                  destCurrency: defaultDestinationCurrency,
                });
                setErrors(null);
                if (!isEditing) {
                  resetState();
                }
                setDestinationContact(null);
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
                moveFundsToToUWallet();
              }
            }}
          >
            {!isEditing
              ? global.translate('Send cash', 1948)
              : global.translate('Submit')}
          </Button>
        </>
      </Modal.Actions>
    </Modal>
  );
};

SendCashModal.propTypes = {
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
  preferredLanguage: PropTypes.string.isRequired,
};

SendCashModal.defaultProps = {
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
export default SendCashModal;
