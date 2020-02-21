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
import countries from 'utils/countryCodes';
import SelectCountryCode from 'components/common/SelectCountryCode';
import './UserInfoForm.scss';

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
  const [hasDOB, setHasDOB] = useState(false);
  const [dob, setDob] = useState('DD/MM/YYYY');

  useEffect(() => {
    onInputChange({
      target: { name: 'countryCode', value: country.value },
    });
  }, [country]);

  const toggleHasDOB = () => {
    setHasDOB(!hasDOB);
  };

  const handleDOB = (event, { name, value }) => {
    setDob(value);
  };

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
            error={errors.pid || false}
            name="pid"
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
            name="dob"
            className="checkbox"
            onClick={() => toggleHasDOB()}
          />
        </Form.Field>
        {hasDOB && (
          /*  <Form.Field>
            <span>Provide your date of birth</span>
            <Form.Input
              dob
              error={errors.email || false}
              name="dob"
              type="date"
              required
              value={resetPasswordData.email}
              onChange={e => {
                onInputChange(e);
                clearError(e);
              }}
            />
          </Form.Field> */
          <Form.Field className="calendar_input">
            <span className="calendar_caret">
              <Icon name="caret down" />
            </span>
            <DateInput
              name="dob"
              placeholder="Date"
              value={dob}
              iconPosition="left"
              onChange={handleDOB}
              duration="0"
              popupPosition="top right"
              animation="none"
            />
          </Form.Field>
        )}
        <Form.Field>
          <span>I have uploaded my document?</span>{' '}
          <Checkbox
            type="checkbox"
            name="kycdoc"
            className="checkbox"
          />
        </Form.Field>
        <Form.Field>
          <Form.Field className="phone_field">
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
