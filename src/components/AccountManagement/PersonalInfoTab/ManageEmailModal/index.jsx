import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
import InfoMessage from 'components/common/Alert/InfoMessage';

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
    sendEmail
    
  } = personalInfo;

  const [addingPhone, setIAddingPhone] = useState(false);
  const [sendOtp, setSendOtp] = useState(false);
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
                {userData?.Emails.map(email => (
                  <Table.Row>
                    <Table.Cell>
                      <div className="display-phone">
                        <div>{email?.Email}</div>
                        <div>
                          {email?.Primary === 'YES'
                            ? global.translate('(Primary)')
                            : null}
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell
                      textAlign="right"
                      className="set-primary"
                      onClick={() => handleSetEmailPrimary(email?.Email)}
                    >
                      {email?.Primary !== 'YES'
                        ? global.translate('Set as primary')
                        : null}
                       {email?.Primary !== 'YES' && settingPrimaryEmail 
                       ? (
                         <Loader 
                          size="small"
                          active
                          inline
                          className="otp-loader"/>
                       ): null}
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
                {global.translate('Add Email')}
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
