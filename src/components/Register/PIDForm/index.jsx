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
            error={errors.personalId || false}
            value={registrationData.personalId.toUpperCase()}
            onChange={e => {
              clearError(e);
              onInputChange(e);
            }}
            placeholder="Enter your Personal ID"
          />
        </Form.Field>
        {verifyPID.error && (
          <Form.Field style={{ marginTop: '-7px' }}>
            <Label pointing prompt>
              {verifyPID.error.message}
            </Label>
          </Form.Field>
        )}
        <span>
          Please create your personal ID, you will need it, in order
          to login to 2U money
        </span>
        <Form.Button
          type="Next"
          primary
          loading={verifyPID.loading}
          onClick={() => {
            handleNext();
          }}
        >
          next
        </Form.Button>
        Already have an account? <Link to="/login">Login</Link>
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
