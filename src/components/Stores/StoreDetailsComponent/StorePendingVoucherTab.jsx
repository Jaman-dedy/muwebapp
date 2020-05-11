import React from 'react';
import { Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AppTable from 'components/common/Table';
import CancelTransactionImage from 'assets/images/cancel.png';
import ChatImage from 'assets/images/chat.png';
import Message from 'components/common/Message';
import LoaderComponent from 'components/common/Loader';
import ConfirmRejectVoucherModal from './ConfirmRejectVoucherModal';

import ViewVochersImage from 'assets/images/gift.png';

const StorePendingVoucherTab = ({
  pendingVouchers: { data, loading, error },
  getPendingStoreVouchers,
  selectedItem,
  setSelectedItem,
  cancelOpen,
  setCancelOpen,
  onRejectVoucher,
}) => {
  const pendingVoucherHeaders = [
    { key: 'Date', value: global.translate('Date') },
    {
      key: 'SenderFirstName',
      value: global.translate('Sender full name', 1105),
    },
    {
      key: 'FirstName',
      value: global.translate('Recipient full name'),
    },
    {
      key: 'SourceAmount',
      value: global.translate('Amount'),
    },
  ];
  const noItems =
    (data && data[0] && data[0].VoucherFound === 'NO') ||
    (data && data.length === 0);
  const mappedData =
    !noItems &&
    data &&
    data.map(
      ({
        Recipient: {
          ExternalContact,
          ContactPID,
          FirstName,
          LastName,
          PictureURL,
        },
        Sender: {
          SenderPID,
          FirstName: SenderFirstName,
          LastName: SenderLastName,
          PictureURL: SenderPictureURL,
        },
        Amount,
        CurrencyFlag,
        ...rest
      }) => {
        return {
          FirstName,
          LastName,
          SourceAmount: Amount,
          SourceCurrencyFlag: CurrencyFlag,
          SenderPID,
          SenderFirstName,
          SenderPictureURL,
          SenderLastName,
          ...rest,
          PictureURL,
          ExternalContact,
          ContactPID,
          WalletNumber: SenderPID,
          TargetAccount: ContactPID,
        };
      },
    );

  let allSourceFilterOptions = null;
  let allDestFilterOptions = null;

  if (data) {
    allSourceFilterOptions =
      mappedData && mappedData.map(i => i.SenderPID);

    allDestFilterOptions =
      mappedData &&
      mappedData
        .filter(item => item && item.ContactPID)
        .map(item => item && item.ContactPID);
  }
  return (
    <Tab.Pane attached>
      <ConfirmRejectVoucherModal
        open={cancelOpen}
        setOpen={setCancelOpen}
        fromStoreVouchers
        onRejectVoucher={onRejectVoucher}
        item={selectedItem}
        onPositiveConfirm={items => {
          onRejectVoucher(items);
        }}
      />
      {loading && (
        <LoaderComponent
          style={{ marginTop: 20, marginLeft: 10 }}
          loaderContent={global.translate('Working…', 412)}
        />
      )}
      {noItems && !loading && (
        <Message
          style={{ marginTop: 2 }}
          error={false}
          message={
            data && data.length > 0
              ? data[0].Description
              : global.translate("You don't have any active voucher.")
          }
        />
      )}
      {error && !loading && (
        <Message
          style={{ marginTop: 50 }}
          message={
            error.error
              ? global.translate(error.error)
              : global.translate(error[0].Description)
          }
          action={{
            onClick: () => {
              getPendingStoreVouchers();
            },
          }}
        />
      )}

      {!error && !loading && !noItems && (
        <AppTable
          data={mappedData}
          loading={loading}
          showAll
          fromStoreVouchers
          fromVouchers
          showOptions
          options={[
            {
              name: global.translate('Redeem a voucher.', 810),
              image: ViewVochersImage,
              onClick: () => {
                setSelectedItem(selectedItem);
                setCancelOpen(true);
              },
            },
            {
              name: global.translate('Reject voucher'),
              image: CancelTransactionImage,
              onClick: () => {
                setSelectedItem(selectedItem);
                setCancelOpen(true);
              },
            },
            {
              image: ChatImage,
              name: global.translate('Chat with sender'),
              onClick: () => {},
            },
            {
              image: ChatImage,
              name: global.translate('Chat with receiver'),
              onClick: () => {},
            },
          ]}
          onMoreClicked={item => {
            setSelectedItem(item);
          }}
          allDestFilterOptions={Array.from(
            new Set(allDestFilterOptions),
          )}
          allSourceFilterOptions={Array.from(
            new Set(allSourceFilterOptions),
          )}
          headers={pendingVoucherHeaders}
        />
      )}
    </Tab.Pane>
  );
};

StorePendingVoucherTab.propTypes = {
  pendingVouchers: PropTypes.objectOf(PropTypes.any),
  getPendingStoreVouchers: PropTypes.objectOf(PropTypes.any),
  selectedItem: PropTypes.objectOf(PropTypes.any),
  setSelectedItem: PropTypes.func,
  cancelOpen: PropTypes.func,
  setCancelOpen: PropTypes.func,
  onRejectVoucher: PropTypes.func,
};

StorePendingVoucherTab.defaultProps = {
  pendingVouchers: {},
  getPendingStoreVouchers: {},
  selectedItem: {},
  setSelectedItem: () => {},
  cancelOpen: () => {},
  setCancelOpen: () => {},
  onRejectVoucher: () => {},
};

export default StorePendingVoucherTab;
