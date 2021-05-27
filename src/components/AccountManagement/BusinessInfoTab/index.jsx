import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import moment from 'moment';
import { useSelector } from 'react-redux';

import './style.scss';

import UpdateBusinessInfoModal from './UpdateBusinessInfoModal';

const BusinessInfoTab = ({ userData, switchAccount }) => {

  const companyTypes = useSelector(
    ({
      userAccountManagement: {
        businessType: { data },
      },
    }) => data,
  );

  const renderBusinessInformation = React.useMemo(() => {
    const { BusinessExtraKYC } = userData;
    if (BusinessExtraKYC) {
      let creationDate = BusinessExtraKYC?.CreationDate;
      let switchDate = BusinessExtraKYC?.SwitchDate;
      const companyType =
        companyTypes.find(
          type =>
            type.ProfessionTypeNumber ===
            BusinessExtraKYC?.CompanyType,
        ) || {};

      if (typeof creationDate === 'string') {
        creationDate = creationDate?.replaceAll("'", '');
      }

      if (typeof switchDate === 'string') {
        switchDate = switchDate?.replaceAll("'", '');
      }

      return (
        <>
          <Table.Row className="user-family-details">
            <Table.Cell
              className="info-user-details title-details"
              textAlign="top"
              rowSpan="10"
            >
              {global.translate('Business information')}
            </Table.Cell>
            <Table.Cell className="content-title">
              {global.translate('Company name')}
            </Table.Cell>
            <Table.Cell>
              {BusinessExtraKYC?.CompanyName} &nbsp;
              {BusinessExtraKYC?.ShortName
                ? `(${BusinessExtraKYC?.ShortName})`
                : ''}
            </Table.Cell>
          </Table.Row>

          <Table.Row className="user-family-details">
            <Table.Cell>
              {global.translate('Type of business')}
            </Table.Cell>
            <Table.Cell>{companyType?.ProfessionTypeName}</Table.Cell>
          </Table.Row>

          <Table.Row className="user-family-details">
            <Table.Cell>
              {global.translate('Business Activity')}
            </Table.Cell>
            <Table.Cell>{BusinessExtraKYC?.Activity}</Table.Cell>
          </Table.Row>

          <Table.Row className="user-family-details">
            <Table.Cell>{global.translate('TIN')}</Table.Cell>
            <Table.Cell>{BusinessExtraKYC?.TIN}</Table.Cell>
          </Table.Row>

          <Table.Row className="user-family-details">
            <Table.Cell>
              {global.translate('Registration number')}
            </Table.Cell>
            <Table.Cell>
              {BusinessExtraKYC?.RegistrationNumber}
            </Table.Cell>
          </Table.Row>

          <Table.Row className="user-family-details">
            <Table.Cell>{global.translate('VAT number')}</Table.Cell>
            <Table.Cell>{BusinessExtraKYC?.VATNumber}</Table.Cell>
          </Table.Row>

          <Table.Row className="user-family-details">
            <Table.Cell>
              {global.translate('Creation date')}
            </Table.Cell>
            <Table.Cell>
              {BusinessExtraKYC?.CreationDate &&
                moment(creationDate).format('L')}
            </Table.Cell>
          </Table.Row>

          <Table.Row className="user-family-details">
            <Table.Cell>
              {global.translate('Business added on')}
            </Table.Cell>
            <Table.Cell>
              {BusinessExtraKYC?.SwitchDate &&
                moment(switchDate).format('L')}
            </Table.Cell>
          </Table.Row>

          <Table.Row className="user-family-details">
            <Table.Cell>{global.translate('Main Office')}</Table.Cell>
            <Table.Cell>{BusinessExtraKYC?.Address}</Table.Cell>
          </Table.Row>

          <Table.Row className="user-family-details">
            <Table.Cell
              className="info-action"
              onClick={switchAccount.handleOpenInfoModal}
            >
              {global.translate('Update')}
            </Table.Cell>
            <Table.Cell />
          </Table.Row>
        </>
      );
    }
    return null;
  }, [userData, companyTypes]);

  return (
    <div className="info-container">
      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="3" className="info-header">
              {global.translate('Business Information')}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{renderBusinessInformation}</Table.Body>
      </Table>

      <UpdateBusinessInfoModal switchAccount={switchAccount} />
    </div>
  );
};

BusinessInfoTab.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any),
  switchAccount: PropTypes.objectOf(PropTypes.any),
};

BusinessInfoTab.defaultProps = {
  userData: {},
  switchAccount: {},
};

export default BusinessInfoTab;
