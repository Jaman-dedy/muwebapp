import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Container, Form, Checkbox, Loader } from 'semantic-ui-react';
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
      <div className="text-darken-blue white-space-nowrap">
        {global.translate(
          'Kindly provide answers to these questions',
          1720,
        )}
      </div>
      <br />
      <Container>
        <Form>
          <div>
            <span className="float-left">
              <Checkbox
                type="checkbox"
                name="SecurityQuestionSet"
                onChange={(e, data) => handleCheckbox(e, data)}
              />
            </span>
            <span className="float-left">
              &nbsp;&nbsp;
              {global.translate(
                'I have set my security questions',
                1721,
              )}
            </span>
          </div>
          {hasQuestions &&
            !resetPasswordQuestions.loading &&
            resetPasswordQuestions.Questions && (
              <>
                {resetPasswordQuestions.Questions.map((item, key) => (
                  <Form.Field key={item.Text}>
                    <span className="question white-space-nowrap text-darken-blue">
                      <div className="dot" />
                      {global.translate(item.Text)}
                    </span>
                    <Form.Input
                      type="text"
                      placeholder={global.translate('Answer', 316)}
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
            <Loader active inline="centered" />
          )}
          <br />
          <br />
          <button
            type="button"
            className="btn-auth btn-secondary"
            onClick={() => handleNext()}
          >
            {global.translate('NEXT', 10)}
          </button>
        </Form>
      </Container>
    </div>
  );
};

QuestionsForm.propTypes = {
  resetPasswordData: PropTypes.instanceOf(Object).isRequired,
  screenTwo: PropTypes.instanceOf(Object).isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default QuestionsForm;
