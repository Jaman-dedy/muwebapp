import React, { useState, useEffect } from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import CancelTransactionImage from 'assets/images/cancel.png';
import LoaderComponent from 'components/common/Loader';
import Message from 'components/common/Message';
import AppTable from 'components/common/Table';
import OptionsDialog from 'components/common/OptionSelectionDialog';
import EditTransactionImage from 'assets/images/edit.png';
import SendCashContainer from 'containers/MoneyTransfer/sendCash';
import ConfirmCancelTransaction from './ConfirmCancelTransaction';

const UnPaidCashList = ({
  unPaidCashList: { loading, error, data },
  getUnPaidCashList,
  walletNumber,
  showAll,
  pendingTransactions,
  onCancelTransactionConfirm,
  cancelTransactionData,
  contactType,
}) => {
  const history = useHistory();
  const [optionOpen, setOptionsOpen] = useState(false);

  const [editTransactionOpen, setEditTransactionOpen] = useState(
    false,
  );
  const [selectedItem, setSelectedItem] = useState(null);

  const {
    cancelTransaction: { data: transactionDone },
  } = useSelector(state => state.transactions);

  const { userData } = useSelector(state => state.user);
  const { preferred } = useSelector(
    ({ user: { language } }) => language,
  );
  const [cancelOpen, setCancelOpen] = useState(false);
  let noItems = false;

  if (data) {
    if (data.length === 0 || data[0].Error) {
      noItems = true;
    }
  }

  let allSourceWalletFilterOptions = null;

  let allDestFilterWalletOptions = null;

  useEffect(() => {
    if (transactionDone) {
      setOptionsOpen(false);
    }
  }, [transactionDone]);

  if (data) {
    allDestFilterWalletOptions = data.map(item => item.PhoneNumber);

    if (showAll) {
      allSourceWalletFilterOptions = data.map(
        item => item.SourceAccountNumber,
      );
    } else {
      allSourceWalletFilterOptions = [walletNumber];
    }
  }

  const tableHeadersAllTrasactions = [
    { key: 'Date', value: global.translate('Date') },
    { key: 'FirstName', value: global.translate('Name') },
    {
      key: 'SourceAmount',
      value: global.translate('Amount Sent'),
    },
    {
      key: 'DestAmount',
      value: global.translate('Amount To Be Received'),
    },
    showAll && {
      key: 'SourceAccountNumber',
      value: global.translate('Source Wallet'),
    },
  ];
  const tableHeadersSingleContactTransactions = [
    { key: 'Date', value: global.translate('Date') },
    {
      key: 'SourceAmount',
      value: global.translate('Amount Sent'),
    },
    {
      key: 'DestAmount',
      value: global.translate('Amount To Be Received'),
    },
    showAll && {
      key: 'SourceAccountNumber',
      value: global.translate('Source Wallet'),
    },
    { key: 'StatusCode', value: global.translate('Status') },
  ];
  return (
    <div className="main-container">
      {history.location.pathname === '/transactions' &&
        contactType !== 'EXTERNAL' &&
        data &&
        data.length > 0 &&
        !noItems && (
          <Button
            className="to-cashlist"
            color="orange"
            as={Link}
            to="/cash-list"
            floated={!noItems ? 'right' : 'none'}
            content={global.translate('View all')}
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
              message={`${global.translate(
                'You don’t have any pending cash sent.',
              )} ${walletNumber}`}
              action={{
                content: global.translate(
                  'View all across all wallets',
                ),
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

        <SendCashContainer
          open={editTransactionOpen}
          setOpen={setEditTransactionOpen}
          isSendingCash
          isEditing
          setOptionsOpen={setOptionsOpen}
          setIsEditing={setEditTransactionOpen}
          destinationContact={selectedItem}
          setDestinationContact={setSelectedItem}
          userData={userData}
        />

        <ConfirmCancelTransaction
          open={cancelOpen}
          setOpen={setCancelOpen}
          item={selectedItem}
          cancelTransactionData={cancelTransactionData}
          language={preferred}
          onPositiveConfirm={items => {
            onCancelTransactionConfirm(items);
          }}
        />

        <OptionsDialog
          item={selectedItem}
          open={optionOpen}
          options={[
            {
              name: 'Edit Transaction',
              image: EditTransactionImage,
              onItemClick: () => {
                setSelectedItem(selectedItem);
                setEditTransactionOpen(true);
              },
            },
            {
              name: 'Cancel Transaction',
              image: CancelTransactionImage,
              onItemClick: () => {
                setSelectedItem(selectedItem);
                setCancelOpen(true);
              },
            },
          ]}
          setOpen={setOptionsOpen}
        />
        {!error && !loading && !noItems && (
          <AppTable
            data={!showAll ? pendingTransactions : data}
            loading={loading}
            type="cashOnly"
            showOptions
            onMoreClicked={item => {
              setSelectedItem(item);
              setOptionsOpen(true);
            }}
            allDestFilterWalletOptions={Array.from(
              new Set(allDestFilterWalletOptions),
            )}
            allSourceWalletFilterOptions={Array.from(
              new Set(allSourceWalletFilterOptions),
            )}
            itemsPerPage={!showAll ? 10 : 10}
            headers={
              contactType === 'EXTERNAL'
                ? tableHeadersSingleContactTransactions
                : tableHeadersAllTrasactions
            }
          />
        )}
      </div>
    </div>
  );
};

UnPaidCashList.propTypes = {
  showAll: PropTypes.bool,
  unPaidCashList: PropTypes.objectOf(PropTypes.any).isRequired,
  getUnPaidCashList: PropTypes.func,
  walletNumber: PropTypes.string,
  pendingTransactions: PropTypes.arrayOf(PropTypes.any).isRequired,
  onCancelTransactionConfirm: PropTypes.func,
  cancelTransactionData: PropTypes.func,
  contactType: PropTypes.string,
};

UnPaidCashList.defaultProps = {
  showAll: false,
  getUnPaidCashList: () => null,
  onCancelTransactionConfirm: () => {},
  cancelTransactionData: () => {},
  walletNumber: null,
  contactType: 'DEFAULT',
};
export default UnPaidCashList;
