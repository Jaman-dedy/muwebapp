import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import PasswordForm from 'components/common/PasswordForm';
import PasswordInput from 'components/common/PasswordInput';

import './ChangePassword.scss';

const ChangePassword = ({ changePassword }) => {
  const {
    changePasswordData,
    errors,
    handleInputChange,
    handleSubmit,
    updatePassword,
  } = changePassword;
  return (
    <div className="change-password-container large-padding border-1 b-light-grey border-radius-4 medium-v-margin xlarge-h-margin">
      <Form>
        <PasswordInput
          fluid
          placeholder={global.translate('Old password')}
          name="oldPassword"
          onChange={handleInputChange}
          error={errors.oldPassword || false}
          value={changePasswordData.oldPassword}
          type="password"
        />
        <PasswordForm
          buttonText="Change password"
          errors={errors}
          passwordData={{
            password: changePasswordData.password,
            confirmPassword: changePasswordData.confirmPassword,
          }}
          onInputChange={handleInputChange}
          onClick={handleSubmit}
          loading={updatePassword.loading}
        />
      </Form>
    </div>
  );
};

ChangePassword.propTypes = {
  changePassword: PropTypes.instanceOf(Object),
};

ChangePassword.defaultProps = {
  changePassword: {},
};

export default ChangePassword;
