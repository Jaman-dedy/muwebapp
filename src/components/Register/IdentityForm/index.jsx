import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Form, Checkbox } from 'semantic-ui-react';

const IdentityForm = ({
  registrationData,
  onInputChange,
  screenOne,
}) => {
  const { errors, handleNext, clearError } = screenOne;
  return (
    <Container>
      <Form className="form-information" autoComplete="off">
        <Form.Field>
          <Form.Input
            placeholder={`${global.translate('First name')} *`}
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
            placeholder={`${global.translate('Last name')} *`}
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
            required
            value={registrationData.email}
            onChange={e => {
              onInputChange(e);
              clearError(e);
            }}
          />
        </Form.Field>
        <span>
          <Checkbox
            type="checkbox"
            name="userAgrees"
            className="checkbox"
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
          {global.translate('I agree to the 2U Money')}{' '}
          <a target="blank" href="/">
            {global.translate('User Agreement')}
          </a>{' '}
          {global.translate('and')}{' '}
          <a target="blank" href="/">
            {global.translate('Privacy Policy.')}
          </a>
        </span>
        <Form.Button
          type="button"
          primary
          disabled={!registrationData.userAgrees}
          onClick={() => handleNext()}
        >
          {global.translate('Next')}
        </Form.Button>
        {global.translate('Already registered?')}{' '}
        <Link to="/login">{global.translate('Login')}</Link>
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
