import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { Link } from 'react-router-dom';
import { Checkbox, Container, Form, Icon } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import Feedback from 'components/common/Feedback/Feedback';
import countries from 'utils/countryCodes';
import './UserInfoForm.scss';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';
import InfoMessage from 'components/common/InfoMessage';

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
    phoneValue,
    setPhoneValue,
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
          <div className="auth-sub-text">
            {global.translate(
              'Provide the following information, we will help you get into your account.',
              446,
            )}
          </div>
          <Form
            onSubmit={onSubmit}
            className="form-information"
            autoComplete="off"
          >
            <Form.Field>
              <Form.Input
                placeholder={global.translate('Username', 1992)}
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
            <div>
              <InfoMessage description="Kindly click on the buttons below if you have set your date of birth and uploaded your document." />
            </div>
            <Form.Field>
              <span className="float-left">
                <Checkbox
                  type="checkbox"
                  name="DOBSet"
                  className="checkbox"
                  onChange={(e, data) => handleCheckbox(e, data)}
                />
              </span>{' '}
              <span className="float-left">
                &nbsp;&nbsp;
                {global.translate(
                  'I have set my date of birth',
                  1718,
                )}
              </span>
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
              <span className="float-left">
                <Checkbox
                  type="checkbox"
                  name="KYCDocSent"
                  className="checkbox"
                  onChange={(e, data) => handleCheckbox(e, data)}
                />
              </span>
              <span className="float-left">
                &nbsp;&nbsp;
                {global.translate(
                  'I have uploaded my document',
                  1719,
                )}
              </span>
            </Form.Field>
            <Form.Field>
              <div className="user-phone-number">
                <PhoneInput
                  enableSearch
                  name="phoneNumber"
                  country="cm"
                  placeholder="e.g.: 788 000 000"
                  value={phoneValue}
                  onChange={phone => setPhoneValue(phone)}
                />
              </div>
            </Form.Field>
            <button
              type="submit"
              className="btn-auth btn-secondary"
              onClick={() => handleNext()}
            >
              {resetPasswordPrequalification.loading && (
                <div className="loading-button" />
              )}
              {global.translate('NEXT', 10)}
            </button>
            <br />
            {!isAppDisplayedInWebView() && (
              <>
                {global.translate('Already registered?', 1200)}{' '}
                <Link to="/login">
                  {global.translate('Login', 190)}
                </Link>
              </>
            )}
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
