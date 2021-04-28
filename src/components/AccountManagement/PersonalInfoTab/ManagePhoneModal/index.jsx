/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  Image,
  Table,
  Loader,
  Input,
} from 'semantic-ui-react';
import PhoneInput from 'react-phone-input-2';

import AddPhoneIcon from 'assets/images/profile/add-phone.svg';
import './style.scss';
import InfoMessage from 'components/common/Alert/InfoMessage';
import PINInput from 'components/common/PINInput';

const ManagePhoneModal = ({
  open,
  setOpen,
  userData,
  personalInfo,
}) => {
  const {
    phoneValue,
    setPhoneValue,
    sendOTP,
    handleSendOTP,
    handleSetPrimary,
    settingPrimaryPhone,
    OTP,
    updateUserPhoneList,
    setOTP,
    handleDelete,
  } = personalInfo;

  const [addingPhone, setIAddingPhone] = useState(false);
  const [sendOtp, setSendOtp] = useState(false);
  const [currentPhone, setCurrentPhone] = useState(null);
  const { loading, success, error } = updateUserPhoneList;

  useEffect(() => {
    if (sendOTP.success) {
      setSendOtp(true);
    }
  }, [sendOTP]);
  useEffect(() => {
    if (success) {
      setSendOtp(false);
      setIAddingPhone(false);
    }
  }, [success]);
  const handleClick = phone => {
    setCurrentPhone(phone);
  };
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
                {userData?.Phones?.map(phone => (
                  <Table.Row>
                    <Table.Cell>
                      <div className="display-phone">
                        <Image src={phone.PhoneFlag} />
                        <div>
                          {phone.PhonePrefix}&nbsp;{phone.PhoneNumber}
                          &nbsp;
                          {phone.Primary === 'YES'
                            ? global.translate('(primary)')
                            : null}
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell
                      textAlign="right"
                      className="set-primary"
                      onClick={() => {
                        handleSetPrimary(phone.Phone);
                        handleClick(phone.Phone);
                      }}
                    >
                      {phone.Primary !== 'YES'
                        ? global.translate('Set as primary')
                        : null}
                      &nbsp;|&nbsp;{' '}
                      <span
                        onClick={e => {
                          handleDelete(e, phone.Phone);
                          handleClick(phone.Phone);
                        }}
                      >
                        {global.translate('Remove')}
                      </span>
                      {loading && currentPhone === phone.Phone && (
                        <Loader
                          size="small"
                          active
                          inline
                          className="otp-loader"
                        />
                      )}
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
            <h3>{global.translate('Add a phone number')}</h3>
            <div className="phone-sub-title">
              {global.translate('Provide your phone number')}
            </div>
            <div>
              <PhoneInput
                country={userData?.Country?.toLowerCase()}
                enableSearch
                className="new-phone-number"
                value={phoneValue}
                onChange={phone => {
                  setPhoneValue(phone);
                }}
              />
            </div>
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
                disabled={!phoneValue}
              >
                {global.translate('Add')}
              </Button>
            </div>
          </>
        )}
        {sendOtp && (
          <>
            <h3>{global.translate('Add a phone number')}</h3>
            <div>
              <InfoMessage
                description={`Enter OTP code sent to ${phoneValue}`}
              />
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
                  {loading && (
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
