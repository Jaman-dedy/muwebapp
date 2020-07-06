import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Form, Label } from 'semantic-ui-react';
import './style.scss';

const PIDForm = ({ registrationData, onInputChange, screenFour }) => {
  const { handleNext, errors, clearError, verifyPID } = screenFour;
  return (
    <Container>
      <Form className="user-personal-id">
        <Form.Field>
          <Form.Input
            type="text"
            name="personalId"
            error={global.translate(errors.personalId) || false}
            value={registrationData.personalId.toUpperCase()}
            onChange={e => {
              clearError(e);
              onInputChange(e);
            }}
            placeholder={global.translate('Create your personal ID')}
          />
        </Form.Field>
        {verifyPID.error && (
          <Form.Field style={{ marginTop: '-7px' }}>
            <Label prompt>
              {global.translate(verifyPID.error.message)}
            </Label>
          </Form.Field>
        )}
        <span>
          {global.translate(
            'Please create your personal ID, you will need it, in order to login',
          )}
        </span>
        <Form.Button
          type="Next"
          primary
          loading={verifyPID.loading}
          onClick={() => !verifyPID.loading && handleNext()}
        >
          {global.translate('next')}
        </Form.Button>
        {global.translate('Already registered?')}?{' '}
        <Link to="/login">{global.translate('Login')}</Link>
      </Form>
    </Container>
  );
};

PIDForm.propTypes = {
  registrationData: PropTypes.instanceOf(Object).isRequired,
  onInputChange: PropTypes.func,
  screenFour: PropTypes.instanceOf(Object).isRequired,
};

PIDForm.defaultProps = {
  onInputChange: () => null,
};

export default PIDForm;
