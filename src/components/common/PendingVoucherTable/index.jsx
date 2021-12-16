import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './style.scss';
import useWindowSize from 'utils/useWindowSize';

const PendingVoucherTable = ({
  onClick,
  pendingVoucherData,
  selectedCard,
}) => {
  const size = useWindowSize();
  return pendingVoucherData?.length ? (
    <Table basic className="display-transactions">
      <Table.Header className="table-headings">
        <Table.Row>
          <Table.HeaderCell className="date-title">
            {global.translate('Date')}
          </Table.HeaderCell>
          {size.width > 600 && (
            <>
              <Table.HeaderCell>
                {global.translate('Amount sent')}
              </Table.HeaderCell>
            </>
          )}

          <Table.HeaderCell>
            {global.translate('Sender')}
          </Table.HeaderCell>

          <Table.HeaderCell>
            {global.translate('Recipient')}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body className="table-body-data">
        {pendingVoucherData &&
          pendingVoucherData.map(item => (
            <Table.Row onClick={() => onClick(item, selectedCard)}>
              <Table.Cell
                className="date-title"
                style={{ width: '125px' }}
              >
                {moment(item?.Date?.substr(0, 11)).format('ll')}
              </Table.Cell>
              {size.width > 600 && (
                <>
                  <Table.Cell>{`${item?.Amount} ${item?.Currency}`}</Table.Cell>
                </>
              )}
              <Table.Cell>
                {`${item?.Sender?.FirstName}`}{' '}
                {`${item?.Sender?.LastName}`}
              </Table.Cell>
              <Table.Cell>{`${item?.Recipient?.FirstName} ${item?.Recipient?.LastName}`}</Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  ) : null;
};

PendingVoucherTable.propTypes = {
  onClick: PropTypes.func,
  pendingVoucherData: PropTypes.arrayOf(PropTypes.any),
  selectedCard: PropTypes.number,
};
PendingVoucherTable.defaultProps = {
  onClick: () => {},
  pendingVoucherData: [],
  selectedCard: 1,
};

export default PendingVoucherTable;
