import React from 'react';
import { Container, Form, Input, Icon } from 'semantic-ui-react';
import './style.scss';

const QuestionsForm = handleSubmit => {
  return (
    <div className="questions-form">
      <p className="bold text-darken-blue white-space-nowrap form-header">
        Reset your password and your PIN number
      </p>
      <p className="text-darken-blue white-space-nowrap">
        Kindly provide answers to these questions
      </p>

      <Container>
        <Form>
          <Form.Field>
            <span className="question white-space-nowrap text-darken-blue">
              <Icon name="circle text-primary" /> What is the name of
              your favorite car?
            </span>
            <Input type="text" placeholder="Your answer" required />
          </Form.Field>
          <Form.Field>
            <span className="question white-space-nowrap text-darken-blue">
              <Icon name="circle text-primary" /> What is the name of
              your favorite car?
            </span>
            <Input type="text" placeholder="Your answer" required />
          </Form.Field>
          <Form.Field>
            <span className="question white-space-nowrap text-darken-blue">
              <Icon name="circle text-primary" /> What is the name of
              your favorite car?
            </span>
            <Input type="text" placeholder="Your answer" required />
          </Form.Field>

          <Form.Button type="Next" primary onClick={handleSubmit}>
            next
          </Form.Button>
        </Form>
      </Container>
    </div>
  );
};

export default QuestionsForm;
