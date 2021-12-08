import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Segment, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';
import ConfirmCancelTransaction from 'components/common/ConfirmCancelTransaction';
import { SUSPENDED_STORE } from 'constants/general';
import DetailHeading from './DetailHeading';
import DetailTypeAction from './DetailTypAction';
import './style.scss';
import DisplayWallet from './DisplayWallet';
import DetailsBody from './DetailsBody';
import { useSelector } from 'react-redux';

const TransactionDetails = ({
  item,
  selectedCard,
  setPhoneValue,
  phoneValue,
  onOptionChange,
  form,
  modifyOneTransaction,
  updating,
  updatingData,
  updatingError,
  openEditTransaction,
  storeName,
  setOpenEditTransaction,
  withdraw,
  onRejectVoucher,
  PIN,
  setPIN,
}) => {
  const history = useHistory();
  const onClickHandler = () => history.goBack();
  const [cancelOpen, setCancelOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const walletInfos = () => {
    if (selectedCard === 1) {
      return {
        sourceWallet: item?.WalletNumber,
        sourceCurrency: item?.SourceCurrencyFlag,
        targetWallet: item?.TargetAccount,
        targetCurrency: item?.TargetCurrencyFlag,
      };
    }
    if (selectedCard === 2) {
      return {
        sourceWallet:
          item?.SourceAccountNumber ||
          item?.SourceWallet.WalletNumber,
        sourceCurrency:
          item?.SourceCurrencyFlag || item?.SourceWallet.Flag,
        targetWallet: `${item?.PhonePrefix} ${item?.Phone}` || '',
        targetCurrency: item?.DestCurrencyFlag || '',
      };
    }
    if (selectedCard === 3) {
      return {
        sourceWallet: !item?.isOnStore
          ? item?.SourceAccountNumber
          : `${item?.Sender?.FirstName} ${item?.Sender?.LastName}`,
        sourceCurrency: item?.isOnStore
          ? item?.Sender?.PictureURL
          : item?.CurrencyFlag,
        targetWallet: item?.Store?.Name,
        targetCurrency:
          item?.Recipient?.ExternalContact === 'YES'
            ? item?.Recipient?.CountryFlag
            : item?.TargetCurrencyFlag ?? item?.Recipient?.PictureURL,
      };
    }
    if (selectedCard === 4) {
      return {
        sourceWallet: item.SourceAccountNumber,
        sourceCurrency: item.SourceCurrencyFlag,
        targetWallet: `${item.PhonePrefix ? item.PhonePrefix : ''} ${
          item.Phone ? item.Phone : ''
        }`,
        targetCurrency: item.DestCurrencyFlag,
      };
    }
  };

  const { myStores } = useSelector(({ user }) => user);

  const store = myStores.storeList.find(
    store => store.StoreID === item.StoreSID,
  );

  useEffect(() => {
    if (store?.Status === SUSPENDED_STORE) {
      setDisabled(true);
    }
  }, [store]);
  return (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title">
            {item?.isOnStore
              ? global.translate('Voucher details')
              : global.translate('Transaction details')}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className="transaction-detail-container">
        <Segment>
          <DetailHeading item={item} selectedCard={selectedCard} />
          <DetailTypeAction
            item={item}
            selectedCard={selectedCard}
            phoneValue={phoneValue}
            setPhoneValue={setPhoneValue}
            onOptionChange={onOptionChange}
            PIN={PIN}
            setPIN={setPIN}
            form={form}
            modifyOneTransaction={modifyOneTransaction}
            updating={updating}
            updatingData={updatingData}
            updatingError={updatingError}
            openEditTransaction={openEditTransaction}
            setOpenEditTransaction={setOpenEditTransaction}
          />
          <div className="display-wallets">
            <DisplayWallet
              title={
                item?.isOnStore
                  ? global.translate('Sender')
                  : global.translate('Source account')
              }
              walletNumber={walletInfos().sourceWallet}
              walletFlag={walletInfos().sourceCurrency}
            />

            {!withdraw && (
              <DisplayWallet
                title={
                  selectedCard === 3 || item?.isOnStore
                    ? global.translate('Store')
                    : global.translate('Target account')
                }
                walletNumber={walletInfos().targetWallet}
                walletFlag={walletInfos().targetCurrency}
                selectedCard={selectedCard}
                isOnStore={item?.isOnStore}
                storeName={storeName}
              />
            )}
          </div>
          <DetailsBody
            item={item}
            selectedCard={selectedCard}
            updatingData={updatingData}
            withdraw={withdraw}
          />
        </Segment>
        <div className="goto-transactions">
          {!item?.isOnStore && (
            <Button onClick={() => history.push('/transactions')}>
              {global.translate('Go to all transactions')}
            </Button>
          )}
          {item?.isOnStore && (
            <>
              <Button
                onClick={modifyOneTransaction}
                className={disabled ? 'disabled' : ''}
              >
                {global.translate('Redeem Voucher')}
              </Button>

              <Button onClick={onRejectVoucher}>
                {global.translate('Reject voucher')}
              </Button>
            </>
          )}
          {selectedCard !== 1 && !item?.isOnStore && (
            <Button
              onClick={() => {
                setCancelOpen(true);
              }}
            >
              {global.translate('Cancel transaction')}
            </Button>
          )}
        </div>
      </div>
      <ConfirmCancelTransaction
        open={cancelOpen}
        setOpen={setCancelOpen}
        fromVouchers={selectedCard === 3}
        sendToOther={selectedCard === 4}
        item={item}
      />
    </DashboardLayout>
  );
};
TransactionDetails.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  selectedCard: PropTypes.number,
  setPhoneValue: PropTypes.func,
  phoneValue: PropTypes.string,
  onOptionChange: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any),
  modifyOneTransaction: PropTypes.func,
  updating: PropTypes.bool,
  updatingData: PropTypes.objectOf(PropTypes.any),
  updatingError: PropTypes.objectOf(PropTypes.any),
  openEditTransaction: PropTypes.bool,
  setOpenEditTransaction: PropTypes.func,
  storeName: PropTypes.string,
  withdraw: PropTypes.bool,
  onRejectVoucher: PropTypes.func,
  PIN: PropTypes.string,
  setPIN: PropTypes.func,
};
TransactionDetails.defaultProps = {
  item: {},
  selectedCard: 1,
  setPhoneValue: () => {},
  phoneValue: '',
  onOptionChange: () => {},
  form: {},
  modifyOneTransaction: () => {},
  updating: false,
  updatingData: {},
  updatingError: {},
  openEditTransaction: false,
  setOpenEditTransaction: () => {},
  storeName: '',
  withdraw: false,
  onRejectVoucher: () => {},
  setPIN: () => {},
  PIN: '',
};

export default TransactionDetails;
