import React, { useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const PaymentHistory = ({ history, SetHasPaidOnTime, loan }) => {
  useEffect(() => {
    history.map(item => {
      if (item.PaidOnTime === 'YES') {
        SetHasPaidOnTime(true);
      } else {
        SetHasPaidOnTime(false);
      }
    });
  }, []);
  return (
    <Table basic="very">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            {global.translate('Payment history')}
          </Table.HeaderCell>
          <Table.HeaderCell />
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>

      {history?.map(item => (
        <>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                {' '}
                <div className="amount">
                  {item?.Currency}&nbsp;
                  {item?.Amount}
                </div>
                <div>
                  {global.translate('Interest')}:{' '}
                  {loan?.MonthlyInterrest}&nbsp;{loan?.Currency}
                </div>
              </Table.Cell>
              <Table.Cell />
              <Table.Cell textAlign="right">
                {item?.PayDate}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </>
      ))}
    </Table>
  );
};
PaymentHistory.propTypes = {
  history: PropTypes.arrayOf(PropTypes.any),
  SetHasPaidOnTime: PropTypes.bool,
  loan: PropTypes.objectOf(PropTypes.any),
};
PaymentHistory.defaultProps = {
  history: [],
  SetHasPaidOnTime: false,
  loan: {},
};

export default PaymentHistory;
