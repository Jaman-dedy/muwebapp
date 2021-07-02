/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  Image,
  Table,
  Loader,
} from 'semantic-ui-react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import AddPhoneIcon from 'assets/images/profile/add-phone.svg';
import './style.scss';
import InfoMessage from 'components/common/Alert/InfoMessage';
import PINInput from 'components/common/PINInput';
import ErrorMessage from 'components/common/Alert/Danger';

const ManagePhoneModal = ({
  open,
  setOpen,
  userData,
  personalInfo,
}) => {
  const {
    phoneValue,
    setPhoneValue,
    setPhoneCountryCode,
    sendOTP,
    handleSendOTP,
    handleSetPrimary,
    settingPrimaryPhone,
    OTP,
    setOTP,
    handleDelete,
    secondOpen,
    setSecondOpen,
    verifyOTP,
    deletePhone,
  } = personalInfo;

  const [addingPhone, setIAddingPhone] = useState(false);
  const [sendOtp, setSendOtp] = useState(false);
  const [verifyPhoneLoading, setVerifyPhoneLoading] = useState(false);
  const [currentPhone, setCurrentPhone] = useState(null);

  const updatePhoneListData = useSelector(
    ({ userAccountManagement: { updateUserPhoneList } }) =>
      updateUserPhoneList,
  );

  useEffect(() => {
    if (sendOTP.success) {
      setSendOtp(true);
    }
  }, [sendOTP]);

  useEffect(() => {
    setSendOtp(false);
    setIAddingPhone(false);
  }, [updatePhoneListData?.success]);

  useEffect(() => {
    if (verifyOTP.isValid) {
      setSendOtp(false);
      setIAddingPhone(false);
    }
  }, [verifyOTP]);

  useEffect(() => {
    const { data } = updatePhoneListData;
    if (data?.success) {
      setSecondOpen(false);
      setIAddingPhone(false);
      setSendOtp(false);
    }
  }, [updatePhoneListData?.data?.success]);

  useEffect(() => {
    if (deletePhone?.success) {
      setSecondOpen(false);
    }
  }, [deletePhone]);

  const handleClick = phone => {
    setCurrentPhone(phone);
  };
  useEffect(() => {
    if (verifyOTP.loading) {
      setVerifyPhoneLoading(true);
    } else {
      setVerifyPhoneLoading(false);
    }
  }, [verifyOTP.loading]);

  const userPhones = userData?.Phones;

  const phones = (userPhones, Phone) => {
    const unique = userPhones
      .map(e => e[Phone])
      .map((e, Phone, final) => final.indexOf(e) === Phone && Phone)
      .filter(e => userPhones[e])
      .map(e => userPhones[e]);
    return unique;
  };

  useEffect(() => {
    const phoneListLength = userPhones.length;
    for (let i = 0; i < phoneListLength; i++) {
      if (userData?.Phones[i]?.Primary === 'YES') {
        userPhones.splice(0, 0, userData?.Phones[i]);
      }
    }
  }, [userData]);

  return (
    <Modal
      onOpen={() => setOpen(true)}
      open={open}
      size="tiny"
      className="manage-phone-container"
    >
      <Modal.Content>
        {!addingPhone && !sendOtp && (
          <div>
            <Table basic="very">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan="2">
                    <h3>
                      {global.translate('Manage phone numbers')}
                    </h3>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {phones(userPhones, 'Phone').map(phone => (
                  <Table.Row>
                    <Table.Cell className="left-phone-number">
                      <div className="display-phone">
                        <Image src={phone.PhoneFlag} />
                        <div>
                          {phone?.Phone?.replace(/\D/g, '').replace(
                            /(\d{3})(\d{3})(\d{3})/,
                            '+$1 $2 $3 ',
                          )}
                          &nbsp;
                          {phone?.Primary === 'YES'
                            ? `(${global.translate('primary')})`
                            : null}
                        </div>
                      </div>
                    </Table.Cell>

                    <Table.Cell
                      textAlign="right"
                      className="set-primary"
                    >
                      <span
                        onClick={() => {
                          handleSetPrimary(phone.Phone);
                          handleClick(phone.Phone);
                        }}
                      >
                        {phone.Primary !== 'YES'
                          ? global.translate('Set as primary')
                          : null}
                      </span>
                      {phone.Primary !== 'YES' &&
                      settingPrimaryPhone &&
                      currentPhone === phone.Phone ? (
                        <Loader
                          size="small"
                          active
                          inline
                          className="otp-loader"
                        />
                      ) : null}
                      &nbsp;
                      <span onClick={() => setSecondOpen(true)}>
                        {phone.Primary !== 'YES' ? (
                          <span> | {global.translate('Remove')}</span>
                        ) : null}
                      </span>
                      <div className="confirmation-modal">
                        <Modal
                          onClose={() => setSecondOpen(false)}
                          open={secondOpen}
                          setOpen={setSecondOpen}
                          size="mini"
                        >
                          <Modal.Content>
                            <p>
                              {global.translate(
                                'Are you sure you want to remove this phone number?',
                              )}
                            </p>
                          </Modal.Content>
                          <Modal.Actions className="add-emails-actions">
                            <Button
                              className="btn--cancel"
                              onClick={() => setSecondOpen(false)}
                            >
                              {global.translate('Cancel')}
                            </Button>
                            <Button
                              className="btn--confirm"
                              onClick={e => {
                                handleDelete(e, phone.Phone);
                                handleClick(phone.Phone);
                              }}
                            >
                              {global.translate('Proceed')}
                              &nbsp;
                              {deletePhone?.loading && (
                                <Loader
                                  size="mini"
                                  active
                                  inline
                                  className="otp-loader"
                                />
                              )}
                            </Button>
                          </Modal.Actions>
                        </Modal>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <div className="add-phones-actions">
              <Button
                className="btn-add-phone"
                onClick={() => setIAddingPhone(true)}
              >
                <Image src={AddPhoneIcon} />{' '}
                {global.translate('Add phone number')}
              </Button>
              <Button
                className="cancel-button"
                onClick={() => setOpen(false)}
              >
                {global.translate('Cancel')}
              </Button>
            </div>
          </div>
        )}
        {addingPhone && !sendOtp && (
          <>
            <h3>{global.translate('Add phone number')}</h3>
            <div className="phone-sub-title">
              {global.translate('Provide your phone number')}
            </div>

            <PhoneInput
              country={userData?.Country?.toLowerCase()}
              enableSearch
              className="new-phone-number"
              value={phoneValue}
              onChange={(phone, data) => {
                setPhoneValue(phone);
                setPhoneCountryCode(data.countryCode);
              }}
            />

            <div className="add-phone-actions">
              <Button
                className="back-button"
                onClick={() => setIAddingPhone(false)}
              >
                {global.translate('Back')}
              </Button>
              <Button
                className="add-button"
                onClick={() => {
                  handleSendOTP();
                }}
                loading={sendOTP.loading}
                disabled={!phoneValue || phoneValue?.length < 11}
              >
                {global.translate('Add')}
              </Button>
            </div>
          </>
        )}
        {sendOtp && (
          <>
            <h3>{global.translate('Add phone number')}</h3>
            <div>
              <InfoMessage
                description={`${global.translate(
                  'Enter OTP code sent to',
                )} ${phoneValue}`}
              />
              {verifyOTP.error && (
                <div className="error-message">
                  <ErrorMessage
                    message={global.translate(
                      'This verification code is invalid',
                    )}
                  />
                </div>
              )}
              <div className="otp-text">
                {global.translate('OTP')}
              </div>
              <PINInput
                type="text"
                numberOfInputs={6}
                onChange={setOTP}
                value={OTP}
              />

              <div className="otp-description">
                {global.translate(
                  'It may take a moment to receive your code. Haven’t receive it yet?',
                )}{' '}
                <div className="reset-otp">
                  <span onClick={handleSendOTP}>
                    {' '}
                    {global.translate('Resend a new code')}
                  </span>
                  {verifyPhoneLoading && (
                    <Loader
                      size="small"
                      active
                      inline
                      className="otp-loader"
                    />
                  )}
                  {sendOTP.loading && (
                    <Loader
                      size="small"
                      active
                      inline
                      className="otp-loader"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="add-phone-actions">
              <Button
                className="back-button"
                onClick={() => {
                  setIAddingPhone(true);
                  setSendOtp(false);
                }}
              >
                {global.translate('Back')}
              </Button>
            </div>
          </>
        )}
      </Modal.Content>
    </Modal>
  );
};

ManagePhoneModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  userData: PropTypes.objectOf(PropTypes.any),
  personalInfo: PropTypes.objectOf(PropTypes.any),
  handleSendOTP: PropTypes.func,
  sendOTP: PropTypes.objectOf(PropTypes.any),
};
ManagePhoneModal.defaultProps = {
  open: false,
  setOpen: () => {},
  userData: {},
  personalInfo: {},
  handleSendOTP: () => {},
  sendOTP: {},
};

export default ManagePhoneModal;
