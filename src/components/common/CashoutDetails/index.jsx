import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';

const TransactionDetails = ({ confirmationData, payPal }) => {
  return (
    <div className="details__right-side">
      <h3>{global.translate('Summary')}</h3>
      <Table basic="very">
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              {global.translate('Total amount')}
              <div className="details__amount">
                <strong>{confirmationData?.[0].TotalAmount}</strong>{' '}
              </div>
            </Table.Cell>
            <Table.Cell />
            <Table.Cell />
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {payPal
                ? global.translate('Amount to be sent')
                : global.translate('Amount to  withdraw')}
              <div className="details__amount">
                <strong>
                  {confirmationData?.[0].AmountToBeSent}
                </strong>{' '}
              </div>
            </Table.Cell>
            <Table.Cell />
            <Table.Cell />
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {global.translate('Fees')}
              <div className="details__amount">
                <strong>{confirmationData?.[0].Fees}</strong>{' '}
              </div>
            </Table.Cell>
            <Table.Cell />
            <Table.Cell />
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {global.translate('Taxes')}
              <div className="details__amount">
                <strong>{confirmationData?.[0].Taxes}</strong>{' '}
              </div>
            </Table.Cell>
            <Table.Cell />
            <Table.Cell />
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {global.translate('Exchange fees')}
              <div className="details__amount">
                <strong>{confirmationData?.[0].ExchangeFees}</strong>{' '}
              </div>
            </Table.Cell>
            <Table.Cell />
            <Table.Cell />
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {global.translate('Exchange rate')}
              <div className="details__amount">
                <strong>{confirmationData?.[0].ExchangeRate}</strong>{' '}
              </div>
            </Table.Cell>
            <Table.Cell />
            <Table.Cell />
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};
TransactionDetails.propTypes = {
  confirmationData: PropTypes.objectOf(PropTypes.any),
};
TransactionDetails.propTypes = {
  confirmationData: {},
};

export default TransactionDetails;
