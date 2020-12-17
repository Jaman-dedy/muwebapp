import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Form,
  Input,
  Modal,
  Message as displayMessage,
} from 'semantic-ui-react';
import 'moment/locale/fr';
import CustomDropdown from 'components/common/Dropdown/CountryDropdown';
import Message from 'components/common/Message';
import SelectCountryCode from 'components/common/SelectCountryCode';
import countryCodes from 'utils/countryCodes';
import formatNumber from 'utils/formatNumber';
import { getPossibleDates } from 'utils/monthdates';

import ConfirmationForm from '../../ConfirmationForm';
import TransactionEntity from '../SendMoney/TransactionEntity';

import '../SendMoney/modal.scss';
import './style.scss';

const countries = countryCodes;

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
  defaultDestinationCurrency,
  transactionType,
  loadingOther,
}) => {
  const defaultCountry = countries.find(
    country => country.flag === userLocationData.CountryCode,
  );
  const [country, setCountry] = useState({});

  const checked = false;
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
      if (
        Array.isArray(error) &&
        error[0].UserLoginCorrect === 'FALSE'
      ) {
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
        const values = Object.values(i);
        return {
          key: values[0],
          text: values[0],
          value: values[0],
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
          ? countries.find(
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
          {isEditing && global.translate(`Edit Transaction `)}
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
                  {global.translate('Destination Country', 689)}
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
            <div className="wrap-money-form">
              {(destinationContact?.MainPhoneNumber ||
                destinationContact?.Phone) && (
                <div
                  style={{
                    textAlign: 'center',
                    backgroundColor: '#F1F1F1',
                    padding: '15px',
                    marginBottom: '10px',
                  }}
                >
                  {global.translate(`Default phone number`, 2165)} :{' '}
                  <strong>
                    {`+${
                      destinationContact?.PhonePrefix
                        ? destinationContact?.PhonePrefix
                        : destinationContact?.MainPhonePrefix
                    } ${
                      destinationContact?.Phone
                        ? destinationContact?.Phone
                        : destinationContact?.MainPhoneNumber
                    }`}
                  </strong>
                </div>
              )}

              <div className="wrap-money-input">
                <div>{global.translate('Amount', 116)}</div>
                <div className="money-input">
                  <Input
                    type="number"
                    disabled={isEditing}
                    name="amount"
                    placeholder={global.translate('Amount')}
                    onChange={onOptionsChange}
                    value={form.amount || null}
                  />
                  <span>{currency}</span>
                </div>
              </div>
            </div>
          )}

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
                message={global.translate(confirmationError.error)}
              />
            )}
          </div>
        </Modal.Content>
      )}
      {step === 2 && (confirmationData?.[0] || isEditing) && (
        <ConfirmationForm
          confirmationData={confirmationData?.[0]}
          onOptionsChange={onOptionsChange}
          form={form}
          shouldClear={shouldClear}
          setShouldClear={setShouldClear}
          isEditing={isEditing}
          errors={errors}
          updating={updating}
          error={error}
          loading={loading}
          days={days}
        />
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
              {global.translate('Back', 2158)}
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
            disabled={checking || loading || updating || loadingOther}
            loading={checking || loading || updating || loadingOther}
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
  isEditing: PropTypes.bool,
  updating: PropTypes.bool,
  defaultDestinationCurrency: PropTypes.string,
  transactionType: PropTypes.string,
  loadingOther: PropTypes.bool.isRequired,
};

SendCashModal.defaultProps = {
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
  isSendingCash: true,
  isEditing: false,
  updating: false,
  defaultDestinationCurrency: null,
  transactionType: null,
};
export default SendCashModal;
