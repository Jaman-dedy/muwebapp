import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Form, Icon, Message } from 'semantic-ui-react';

import LoaderComponent from 'components/common/Loader';
import './ReferralForm.scss';
import Thumbnail from 'components/common/Thumbnail';
import 'assets/styles/spinner.scss';
import GoBack from 'components/common/GoBack';

const ReferralForm = ({
  onInputChange,
  registrationData,
  referralScreen,
  onClickHandler,
}) => {
  const {
    handleSubmit,
    handleSearUser,
    errors,
    clearError,
    searchData: { error, data, loading },
    registerUser,
  } = referralScreen;
  const backButtonHandler = () => {
    onClickHandler();
  };
  const [skipLoading, setSkipLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const skip = () => {
    if (!registerUser.loading && !loading) {
      handleSubmit('skip');
    }
    return true;
  };

  const [addReferral, setAddReferral] = useState(false);

  useEffect(() => {
    if (registerUser.success || registerUser.error)
      setSkipLoading(false);
  }, [registerUser]);

  useEffect(() => {
    setAddReferral();
  }, []);

  return (
    <Container>
      <Form
        className="referral-form"
        onSubmit={handleSearUser}
        autoComplete="off"
      >
        <div className="go-back">
          <GoBack style onClickHandler={backButtonHandler} />
        </div>
        {!addReferral && (
          <div>
            <button
              onClick={() => setAddReferral(true)}
              type="button"
              className="btn-auth btn-secondary"
            >
              {global.translate('Add a referral')}
            </button>
            <div className="wrap-or">or</div>
          </div>
        )}
        {addReferral && (
          <span className="title">
            {global.translate(
              'Provide the username of the user who told you about us',
              1414,
            )}{' '}
          </span>
        )}
        <Form.Field>
          {!skipLoading && addReferral && (
            <Form.Input
              placeholder={global.translate('Username', 1992)}
              className="referral-pid-input"
              name="ReferralPID"
              value={registrationData.ReferralPID}
              onChange={e => {
                clearError(e);
                onInputChange(e);
              }}
              action={
                <button
                  className="cursor-pointer"
                  type="button"
                  onClick={() => handleSearUser(true)}
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
                  global.translate('searching for the user: ', 2016) +
                  registrationData.ReferralPID
                }
              />
            </>
          </div>
        )}
        <Message
          error
          visible={errors.ReferralPID || error || false}
          content={errors.ReferralPID || error?.Description}
        />
        {data &&
        data[0].Result === 'Success' &&
        !loading &&
        !error &&
        !errors.ReferralPID &&
        registrationData.ReferralPID &&
        registrationData.ReferralPID !== '' ? (
          <div>
            <div className="referral-results">
              <Thumbnail
                name={data[0].FirstName}
                secondName={data[0].LastName}
                avatar={data[0].PictureURL}
                style={{
                  height: 95,
                  width: 95,
                  marginRight: -2,
                  borderRadius: '50%',
                }}
                hasError={hasError}
                setHasError={setHasError}
              />
              <p className="firstLastName">
                {`${data[0].FirstName}  ${data[0].LastName}`}
              </p>
              <p className="address">
                {data[0].City} {data[0].Country}
              </p>
            </div>
            <div>
              <button
                onClick={() =>
                  !registerUser.loading && !loading && handleSubmit()
                }
                type="button"
                className="btn-auth btn-primary"
              >
                {registerUser.loading && (
                  <span className="loading-button" />
                )}
                {global.translate(`REGISTER NOW`)}
              </button>
            </div>
          </div>
        ) : (
          <div>
            {!addReferral && (
              <button
                onClick={() =>
                  !registerUser.loading && !loading && handleSubmit()
                }
                type="button"
                className="btn-auth btn-primary"
              >
                {registerUser.loading && (
                  <span className="loading-button" />
                )}
                {global.translate(`COMPLETE REGISTRATION`)}
              </button>
            )}
          </div>
        )}
        {skipLoading && (
          <div className="skip-loading">
            <>
              <LoaderComponent
                className="loading"
                loaderContent={global.translate(
                  'Creating the account',
                  2017,
                )}
              />
            </>
          </div>
        )}
        <br />
        {global.translate('Already registered?', 1200)}{' '}
        <Link to="/login">{global.translate('Login', 190)}</Link>
      </Form>
    </Container>
  );
};

ReferralForm.propTypes = {
  registrationData: PropTypes.instanceOf(Object).isRequired,
  onInputChange: PropTypes.func.isRequired,
  referralScreen: PropTypes.objectOf(PropTypes.any).isRequired,
  onClickHandler: PropTypes.func.isRequired,
};

export default ReferralForm;
