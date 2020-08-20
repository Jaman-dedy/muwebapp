import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Header } from 'semantic-ui-react';

const ExternalMediaForm = ({ form, onChange }) => {
  const [walletsNumber, setWalletsNumber] = useState(1);
  const inputRows = new Array(walletsNumber);

  const addFormInput = () => {
    const newNumber = walletsNumber + 1;
    setWalletsNumber(newNumber);
  };

  const removeFormInput = () => {
    if (walletsNumber > 1) {
      const newNumber = walletsNumber - 1;
      setWalletsNumber(newNumber);
    }
  };

  return (
    <>
      {' '}
      <Header>{global.translate('Add External Media')}</Header>
      <Form>
        {inputRows.fill().map((value, idx) => {
          return (
            <span
              className="wallet_input_row"
              key={Math.random() * Date.now()}
            >
              <Form.Group>
                <Form.Field width={14}>
                  <Form.Input
                    className="input"
                    placeholder={global.translate('Add a link')}
                    name={`Link${idx}`}
                    value={form[`Link${idx}`] || ''}
                    onChange={onChange}
                  />
                </Form.Field>

                <Form.Field width={2}>
                  <span className="wallet-row-actions">
                    {`Link${idx}` !== 'Link0' && (
                      <Icon
                        name="times circle"
                        className="circle-remove cursor-pointer"
                        size="big"
                        onClick={() => removeFormInput(idx)}
                      />
                    )}
                    {idx === inputRows.length - 1 && (
                      <Icon
                        name="add circle"
                        className="circle-add cursor-pointer"
                        size="big"
                        onClick={() => addFormInput()}
                      />
                    )}
                  </span>
                </Form.Field>
              </Form.Group>
            </span>
          );
        })}
      </Form>
    </>
  );
};

ExternalMediaForm.propTypes = {
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
};
export default ExternalMediaForm;
