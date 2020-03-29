import React, { useState } from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import LoaderComponent from 'components/common/Loader';
import Message from 'components/common/Message';
import AppTable from 'components/common/Table';
import { useHistory, Link } from 'react-router-dom';
import TransactionDetails from './TransactionDetails';
import { Button } from 'semantic-ui-react';

const UnPaidCashList = ({
  unPaidCashList: { loading, error, data },
  getUnPaidCashList,
  walletNumber,
  showAll,
  pendingTransactions,
}) => {
  const history = useHistory();
  const noItems =
    pendingTransactions && pendingTransactions.length === 0;

  return (
    <div className="main-container">
      {history.location.pathname === '/transactions' &&
        data &&
        data.length > 0 &&
        !noItems && (
          <Button
            className="to-cashlist"
            color="orange"
            as={Link}
            to="/cash-list"
            floated={!noItems ? 'right' : 'none'}
            content="View all"
            icon="eye"
            label={{
              basic: true,
              color: 'orange',
              pointing: 'left',
              content: (data && data.length) || 0,
            }}
          />
        )}
      <div className="all-transactions">
        <div style={showAll ? {} : {}}>
          {loading && (
            <LoaderComponent
              style={{ marginTop: 20, marginLeft: 10 }}
              loaderContent={global.translate('Working…', 412)}
            />
          )}

          {noItems && (
            <Message
              style={{ marginTop: 2 }}
              error={false}
              message={`No unpaid cash transactions on Wallet ${walletNumber}`}
              action={{
                content: 'View all across all wallets',
                icon: 'arrow alternate circle right',
                color: 'orange',
                onClick: () => {
                  history.replace('/cash-list');
                },
              }}
            />
          )}
          {error && (
            <Message
              style={{ marginTop: 50 }}
              message={
                error.error
                  ? global.translate(error.error)
                  : global.translate(error[0].Description, 195)
              }
              action={{
                onClick: () => {
                  getUnPaidCashList();
                },
              }}
            />
          )}
        </div>

        {!error && !loading && !noItems && (
          <AppTable
            data={!showAll ? pendingTransactions : data}
            loading={loading}
            onMoreClicked={() => {}}
            itemsPerPage={!showAll ? 10 : 10}
            headers={[
              { key: 'Date', value: 'Date' },
              { key: 'FirstName', value: 'Name' },
              {
                key: 'SourceAmount',
                value: 'Amount Sent',
              },
              {
                key: 'DestAmount',
                value: 'Amount To Be Received',
              },
              showAll && {
                key: 'SourceAccountNumber',
                value: 'Source Wallet',
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};

UnPaidCashList.propTypes = {
  showAll: PropTypes.bool,
  unPaidCashList: PropTypes.oneOfType(PropTypes.object).isRequired,
  getUnPaidCashList: PropTypes.func,
  walletNumber: PropTypes.string,
  pendingTransactions: PropTypes.arrayOf(PropTypes.any).isRequired,
};

UnPaidCashList.defaultProps = {
  showAll: false,
  getUnPaidCashList: () => null,
  walletNumber: null,
};
export default UnPaidCashList;
