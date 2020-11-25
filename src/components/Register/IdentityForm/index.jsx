import './style.scss';
import 'assets/styles/spinner.scss';
import 'react-phone-input-2/lib/style.css';

import PropTypes from 'prop-types';
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import { Link } from 'react-router-dom';
import { Checkbox, Container, Form, Label } from 'semantic-ui-react';
import { TERMS_CONDITIONS, PRIVACY_POLICY } from 'constants/general';

const IdentityForm = ({
  registrationData,
  onInputChange,
  screenOne,
}) => {
  const {
    errors,
    handleNext,
    clearError,
    verifyPhoneNumber,
    phonevalue,
    setPhonevalue,
  } = screenOne;

  return (
    <Container>
      <Form className="form-information" autoComplete="off">
        <Form.Field>
          <Form.Input
            placeholder={`${global.translate('First name', 8)} *`}
            error={errors.firstName || false}
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
        <Form.Field>
          <Form.Input
            placeholder={`${global.translate('Last name', 9)} *`}
            error={errors.lastName || false}
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
        <Form.Field>
          <Form.Input
            placeholder={global.translate('E-mail', 28)}
            error={errors.email || false}
            name="email"
            type="email"
            value={registrationData.email}
            onChange={e => {
              onInputChange(e);
              clearError(e);
            }}
          />
        </Form.Field>
        <Form.Field>
          <div className="user-phone-number">
            <PhoneInput
              enableSearch
              country="rw"
              value={phonevalue}
              onChange={phone => setPhonevalue(phone)}
            />
          </div>
        </Form.Field>
        {verifyPhoneNumber.error && (
          <Form.Field style={{ marginTop: '7px' }}>
            <Label prompt>
              {global.translate(verifyPhoneNumber.error.message, 57)}
            </Label>
          </Form.Field>
        )}
        <div>
          <span className="float-left">
            <Checkbox
              type="checkbox"
              name="userAgrees"
              onChange={(e, data) => {
                e.persist();
                onInputChange({
                  target: {
                    name: 'userAgrees',
                    value: data.checked,
                  },
                });
              }}
            />
            &nbsp;&nbsp;
            {global.translate('I agree to the M2U Money', 1729)}
            &nbsp;&nbsp;
            <a target="blank" href={TERMS_CONDITIONS}>
              {global.translate('User Agreement', 1730)}
            </a>{' '}
            {global.translate('and', 41)}{' '}
            <a target="blank" href={PRIVACY_POLICY}>
              {global.translate('Privacy Policy.', 1731)}
            </a>
          </span>
        </div>
        <br /> <br />
        <br />
        <button
          type="submit"
          style={{ backgroundColor: '#1E2120' }}
          className="btn-auth btn-secondary"
          disabled={!registrationData.userAgrees || !phonevalue}
          onClick={() =>
            verifyPhoneNumber.loading === false && handleNext()
          }
        >
          {verifyPhoneNumber.loading && (
            <div className="loading-button" />
          )}

          {global.translate('NEXT', 10)}
        </button>
        <br />
        {global.translate('Already registered?', 1200)}{' '}
        <Link
          style={{ backgroundColor: '#e21a22' }}
          className="btn-auth btn-primary"
          to="/login"
        >
          {global.translate('LOGIN', 190)}
        </Link>
      </Form>
    </Container>
  );
};

IdentityForm.propTypes = {
  registrationData: PropTypes.instanceOf(Object).isRequired,
  onInputChange: PropTypes.func,
  screenOne: PropTypes.instanceOf(Object).isRequired,
};

IdentityForm.defaultProps = {
  onInputChange: () => null,
};

export default IdentityForm;
