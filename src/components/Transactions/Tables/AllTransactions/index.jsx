import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import useWindowSize from 'utils/useWindowSize';
import EmptyTransaction from 'components/common/EmptyTransaction';
import '../style.scss';
import { formatDate } from 'utils/formatDate';

const AllTransactions = ({
  onClick,
  allTransactionData,
  selectedCard,
}) => {
  const size = useWindowSize();
  return allTransactionData?.length ? (
    <Table basic className="display-transactions" unstackable>
      <Table.Header className="table-headings">
        <Table.Row>
          <Table.HeaderCell className="date-title">
            {global.translate('Date', 1258)}
          </Table.HeaderCell>
          <Table.HeaderCell>
            {global.translate('Description', 119)}
          </Table.HeaderCell>
          {size.width > 600 && (
            <>
              <Table.HeaderCell>
                {global.translate('Source wallet', 1260)}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {global.translate('Recipient wallet', 363)}
              </Table.HeaderCell>
            </>
          )}

          <Table.HeaderCell textAlign="right">
            {global.translate('Debit', 1230)}
          </Table.HeaderCell>

          <Table.HeaderCell textAlign="right">
            {global.translate('Credit', 1231)}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body className="table-body-data">
        {allTransactionData &&
          allTransactionData.map(item => (
            <Table.Row onClick={() => onClick(item, selectedCard)}>
              <Table.Cell
                className="date-title"
                style={{ width: '125px' }}
              >
                {moment(formatDate(item?.Date)).format('ll')}
              </Table.Cell>
              <Table.Cell>{item.Description}</Table.Cell>
              {size.width > 600 && (
                <>
                  <Table.Cell>{item.WalletNumber}</Table.Cell>
                  <Table.Cell>{item.TargetAccount}</Table.Cell>
                </>
              )}

              <Table.Cell textAlign="right">
                <span style={{ color: '#E01B22' }}>
                  {item?.OpsType === '-'
                    ? `${item.Amount} ${item.Currency}`
                    : ''}
                </span>
              </Table.Cell>

              <Table.Cell textAlign="right">
                <span style={{ color: '#3B9C62' }}>
                  {item?.OpsType === '+'
                    ? `${item.Amount} ${item.Currency}`
                    : ''}
                </span>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  ) : (
    <EmptyTransaction
      message={global.translate('No Transactions found', 1257)}
    />
  );
};

AllTransactions.propTypes = {
  onClick: PropTypes.func,
  allTransactionData: PropTypes.arrayOf(PropTypes.any),
  selectedCard: PropTypes.number,
};
AllTransactions.defaultProps = {
  onClick: () => {},
  allTransactionData: [],
  selectedCard: 1,
};

export default AllTransactions;
