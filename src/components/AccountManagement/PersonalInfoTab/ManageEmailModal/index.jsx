/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';

import {
  Modal,
  Button,
  Image,
  Table,
  Input,
  Loader,
} from 'semantic-ui-react';

import AddPhoneIcon from 'assets/images/profile/add-phone.svg';
import './style.scss';

const ManageEmailModal = ({
  open,
  setOpen,
  userData,
  personalInfo,
}) => {
  const {
    handleEmailInputChange,
    handleSubmitEmail,
    formEmail,
    handleSetEmailPrimary,
    settingPrimaryEmail,
    sendEmail,
    handleDeleteEmail,
    updateUserEmailList,
  } = personalInfo;
  const location = useLocation();
  const history = useHistory();

  const [addingPhone, setIAddingPhone] = useState(false);
  const [sendOtp, setSendOtp] = useState(false);
  const { loading, success, error } = updateUserEmailList;
  const [secondOpen, setSecondOpen] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(null);

  useEffect(() => {
    if (sendEmail.success) {
      setSendOtp(true);
    }
  }, [sendEmail]);

  useEffect(() => {
    if (success) {
      setSecondOpen(false);
      setIAddingPhone(false);
    }
  }, [success]);
  const handleClick = email => {
    setCurrentEmail(email);
  };

  useEffect(() => {
    if (location.state && location.state?.detailTab) {
      setOpen(true);
      history.replace({
        ...location,
        state: { ...location.state, detailTab: undefined },
      });
    }
  }, [location.state?.detailTab]);

  const userEmails = userData?.Emails;
  const emails = (userEmails, Email) => {
    const unique = userEmails
      .map(e => e[Email])
      .map((e, Email, final) => final.indexOf(e) === Email && Email)
      .filter(e => userEmails[e])
      .map(e => userEmails[e]);

    return unique;
  };

  useEffect(() => {
    const emailListLength = userEmails.length;
    for (let i = 0; i < emailListLength; i++) {
      if (userData?.Emails[i]?.Primary === 'YES') {
        userEmails.splice(0, 0, userData?.Emails[i]);
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
                    <h3>{global.translate('Manage emails')}</h3>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {emails(userEmails, 'Email')?.map(email => (
                  <Table.Row>
                    <Table.Cell>
                      <div className="display-phone">
                        <div>{email?.Email}</div> &nbsp;
                        <div>
                          {email?.Primary === 'YES' &&
                          email?.Email !== ''
                            ? `(${global.translate('Primary')})`
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
                          handleSetEmailPrimary(email?.Email);
                          handleClick(email.Email);
                        }}
                      >
                        {email?.Primary !== 'YES'
                          ? global.translate('Set as primary')
                          : null}
                      </span>
                      {email.Primary !== 'YES' &&
                      settingPrimaryEmail &&
                      currentEmail === email.Email ? (
                        <Loader
                          size="mini"
                          active
                          inline
                          className="otp-loader"
                        />
                      ) : null}
                      &nbsp;
                      <span onClick={() => setSecondOpen(true)}>
                        {email?.Primary !== 'YES' ? (
                          <span> | {global.translate('Remove')}</span>
                        ) : null}
                      </span>
                      <div className="confirmation-modal">
                        <Modal
                          onClose={() => setSecondOpen(false)}
                          open={secondOpen}
                          size="mini"
                        >
                          <Modal.Content>
                            <p>
                              {global.translate(
                                'Are you sure you want to remove this email?',
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
                                handleDeleteEmail(e, email?.Email);
                                handleClick(email.Email);
                              }}
                            >
                              {global.translate('Proceed')}
                              &nbsp;
                              {loading && (
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
            <div className="add-emails-actions">
              <Button
                className="btn-add-phone"
                onClick={() => setIAddingPhone(true)}
              >
                <Image src={AddPhoneIcon} />
                {global.translate('Add email')}
              </Button>
              <Button
                className="cancel-button"
                onClick={() => {
                  setOpen(false);
                }}
              >
                {global.translate('Cancel')}
              </Button>
            </div>
          </div>
        )}
        {addingPhone && !sendOtp && (
          <>
            <h3>{global.translate('Add an email address')}</h3>
            <div className="phone-sub-title">
              {global.translate('Provide your email')}
            </div>
            <div className="provide-email">
              <Input
                placeholder="john@gmail.com"
                onChange={handleEmailInputChange}
                name="email"
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
                loading={sendEmail.loading}
                disabled={!formEmail?.email}
                className="add-button"
                onClick={() => {
                  handleSubmitEmail();
                }}
              >
                {global.translate('Add')}
              </Button>
            </div>
          </>
        )}
      </Modal.Content>
    </Modal>
  );
};

ManageEmailModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  userData: PropTypes.objectOf(PropTypes.any),
  personalInfo: PropTypes.objectOf(PropTypes.any),
};
ManageEmailModal.defaultProps = {
  open: false,
  setOpen: () => {},
  userData: {},
  personalInfo: {},
};

export default ManageEmailModal;
