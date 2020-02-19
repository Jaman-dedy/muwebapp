import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, Container, Form, Input } from 'semantic-ui-react';
import countries from 'utils/countryCodes';
import SelectCountryCode from 'components/common/SelectCountryCode';
import './style.scss';

const UserInfoForm = ({
  resetPasswordData,
  onInputChange,
  screenOne,
}) => {
  const {
    errors,
    handleNext,
    clearError,
    userLocationData,
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
      target: { name: 'countryCode', value: country.value },
    });
  }, [country]);

  return (
    <Container className="userinfo">
      <p className="form_title white-space-nowrap">
        Let us take you through these steps to get you back in.
      </p>
      <p className="userinfo_title white-space-nowrap">
        Kindly provide these information below
      </p>
      <Form className="form-information" autoComplete="off">
        <Form.Field>
          <Form.Input
            placeholder="Enter your personal ID *"
            error={errors.firstName || false}
            name="pid"
            type="text"
            required
            value={resetPasswordData.firstName}
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
          <Checkbox type="checkbox" name="dob" className="checkbox" />
        </Form.Field>
        <Form.Field>
          <span>I have uploaded my document?</span>{' '}
          <Checkbox
            type="checkbox"
            name="kycdoc"
            className="checkbox"
          />
        </Form.Field>
        <Form.Field>
          <Form.Field>
            <span className="country-code">{country.value}</span>
            <Input
              type="number"
              name="phoneNumber"
              error={!!errors.phoneNumber || false}
              value={resetPasswordData.phoneNumber}
              onChange={e => {
                onInputChange(e);
                clearError(e);
              }}
              className="phone-number-input"
              placeholder="555555555"
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
          {/* <Form.Input
            placeholder="Enter your Email address"
            error={errors.email || false}
            name="email"
            type="email"
            required
            value={resetPasswordData.email}
            onChange={e => {
              onInputChange(e);
              clearError(e);
            }}
          /> */}
        </Form.Field>
        <Form.Button
          type="button"
          primary
          // loading={login.loading}
          onClick={() => handleNext()}
        >
          next
        </Form.Button>
        Already have an account? <Link to="/login">Login</Link>
      </Form>
    </Container>
  );
};

UserInfoForm.propTypes = {
  resetPasswordData: PropTypes.instanceOf(Object).isRequired,
  onInputChange: PropTypes.func,
  screenOne: PropTypes.instanceOf(Object).isRequired,
};

UserInfoForm.defaultProps = {
  onInputChange: () => null,
};

export default UserInfoForm;
