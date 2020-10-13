/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Form, Label } from 'semantic-ui-react';
import './style.scss';
import 'assets/styles/spinner.scss';

const PIDForm = ({ registrationData, onInputChange, screenFour }) => {
  const { handleNext, errors, clearError, verifyPID } = screenFour;

  return (
    <Container>
      <Form className="user-personal-id">
        <br />
        <div>
          {global.translate(
            'Please create your username, you will need it, in order to login',
            1711,
          )}
        </div>
        <br />
        <Form.Field>
          <Form.Input
            type="text"
            name="personalId"
            error={global.translate(errors.personalId) || false}
            value={registrationData.personalId}
            onChange={e => {
              clearError(e);
              onInputChange(e);
            }}
            placeholder={global.translate('Create your username', 35)}
          />
        </Form.Field>
        {verifyPID.error && (
          <Form.Field style={{ marginTop: '-7px' }}>
            <Label prompt>
              {global.translate(verifyPID.error.message)}
            </Label>
          </Form.Field>
        )}
        <button
          type="NEXT"
          className="btn-auth btn-secondary"
          disabled={errors?.personalId}
          loading={verifyPID.loading}
          onClick={() => !verifyPID.loading && handleNext()}
        >
          {verifyPID.loading && <div className="loading-button" />}
          {global.translate('Next', 10)}
        </button>
        {global.translate('Already registered?', 1200)}{' '}
        <Link to="/login">{global.translate('Login', 190)}</Link>
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
