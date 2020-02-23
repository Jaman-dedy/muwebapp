import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Form, Input } from 'semantic-ui-react';
import Feedback from 'components/common/Feedback';
import './style.scss';

const OTPForm = ({
  credentials,
  onInputChange,
  handleSubmit,
  login,
  screenFive,
}) => {
  let digitRefs = [];
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));

  const { handleNext, resetPassword, clearResetUserFX } = screenFive;

  const [digitWithFocus, setDigitWithFocus] = useState(0);

  const setDigit = (e, data, name) => {
    let myValue = data.value;
    console.log('$$$$$', myValue);
    onInputChange({ target: { name, value: myValue } });
  };

  useEffect(() => {
    try {
      digitRefs[digitWithFocus].current.focus();
    } catch (error) {
      // send tot the server and call next
      // onInputChange({ target: { name: 'digit6', digitWithFocus } });
      //console.log('$##$$$', digitWithFocus);
    }
  }, [digitWithFocus]);

  return (
    <>
      {resetPassword.error && (
        <Feedback
          message={resetPassword.error.Description}
          title="Error"
          callbackFn={clearResetUserFX}
        />
      )}

      {!resetPassword.error && (
        <Container>
          <Form className="otp-form">
            <span>Enter the 6 digit we have sent you</span>
            <Form.Field className="otp-input-group">
              {Array(6)
                .fill()
                .map((value, index) => (
                  <Input
                    key={index}
                    type="text"
                    name={`digit${index}`}
                    ref={digitRefs[index]}
                    className="otp-input"
                    maxLength="1"
                    required
                    onKeyUp={e => {
                      setDigitWithFocus(
                        parseInt(e.target.name.slice(-1), 10) + 1,
                      );
                    }}
                    onChange={(e, data) => {
                      let name = `digit${index + 1}`;
                      console.log('------', name);
                      onInputChange({
                        target: { name, value: data.value },
                      });
                    }}
                  />
                ))}
            </Form.Field>
            <Form.Button
              style={{ marginLeft: '30px' }}
              type="Next"
              primary
              loading={resetPassword.loading}
              onClick={e => handleNext()}
            >
              next
            </Form.Button>
            <p style={{ marginLeft: '40px' }}>
              {' '}
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Form>
        </Container>
      )}
    </>
  );
};

export default OTPForm;
