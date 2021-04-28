import React, { useState, useEffect } from 'react';
import {
  Icon,
  Modal,
  Button,
  Dropdown,
  Form,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import Message from 'components/common/Message';
import PinCodeForm from 'components/common/PinCodeForm';
import { restoreUpdateSecurityQuestions } from 'redux/actions/userAccountManagement/updateSecurityQuestions';

const allQuestions = [
  {
    Index: '1000',
    Text: 'What is your preferred color?',
  },
  {
    Index: '1001',
    Text: 'What is your mother’s maiden name?',
  },
  {
    Index: '1002',
    Text: 'In which city were you born?',
  },
  {
    Index: '1003',
    Text: 'What is your preferred car brand name?',
  },
  {
    Index: '1004',
    Text: 'What is your preferred movie?',
  },
  {
    Index: '1005',
    Text: 'Who is your preferred female singer?',
  },
  {
    Index: '1006',
    Text: 'What is your childhood school name?',
  },
  {
    Index: '1007',
    Text: 'What is your preferred sports?',
  },
  {
    Index: '1008',
    Text: 'What is your preferred TV show?',
  },
  {
    Index: '1009',
    Text: 'What is your preferred city in the world?',
  },
];

const EditSecurityQuestions = ({
  securityQuestions,
  open,
  setOpen,
}) => {
  const {
    questionData,
    onSelectQuestion,
    handleInputChange,
    handleSubmit,
    handlePinChange,
    pinError,
    updateSecurityQuestions,
  } = securityQuestions;

  const [numberError, setNumberError] = useState(null);
  const [pin, setPin] = useState({});
  const [displayedQuestions, setDisplayedQuestions] = useState(
    allQuestions,
  );

  const dispatch = useDispatch();

  const onChange = ({ target: { name, value } }) => {
    setPin({
      ...pin,
      [name]: value,
    });
  };

  useEffect(() => {
    const { digit0, digit1, digit2, digit3 } = pin;

    const value = `${digit0 || ''}${digit1 || ''}${digit2 ||
      ''}${digit3 || ''}`;

    handlePinChange(value);
  }, [pin]);

  useEffect(() => {
    const newQuestions = allQuestions.filter(item => {
      return !questionData.some(
        question => item.Index === question.Index,
      );
    });

    setDisplayedQuestions(newQuestions);
  }, [questionData]);

  const getNumberOfQuestions = () => {
    let number = 0;
    questionData.map(({ question }) => {
      if (question) number += 1;
      return question;
    });

    if (number < 5)
      setNumberError(
        global.translate(
          'Kindly set 5 questions and 5 answers',
          1946,
        ),
      );
    else setNumberError(null);

    return number;
  };

  return (
    <Modal
      open={open}
      size="small"
      className="edit-security-questions"
    >
      <Modal.Header className="text-light-black center-align ">
        {global.translate('Edit your security questions', 1264)}
      </Modal.Header>
      <Modal.Content>
        <Form>
          <ol className="security-question-list">
            {questionData.map(({ question, answer, key, error }) => {
              return (
                <li
                  className="security-question-item medium-v-margin "
                  key={key}
                >
                  <div
                    className="flex justify-content-space-between no-outline cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onKeyDown={() => null}
                  >
                    <div>
                      <span>
                        {question
                          ? global.translate(question)
                          : global.translate(
                              'Select a question',
                              317,
                            )}
                      </span>
                    </div>
                    <Dropdown icon={<Icon name="caret down" link />}>
                      <Dropdown.Menu
                        className="options"
                        style={{
                          marginLeft: -303,
                          marginTop: 0,
                          width: 240,
                          padding: '10px 10px',
                        }}
                      >
                        {displayedQuestions.map(
                          ({ Text, Index }, i) => (
                            <div
                              className="innerOptions"
                              key={Number(i)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={() => null}
                              onClick={() => {
                                onSelectQuestion({
                                  Text,
                                  Index,
                                  key,
                                });
                              }}
                            >
                              <p className="itemName">
                                {global.translate(Text, Index)}
                              </p>
                            </div>
                          ),
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <ul>
                    <li>
                      <Form.Input
                        fluid
                        placeholder={global.translate('Answer', 316)}
                        value={answer}
                        error={error}
                        onChange={({ target: { value } }) =>
                          handleInputChange({
                            target: { key, value },
                          })
                        }
                      />
                    </li>
                  </ul>
                </li>
              );
            })}
          </ol>

          <div className="center pin-form">
            <div className="center-align">
              {global.translate(`Provide the PIN number`, 1945)}
            </div>
            <PinCodeForm
              label=""
              onChange={onChange}
              pinError={pinError}
            />
          </div>
        </Form>
        {numberError && <Message error message={numberError} />}
        {updateSecurityQuestions.error && (
          <Message
            error
            message={updateSecurityQuestions.error.Description}
          />
        )}
      </Modal.Content>
      <Modal.Actions>
        <>
          <Button
            onClick={() => {
              if (!updateSecurityQuestions.loading) {
                restoreUpdateSecurityQuestions()(dispatch);
                setOpen(false);
              }
            }}
            basic
            color="red"
            content={global.translate('Cancel', 86)}
          />
          <Button
            loading={updateSecurityQuestions.loading}
            onClick={() =>
              getNumberOfQuestions() >= 3 &&
              !updateSecurityQuestions.loading &&
              handleSubmit()
            }
            positive
            content={global.translate('Save', 614)}
          />
        </>
      </Modal.Actions>
    </Modal>
  );
};

EditSecurityQuestions.propTypes = {
  securityQuestions: PropTypes.instanceOf(Object).isRequired,
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
};

EditSecurityQuestions.defaultProps = {
  open: false,
};

export default EditSecurityQuestions;
