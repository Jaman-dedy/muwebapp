/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Form, Button, Header, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import CountryDropDown from 'components/common/Dropdown/CountryDropdown';
import './style.scss';

const SwitchAccountForm = ({ switchAccount }) => {
  const {
    countries,
    form,
    valueChangeHandler,
    countryChangeHandler,
    selectedCountry,
    goToPrevStep,
    createBusinessAccountHandler,
    cancelOperation,
    disableSubmit,
  } = switchAccount;

  const {
    businessType: { data, loading },
  } = useSelector(
    ({ userAccountManagement }) => userAccountManagement,
  );
  const { loading: loadSwitchAccount } = useSelector(
    ({ userAccountManagement: { switchToBusinessAccount } }) =>
      switchToBusinessAccount,
  );

  let options = [];
  if (Array.isArray(data)) {
    options = data.map(option => {
      return {
        key: option?.ProfessionTypeNumber,
        text: option?.ProfessionTypeName,
        value: option?.ProfessionTypeName,
      };
    });
  }

  return (
    <Form className="switch-account-form">
      <Header as="h3">
        {global.translate('Upgrade to business account')}
      </Header>

      <Header as="h4">
        {global.translate('Business information')}
      </Header>

      <Form.Group widths="equal">
        <Form.Field required>
          <label>{global.translate('Company name')}</label>
          <Input
            size="large"
            placeholder="Company name"
            onChange={valueChangeHandler}
            value={form.CompanyName}
            name="CompanyName"
            required
          />
        </Form.Field>

        <Form.Field>
          <label>{global.translate('Short name')}</label>
          <Input
            size="large"
            placeholder="Short name"
            onChange={valueChangeHandler}
            value={form.ShortName}
            name="ShortName"
          />
        </Form.Field>

        <Form.Field required>
          <label htmlFor="">
            {global.translate('Type of business')}
          </label>
          <Form.Dropdown
            placeholder={global.translate('Type of business')}
            fluid
            className="upgrade-account-modal__dropdown"
            required
            options={options}
            loading={loading}
            disabled={loading}
            selection
            value={form.CompanyType}
            onChange={valueChangeHandler}
            name="CompanyType"
            search
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field required>
          <label>{global.translate('Main business activity')}</label>
          <Input
            size="large"
            placeholder="Main business activity"
            onChange={valueChangeHandler}
            value={form.Activity}
            name="Activity"
            required
          />
        </Form.Field>

        <Form.Field required>
          <label>{global.translate('Registration number')}</label>
          <Input
            size="large"
            placeholder={global.translate('Registration number')}
            onChange={valueChangeHandler}
            value={form.RegistrationNumber}
            name="RegistrationNumber"
            required
          />
        </Form.Field>

        <Form.Field required>
          <label>{global.translate('Date of registration')}</label>

          <DatePicker
            showMonthDropdown
            dropdownMode="select"
            showYearDropdown
            maxDate={new Date()}
            value={form?.CreationDate}
            selected={form.CreationDate}
            onChange={value =>
              valueChangeHandler(null, {
                value,
                name: 'CreationDate',
              })
            }
          />
        </Form.Field>
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Field>
          <label>{global.translate('TIN number')}</label>
          <Input
            size="large"
            placeholder="TIN number"
            onChange={valueChangeHandler}
            value={form.TIN}
            name="TIN"
          />
        </Form.Field>

        <Form.Field>
          <label>{global.translate('VAT number')}</label>
          <Input
            size="large"
            placeholder="VAT Number"
            onChange={valueChangeHandler}
            value={form.VATNumber}
            name="VATNumber"
          />
        </Form.Field>

        <Form.Field />
      </Form.Group>
      <h4>{global.translate('Main office')}</h4>
      <Form.Group widths="equal">
        <Form.Field required>
          <label>{global.translate('Country')}</label>
          <CountryDropDown
            options={countries}
            search
            currentOption={selectedCountry}
            onChange={countryChangeHandler}
            required
          />
        </Form.Field>

        <Form.Field>
          <label>{global.translate('City')}</label>
          <Input
            size="large"
            placeholder="Type a place"
            onChange={valueChangeHandler}
            value={form.City}
            name="City"
          />
        </Form.Field>

        <Form.Field>
          <label>{global.translate('Address')}</label>
          <Input
            size="large"
            placeholder="Address"
            onChange={valueChangeHandler}
            value={form.Address}
            name="Address"
          />
        </Form.Field>
      </Form.Group>

      <div className="switch-account-form__actions">
        <div className="switch-account-form__actions--lef">
          <Button
            onClick={goToPrevStep}
            basic
            className="switch-account-form__actions--back br-2"
            disabled={loadSwitchAccount}
          >
            {global.translate('Back')}
          </Button>
        </div>

        <div className="switch-account-form__actions-right">
          <Button
            onClick={cancelOperation}
            className="btn--cancel"
            disabled={loadSwitchAccount}
          >
            {global.translate('Cancel')}
          </Button>
          <Button
            onClick={createBusinessAccountHandler}
            className="btn--confirm uppercase"
            loading={loadSwitchAccount}
            disabled={loadSwitchAccount || disableSubmit}
          >
            {global.translate('Create a business account')}
          </Button>
        </div>
      </div>
    </Form>
  );
};

SwitchAccountForm.propTypes = {
  switchAccount: PropTypes.func.isRequired,
};

export default SwitchAccountForm;
