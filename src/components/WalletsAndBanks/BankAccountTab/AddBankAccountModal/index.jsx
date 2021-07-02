/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import {
  Modal,
  Button,
  Form,
  Input,
  Loader,
  Dimmer,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ReactFlagsSelect from 'react-flags-select';
import { useSelector, useDispatch } from 'react-redux';
import { clearUpdatePhoneList } from 'redux/actions/userAccountManagement/deletePhoneNumber';
import ReusableDropDown from 'components/common/Dropdown/ReusableDropdown';
import OTPInput from 'components/common/PINInput';
import InfoMessage from 'components/common/Alert/InfoMessage';
import ErrorMessage from 'components/common/Alert/Danger';

import './style.scss';

const AddBankAccountModal = ({
  open,
  onOpen,
  onClose,
  bankAccount,
}) => {
  const {
    form,
    countryChangeHandler,
    selectedCountry,
    valueChangeHandler,
    bankList,
    setCurrentBankOption,
    currentBankOption,
    currenciesList,
    phones,
    selectedPhoneNumber,
    setSelectedPhoneNumber,
    submitLinkAccountRequestHandler,
    isValidForm,
    step,
    setStep,
    OTP,
    setOTP,
    linkBankAccountRequestData,
    selfLinkBankAccountData,
    addPhoneNumberHandler,
  } = bankAccount;

  const { loading: loadBankList } = useSelector(
    ({ walletsAndBanks: { bankList } }) => bankList,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    clearUpdatePhoneList(dispatch);
  }, [phones]);

  const renderOTPForm = () => {
    return (
      <div className="otp-form">
        <InfoMessage
          description={`${global.translate(
            'Enter a verification code we sent to',
          )}  +${selectedPhoneNumber?.Phone || form?.PhoneNumber} `}
          className="otp-form__info-message"
        />
        <p>{global.translate('Verification code')} </p>
        <OTPInput
          numberOfInputs={6}
          value={OTP}
          onChange={setOTP}
          type="text"
        />

        <div className="error-message-container">
          {!selfLinkBankAccountData?.success &&
            selfLinkBankAccountData?.error?.Description && (
              <ErrorMessage
                message={selfLinkBankAccountData?.error?.Description}
              />
            )}
        </div>
        <div className="resend-otp">
          <span className="resend-otp__message">
            {global.translate(
              'It may take a moment to receive your code. Not received yet?',
            )}
          </span>
          <Button
            className="resend-otp__button"
            onClick={() => {
              submitLinkAccountRequestHandler();
              setOTP('');
            }}
            loading={linkBankAccountRequestData?.loading}
            disabled={linkBankAccountRequestData?.loading}
          >
            {global.translate('Resend code')}
          </Button>
        </div>
      </div>
    );
  };
  const renderBankAccountInfoForm = React.useMemo(() => {
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Field required>
            <label>{global.translate('Country')}</label>
            <ReactFlagsSelect
              defaultCountry={selectedCountry?.toUpperCase()}
              selected={form?.CountryCode?.toUpperCase()}
              onSelect={countryChangeHandler}
              searchable
              placeholder={global.translate('Select  country')}
            />
          </Form.Field>

          <Form.Field required>
            <label>{global.translate('Phone number')}</label>

            <ReusableDropDown
              actionLabel={global.translate('Add a new phone number')}
              actionHandler={addPhoneNumberHandler}
              bottomAction
              options={[...new Set(phones)]}
              search={phones?.length > 10}
              value={form.PhoneNumber}
              currentOption={selectedPhoneNumber}
              setCurrentOption={setSelectedPhoneNumber}
              onChange={({ target: { value } }) =>
                valueChangeHandler(null, {
                  name: 'PhoneNumber',
                  value: value
                    ?.replaceAll(' ', '')
                    .replaceAll('+', ''),
                })
              }
            />
          </Form.Field>
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field required>
            <label>
              {global.translate('Bank name')}
              {!loadBankList &&
                selectedCountry &&
                bankList?.length === 0 && (
                  <div className="form-error">
                    {global.translate('No banks found')}
                  </div>
                )}

              {loadBankList && (
                <span className="form-loading ">
                  {global.translate('Loading')}...
                </span>
              )}
            </label>

            <ReusableDropDown
              options={bankList}
              value={form?.BankName}
              search={bankList?.length > 10}
              currentOption={currentBankOption}
              setCurrentOption={setCurrentBankOption}
              bottomAction={false}
              onChange={({ target: { value } }) => {
                valueChangeHandler(null, {
                  name: 'BankCode',
                  value,
                });
              }}
            />
          </Form.Field>

          <Form.Field required>
            <label>{global.translate('Account name')}</label>
            <Input
              size="large"
              placeholder="Account name"
              onChange={valueChangeHandler}
              value={form.AccountName}
              name="AccountName"
            />
          </Form.Field>
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field required>
            <label>{global.translate('Account number')}</label>
            <div className="account-number">
              <input
                required
                size="large"
                placeholder="Account number"
                onChange={e => valueChangeHandler(e, e.target)}
                value={form.AccountNumber}
                name="AccountNumber"
                className="account-number__input"
              />

              <Form.Dropdown
                options={currenciesList}
                value={form.Currency}
                onChange={valueChangeHandler}
                name="Currency"
                search={currenciesList?.length > 10}
                className="account-number__currency"
                selection
              />
            </div>
          </Form.Field>

          <Form.Field>
            <label>{global.translate('IBAN')}</label>
            <Input
              size="large"
              placeholder="IBAN"
              onChange={valueChangeHandler}
              value={form.IBAN}
              name="IBAN"
            />
          </Form.Field>
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field>
            <label>{global.translate('Branch code')}</label>
            <Input
              size="large"
              placeholder="Branch code"
              onChange={valueChangeHandler}
              value={form.BranchCode}
              name="BranchCode"
            />
          </Form.Field>

          <Form.Field>
            <label>{global.translate('Branch name')}</label>
            <Input
              size="large"
              placeholder="Branch name"
              onChange={valueChangeHandler}
              value={form.BranchName}
              name="BranchName"
            />
          </Form.Field>
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field>
            <label>{global.translate('Bank Address')}</label>
            <Input
              size="large"
              placeholder="Bank Address"
              onChange={valueChangeHandler}
              value={form.BankAddress}
              name="BankAddress"
            />
          </Form.Field>

          <Form.Field />
        </Form.Group>
      </Form>
    );
  }, [bankList, form, loadBankList, selectedCountry]);

  return (
    <Modal
      onClose={onClose}
      onOpen={onOpen}
      open={open}
      size={step === 1 ? 'small' : 'tiny'}
      className="add-account-modal"
      closeOnDimmerClick={false}
      style={step === 2 ? { maxWidth: 455 } : {}}
    >
      <Modal.Header>
        {step === 1
          ? global.translate('Link a bank account')
          : global.translate('Confirm this operation')}
      </Modal.Header>
      <Modal.Content>
        {step === 1 && renderBankAccountInfoForm}
        {step === 2 && renderOTPForm()}

        {selfLinkBankAccountData?.loading && (
          <Dimmer active inverted>
            <Loader size="large" />
          </Dimmer>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button
          className="btn--cancel"
          onClick={step === 1 ? onClose : () => setStep(1)}
          disabled={
            linkBankAccountRequestData?.loading ||
            selfLinkBankAccountData?.loading
          }
        >
          {step === 1
            ? global.translate('Cancel')
            : global.translate('Back')}
        </Button>
        {step === 1 && (
          <Button
            className="btn--confirm"
            onClick={submitLinkAccountRequestHandler}
            disabled={
              !isValidForm || linkBankAccountRequestData?.loading
            }
            loading={linkBankAccountRequestData?.loading}
          >
            {global.translate('Submit')}
          </Button>
        )}
      </Modal.Actions>
    </Modal>
  );
};

AddBankAccountModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  bankAccount: PropTypes.objectOf(PropTypes.any).isRequired,
};

AddBankAccountModal.defaultProps = {
  onClose: () => {},
};

export default AddBankAccountModal;
