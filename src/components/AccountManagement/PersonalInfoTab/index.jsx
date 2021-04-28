import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import moment from 'moment';

import UpdateInfoModal from './UpdateInfoModal';
import UpdatePhoneModal from './ManagePhoneModal';
import ManageEmailModal from './ManageEmailModal';
import IdentityModal from './IdentityModal';
import './style.scss';
import ResidenceModal from './ResidenceModal';

const PersonalInfoTab = ({
  userData,
  personalInfo,
  identityConfirmation,
  residenceData,
}) => {
  const {
    openIdentityModal,
    setOpenIdentityModal,
  } = identityConfirmation;
  const {
    openResidenceModal,
    setOpenResidenceModal,
    selectedCountry: residentialCountry,
  } = residenceData;
 

  const {
    openInfoModal,
    setOpenInfoModal,
    nationality,
    selectedCountry,
    setOpenPhoneModal,
    openPhoneModal,
    setOpenEmailModal,
    openEmailModal
  } = personalInfo;

  return (
    <div className="info-container">
      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="3" className="info-header">
              {global.translate('Personal information')}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row className="user-family-details">
            <Table.Cell
              className="info-user-details title-details"
              textAlign="top"
              rowSpan="8"
            >
              {' '}
              {global.translate('User information')}
            </Table.Cell>
            <Table.Cell> {global.translate('Names')}</Table.Cell>
            <Table.Cell>
              {' '}
              {userData?.FirstName} &nbsp; {userData?.LastName}
            </Table.Cell>
          </Table.Row>
          <Table.Row className="user-family-details">
            <Table.Cell> {global.translate('Gender')}</Table.Cell>
            <Table.Cell> {userData?.Gender.Name}</Table.Cell>
          </Table.Row>
          <Table.Row className="user-family-details">
            <Table.Cell>
              {' '}
              {global.translate('Date of birth')}
            </Table.Cell>
            <Table.Cell>
              {' '}
              {moment(userData?.DateOfBirth).format('L')}
            </Table.Cell>
          </Table.Row>
          <Table.Row className="user-family-details">
            <Table.Cell> {global.translate('Parents')}</Table.Cell>
            <Table.Cell>
              {' '}
              {userData?.UserExtraKYC.FatherFName}&nbsp;,
              {userData?.UserExtraKYC.MotherFName}
            </Table.Cell>
          </Table.Row>
          <Table.Row className="user-family-details">
            <Table.Cell>
              {' '}
              {global.translate('Nationality')}
            </Table.Cell>
            <Table.Cell> {nationality?.CountryName}</Table.Cell>
          </Table.Row>
          <Table.Row className="user-family-details">
            <Table.Cell>
              {' '}
              {global.translate('Country of birth')}
            </Table.Cell>
            <Table.Cell> {selectedCountry?.CountryName}</Table.Cell>
          </Table.Row>
          <Table.Row className="user-family-details">
            <Table.Cell>
              {' '}
              {global.translate('City of birth')}
            </Table.Cell>
            <Table.Cell>
              {userData?.UserExtraKYC?.CityOfBirth}
            </Table.Cell>
          </Table.Row>
          <Table.Row className="user-family-details">
            <Table.Cell
              className="info-action"
              onClick={() => setOpenInfoModal(true)}
            >
              {' '}
              {global.translate('Update')}
            </Table.Cell>
            <Table.Cell />
          </Table.Row>

          <Table.Row>
            <Table.Cell className="info-user-details">
              {' '}
              {global.translate('Phone numbers')}
            </Table.Cell>
            <Table.Cell>
              {' '}
              {global.translate('Primary')}&nbsp;:&nbsp;
              {userData?.MainPhonePrefix}&nbsp;
              {userData?.MainPhoneNumber}
            </Table.Cell>
            <Table.Cell
              textAlign="right"
              className="info-action"
              onClick={() => setOpenPhoneModal(true)}
            >
              {global.translate('Manage')}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="info-user-details">
              {' '}
              {global.translate('Emails')}
            </Table.Cell>
            <Table.Cell>
              {userData?.MainEmail
                ? `${global.translate('Primary')} ${
                    userData?.MainEmail
                  }`
                : global.translate('No primary email provided')}
            </Table.Cell>
            <Table.Cell
              textAlign="right"
              className="info-action"
              onClick={() => setOpenEmailModal(true)}
            >
              {global.translate('Manage')}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="info-user-details">
              {' '}
              {global.translate('Identity confirmation')}
            </Table.Cell>
            <Table.Cell> {userData?.IDCardInfo?.IDNumber}</Table.Cell>
            <Table.Cell
              textAlign="right"
              className="info-action"
              onClick={() => setOpenIdentityModal(true)}
            >
              {global.translate('Change')}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="info-user-details">
              {' '}
              {global.translate('Residence')}
            </Table.Cell>
            <Table.Cell>
              {' '}
              {residentialCountry?.CountryName}&nbsp;
              {userData?.Address2}&nbsp;{userData?.City}
            </Table.Cell>
            <Table.Cell
              textAlign="right"
              className="info-action"
              onClick={() => setOpenResidenceModal(true)}
            >
              {global.translate('Update')}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <UpdateInfoModal
        open={openInfoModal}
        setOpen={setOpenInfoModal}
        personalInfo={personalInfo}
      />
      <UpdatePhoneModal
        open={openPhoneModal}
        setOpen={setOpenPhoneModal}
        userData={userData}
        personalInfo={personalInfo}
      />
      <ManageEmailModal
        open={openEmailModal}
        setOpen={setOpenEmailModal}
        userData={userData}
        personalInfo={personalInfo}
      />
      <IdentityModal
        open={openIdentityModal}
        setOpen={setOpenIdentityModal}
        identityConfirmation={identityConfirmation}
        userData={userData}
      />
      <ResidenceModal
        open={openResidenceModal}
        setOpen={setOpenResidenceModal}
        residenceData={residenceData}
        userData={userData}
      />
    </div>
  );
};

PersonalInfoTab.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any),
  personalInfo: PropTypes.objectOf(PropTypes.any),
  identityConfirmation: PropTypes.objectOf(PropTypes.any),
  residenceData: PropTypes.objectOf(PropTypes.any),
};

PersonalInfoTab.defaultProps = {
  userData: {},
  personalInfo: {},
  identityConfirmation: {},
  residenceData: {},
};

export default PersonalInfoTab;
