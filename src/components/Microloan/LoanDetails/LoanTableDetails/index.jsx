import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const LoanTableDetails = ({ loan }) => {
  return (
    <Table singleLine>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            {global.translate('Loan amount')}
            <div className="amount">
              {loan?.Currency} <strong>{loan?.Capital}</strong>{' '}
            </div>
          </Table.Cell>
          <Table.Cell>
            {global.translate('Loan cost')}
            <div className="amount">
              {loan?.Currency} <strong>{loan?.TotalInterest}</strong>{' '}
            </div>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            {global.translate('Monthly payment')}
            <div className="amount">
              {loan?.Currency} <strong>{loan?.MonthlyPay}</strong>{' '}
            </div>
          </Table.Cell>
          <Table.Cell>
            {global.translate('Automatic payment')}
            <div className="amount">{`${global.translate('Every')} ${
              loan?.PayDay
            }th ${global.translate('of the month')}`}</div>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            {`${global.translate('Total payment')} ${global.translate(
              '(last',
            )}  ${loan?.MonthPaid} ${global.translate('months)')}`}
            <div className="amount">
              {loan?.Currency} <strong>{loan?.AmountPaid}</strong>{' '}
            </div>
          </Table.Cell>
          <Table.Cell>
            {global.translate('Residual amount')}
            <div className="amount">
              {loan?.Currency} <strong>{loan?.CapitalBalance}</strong>{' '}
            </div>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            {global.translate('Opening date')}
            <div className="amount">{loan?.OpeningDate}</div>
          </Table.Cell>
          <Table.Cell>
            {global.translate('Loan duration')}
            <div className="amount">
              {loan?.Duration} {global.translate('months')}
            </div>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
LoanTableDetails.propTypes = {
  loan: PropTypes.objectOf(PropTypes.any),
};
LoanTableDetails.defaultProps = {
  loan: {},
};

export default LoanTableDetails;
