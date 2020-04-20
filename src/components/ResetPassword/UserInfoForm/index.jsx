import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import {
  Checkbox,
  Container,
  Form,
  Input,
  Icon,
} from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import Feedback from 'components/common/Feedback/Feedback';
import countries from 'utils/countryCodes';
import SelectCountryCode from 'components/common/SelectCountryCode';

import './UserInfoForm.scss';

const UserInfoForm = ({
  resetPasswordData,
  onInputChange,
  screenOne,
  resetPasswordRd,
}) => {
  const {
    errors,
    onSubmit,
    handleNext,
    clearError,
    userLocationData,
    resetPasswordPrequalification,
    clearResetUserPrequalificationFx,
  } = screenOne;

  const defaultCountry = resetPasswordData.countryCode
    ? countries.find(
        country => country.value === resetPasswordData.countryCode,
      )
    : countries.find(
        country => country.flag === userLocationData.CountryCode,
      );

  const [country, setCountry] = useState(defaultCountry);

  useEffect(() => {
    onInputChange({
      target: {
        name: 'countryCode',
        value: country && country.value,
      },
    });
  }, [country]);

  const handleDOB = (event, { value }) => {
    onInputChange({ target: { name: 'DOB', value } });
  };

  const handleCheckbox = (e, data) => {
    onInputChange({
      target: {
        name: data.name,
        value: data.checked === true ? 'Yes' : 'No',
      },
    });
  };

  return (
    <>
      {resetPasswordPrequalification.error && (
        <Feedback
          message={resetPasswordPrequalification.error.Description}
          title="Error"
          callbackFn={clearResetUserPrequalificationFx}
        />
      )}
      {!resetPasswordPrequalification.error && (
        <Container className="userinfo">
          <p className="sub-title">
            Let us take you through these steps to get you back in.
          </p>
          <p className="userinfo_title white-space-nowrap">
            Kindly provide the information below
          </p>
          <Form
            onSubmit={onSubmit}
            className="form-information"
            autoComplete="off"
          >
            <Form.Field>
              <Form.Input
                placeholder="Enter your personal ID *"
                error={errors.personalId || false}
                name="personalId"
                type="text"
                required
                value={resetPasswordData.pid}
                onChange={e => {
                  onInputChange(e);
                  clearError(e);
                }}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                placeholder="Enter your Last name *"
                error={errors.lastName || false}
                name="lastName"
                type="text"
                required
                value={resetPasswordData.lastName}
                onChange={e => {
                  onInputChange(e);
                  clearError(e);
                }}
              />
            </Form.Field>
            <Form.Field>
              <span>I have set my date of birth ?</span>{' '}
              <Checkbox
                type="checkbox"
                name="DOBSet"
                className="checkbox"
                onChange={(e, data) => handleCheckbox(e, data)}
              />
            </Form.Field>
            {resetPasswordRd.DOBSet === 'Yes' && (
              <Form.Field className="calendar_input">
                <span className="calendar_caret">
                  <Icon name="caret down" />
                </span>
                <DateInput
                  name="dob"
                  placeholder="YYYY-MM-DD"
                  value={resetPasswordData.DOB}
                  iconPosition="left"
                  onChange={handleDOB}
                  popupPosition="top right"
                  animation="fade"
                  dateFormat="YYYY-MM-DD"
                />
              </Form.Field>
            )}
            <Form.Field>
              <span>I have uploaded my document?</span>{' '}
              <Checkbox
                type="checkbox"
                name="KYCDocSent"
                className="checkbox"
                onChange={(e, data) => handleCheckbox(e, data)}
              />
            </Form.Field>
            <Form.Field>
              <Form.Field className="phone_field">
                <span className="country-code">
                  {country && country.value}
                </span>

                <Input
                  type="number"
                  name="phoneNumber"
                  value={resetPasswordData.phoneNumber}
                  onChange={e => {
                    onInputChange(e);
                    clearError(e);
                  }}
                  className="ui phone-number-input "
                  required
                  label={
                    <SelectCountryCode
                      country={country}
                      setCountry={setCountry}
                      iconClass="inline-block small-h-margin dropdown-flag"
                    />
                  }
                  labelPosition="left"
                />
              </Form.Field>
            </Form.Field>
            <Form.Button
              type="button"
              primary
              loading={resetPasswordPrequalification.loading}
              onClick={() => handleNext()}
            >
              next
            </Form.Button>
            Already registered?? <Link to="/login">Login</Link>
          </Form>
        </Container>
      )}
    </>
  );
};

UserInfoForm.propTypes = {
  resetPasswordData: PropTypes.instanceOf(Object).isRequired,
  resetPasswordRd: PropTypes.instanceOf(Object).isRequired,
  onInputChange: PropTypes.func,
  screenOne: PropTypes.instanceOf(Object).isRequired,
};

UserInfoForm.defaultProps = {
  onInputChange: () => null,
};

export default UserInfoForm;
