import './style.scss';
import 'assets/styles/spinner.scss';
import 'react-phone-input-2/lib/style.css';

import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { Grid, Form } from 'semantic-ui-react';
import ReactFlagsSelect from 'react-flags-select';
import AlertDanger from 'components/common/Alert/Danger';
import TermsAndConditions from '../TermsAndConditions';

const IdentityForm = ({
  registrationData,
  onInputChange,
  identityData,
}) => {
  const {
    handleNext,
    clearError,
    verifyPhoneNumber,
    phonevalue,
    setPhonevalue,
    openTermsAndConditionModal,
    setOpenTermsAndConditionModal,
    handleTermsAndCondition,
    startDate,
    setStartDate,
    endDate,
    setNationalityCountry,
    nationalityCountry,
  } = identityData;
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    if (
      !registrationData.firstName ||
      !registrationData.lastName ||
      !phonevalue ||
      !startDate
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [registrationData, phonevalue, startDate]);

  return (
    <div>
      {verifyPhoneNumber.error && (
        <AlertDanger message={verifyPhoneNumber.error.message} />
      )}
      <Form autoComplete="off">
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column mobile={16} computer={16}>
              <Form.Field>
                <div className="sub-titles">
                  {global.translate('Last name')}
                </div>
                <Form.Input
                  placeholder={`${global.translate('Last name')} *`}
                  name="firstName"
                  type="text"
                  required
                  value={registrationData.firstName}
                  onChange={e => {
                    onInputChange(e);
                    clearError(e);
                  }}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column mobile={16} computer={16}>
              <Form.Field>
                <div className="sub-titles">
                  {global.translate('First name')}
                </div>
                <Form.Input
                  placeholder={`${global.translate('Last name')} *`}
                  name="lastName"
                  type="text"
                  required
                  value={registrationData.lastName}
                  onChange={e => {
                    onInputChange(e);
                    clearError(e);
                  }}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column mobile={16} computer={16}>
              <div className="sub-titles">
                {global.translate('Phone number')}
              </div>
              <Form.Field>
                <div className="user-phone-number">
                  <PhoneInput
                    country="rw"
                    value={phonevalue}
                    onChange={phone => setPhonevalue(phone)}
                  />
                </div>
                {verifyPhoneNumber.error && (
                  <div>
                    {global.translate(
                      verifyPhoneNumber.error.message,
                    )}
                  </div>
                )}
              </Form.Field>
            </Grid.Column>
            <Grid.Column mobile={16} computer={16}>
              <Form.Field>
                <div className="sub-titles">
                  {global.translate('Email')}
                </div>
                <Form.Input
                  placeholder={global.translate('E-mail')}
                  name="email"
                  type="email"
                  value={registrationData.email}
                  onChange={e => {
                    onInputChange(e);
                    clearError(e);
                  }}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column mobile={16} computer={8}>
              <div className="sub-titles">
                {global.translate('Date of birth')}
              </div>
              <DatePicker
                className="wrap-date-picker"
                selected={startDate}
                onChange={date => setStartDate(date)}
                showMonthDropdown
                showYearDropdown
                maxDate={endDate}
                placeholderText={global.translate('Select a date*')}
              />
            </Grid.Column>
            <Grid.Column mobile={16} computer={8}>
              <div className="sub-titles">
                {global.translate('Select your country')}
              </div>
              <ReactFlagsSelect
                selected={nationalityCountry?.toUpperCase()}
                onSelect={code => setNationalityCountry(code)}
                searchable
                placeholder={global.translate('Select your country')}
                className="select-my-country"
              />
            </Grid.Column>
            <Grid.Column mobile={16} computer={16}>
              <button
                type="submit"
                className="btn-auth btn-auth-primary"
                disabled={disableButton}
                onClick={() =>
                  verifyPhoneNumber.loading === false && handleNext()
                }
              >
                {verifyPhoneNumber.loading && (
                  <div className="loading-button" />
                )}

                {global.translate('NEXT')}
              </button>
              <div>
                {global.translate('Already registered?')}{' '}
                <Link className="btn-auth" to="/login">
                  {global.translate('LOGIN')}
                </Link>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
      <TermsAndConditions
        open={openTermsAndConditionModal}
        setOpen={setOpenTermsAndConditionModal}
        handleTermsAndCondition={handleTermsAndCondition}
      />
    </div>
  );
};

IdentityForm.propTypes = {
  registrationData: PropTypes.instanceOf(Object).isRequired,
  onInputChange: PropTypes.func,
  identityData: PropTypes.instanceOf(Object).isRequired,
};

IdentityForm.defaultProps = {
  onInputChange: () => null,
};

export default IdentityForm;
