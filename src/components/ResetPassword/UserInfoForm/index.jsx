import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { Container, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import DatePicker from 'components/common/DatePicker';
import countries from 'utils/countryCodes';
import AlertDanger from 'components/common/Alert/Danger';
import './UserInfoForm.scss';

const UserInfoForm = ({
  resetPasswordData,
  onInputChange,
  screenOne,
}) => {
  const {
    errors,
    onSubmit,
    handleNext,
    clearError,
    userLocationData,
    resetPasswordPrequalification,
    phoneValue,
    setPhoneValue,
  } = screenOne;
  const [country, setCountry] = useState({});
  const [value, setValue] = useState();
  const history = useHistory();

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
    if (country?.key) {
      setValue(phoneValue);
    }
  }, [country?.key, phoneValue]);
  const handleDOB = ({ value }) => {
    onInputChange({ target: { name: 'DOB', value } });
  };

  return (
    <>
      <Container className="userinfo">
        <div className="auth-sub-text">
          {global.translate('Please tell us about yourself')}
        </div>
        {resetPasswordPrequalification.error && (
          <AlertDanger
            message={global.translate(
              resetPasswordPrequalification.error.Description,
            )}
          />
        )}
        <Form
          onSubmit={onSubmit}
          className="form-information"
          autoComplete="off"
        >
          <Form.Field>
            <span>{global.translate('Username')}</span>
            <Form.Input
              placeholder={global.translate('Username', 1992)}
              error={errors.personalId || false}
              name="personalId"
              type="text"
              required
              value={resetPasswordData.personalId}
              onChange={e => {
                onInputChange(e);
                clearError(e);
              }}
            />
          </Form.Field>
          <span>{global.translate('Phone number')}</span>
          <Form.Field>
            <div className="user-phone-number">
              <PhoneInput
                enableSearch
                name="phoneNumber"
                country={country.key}
                placeholder="e.g.: 788 000 000"
                value={value}
                onChange={phone => {
                  setPhoneValue(phone);
                  clearError();
                }}
              />
            </div>
          </Form.Field>
          <span>{global.translate('Date of  birth')}</span>
          <Form.Field>
            <DatePicker
              name="dob"
              maxDate={new Date()}
              onDateChange={date => {
                handleDOB({ value: date });
                clearError();
              }}
              date={resetPasswordData.DOB}
              dateFormat="yyyy-MM-dd"
              placeholder={global.translate(
                'Select your date of birth',
              )}
            />
          </Form.Field>
          <button
            type="submit"
            className="btn-auth btn-secondary"
            onClick={() => handleNext()}
            disabled={
              !resetPasswordData.DOB ||
              !phoneValue ||
              phoneValue?.length < 11
            }
          >
            {resetPasswordPrequalification.loading && (
              <div className="loading-button" />
            )}
            {global.translate('Continue').toUpperCase()}
          </button>
          <br />
          <div>
            <div>{global.translate('Want to login?')} </div>
            <button
              type="button"
              className="login-link"
              onClick={() => history.push('/login')}
            >
              {global.translate('login').toUpperCase()}
            </button>
          </div>
        </Form>
      </Container>
    </>
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
