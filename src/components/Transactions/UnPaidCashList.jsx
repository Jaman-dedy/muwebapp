/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
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
import EditTransactionImage from 'assets/images/edit.png';
import SendCashContainer from 'containers/MoneyTransfer/sendCash';
import EmptyCard from 'components/common/EmptyCard';
import SendCashIcon from 'assets/images/TransSendCash.svg';
import ConfirmCancelTransaction from './ConfirmCancelTransaction';
// import LoadingTransactions from './LoadingTransactions';

const UnPaidCashList = ({
  unPaidCashList: { loading, error, data },
  getUnPaidCashList,
  walletNumber,
  showAll,
  unpaidVouchers,
  pendingVouchersOnWallet,
  pendingTransactions,
  onCancelTransactionConfirm,
  cancelTransactionData,
  contactType,
  pendingVouchersOnWallets,
  fromVouchers,
  sendToOther,
  transactionsPaginationInfo,
  getMoreResults,
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
  const noItems = unpaidVouchers
    ? pendingVouchersOnWallet.length === 0
    : pendingTransactions && pendingTransactions.length === 0;

  let allSourceFilterOptions = null;
  let allDestFilterOptions = null;

  useEffect(() => {
    if (transactionDone) {
      setOptionsOpen(false);
    }
  }, [transactionDone]);

  if (data) {
    if (unpaidVouchers) {
      allDestFilterOptions = data.map(
        item => item && item.Recipient && item.Recipient.PhoneNumber,
      );
    } else {
      allDestFilterOptions = data.map(item => item.PhoneNumber);
    }

    if (showAll) {
      allSourceFilterOptions = fromVouchers
        ? pendingVouchersOnWallets &&
          pendingVouchersOnWallets.map(i => i.SourceAccountNumber)
        : data.map(item => item.SourceAccountNumber);

      allDestFilterOptions = fromVouchers
        ? pendingVouchersOnWallets &&
          pendingVouchersOnWallets
            .filter(item => item && item.PhoneNumber)
            .map(item => item && item.PhoneNumber)
        : data.map(item => item.PhoneNumber);
    } else if (unpaidVouchers) {
      allSourceFilterOptions = [walletNumber];
    } else {
      allSourceFilterOptions = [walletNumber];
    }
  }

  const mappedData =
    pendingVouchersOnWallet &&
    pendingVouchersOnWallet.map(
      ({
        Recipient: { FirstName, LastName, PhoneNumber, ...userInfo },
        Amount,
        CurrencyFlag,
        Store: { Name, ...store },
        ...rest
      }) => {
        return {
          FirstName,
          LastName,
          ...userInfo,
          Store: Name,
          ...store,
          SourceAmount: Amount,
          SourceCurrencyFlag: CurrencyFlag,
          PhoneNumber,
          ...rest,
        };
      },
    );
  const pendingVoucherHeaders = [
    { key: 'Date', value: global.translate('Date', 1258) },
    { key: 'FirstName', value: global.translate('Name', 276) },
    {
      key: 'SourceAmount',
      value: global.translate('Amount Sent', 1259),
    },
    {
      key: 'Store',
      value: global.translate('Store Name', 837),
    },
    {
      key: 'SourceAccountNumber',
      value: global.translate('Source Wallet', 1260),
    },
    {
      key: 'DisplayTransferNumber',
      value: global.translate('Voucher number'),
    },
    {
      key: 'DisplaySecurityCode',
      value: global.translate('Security code'),
    },
  ];

  const tableHeadersAllTrasactions = [
    { key: 'Date', value: global.translate('Date', 1258) },
    { key: 'FirstName', value: global.translate('Name', 276) },
    {
      key: 'SourceAmount',
      value: global.translate('Amount Sent', 1260),
    },
    {
      key: 'DestAmount',
      value: global.translate('Amount To Be Received', 397),
    },
    {
      key: 'SourceAccountNumber',
      value: global.translate('Source Wallet', 1260),
    },
    {
      key: 'DisplayTransferNumber',
      value: global.translate('Transfer number'),
    },
    {
      key: sendToOther ? 'PhoneNumber' : 'DisplaySecurityCode',
      value: sendToOther
        ? global.translate('Phone number')
        : global.translate('Security code'),
    },
  ];
  const tableHeadersSingleContactTransactions = [
    { key: 'Date', value: global.translate('Date', 1258) },
    {
      key: 'SourceAmount',
      value: global.translate('Amount Sent', 1259),
    },
    {
      key: 'DestAmount',
      value: global.translate('Amount To Be Received', 397),
    },
    showAll && {
      key: 'SourceAccountNumber',
      value: global.translate('Source Wallet', 1260),
    },
    { key: 'StatusCode', value: global.translate('Status', 339) },
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
            to={{
              pathname: '/cash-list',
              search: '?sort=name',
              hash: '#the-hash',
              state: {
                fromVouchers: !!unpaidVouchers,
                pendingOther: sendToOther,
              },
            }}
            floated={!noItems ? 'right' : 'none'}
            content={global.translate('View all', 1753)}
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
          {/* {loading && <LoadingTransactions />} */}

          {noItems && (
            <EmptyCard
              header={
                unpaidVouchers
                  ? global.translate(
                      `Looks like you don’t have any pending vouchers sent.`,
                    )
                  : global.translate(
                      `Looks like you don’t have any pending cash sent.`,
                      917,
                    )
              }
              createText={global.translate(
                'View across all wallets',
                1710,
              )}
              onAddClick={() => {
                history.replace({
                  pathname: '/cash-list',
                  search: '?sort=name',
                  hash: '#the-hash',
                  state: {
                    fromVouchers: !!unpaidVouchers,
                  },
                });
              }}
              body={global.translate(
                'Click on the button bellow to check across all your wallets',
              )}
              imgSrc={SendCashIcon}
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
          EditSendToOther={sendToOther}
          setOptionsOpen={setOptionsOpen}
          setIsEditing={setEditTransactionOpen}
          destinationContact={selectedItem}
          setDestinationContact={setSelectedItem}
          userData={userData}
        />

        <ConfirmCancelTransaction
          open={cancelOpen}
          setOpen={setCancelOpen}
          fromVouchers={unpaidVouchers || fromVouchers}
          sendToOther={sendToOther}
          item={selectedItem}
          cancelTransactionData={cancelTransactionData}
          language={preferred}
          onPositiveConfirm={items => {
            onCancelTransactionConfirm(items);
          }}
        />

        {!error &&
          !loading &&
          !noItems &&
          (unpaidVouchers || fromVouchers) && (
            <AppTable
              data={
                !fromVouchers ? mappedData : pendingVouchersOnWallets
              }
              loading={loading}
              fromVouchers
              type="cashOnly"
              showOptions
              options={[
                {
                  name: global.translate('Cancel Voucher', 2034),
                  image: CancelTransactionImage,
                  onClick: () => {
                    setSelectedItem(selectedItem);
                    setCancelOpen(true);
                  },
                },
              ]}
              onMoreClicked={item => {
                setSelectedItem(item);
                setOptionsOpen(true);
              }}
              allDestFilterOptions={Array.from(
                new Set(allDestFilterOptions),
              )}
              allSourceFilterOptions={Array.from(
                new Set(allSourceFilterOptions),
              )}
              itemsPerPage={!showAll ? 10 : 10}
              headers={pendingVoucherHeaders}
            />
          )}

        {!error &&
          !loading &&
          !noItems &&
          !unpaidVouchers &&
          !fromVouchers && (
            <AppTable
              getMoreResults={getMoreResults}
              transactionsPaginationInfo={
                transactionsPaginationInfo &&
                transactionsPaginationInfo
              }
              firstColumn={sendToOther}
              data={
                !showAll
                  ? pendingTransactions
                  : data?.filter(item => item.VoucherFound !== 'NO')
              }
              loading={loading}
              type="cashOnly"
              showOptions
              options={[
                {
                  name: global.translate('Edit Transaction', 2035),
                  image: EditTransactionImage,
                  onClick: () => {
                    setSelectedItem(selectedItem);
                    setEditTransactionOpen(true);
                  },
                },
                {
                  name: global.translate('Cancel Transaction', 1103),
                  image: CancelTransactionImage,
                  onClick: () => {
                    setSelectedItem(selectedItem);
                    setCancelOpen(true);
                  },
                },
              ]}
              onMoreClicked={item => {
                setSelectedItem(item);
                setOptionsOpen(true);
              }}
              allDestFilterOptions={Array.from(
                new Set(allDestFilterOptions),
              )}
              allSourceFilterOptions={Array.from(
                new Set(allSourceFilterOptions),
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
  unpaidVouchers: PropTypes.bool,
  pendingVouchersOnWallet: PropTypes.arrayOf(PropTypes.any),
  pendingVouchersOnWallets: PropTypes.arrayOf(PropTypes.any),
  fromVouchers: PropTypes.bool.isRequired,
  sendToOther: PropTypes.bool.isRequired,
  transactionsPaginationInfo: PropTypes.objectOf(PropTypes.any)
    .isRequired,
};

UnPaidCashList.defaultProps = {
  showAll: false,
  getUnPaidCashList: () => null,
  onCancelTransactionConfirm: () => {},
  cancelTransactionData: () => {},
  walletNumber: null,
  unpaidVouchers: false,
  contactType: 'DEFAULT',
  pendingVouchersOnWallet: [],
  pendingVouchersOnWallets: [],
};
export default UnPaidCashList;
