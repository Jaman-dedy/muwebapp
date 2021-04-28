import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';

const TransactionLimit = ({ userData }) => {
  const { TransactionLimits } = userData;
  return (
    <div className="transaction-limit-container">
      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="transaction-header">
              {global.translate('Transaction limits')}
            </Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell textAlign="right">
              {/* <Button className="transaction-button"> // don't remove the commented line
                {' '}
                {global.translate('Request change limit')}
              </Button> */}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              {' '}
              {global.translate(
                'Maximum amount per transaction in the main currency',
              )}
            </Table.Cell>
            <Table.Cell />
            <Table.Cell textAlign="right">
              {TransactionLimits?.SafeLimite}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {' '}
              {global.translate('Maximum amount per month')}
            </Table.Cell>
            <Table.Cell />
            <Table.Cell textAlign="right">
              {TransactionLimits?.SafeLimiteMonth}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {global.translate('Number of transactions per day')}
            </Table.Cell>
            <Table.Cell />
            <Table.Cell textAlign="right">
              {TransactionLimits?.MaxTransPerDay}{' '}
              {global.translate('transactions')}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {global.translate('Safe special limit')}
            </Table.Cell>
            <Table.Cell />
            <Table.Cell textAlign="right">
              {TransactionLimits?.SafeLimiteSpecial}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {global.translate('Minimum safe amount')}
            </Table.Cell>
            <Table.Cell />
            <Table.Cell textAlign="right">
              {TransactionLimits?.SafeLimiteSMS}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

TransactionLimit.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any),
};
TransactionLimit.defaultProps = {
  userData: {},
};

export default TransactionLimit;
