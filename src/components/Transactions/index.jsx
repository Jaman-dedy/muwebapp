/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import {
  Grid,
  Button,
  Label,
  Tab,
  Menu,
  Icon,
} from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {
  setSelectedStore,
  clearSelectedStore,
} from 'redux/actions/vouchers/selectedStore';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import DashboardLayout from 'components/common/DashboardLayout';
import GoBack from 'components/common/GoBack';
import Message from 'components/common/Message';
import LoaderComponent from 'components/common/Loader';
import AppTable from 'components/common/Table';
import SimplePieChart from 'components/common/charts/pie';
import CustomDropdown from 'components/common/Dropdown/WalletDropdown';
import ExportCSV from 'components/common/ExportCSV';
import StoresList from 'components/Vouchers/SearchStores/VoucherStores';
import ViewVochersImage from 'assets/images/gift.png';
import ViewEyeImage from 'assets/images/vieweye.png';
import EmptyCard from 'components/common/EmptyCard';
import EmptyStore from 'assets/images/empty_voucher.svg';
import {
  setIsSendingVoucher,
  setIsSendingOhters,
} from 'redux/actions/dashboard/dashboard';
import UnPaidCashList from './UnPaidCashList';
import LoadingTransactions from './LoadingTransactions';

const Transactions = ({
  userData,
  walletTransactions,
  onChange,
  form,
  getVoucherTransactions,
  chartData,
  getTransactions,
  walletNumber,
  unPaidCashList,
  getUnPaidCashList,
  walletList,
  currentOption,
  tableVisible,
  amountChartData,
  contact,
  onCancelTransactionConfirm,
  recentStores,
  pendingVouchers: {
    loading: pendingVouchersLoading,
    data: pendingVouchersData,
    error: pendingVouchersError,
  },
  getMoreResults,
  activeTab,
  setActiveTab,
  pendingOtherData,
  pendingOtherLoading,
  pendingOtherError,
  fetchAllTransaction,
}) => {
  const {
    data: walletTransactionData,
    error,
    loading,
  } = walletTransactions;

  const data =
    walletTransactionData?.[0].Data || walletTransactionData;
  const dispatch = useDispatch();

  const pendingTransactions = walletNumber
    ? unPaidCashList.data &&
      walletNumber &&
      unPaidCashList.data.filter(
        item => item.SourceAccountNumber === walletNumber,
      )
    : unPaidCashList.data;
  const pendingVouchersOnWallet = walletNumber
    ? pendingVouchersData &&
      pendingVouchersData.filter(
        item => item.SourceAccountNumber === walletNumber,
      )
    : pendingVouchersData;

  let allSourceFilterOptions = null;

  let allDestFilterOptions = null;
  const history = useHistory();

  if (data) {
    allDestFilterOptions = data.map(item => item.TargetAccount);
    allSourceFilterOptions = data.map(item => item.WalletNumber);
  }

  const onClickHandler = () => history.goBack();
  const getFileName = () => {
    const nowTime = moment()
      .toLocaleString()
      .replace(' ', '');
    return `transactions-history-${nowTime}.csv`;
  };

  const storesOptions = item => {
    return [
      {
        name: global.translate('View Details and give review', 2032),
        image: ViewEyeImage,
        onClick: () => {
          setSelectedStore(dispatch, item, false);
          history.push('/store-feedback');
        },
      },
      {
        name: global.translate('Send Voucher', 863),
        image: ViewVochersImage,
        onClick: () => {
          setSelectedStore(dispatch, item, true);
          history.push('/contacts?ref=send-voucher');
        },
      },
    ];
  };

  const selectingStore = item => {
    setSelectedStore(dispatch, item, false);
    history.push('/store-feedback');
  };
  const walletOptions =
    walletList &&
    walletList.map(el => {
      return {
        id: el.AccountNumber,
        text: el.AccountNumber,
        value: el.AccountNumber,
        Flag: el.Flag,
        AccountName: el.AccountName,
        AccountNumber: el.AccountNumber,
      };
    });

  const showVoucherTransactionsUI = () => {
    return (
      <>
        {pendingVouchersLoading && <LoadingTransactions />}

        {pendingVouchersData && pendingVouchersData.length === 0 && (
          <EmptyCard
            header={global.translate(
              `Looks like you don't have any pending voucher yet`,
            )}
            createText={global.translate(`Send a voucher`)}
            body={global.translate(
              `Click on the button bellow to send a voucher`,
            )}
            onAddClick={() => {
              setIsSendingVoucher(dispatch);
              clearSelectedStore(dispatch);
              history.push('/contacts?ref=send-voucher');
            }}
            imgSrc={EmptyStore}
          />
        )}
        {pendingVouchersData &&
          pendingVouchersData.length > 0 &&
          pendingVouchersData[0].Error &&
          !loading &&
          !error && (
            <EmptyCard
              header={global.translate(
                `Looks like you don't have any pending voucher yet`,
              )}
              createText={global.translate(`Send voucher`)}
              body={global.translate(
                `Click on the button bellow to send a voucher`,
              )}
              onAddClick={() => {
                setIsSendingVoucher(dispatch);
                clearSelectedStore(dispatch);
                history.push('/contacts?ref=send-voucher');
              }}
              imgSrc={EmptyStore}
            />
          )}
        {pendingVouchersData &&
          pendingVouchersData.length > 0 &&
          !pendingVouchersData[0].Error && (
            <UnPaidCashList
              unPaidCashList={{
                data: pendingVouchersData,
                error: pendingVouchersError,
                loading: pendingVouchersLoading,
              }}
              walletNumber={walletNumber}
              pendingVouchersOnWallet={pendingVouchersOnWallet}
              getUnPaidCashList={getVoucherTransactions}
              unpaidVouchers
              onCancelTransactionConfirm={onCancelTransactionConfirm}
            />
          )}
      </>
    );
  };

  const showPendingOtherUI = () => {
    return (
      <>
        {pendingOtherLoading && (
          <LoaderComponent
            style={{ marginTop: 20, marginLeft: 24 }}
            loaderContent={global.translate('Working…', 412)}
          />
        )}

        {pendingOtherData?.RecordFound === 'NO' && (
          <EmptyCard
            header={global.translate(
              `Looks like you don't have any pending transaction yet`,
            )}
            createText={global.translate(`transfer money`)}
            body={global.translate(
              `Click on the button bellow to transfer money`,
            )}
            onAddClick={() => {
              setIsSendingOhters(dispatch);
              clearSelectedStore(dispatch);
              history.push('/contacts?ref=to-others');
            }}
            imgSrc={EmptyStore}
          />
        )}
        {pendingOtherData?.RecordFound !== 'NO' && (
          <UnPaidCashList
            transactionsPaginationInfo={pendingOtherData?.Meta}
            sendToOther
            unPaidCashList={{
              data: pendingOtherData?.Data,
              error: pendingOtherError,
              loading: pendingOtherLoading,
            }}
            getUnPaidCashList={getUnPaidCashList}
            walletNumber={walletNumber}
            pendingTransactions={pendingOtherData?.Data}
            onCancelTransactionConfirm={onCancelTransactionConfirm}
            getMoreResults={getMoreResults}
          />
        )}
      </>
    );
  };

  const showExternalContactsTransactionsUI = () => {
    return (
      <>
        {loading && <LoadingTransactions />}
        {data && data[0] && data[0].Error && !loading && !error && (
          <Message
            style={{ marginTop: 24, marginLeft: 24 }}
            message={global.translate(data[0].Description, 2016)}
            error={false}
          />
        )}
        {data && !data[0].Error && (
          <UnPaidCashList
            unPaidCashList={{ data, error, loading }}
            getUnPaidCashList={getTransactions}
            pendingTransactions={data}
            contactType="EXTERNAL"
            showAll
            onCancelTransactionConfirm={onCancelTransactionConfirm}
          />
        )}
      </>
    );
  };

  const filterUi = (
    <div className="table-header">
      <div className="fetch-transactions-action">
        <div className="view-all-button">
          <Button
            color="orange"
            onClick={() => fetchAllTransaction()}
          >
            {' '}
            <Icon name="eye" /> {global.translate(`View all`)}
          </Button>
        </div>
        <div className="select-wallets-dropdown">
          {!contact && (
            <CustomDropdown
              style={{
                backgroundColor: '#eee',
                height: '40px',
                marginTop: '0px',
              }}
              setCurrentOption={() =>
                walletList.find(
                  item => item.AccountNumber === form.wallet,
                )
              }
              customstyle
              options={walletOptions}
              currentOption={currentOption}
              onChange={onChange}
            />
          )}
        </div>
      </div>
      <div className="from-to">
        <div className="from">
          <h4>{global.translate('From', 114)}</h4>
          <DateInput
            name="fromDate"
            onChange={onChange}
            icon="dropdown"
            popupPosition="top left"
            animation="fade"
            placeholder={global.translate('To', 115)}
            iconPosition="right"
            dateFormat="YYYY-MM-DD"
            value={form.fromDate}
          />
        </div>
        <div className="to">
          <h4>{global.translate('To', 115)}</h4>
          <DateInput
            name="toDate"
            onChange={onChange}
            icon="dropdown"
            popupPosition="top left"
            animation="fade"
            placeholder={global.translate('To', 115)}
            iconPosition="right"
            dateFormat="YYYY-MM-DD"
            value={form.toDate}
          />
        </div>
      </div>
      <div className="flex flex-row align-items-center refresh-csv">
        <Button
          icon="refresh"
          color="orange"
          onClick={() => {
            getTransactions();
          }}
          className="refresh-transactions-btn"
        />
        <div className="export-csv-button">
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
            ]}
          />
        </div>
      </div>
    </div>
  );

  const showTransactionsUI = () => (
    <>
      <div className="all-user-transactions">
        <div className="all-transactions">
          {data && !data[0].Error && (
            <AppTable
              data={data}
              transactionsPaginationInfo={
                walletTransactionData?.[0].Meta
              }
              getMoreResults={getMoreResults}
              allDestFilterOptions={Array.from(
                new Set(allDestFilterOptions),
              )}
              allSourceFilterOptions={Array.from(
                new Set(allSourceFilterOptions),
              )}
              tableVisible={tableVisible}
              filterUi={filterUi}
              onRefreshClicked={getTransactions}
              loading={loading}
              userLanguage={
                (userData.data &&
                  userData.data?.Language !== '' &&
                  userData.data?.Language) ||
                'en'
              }
              isAtAllTransactions
              error={error}
              searchFields={[
                'Amount',
                'TargetAccount',
                'Date',
                'Description',
              ]}
              itemsPerPage={9}
              headers={[
                { key: 'Date', value: 'Date' },

                {
                  key: 'Amount',
                  value: global.translate('Debit', 1230),
                  operation: 'Debit',
                },
                {
                  key: 'Amount',
                  value: global.translate('Credit', 1231),
                  operation: 'Credit',
                },
                {
                  key: 'WalletNumber',
                  value: global.translate('Source wallet', 501),
                },
                {
                  key: 'TargetAccount',
                  value: global.translate('Target wallet', 501),
                },
                {
                  key: 'Description',
                  value: global.translate('Description', 119),
                },
              ]}
            />
          )}

          <div>
            {loading && <LoadingTransactions />}

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
                    getTransactions();
                  },
                }}
              />
            )}
            {data &&
              data[0] &&
              data[0].Error &&
              !loading &&
              !error && (
                <Message
                  style={{ marginTop: 50 }}
                  message={global.translate(
                    data[0].Description,
                    2016,
                  )}
                  error={false}
                />
              )}
          </div>
        </div>
      </div>

      {!loading &&
        !error &&
        tableVisible &&
        data &&
        !data[0].Error &&
        chartData?.[0].total !== 0 && (
          <div>
            <div className="last-year-header">
              <span className="dash-title bold large-text large-padding-bottom">
                {global.translate(
                  'Transactions overview for the period',
                  1232,
                )}
              </span>
            </div>
            <div className="chart-area-header">
              <Grid>
                <Grid.Column mobile={16} tablet={6} computer={4}>
                  <SimplePieChart data={chartData} />
                </Grid.Column>
                <Grid.Column mobile={16} tablet={6} computer={4}>
                  <SimplePieChart data={amountChartData} />
                </Grid.Column>
              </Grid>
            </div>
          </div>
        )}
    </>
  );

  const showWallet = () => {
    if (activeTab === 4 || activeTab === 3) {
      return true;
    }
  };

  return (
    <DashboardLayout>
      <WelcomeBar loading={userData.loading}>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title wrap__transactions_selector">
            {showWallet() && activeTab === 4 && (
              <span style={{ float: 'left' }}>
                {global.translate('Suggested stores', 2121)}
              </span>
            )}
            {showWallet() && activeTab === 3 && (
              <span style={{ float: 'left' }}>
                {global.translate(
                  'Cash sent to other networks',
                  1739,
                )}
              </span>
            )}
          </h2>

          <div className="clear" />
        </div>
      </WelcomeBar>

      <div className="wrap__container">
        {contact ? (
          !contact.ContactPID ? (
            showExternalContactsTransactionsUI()
          ) : (
            showTransactionsUI()
          )
        ) : (
          <Tab
            onTabChange={(event, data) => {
              let tab = '';

              switch (data.activeIndex) {
                case 0:
                  tab = 'transactions';
                  break;
                case 1:
                  tab = 'pending-cash-sent';
                  break;
                case 2:
                  tab = 'pending-voucher';
                  break;
                case 3:
                  tab = 'recent-stores';
                  break;
                default:
                  break;
              }

              history.push(`/transactions?tab=${tab}`);
              setActiveTab(data.activeIndex);
            }}
            activeIndex={activeTab}
            menu={{ secondary: true, pointing: true }}
            panes={[
              {
                menuItem: global.translate('Transactions', 62),
                render: () => showTransactionsUI(),
              },
              {
                menuItem: (
                  <Menu.Item key="All Pending cash sent">
                    {global.translate('Pending cash sent', 916)}
                    <Label as={Link} color="orange">
                      {(pendingTransactions &&
                        pendingTransactions.length) ||
                        0}
                    </Label>
                  </Menu.Item>
                ),
                render: () => (
                  <>
                    <UnPaidCashList
                      unPaidCashList={unPaidCashList}
                      getUnPaidCashList={getUnPaidCashList}
                      walletNumber={walletNumber}
                      pendingTransactions={pendingTransactions}
                      onCancelTransactionConfirm={
                        onCancelTransactionConfirm
                      }
                    />
                  </>
                ),
              },
              {
                menuItem: (
                  <Menu.Item key="Pending cash sent">
                    {global.translate('My pending Vouchers', 2030)}
                    <Label as={Link} color="orange">
                      {(pendingVouchersOnWallet &&
                        pendingVouchersOnWallet.length) ||
                        0}
                    </Label>
                  </Menu.Item>
                ),
                render: () => showVoucherTransactionsUI(),
              },
              {
                menuItem: (
                  <Menu.Item key="Other transfer">
                    {global.translate('Other transfer', 2030)}
                    <Label as={Link} color="orange">
                      {(pendingOtherData &&
                        pendingOtherData?.Meta?.TotalRecords) ||
                        0}
                    </Label>
                  </Menu.Item>
                ),
                render: () => showPendingOtherUI(),
              },
              {
                menuItem: (
                  <Menu.Item key="Recent Stores">
                    {global.translate('Suggested stores', 2121)}
                    <Label as={Link} color="orange">
                      {recentStores?.data?.[0]?.Result === 'FAILED'
                        ? 0
                        : recentStores?.data?.length ?? 0}
                    </Label>
                  </Menu.Item>
                ),
                render: () => (
                  <div className="main-container">
                    <StoresList
                      searchStoreList={recentStores?.data}
                      selectingStore={selectingStore}
                      options={storesOptions}
                      title={global.translate(
                        'Suggested stores',
                        2121,
                      )}
                    />
                  </div>
                ),
              },
            ]}
          />
        )}
      </div>
    </DashboardLayout>
  );
};
Transactions.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  walletTransactions: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  chartData: PropTypes.arrayOf(PropTypes.any).isRequired,
  amountChartData: PropTypes.arrayOf(PropTypes.any).isRequired,
  getTransactions: PropTypes.func.isRequired,
  walletNumber: PropTypes.string.isRequired,
  unPaidCashList: PropTypes.objectOf(PropTypes.any).isRequired,
  getUnPaidCashList: PropTypes.func.isRequired,
  walletList: PropTypes.arrayOf(PropTypes.any).isRequired,
  currentOption: PropTypes.objectOf(PropTypes.any).isRequired,
  tableVisible: PropTypes.bool,
  contact: PropTypes.objectOf(PropTypes.any),
  onCancelTransactionConfirm: PropTypes.func,
  recentStores: PropTypes.objectOf(PropTypes.any),
  activeTab: PropTypes.number,
  setActiveTab: PropTypes.func,
};

Transactions.defaultProps = {
  tableVisible: true,
  contact: null,
  onCancelTransactionConfirm: () => {},
  recentStores: null,
  activeTab: 0,
  setActiveTab: () => {},
};
export default Transactions;
