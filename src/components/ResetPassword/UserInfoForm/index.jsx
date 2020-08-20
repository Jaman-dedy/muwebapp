/* eslint-disable react-hooks/exhaustive-deps */
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
  const [country, setCountry] = useState({});
  const defaultCountry = resetPasswordData.countryCode
    ? countries.find(
        country => country.value === resetPasswordData.countryCode,
      )
    : countries.find(
        country => country.flag === userLocationData.CountryCode,
      );

  useEffect(() => {
    if (defaultCountry) {
      setCountry(defaultCountry);
    }
  }, [defaultCountry]);

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
          message={global.translate(
            resetPasswordPrequalification.error.Description,
          )}
          title={global.translate('Error', 195)}
          callbackFn={clearResetUserPrequalificationFx}
        />
      )}
      {!resetPasswordPrequalification.error && (
        <Container className="userinfo">
          <p className="sub-title">
            {global.translate(
              'Just provide the following information and we will help you get into your account.',
              446,
            )}
          </p>
          <Form
            onSubmit={onSubmit}
            className="form-information"
            autoComplete="off"
          >
            <Form.Field>
              <Form.Input
                placeholder={global.translate('Username')}
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
                placeholder={global.translate('Last Name', 9)}
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
              <span>
                {global.translate(
                  'I have set my date of birth',
                  1718,
                )}
              </span>{' '}
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
              <span>
                {global.translate(
                  'I have uploaded my document',
                  1719,
                )}
              </span>{' '}
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
                  placeholder="555555555"
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
              {global.translate('Next', 10)}
            </Form.Button>
            {global.translate('Already registered?', 1200)}{' '}
            <Link to="/login">{global.translate('Login', 190)}</Link>
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
