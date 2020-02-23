import PropTypes from 'prop-types';
import React, { useState } from 'react';
<<<<<<< HEAD
import { Container, Form, Checkbox, Loader } from 'semantic-ui-react';
=======
import {
  Container,
  Form,
  Input,
  Checkbox,
  Loader,
} from 'semantic-ui-react';
>>>>>>> reset-password

import './QuestionsForm.scss';

const QuestionsForm = ({
  resetPasswordData,
  onInputChange,
  screenTwo,
}) => {
  const {
    handleNext,
    userSecurityQuestionsFx,
    resetPasswordQuestions,
  } = screenTwo;

  const [hasQuestions, setHasQuestions] = useState(false);

  const handleCheckbox = (e, data) => {
    onInputChange({
      target: {
        name: data.name,
        value: data.checked === true ? 'Yes' : 'No',
      },
    });

    setHasQuestions(!hasQuestions);

    if (data.checked === true) {
      userSecurityQuestionsFx();
    }
  };

  return (
    <div className="questions-form">
      <p className="text-darken-blue white-space-nowrap">
        Kindly provide answers to these questions
      </p>

      <Container>
        <Form>
          <Form.Field>
            <div className="sec_checkbox_container">
              <span className="sec_checkbox text-darken-blue">
                I have set my security questions ?
              </span>
              <Checkbox
                type="checkbox"
                name="SecurityQuestionSet"
                className="checkbox"
                onChange={(e, data) => handleCheckbox(e, data)}
              />
            </div>
          </Form.Field>

          {hasQuestions &&
            !resetPasswordQuestions.loading &&
            resetPasswordQuestions.Questions && (
              /* and questions are not loading */

              <>
                {resetPasswordQuestions.Questions.map((item, key) => (
<<<<<<< HEAD
                  <Form.Field key={item.Text}>
=======
                  <Form.Field key={Math.random() * 1000}>
>>>>>>> reset-password
                    <span className="question white-space-nowrap text-darken-blue">
                      <div className="dot" />
                      {item.Text}
                    </span>
<<<<<<< HEAD
                    <Form.Input
=======
                    <Input
>>>>>>> reset-password
                      type="text"
                      placeholder="Your answer"
                      value={resetPasswordData[`A${key + 1}`]}
                      name={`A${key + 1}`}
                      onChange={e => {
                        onInputChange(e);
                      }}
                    />
                  </Form.Field>
                ))}
              </>
            )}

          {hasQuestions && resetPasswordQuestions.loading && (
<<<<<<< HEAD
=======
            /* and questions are loading */
>>>>>>> reset-password
            <Loader active inline="centered" />
          )}

          <Form.Button
            type="Next"
            primary
            onClick={() => handleNext()}
          >
            next
          </Form.Button>
        </Form>
      </Container>
    </div>
  );
};

<<<<<<< HEAD
QuestionsForm.propTypes = {
  resetPasswordData: PropTypes.instanceOf(Object).isRequired,
  screenTwo: PropTypes.instanceOf(Object).isRequired,
  onInputChange: PropTypes.func.isRequired,
=======
QuestionsForm.prototype = {
  screenTwo: PropTypes.instanceOf(Object).isRequired,
>>>>>>> reset-password
};

export default QuestionsForm;
