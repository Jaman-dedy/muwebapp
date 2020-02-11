import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Form, Input } from 'semantic-ui-react';
import './style.scss';

const OTPForm = ({
  credentials,
  onInputChange,
  handleSubmit,
  login,
}) => {
  let digitRefs = [];
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));

  const [digitWithFocus, setDigitWithFocus] = useState(0);

  useEffect(() => {
    try {
      digitRefs[digitWithFocus].current.focus();
    } catch (error) {
      // send tot the server and call next
      console.log(digitWithFocus);
    }
  }, [digitWithFocus]);

  return (
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
              />
            ))}
        </Form.Field>
        {/* <Form.Button
          type="Next"
          primary
          // loading={login.loading}
          onClick={handleSubmit}
        >
          next
        </Form.Button> */}
        Already have an account? <Link to="/login">Login</Link>
      </Form>
    </Container>
  );
};

export default OTPForm;
