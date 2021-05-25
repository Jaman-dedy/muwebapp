import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Image, Loader, Dimmer, Icon } from 'semantic-ui-react';

import logo from 'assets/images/LOGO.svg';
import isAuth from 'utils/isAuth';
import getDeviceType from 'hooks/useDeviceType';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import './VerifyEmail.scss';

const ANDROID_APP_URI =
  'intent://app.m2u.money/#Intent;scheme=moneyapp;package=technology.ossix.m2umoney;end';
const IOS_APP_URI = 'moneyapp://app.m2u.money/ManageEmails';

const VerifyEmail = ({ verifyEmailState }) => {
  const history = useHistory();
  const openAppLinkRef = useRef();
  const [deviceOs, setDeviceOs] = useState('');

  useEffect(() => {
    const device = getDeviceType();
    setDeviceOs(String(device.deviceOs).toLowerCase());
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (
        !verifyEmailState.loading &&
        typeof openAppLinkRef?.current?.click === 'function'
      ) {
        openAppLinkRef.current.click();
      }
      clearTimeout(timeout);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [verifyEmailState.loading]);

  return (
    <>
      {isAuth() ? (
        <DashboardLayout>
          <WelcomeBar>
            <div className="head-content">
              <h3 className="head-title">
                {global.translate('Verify Email', 2001)}
              </h3>
              <div className="clear" />
            </div>
          </WelcomeBar>
          <div
            className="VerifyEmail empty-store xlarge-padding flex flex-column justify-content-center align-items-center"
            style={{ minHeight: '70vh' }}
          >
            {verifyEmailState?.loading ? (
              <Dimmer active inverted>
                <Loader inverted>{`${global.translate(
                  'Loading',
                )}...`}</Loader>
              </Dimmer>
            ) : null}
            <Image src={logo} className="logo" />
            {verifyEmailState?.loading ? null : (
              <>
                <h2 className="center-align">
                  {global.translate(
                    verifyEmailState?.error?.Description ||
                      verifyEmailState?.data?.Description,
                  )}
                </h2>
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      history.push({
                        pathname: '/account-management',
                        state: {
                          detailTab: 1,
                        },
                      })
                    }
                    className="btn-auth btn-primary"
                  >
                    &nbsp; &nbsp;
                    <Icon name="mail" className="text-white" />
                    {global.translate('Manage emails')}
                    &nbsp; &nbsp;
                  </button>
                  {deviceOs.includes('android') ||
                  deviceOs.includes('ios') ? (
                    <div>
                      <a
                        ref={openAppLinkRef}
                        href={
                          deviceOs.includes('android')
                            ? ANDROID_APP_URI
                            : IOS_APP_URI
                        }
                        className="text-white"
                      >
                        <button
                          type="button"
                          className="btn-auth btn-secondary"
                        >
                          <Icon
                            name="external alternate"
                            className="text-white"
                          />
                          {global.translate('Open in app')}
                        </button>
                      </a>
                    </div>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </DashboardLayout>
      ) : (
        <div
          className="VerifyEmail empty-store xlarge-padding flex flex-column justify-content-center align-items-center"
          style={{ minHeight: '100vh' }}
        >
          {verifyEmailState?.loading ? (
            <Dimmer active inverted>
              <Loader inverted>{`${global.translate(
                'Loading',
              )}...`}</Loader>
            </Dimmer>
          ) : null}
          <Image src={logo} className="logo" />
          {verifyEmailState?.loading ? null : (
            <>
              <h2 className="center-align">
                {global.translate(
                  verifyEmailState?.error?.Description ||
                    verifyEmailState?.data?.Description,
                )}
              </h2>
              <div>
                <button
                  type="button"
                  onClick={() => history.push({ pathname: '/' })}
                  className="btn-auth btn-primary"
                >
                  &nbsp; &nbsp;
                  <Icon name="chevron left" className="text-white" />
                  {global.translate('Home')}
                  &nbsp; &nbsp;
                </button>
                {deviceOs.includes('android') ||
                deviceOs.includes('ios') ? (
                  <div>
                    <a
                      ref={openAppLinkRef}
                      href={
                        deviceOs.includes('android')
                          ? ANDROID_APP_URI
                          : IOS_APP_URI
                      }
                      className="text-white"
                    >
                      <button
                        type="button"
                        className="btn-auth btn-secondary"
                      >
                        <Icon
                          name="external alternate"
                          className="text-white"
                        />
                        {global.translate('Open in app')}
                      </button>
                    </a>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

VerifyEmail.propTypes = {
  verifyEmailState: PropTypes.instanceOf(Object),
};

VerifyEmail.defaultProps = {
  verifyEmailState: {},
};

export default VerifyEmail;
