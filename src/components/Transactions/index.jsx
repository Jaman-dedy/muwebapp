/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Card, Button, Label, Tab, Menu } from 'semantic-ui-react';
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
import { setIsSendingVoucher } from 'redux/actions/dashboard/dashboard';
import UnPaidCashList from './UnPaidCashList';

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
}) => {
  const {
    data: walletTransactionData,
    error,
    loading,
  } = walletTransactions;

  const data =
    walletTransactionData?.[0].Data || walletTransactionData;
  const dispatch = useDispatch();

  const pendingTransactions =
    unPaidCashList.data &&
    walletNumber &&
    unPaidCashList.data.filter(
      item => item.SourceAccountNumber === walletNumber,
    );
  const pendingVouchersOnWallet =
    pendingVouchersData &&
    pendingVouchersData.filter(
      item => item.SourceAccountNumber === walletNumber,
    );

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

  const showVoucherTransactionsUI = () => {
    return (
      <>
        {pendingVouchersLoading && (
          <LoaderComponent
            style={{ marginTop: 20, marginLeft: 24 }}
            loaderContent={global.translate('Working…', 412)}
          />
        )}

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

  const showExternalContactsTransactionsUI = () => {
    return (
      <>
        {loading && (
          <LoaderComponent
            style={{ marginTop: 20, marginLeft: 24 }}
            loaderContent={global.translate('Working…', 412)}
          />
        )}
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
      <div className="flex flex-row align-items-center">
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
  const showTransactionsUI = () => (
    <>
      <div className="all-user-transactions">
        <div className="all-transactions">
          {data && !data[0].Error && (
            <AppTable
              data={data}
              walletPaginationInfo={walletTransactionData?.[0].Meta}
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
                  userData.data.Language !== '' &&
                  userData.data.Language) ||
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
                },
                {
                  key: 'Amount',
                  value: global.translate('Credit', 1231),
                },
                {
                  key: 'TargetAccount',
                  value: global.translate('Account number', 501),
                },
                {
                  key: 'Description',
                  value: global.translate('Description', 119),
                },
              ]}
            />
          )}

          <div>
            {loading && (
              <LoaderComponent
                style={{ marginTop: 20 }}
                loaderContent={global.translate('Working…', 412)}
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
      {!loading && !error && tableVisible && data && !data[0].Error && (
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
            <Card fluid className="chart-card">
              <Card.Content>
                <div className="charts">
                  <SimplePieChart data={chartData} />
                  <SimplePieChart data={amountChartData} />
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      )}
    </>
  );

  return (
    <DashboardLayout>
      <WelcomeBar loading={userData.loading}>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title wrap__transactions_selector">
            {activeTab !== 3 && (
              <span style={{ float: 'left' }}>
                {contact
                  ? `${global.translate(
                      'My Transactions with',
                      1256,
                    )} ${contact.FirstName}`
                  : global.translate('Transactions for', 1704)}
              </span>
            )}
            {activeTab === 3 && (
              <span style={{ float: 'left' }}>
                {global.translate('Recently visited stores', 1739)}
              </span>
            )}
            &nbsp;
            {!contact && activeTab !== 3 && (
              <CustomDropdown
                style={{
                  backgroundColor: '#eee',
                }}
                setCurrentOption={() =>
                  walletList.find(
                    item => item.AccountNumber === form.wallet,
                  )
                }
                options={walletOptions}
                currentOption={currentOption}
                onChange={onChange}
              />
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
                  <Menu.Item key="Recent Stores">
                    {global.translate('Recent Stores', 1740)}
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
                        'Recently visited stores',
                        1739,
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
