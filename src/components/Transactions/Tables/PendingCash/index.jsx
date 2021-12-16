import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import '../style.scss';
import useWindowSize from 'utils/useWindowSize';
import EmptyTransaction from 'components/common/EmptyTransaction';
import { formatDate } from 'utils/formatDate';

const AllTransactions = ({
  onClick,
  pendingCashData,
  selectedCard,
}) => {
  const size = useWindowSize();
  return pendingCashData?.length ? (
    <Table basic className="display-transactions" unstackable>
      <Table.Header className="table-headings">
        <Table.Row>
          <Table.HeaderCell className="date-title">
            {global.translate('Date')}
          </Table.HeaderCell>
          <Table.HeaderCell>
            {global.translate('Name')}
          </Table.HeaderCell>
          {size.width > 600 && (
            <>
              <Table.HeaderCell>
                {global.translate('Amount sent')}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {global.translate('Amount to be received')}
              </Table.HeaderCell>
            </>
          )}

          <Table.HeaderCell>
            {global.translate('Source wallet')}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body className="table-body-data">
        {pendingCashData &&
          pendingCashData.map(item => (
            <Table.Row onClick={() => onClick(item, selectedCard)}>
              <Table.Cell
                className="date-title"
                style={{ width: '125px' }}
              >
                {moment(formatDate(item?.Date)).format('ll')}
              </Table.Cell>
              <Table.Cell>{`${item.FirstName} ${item.LastName}`}</Table.Cell>
              {size.width > 600 && (
                <>
                  {' '}
                  <Table.Cell>{`${item.SourceAmount} ${item.SourceCurrency}`}</Table.Cell>
                  <Table.Cell>{`${item.DestAmount} ${item.DestCurrency}`}</Table.Cell>
                </>
              )}

              <Table.Cell>{item.SourceAccountNumber}</Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  ) : (
    <EmptyTransaction
      message={global.translate(
        'No pending cash transactions found',
        2231,
      )}
    />
  );
};

AllTransactions.propTypes = {
  onClick: PropTypes.func,
  pendingCashData: PropTypes.arrayOf(PropTypes.any),
  selectedCard: PropTypes.number,
};
AllTransactions.defaultProps = {
  onClick: () => {},
  pendingCashData: [],
  selectedCard: 1,
};

export default AllTransactions;
