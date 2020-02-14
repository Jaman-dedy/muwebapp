import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Form, Input } from 'semantic-ui-react';
import './style.scss';
import countries from 'utils/countryCodes';
import SelectCountryCode from 'components/common/SelectCountryCode';

const PhoneNUmberForm = ({
  onInputChange,
  screenTwo,
  registrationData,
}) => {
  const defaultCountry = registrationData.countryCode
    ? countries.find(
        country => country.value === registrationData.countryCode,
      )
    : countries.find(country => country.flag === 'rw');

  const [country, setCountry] = useState(defaultCountry);

  const {
    errors,
    handleNext,
    clearError,
    verifyPhoneNumber,
  } = screenTwo;

  useEffect(() => {
    onInputChange({
      target: { name: 'countryCode', value: country.value },
    });
  }, [country]);

  return (
    <Container>
      <Form className="user-phone-number">
        <span>Enter your phone number</span>
        <Form.Field>
          <span className="country-code">{country.value}</span>
          <Input
            type="number"
            name="phoneNumber"
            error={!!errors.phoneNumber || false}
            value={registrationData.phoneNumber}
            onChange={e => {
              onInputChange(e);
              clearError(e);
            }}
            className="phone-number-input"
            placeholder="781959044"
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
        <Form.Button
          type="button"
          primary
          loading={verifyPhoneNumber.loading}
          onClick={() => !verifyPhoneNumber.loading && handleNext()}
        >
          Verify
        </Form.Button>
        Already have an account? <Link to="/login">Login</Link>
      </Form>
    </Container>
  );
};

PhoneNUmberForm.propTypes = {
  registrationData: PropTypes.instanceOf(Object).isRequired,
  onInputChange: PropTypes.func.isRequired,
  screenTwo: PropTypes.instanceOf(Object).isRequired,
};

export default PhoneNUmberForm;
