import React from 'react';
import './login.scss';
import PropTypes from 'prop-types';
import AuthWrapper from 'components/common/AuthWrapper/AuthWrapper';
import LoginForm from './LoginForm';

const Login = ({
  handleChange,
  handleSubmit,
  credentials,
  error,
  loading,
  pidError,
  passwordError,
  pinError,
  clearLoginUser,
  isFormValid,
}) => {
  return (
    <AuthWrapper rightHeadlineText={global.translate('Login')}>
      <div className="form-content">
        <LoginForm
          handleChange={handleChange}
          onSubmit={handleSubmit}
          isLoading={loading}
          credentials={credentials}
          error={error}
          pidError={pidError}
          pinError={pinError}
          passwordError={passwordError}
          isFormValid={isFormValid}
          clearLoginUser={clearLoginUser}
        />
      </div>
    </AuthWrapper>
  );
};
Login.propTypes = {
  handleChange: PropTypes.func.isRequired,
  credentials: PropTypes.objectOf(PropTypes.any).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  clearLoginUser: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.string,
  pidError: PropTypes.string,
  passwordError: PropTypes.string,
  pinError: PropTypes.string,
  isFormValid: PropTypes.bool,
};

Login.defaultProps = {
  loading: false,
  error: null,
  pidError: null,
  passwordError: null,
  pinError: null,
  isFormValid: false,
  clearLoginUser: () => {},
};

export default Login;
