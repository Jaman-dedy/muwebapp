import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Grid, Image, Label } from 'semantic-ui-react';

import PhoneNumberInput from 'components/common/PhoneNumberInput';
import emailIcon from 'assets/images/email-icon.png';

const EditGeneralInfo = ({ emailAndPhone }) => {
  const {
    emailData,
    phoneData,
    handlePhoneInputChange,
    handleEmailInputChange,
    handleSubmit,
    phoneErrors,
    emailErrors,
    addPhoneNumberForm,
    removePhoneNumberForm,
    addEmailForm,
    removeEmailForm,
    updateUserPhoneList,
    updateUserEmailList,
  } = emailAndPhone;

  const options = [
    {
      key: 1,
      text: global.translate('Private', 301),
      value: 1,
    },
    {
      key: 2,
      text: global.translate('Professional', 302),
      value: 2,
    },
    {
      key: 3,
      text: global.translate('Other', 303),
      value: 3,
    },
  ];

  return (
    <div className="edit-phone-and-email">
      <Grid stackable columns={3} className="phone-label-grid">
        <Grid.Column width={9}>
          <span>
            {global.translate('Provide your phone number (s)', 1937)}
          </span>
        </Grid.Column>
        <Grid.Column width={4} className="category">
          <span>{global.translate('Select a category', 1227)}</span>
        </Grid.Column>
        <Grid.Column width={3} className="empty-column" />
      </Grid>

      <Form className="phone-numbers">
        {phoneData.Phones.map(
          (
            { PhoneNumber, CategoryCode, PhonePrefix, index },
            idx,
          ) => {
            return (
              <span key={Number(index)}>
                <Grid
                  stackable
                  columns={3}
                  className="phone-numbers-grid"
                >
                  <Grid.Column
                    width={9}
                    className="phone-numbers-column"
                  >
                    <PhoneNumberInput
                      label=""
                      onChange={({ target: { name, value } }) => {
                        handlePhoneInputChange({
                          target: { name: name + index, value },
                        });
                      }}
                      defaultCountryCode={
                        PhonePrefix
                          ? `+${
                              PhonePrefix.toString().split('+')[
                                PhonePrefix.toString().split('+')
                                  .length - 1
                              ]
                            }`
                          : ''
                      }
                      value={PhoneNumber}
                    />
                  </Grid.Column>
                  <Grid.Column
                    width={4}
                    className="phone-numbers-column"
                  >
                    <Form.Select
                      onChange={(_, { name, value }) => {
                        handlePhoneInputChange({
                          target: { name, value },
                        });
                      }}
                      value={Number(CategoryCode)}
                      name={`Category${index}`}
                      className="category-selector"
                      options={options}
                    />
                  </Grid.Column>
                  <Grid.Column
                    width={3}
                    className="phone-numbers-column phone-numbers-actions"
                  >
                    <div className="actions-icon">
                      {`Name${idx}` !== 'Name0' && (
                        <Icon
                          name="times circle"
                          className="circle-remove cursor-pointer"
                          size="big"
                          onClick={() => removePhoneNumberForm(index)}
                        />
                      )}
                      {idx === phoneData.Phones.length - 1 && (
                        <Icon
                          name="add circle"
                          className="circle-add cursor-pointer"
                          size="big"
                          onClick={() => addPhoneNumberForm()}
                        />
                      )}
                      {idx !== phoneData.Phones.length - 1 && null}
                    </div>
                  </Grid.Column>
                </Grid>
              </span>
            );
          },
        )}
        {phoneErrors && (
          <Form.Field style={{ marginTop: '7px', width: '100%' }}>
            <Label
              prompt
              style={{ width: '100%', textAlign: 'center' }}
            >
              {global.translate('Please, fill all the fields', 1938)}
            </Label>
          </Form.Field>
        )}
      </Form>

      <Grid stackable columns={3} className="email-label-grid">
        <Grid.Column width={9}>
          <span>
            {global.translate(
              'Provide your email address (es)',
              1939,
            )}
          </span>
        </Grid.Column>
        <Grid.Column width={4} className="category">
          <span>{global.translate('Select a category', 1227)}</span>
        </Grid.Column>
        <Grid.Column width={3} className="empty-column" />
      </Grid>

      <Form className="emails">
        {emailData.Emails.map(
          ({ Email, CategoryCode, index }, idx) => {
            return (
              <span key={Number(idx)}>
                <Grid stackable columns={3} className="emails-grid">
                  <Grid.Column width={9} className="emails-column">
                    <Form.Input
                      value={Email}
                      className="input-image"
                      type="email"
                      name={`Email${index}`}
                      actionPosition="left"
                      onChange={({ target: { name, value } }) =>
                        handleEmailInputChange({
                          target: { name, value },
                        })
                      }
                      action={<Image src={emailIcon} size="mini" />}
                    />
                  </Grid.Column>
                  <Grid.Column width={4} className="emails-column">
                    <Form.Select
                      onChange={(_, { name, value }) => {
                        handleEmailInputChange({
                          target: { name, value },
                        });
                      }}
                      value={Number(CategoryCode)}
                      name={`Category${index}`}
                      className="category-selector"
                      options={options}
                    />
                  </Grid.Column>
                  <Grid.Column
                    width={3}
                    className="phone-numbers-column phone-numbers-actions"
                  >
                    <div className="actions-icon">
                      {`Name${idx}` !== 'Name0' && (
                        <Icon
                          name="times circle"
                          className="circle-remove cursor-pointer"
                          size="big"
                          onClick={() => removeEmailForm(index)}
                        />
                      )}
                      {idx === emailData.Emails.length - 1 && (
                        <Icon
                          name="add circle"
                          className="circle-add cursor-pointer"
                          size="big"
                          onClick={() => addEmailForm()}
                        />
                      )}
                      {idx !== emailData.Emails.length - 1 && null}
                    </div>
                  </Grid.Column>
                </Grid>
              </span>
            );
          },
        )}

        {emailErrors && (
          <Form.Field style={{ marginTop: '7px', width: '100%' }}>
            <Label
              prompt
              style={{ width: '100%', textAlign: 'center' }}
            >
              {global.translate(
                'Please, provide valid emails for all the fields',
                2234,
              )}
            </Label>
          </Form.Field>
        )}

        <Form.Button
          type="button"
          secondary
          color="gray"
          loading={
            updateUserPhoneList.loading || updateUserEmailList.loading
          }
          onClick={() =>
            !updateUserPhoneList.loading &&
            !updateUserEmailList.loading &&
            handleSubmit()
          }
          style={{ marginLeft: 14 }}
        >
          {global.translate('Submit', 1695)}
        </Form.Button>
      </Form>
    </div>
  );
};

EditGeneralInfo.propTypes = {
  emailAndPhone: PropTypes.instanceOf(Object),
};

EditGeneralInfo.defaultProps = {
  emailAndPhone: {},
};

export default EditGeneralInfo;
