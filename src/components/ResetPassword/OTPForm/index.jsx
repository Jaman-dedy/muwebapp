import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Form, Input } from 'semantic-ui-react';
import Feedback from 'components/common/Feedback/Feedback';
import './style.scss';

const OTPForm = ({
  onInputChange,

  screenFive,
}) => {
  const digitRefs = [];
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));

  const { handleNext, resetPassword, clearResetUserFX } = screenFive;

  const [digitWithFocus, setDigitWithFocus] = useState(0);

  useEffect(() => {
    try {
      digitRefs[digitWithFocus].current.focus();
    } catch (error) {}
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
          <Form className="otp-form-reset">
            <div className="otp">
              <p className="otpTitle">
                {global.translate(
                  'Please provide the verification code sent to your phone via SMS',
                  24,
                )}
              </p>
              <Form.Field className="otp-input-group">
                {Array(6)
                  .fill()
                  .map((value, index) => (
                    <Input
                      key={value}
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
                        const name = `digit${index + 1}`;

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
                onClick={() => handleNext()}
              >
                {global.translate('Next', 10)}
              </Form.Button>
              <p className="otpFooter">
                {global.translate('Already registered?', 1200)}{' '}
                <Link
                  to="/login"
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  {global.translate('LOGIN')}
                </Link>
              </p>
            </div>
          </Form>
        </Container>
      )}
    </>
  );
};

OTPForm.propTypes = {
  screenFive: PropTypes.instanceOf(Object).isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default OTPForm;
