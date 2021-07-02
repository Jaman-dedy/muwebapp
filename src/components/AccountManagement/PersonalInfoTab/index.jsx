import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import moment from 'moment';
import rawCountries from 'utils/countries';
import UpdateInfoModal from './UpdateInfoModal';
import UpdatePhoneModal from './ManagePhoneModal';
import ManageEmailModal from './ManageEmailModal';
import IdentityModal from './IdentityModal';
import './style.scss';
import ResidenceModal from './ResidenceModal';
import 'react-phone-input-2/lib/style.css';

const PersonalInfoTab = ({
  userData,
  personalInfo,
  identityConfirmation,
  residenceData,
}) => {
  const {
    openIdentityModal,
    setOpenIdentityModal,
    countryIssue,
    setCountryIssue,
  } = identityConfirmation;
  const {
    openResidenceModal,
    setOpenResidenceModal,
    setCountry,
    country,
  } = residenceData;

  const [userCountry, setUserCountry] = useState(null);
  const [userNationality, setUserNationality] = useState(null);

  useEffect(() => {
    if (userData) {
      const userCountry = rawCountries.find(
        ({ key }) => key === userData?.UserExtraKYC?.CountryOfBirth,
      );
      const userNationality = rawCountries.find(
        ({ key }) => key === userData?.UserExtraKYC?.Nationality,
      );
      if (userCountry) {
        setUserCountry(userCountry);
      }
      if (userNationality) {
        setUserNationality(userNationality);
      }
    }
  }, [userData]);

  const {
    openInfoModal,
    setOpenInfoModal,
    setOpenPhoneModal,
    openPhoneModal,
    setOpenEmailModal,
    openEmailModal,
  } = personalInfo;

  const renderUserInformation = React.useMemo(() => {
    if (userData) {
      return (
        <>
          <Table.Row className="user-family-details">
            <Table.Cell
              className="info-user-details title-details"
              textAlign="top"
              rowSpan="9"
            >
              {global.translate('User information')}
            </Table.Cell>
            <Table.Cell className="content-title">
              {global.translate('Name')}
            </Table.Cell>
            <Table.Cell>
              {userData?.FirstName} &nbsp; {userData?.LastName}
            </Table.Cell>
          </Table.Row>

          <Table.Row className="user-family-details">
            <Table.Cell> {global.translate('Gender')}</Table.Cell>
            <Table.Cell> {userData?.Gender.Name}</Table.Cell>
          </Table.Row>

          <Table.Row className="user-family-details">
            <Table.Cell>
              {global.translate('Date of birth')}
            </Table.Cell>
            <Table.Cell>
              {userData?.DateOfBirth &&
                moment(userData?.DateOfBirth).format('L')}
            </Table.Cell>
          </Table.Row>

          <Table.Row className="user-family-details">
            <Table.Cell>
              {global.translate("Father's name")}
            </Table.Cell>
            <Table.Cell>
              {userData?.UserExtraKYC.FatherFName}&nbsp;
            </Table.Cell>
          </Table.Row>

          <Table.Row className="user-family-details">
            <Table.Cell>
              {global.translate("Mother's name")}
            </Table.Cell>
            <Table.Cell>
              {userData?.UserExtraKYC.MotherFName}&nbsp;
            </Table.Cell>
          </Table.Row>

          <Table.Row className="user-family-details">
            <Table.Cell>{global.translate('Nationality')}</Table.Cell>
            <Table.Cell> {userNationality?.text}</Table.Cell>
          </Table.Row>

          <Table.Row className="user-family-details">
            <Table.Cell>
              {global.translate('Country of birth')}
            </Table.Cell>
            <Table.Cell> {userCountry?.text}</Table.Cell>
          </Table.Row>

          <Table.Row className="user-family-details">
            <Table.Cell>
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
              {global.translate('Update')}
            </Table.Cell>
            <Table.Cell />
          </Table.Row>
        </>
      );
    }
    return null;
  }, [userData, userCountry, userNationality]);
  const renderUserIdentity = React.useMemo(() => {
    if (userData) {
      return (
        <>
          <Table.Row>
            <Table.Cell className="info-user-details">
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
              {global.translate('Residence')}
            </Table.Cell>
            <Table.Cell>
              {userCountry?.text}&nbsp;
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
        </>
      );
    }
  }, [userData]);

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
          {renderUserInformation}
          <Table.Row>
            <Table.Cell className="info-user-details">
              {global.translate('Phone numbers')}
            </Table.Cell>
            <Table.Cell>
              +{userData?.MainPhonePrefix}&nbsp;
              {userData?.MainPhoneNumber}
              {` (${global.translate('Primary')})`}
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
              {global.translate('Emails')}
            </Table.Cell>
            <Table.Cell>
              {userData?.MainEmail
                ? ` ${userData?.MainEmail}  (${global.translate(
                    'Primary',
                  )})`
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

          {renderUserIdentity}
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
        setCountryIssue={setCountryIssue}
        countryIssue={countryIssue}
      />
      <ResidenceModal
        open={openResidenceModal}
        setOpen={setOpenResidenceModal}
        residenceData={residenceData}
        userData={userData}
        setCountry={setCountry}
        country={country}
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
