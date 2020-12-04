/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import AuthWrapper from 'components/common/AuthWrapper/AuthWrapper';
import Form from './Form';

const RemindUsername = ({
  handleChange,
  handleSubmit,
  credentials,
  error,
  data,
  loading,
  onKeyDown,
  phoneValue,
  setPhoneValue,
  clearRemindUsername,
}) => {
  return (
    <AuthWrapper
      authHeader={
        !data && !error
          ? global.translate('Provide your phone number here')
          : ''
      }
      rightHeadlineText={global.translate(
        'Get back your username',
        1698,
      )}
    >
      <div className="form-content">
        <Form
          handleChange={handleChange}
          onSubmit={handleSubmit}
          isLoading={loading}
          credentials={credentials}
          error={error}
          onKeyDown={onKeyDown}
          phoneValue={phoneValue}
          setPhoneValue={setPhoneValue}
          clearRemindUsername={clearRemindUsername}
          data={data}
        />
      </div>
    </AuthWrapper>
  );
};
RemindUsername.propTypes = {
  handleChange: PropTypes.func.isRequired,
  credentials: PropTypes.objectOf(PropTypes.any).isRequired,
  handleSubmit: PropTypes.func.isRequired,

  loading: PropTypes.bool,
  error: PropTypes.objectOf(PropTypes.any),

  onKeyDown: PropTypes.func,
  phoneValue: PropTypes.string.isRequired,
  setPhoneValue: PropTypes.func.isRequired,
  clearRemindUsername: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

RemindUsername.defaultProps = {
  loading: false,
  error: null,
  onKeyDown: () => {},
};

export default RemindUsername;
