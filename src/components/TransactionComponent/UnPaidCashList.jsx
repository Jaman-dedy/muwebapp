import React, { useState } from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import LoaderComponent from 'components/common/Loader';
import Message from 'components/common/Message';
import AppTable from 'components/common/Table';
import { useHistory } from 'react-router-dom';
import TransactionDetails from './TransactionDetails';

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

  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});
  return (
    <div>
      <TransactionDetails open={open} setOpen={setOpen} item={item} />

      <div className="all-transactions">
        <div>
          {loading && (
            <LoaderComponent
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
            showOptions
            onMoreClicked={item => {
              setItem(item);
              setOpen(true);
            }}
            itemsPerPage={!showAll ? 10 : 10}
            headers={[
              { key: 'Date', value: 'Date' },
              { key: 'FirstName', value: 'First Name' },
              {
                key: 'LastName',
                value: 'Last Name',
              },

              {
                key: 'SourceAmount',
                value: 'Sent',
              },
              {
                key: 'DestAmount',
                value: 'To Pickup',
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
};

UnPaidCashList.defaultProps = {
  showAll: false,
  getUnPaidCashList: () => null,
  walletNumber: null,
};
export default UnPaidCashList;
