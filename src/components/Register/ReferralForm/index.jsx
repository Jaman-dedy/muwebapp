import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Form, Icon, Message } from 'semantic-ui-react';

import LoaderComponent from 'components/common/Loader';
import './ReferralForm.scss';
import Thumbnail from 'components/common/Thumbnail';

const ReferralForm = ({
  onInputChange,
  registrationData,
  referralScreen,
}) => {
  const {
    handleNext,
    handleSubmit,
    errors,
    clearError,
    searchData: { error, data, loading },
    registerUser,
  } = referralScreen;

  const [skipLoading, setSkipLoading] = useState(false);

  const skip = () => {
    if (!registerUser.loading && !loading) {
      setSkipLoading(true);
      handleNext('skip');
    }
    return true;
  };

  useEffect(() => {
    if (registerUser.success || registerUser.error)
      setSkipLoading(false);
  }, [registerUser]);

  return (
    <Container>
      <Form
        className="referral-form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <span className="title">
          {global.translate(
            'Provide the Personnal ID of the user who told you about us',
            1414,
          )}{' '}
          {global.translate('or', 1415)}
        </span>{' '}
        <Link to="/register" onClick={() => skip()}>
          {global.translate('Complete the registration', 1416)}
        </Link>
        <Form.Field>
          {!skipLoading && (
            <Form.Input
              placeholder={global.translate('Personal ID', 37)}
              className="referral-pid-input"
              name="ReferralPID"
              value={registrationData.ReferralPID}
              onChange={e => {
                clearError(e);
                onInputChange(e);
              }}
              action={
                <button
                  className="referral-search-button cursor-pointer"
                  type="button"
                  onClick={() => handleSubmit(true)}
                >
                  <Icon name="search" size="big" />
                </button>
              }
            />
          )}
        </Form.Field>
        {loading && (
          <div className="search-referral-loading">
            <>
              <LoaderComponent
                className="loading"
                loaderContent={
                  global.translate('searching for the user ') +
                  registrationData.ReferralPID
                }
              />
            </>
          </div>
        )}
        <Message
          error
          visible={errors.ReferralPID || false}
          content={errors.ReferralPID}
        />
        {data &&
          data[0].Result === 'Success' &&
          !loading &&
          !error &&
          !errors.ReferralPID &&
          registrationData.ReferralPID &&
          registrationData.ReferralPID !== '' && (
            <div className="referral-results">
              <Thumbnail
                name={data[0].FirstName}
                secondName={data[0].LastName}
                avatar={data[0].PictureURL}
                style={{
                  height: 95,
                  width: 95,
                  marginRight: -2,
                }}
              />
              <p className="firstLastName">
                {`${data[0].FirstName}  ${data[0].LastName}`}
              </p>
              <p className="address">
                {data[0].City} {data[0].Country}
              </p>
            </div>
          )}
        {skipLoading && (
          <div className="skip-loading">
            <>
              <LoaderComponent
                className="loading"
                loaderContent={global.translate(
                  'Creating the account ',
                )}
              />
            </>
          </div>
        )}
        {!skipLoading && (
          <Form.Button
            type="button"
            primary
            loading={registerUser.loading}
            onClick={() =>
              !registerUser.loading && !loading && handleNext()
            }
          >
            {global.translate('SEND')}
          </Form.Button>
        )}
        {global.translate('Already registered?')}?{' '}
        <Link to="/login">{global.translate('Login')}</Link>
      </Form>
    </Container>
  );
};

ReferralForm.propTypes = {
  registrationData: PropTypes.instanceOf(Object).isRequired,
  onInputChange: PropTypes.func.isRequired,
  referralScreen: PropTypes.objectOf(PropTypes.any).isRequired,
  // localError: PropTypes.string,
};

// ReferralForm.defaultProps = {
// localError: '',
// };

export default ReferralForm;
