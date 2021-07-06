import React from 'react';
import { Grid, Form } from 'semantic-ui-react';

import PasswordInput from 'components/common/PasswordInput';

const PasswordForm = ({
  passwordError,
  handleChange,
  credentials,
}) => {
  return (
    <Grid.Column>
      <div>{global.translate('Password')}</div>
      <Form.Field>
        <PasswordInput
          error={
            passwordError && {
              content: global.translate(passwordError?.toString()),
              pointing: 'above',
            }
          }
          placeholder={global.translate('Password*', 2)}
          onChange={handleChange}
          type="password"
          name="Password"
          value={credentials?.Password || ''}
          icon="eye"
        />
      </Form.Field>
    </Grid.Column>
  );
};

export default PasswordForm;
