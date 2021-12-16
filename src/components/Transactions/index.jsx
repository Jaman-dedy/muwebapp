/* eslint-disable import/order */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Segment,
  Image,
  Pagination,
  Message,
} from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import moment from 'moment';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';
import AllTransactionImg from 'assets/images/transactions/transactions.svg';
import PendingCashSentImg from 'assets/images/transactions/pending-cash.svg';
import PendingVoucherImg from 'assets/images/transactions/pending-voucher.svg';
import ExternalTransferImg from 'assets/images/transactions/external-transaction.svg';
import CardSummary from './CardSummury';
import './style.scss';
import AllTransaction from './Tables/AllTransactions';
import PendingCash from './Tables/PendingCash';
import ExportCSV from 'components/common/ExportCSV';
import TableHeading from './TableHeading';
import Charts from './Charts';
import loadTransactions from 'assets/images/transactions/load-transactions.svg';
import loadTransactionsBody from 'assets/images/transactions/loading-transaction-body.svg';
import useWindowSize from 'utils/useWindowSize';
import PendingVoucher from './Tables/PendingVoucher';
import ExternalTransaction from './Tables/ExternalTransaction';

const Transactions = ({
  walletTransactions,
  walletList,
  amountChartData,
  chartData,
  getTransactions,
  setCurrentOption,
  currentOption,
  fetchAllTransaction,
  form,
  setForm,
  getMoreResults,
  unPaidCashList,
  pendingVouchers: {
    loading: pendingVouchersLoading,
    data: pendingVouchersData,
  },
  pendingOtherData,
  setShouldUpdateTransaction,
}) => {
  const history = useHistory();
  const size = useWindowSize();

  const onClickHandler = () => history.goBack();
  const { loading: loadUnPaidCash } = unPaidCashList;
  const [selectedCard, setSelectedCard] = useState(1);
  const [allTransactionData, setAllTransactionData] = useState(null);
  const [
    paginateAllTransaction,
    setPaginateAllTransaction,
  ] = useState(null);
  const [
    paginateExternalTransfer,
    setPaginateExternalTransfer,
  ] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [allTransactions, setAllTransactions] = useState(null);
  const [filteredWallets, setFilteredWallets] = useState(null);
  const [sourceWallet, setSourceWallet] = useState();
  const [targetWallet, setTargetWallet] = useState();

  const [cachedTransactions, setCachedTransactions] = useState({});
  const [cachedMetaData, setCachedMetaData] = useState({});

  const { data, loading, error } = walletTransactions;
  const handleSelectedCard = cardNumber => {
    setSelectedCard(cardNumber);
  };

  const handleClickTransaction = (item, selectedCard) => {
    if (selectedCard === 1) {
      const encodedUrl = btoa(item.TransactionNumber);
      history.push({
        pathname: `/transactions/${encodedUrl}`,
        state: {
          item,
          selectedCard,
          urlArgument: item.TransactionNumber,
        },
      });
    }
    if (selectedCard === 2) {
      const encodedUrl = btoa(item.TransferNumber);
      history.push({
        pathname: `/transactions/${encodedUrl}`,
        state: {
          item,
          selectedCard,
          urlArgument: item.TransferNumber,
        },
      });
    }
    if (selectedCard === 3) {
      const encodedUrl = btoa(item.TransferNumber);
      history.push({
        pathname: `/transactions/${encodedUrl}`,
        state: {
          item,
          selectedCard,
          urlArgument: item.TransferNumber,
        },
      });
    }
    if (selectedCard === 4) {
      const encodedUrl = btoa(item.TransferNumber);
      history.push({
        pathname: `/transactions/${encodedUrl}`,
        state: {
          item,
          selectedCard,
          urlArgument: item.TransferNumber,
        },
      });
    }
  };

  useEffect(() => {
    setCachedMetaData({});
    setCachedTransactions({});
    setCurrentPage(1);
  }, [form?.WalletNumber]);
  useEffect(() => {
    if (data) {
      // cache the data from redux store
      setCachedTransactions(prevData => {
        // check if we have not cached data for the current page
        if (
          // makes sure the data we have in redux are for the current page
          +data[0]?.Meta?.CurrentPage === currentPage
        ) {
          return {
            ...prevData,
            [currentPage]: data[0]?.Data,
          };
        }
        // no need to change the state since the data were cached
        return { ...prevData };
      });
      setCachedMetaData(prevData => {
        if (
          // check if we have not cached meta data for the current page
          +data[0]?.Meta?.CurrentPage === currentPage
        ) {
          return { ...prevData, [currentPage]: data[0]?.Meta };
        }
        return { ...prevData };
      });
    }
  }, [data, currentPage]);

  // update transaction data whenever there is a change is cached data
  useEffect(() => {
    if (
      cachedTransactions &&
      Object.keys(cachedTransactions).length >= currentPage
    ) {
      setAllTransactionData(cachedTransactions[currentPage]);
      setAllTransactions(cachedTransactions[currentPage]);
    }
  }, [cachedTransactions, currentPage]);

  useEffect(() => {
    getMoreResults(1);
  }, []);

  useEffect(() => {
    if (
      cachedMetaData &&
      Object.keys(cachedMetaData).length >= currentPage
    ) {
      setPaginateAllTransaction(cachedMetaData[currentPage]);
    }
  }, [cachedMetaData, currentPage]);

  useEffect(() => {
    if (pendingOtherData) {
      setPaginateExternalTransfer(pendingOtherData.Meta);
    }
  }, [pendingOtherData]);

  useEffect(() => {
    if (walletList) {
      setSourceWallet(
        walletList.find(wallet => wallet.Default === 'YES'),
      );
    }
  }, [walletList]);

  useEffect(() => {
    if (data && sourceWallet && targetWallet) {
      setFilteredWallets(
        data[0].Data.filter(
          transaction =>
            transaction.WalletNumber === sourceWallet.AccountNumber &&
            transaction.TargetAccount === targetWallet.TargetAccount,
        ),
      );
    }
  }, [sourceWallet, targetWallet, data]);

  const onFilterWallet = () => {
    setAllTransactionData(filteredWallets);
  };

  const getFileName = () => {
    const nowTime = moment()
      .toLocaleString()
      .replace(' ', '');
    return `transactions-history-${nowTime}.csv`;
  };

  const handleAllTransactionPageChange = (event, { activePage }) => {
    if (selectedCard === 1 && !cachedTransactions[activePage]) {
      getMoreResults(activePage, selectedCard);
    } else if (selectedCard !== 1) {
      getMoreResults(activePage, selectedCard);
    }
    setCurrentPage(activePage);
  };
  return (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title">
            {global.translate('Transactions')}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>

      <div className="transaction-container">
        {error && !loading && (
          <Message negative>
            <Message.Header>
              {global.translate(
                "We're sorry we can not display your transactions for now",
                2233,
              )}
            </Message.Header>
            <p>{error.message}</p>
          </Message>
        )}
        {!error && (
          <>
            <div className="summary-cards">
              <CardSummary
                transactionTypeImage={
                  size.width > 600 && AllTransactionImg
                }
                title={global.translate('Transactions')}
                onClick={handleSelectedCard}
                selected={selectedCard === 1}
                card={1}
                transactionCount={
                  paginateAllTransaction?.TotalRecords ?? 0
                }
              />

              <CardSummary
                transactionTypeImage={
                  size.width > 600 && PendingCashSentImg
                }
                title={global.translate('Pending cash sent')}
                onClick={handleSelectedCard}
                card={2}
                selected={selectedCard === 2}
                transactionCount={unPaidCashList?.data?.length ?? 0}
              />

              <CardSummary
                transactionTypeImage={
                  size.width > 600 && PendingVoucherImg
                }
                title={global.translate('Pending vouchers')}
                onClick={handleSelectedCard}
                card={3}
                selected={selectedCard === 3}
                transactionCount={pendingVouchersData?.length ?? 0}
              />

              <CardSummary
                transactionTypeImage={
                  size.width > 600 && ExternalTransferImg
                }
                title={global.translate('External transfers')}
                onClick={handleSelectedCard}
                card={4}
                selected={selectedCard === 4}
                transactionCount={pendingOtherData?.Data?.length ?? 0}
              />
            </div>
            {loading && (
              <div className="transactions-placeholder">
                <Image
                  className="animate-placeholder"
                  src={loadTransactions}
                />
              </div>
            )}
            {!loading && (
              <Segment>
                {selectedCard === 1 && (
                  <TableHeading
                    walletList={walletList}
                    fetchAllTransaction={fetchAllTransaction}
                    setCurrentOption={setCurrentOption}
                    currentOption={currentOption}
                    form={form}
                    setForm={setForm}
                    getTransactions={getTransactions}
                    setSourceWallet={setSourceWallet}
                    setTargetWallet={setTargetWallet}
                    targetWallet={targetWallet}
                    sourceWallet={sourceWallet}
                    onFilterWallet={onFilterWallet}
                    allTransactionData={allTransactionData}
                    allTransactions={allTransactions}
                    setAllTransactionData={setAllTransactionData}
                    setShouldUpdateTransaction={
                      setShouldUpdateTransaction
                    }
                  />
                )}

                <div className="display-table">
                  {selectedCard === 1 && (
                    <AllTransaction
                      onClick={handleClickTransaction}
                      allTransactionData={allTransactionData}
                      selectedCard={selectedCard}
                    />
                  )}
                  {selectedCard === 2 &&
                    unPaidCashList.data?.[0]?.VoucherFound !== 'NO' &&
                    (!loadUnPaidCash ? (
                      <PendingCash
                        pendingCashData={unPaidCashList?.data}
                        onClick={handleClickTransaction}
                        selectedCard={selectedCard}
                      />
                    ) : (
                      <Image
                        style={{ width: '100%' }}
                        className="animate-placeholder"
                        src={loadTransactionsBody}
                      />
                    ))}
                  {selectedCard === 3 &&
                    (!pendingVouchersLoading ? (
                      <PendingVoucher
                        pendingVoucherData={pendingVouchersData}
                        onClick={handleClickTransaction}
                        selectedCard={selectedCard}
                      />
                    ) : (
                      <Image
                        style={{ width: '100%' }}
                        className="animate-placeholder"
                        src={loadTransactionsBody}
                      />
                    ))}
                  {selectedCard === 4 && (
                    <ExternalTransaction
                      externalTransactionData={pendingOtherData?.Data}
                      onClick={handleClickTransaction}
                      selectedCard={selectedCard}
                    />
                  )}
                </div>
                <div className="show-pagination">
                  {paginateAllTransaction?.TotalPages > 0 &&
                    selectedCard === 1 && (
                      <Pagination
                        data={allTransactionData}
                        defaultActivePage={currentPage}
                        totalPages={
                          paginateAllTransaction?.TotalPages
                        }
                        boundaryRange={0}
                        floated="right"
                        siblingRange={1}
                        onPageChange={handleAllTransactionPageChange}
                      />
                    )}
                  {paginateExternalTransfer?.TotalPages > 1 &&
                    selectedCard === 4 && (
                      <Pagination
                        data={pendingOtherData?.Data}
                        defaultActivePage={currentPage}
                        totalPages={
                          paginateExternalTransfer?.TotalPages
                        }
                        boundaryRange={0}
                        floated="right"
                        siblingRange={1}
                        onPageChange={handleAllTransactionPageChange}
                      />
                    )}
                </div>
              </Segment>
            )}
            {!loading && selectedCard === 1 && (
              <div className="export-csv">
                <ExportCSV
                  fileName={getFileName()}
                  data={data}
                  disabled={!Array.isArray(data)}
                  excludeHeaders={[
                    'OpsType',
                    'ContactPictureURL',
                    'CountryFlag',
                    'SourceCurrencyFlag',
                    'TargetCurrencyFlag',
                    'ContactCountryCode',
                    'SenderCountryFlag',
                    'SenderCountryCode',
                    'SenderPictureURL',
                    'TransactionType',
                  ]}
                />
              </div>
            )}

            {amountChartData?.[0]?.value !== 0 && (
              <Charts
                amountChartData={amountChartData}
                chartData={chartData}
                currentOption={currentOption}
                form={form}
              />
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

Transactions.propTypes = {
  walletTransactions: PropTypes.objectOf(PropTypes.any),
  walletList: PropTypes.arrayOf(PropTypes.any),
  amountChartData: PropTypes.objectOf(PropTypes.any),
  chartData: PropTypes.objectOf(PropTypes.any),
  getTransactions: PropTypes.func,
  setCurrentOption: PropTypes.func,
  currentOption: PropTypes.objectOf(PropTypes.any),
  fetchAllTransaction: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any),
  setForm: PropTypes.func,
  getMoreResults: PropTypes.func,
  unPaidCashList: PropTypes.objectOf(PropTypes.any),
  getUnPaidCashList: PropTypes.func,
  pendingVouchers: PropTypes.arrayOf(PropTypes.any),
  pendingOtherData: PropTypes.objectOf(PropTypes.any),
};
Transactions.defaultProps = {
  walletTransactions: {},
  walletList: [],
  amountChartData: {},
  chartData: {},
  getTransactions: () => {},
  setCurrentOption: () => {},
  currentOption: {},
  fetchAllTransaction: () => {},
  form: {},
  setForm: () => {},
  getMoreResults: () => {},
  unPaidCashList: {},
  getUnPaidCashList: () => {},
  pendingVouchers: [],
  pendingOtherData: {},
};

export default Transactions;
