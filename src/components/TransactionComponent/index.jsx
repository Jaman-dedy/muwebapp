import React, { useState, useEffect } from 'react';
import './style.scss';
import {
  Card,
  Button,
  Icon,
  Label,
  Tab,
  Menu,
  Header,
  List,
} from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import { Link } from 'react-router-dom';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import DashboardLayout from 'components/common/DashboardLayout';
import Message from 'components/common/Message';
import LoaderComponent from 'components/common/Loader';
import AppTable from 'components/common/Table';
import SimplePieChart from 'components/common/charts/pie';
import GraphDataContainer from 'containers/Dashboard/cumulativeGraph';
import UnPaidCashList from './UnPaidCashList';
import TransactionDetails from './TransactionDetails';
import CustomDropdown from 'components/common/Dropdown/WalletDropdown';

const Transactions = ({
  userData,
  walletTransactions: { data, error, loading },
  onChange,
  form,
  chartData,
  getTransactions,
  colors,
  walletNumber,
  unPaidCashList,
  getUnPaidCashList,
  walletList,
  currentOption,
}) => {
  const pendingTransactions =
    unPaidCashList.data &&
    walletNumber &&
    unPaidCashList.data.filter(
      item => item.SourceAccountNumber === walletNumber,
    );

  const filterUi = (
    <div className="table-header">
      <p className="sub-title" />
      <div className="from-to">
        <div className="from">
          <h4>From</h4>

          <DateInput
            name="fromDate"
            onChange={onChange}
            icon="dropdown"
            popupPosition="top left"
            animation="fade"
            placeholder={global.translate('To')}
            iconPosition="right"
            dateFormat="YYYY-MM-DD"
            value={form.fromDate}
          />
        </div>
        <div className="to">
          <h4>To</h4>
          <DateInput
            name="toDate"
            onChange={onChange}
            icon="dropdown"
            popupPosition="top left"
            animation="fade"
            placeholder={global.translate('To')}
            iconPosition="right"
            dateFormat="YYYY-MM-DD"
            value={form.toDate}
          />
          &nbsp;
          <Button
            icon="refresh"
            color="orange"
            onClick={() => {
              getTransactions();
            }}
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

  return (
    <DashboardLayout>
      <WelcomeBar
        loading={userData.loading}
        style={{ paddingBottom: '11px', paddingTop: '23px' }}
      >
        <span className="lighter">
          {global.translate('Transactions for')}
          &nbsp;
        </span>
        <span>
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
        </span>
      </WelcomeBar>

      <div className="main-container">
        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={[
            {
              menuItem: 'All Transactions',
              render: () => (
                <>
                  <div className="all-user-transactions">
                    <div className="all-transactions">
                      <AppTable
                        data={data}
                        filterUi={filterUi}
                        loading={loading}
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
                          { key: 'Amount', value: 'Amount' },
                          {
                            key: 'TargetAccount',
                            value: 'Target Account',
                          },
                          {
                            key: 'Description',
                            value: 'Description',
                          },
                        ]}
                      />
                      <div>
                        {loading && (
                          <LoaderComponent
                            style={{ marginTop: 20 }}
                            loaderContent={global.translate(
                              'Working…',
                              412,
                            )}
                          />
                        )}
                        {error && (
                          <Message
                            style={{ marginTop: 50 }}
                            message={
                              error.error
                                ? global.translate(error.error)
                                : global.translate(
                                    error[0].Description,
                                    195,
                                  )
                            }
                            action={{
                              onClick: () => {
                                getTransactions();
                              },
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ),
            },
            {
              menuItem: (
                <Menu.Item key="My Unpaid Cash Transactions">
                  My Unpaid Cash Transactions
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
                  />
                </>
              ),
            },
          ]}
        />
        <div className="chart-area">
          <div className="last-year-header">
            <p className="sub-title">
              Last Year Transaction Overview
            </p>
          </div>
          <div className="chart-area-header">
            <Card fluid className="chart-card">
              <Card.Content>
                <div className="charts">
                  <SimplePieChart
                    data={chartData}
                    cx={75}
                    title="Credit VS Debit"
                    colors={colors}
                  />
                  <SimplePieChart
                    data={chartData}
                    cx={75}
                    title="Credit VS Debit"
                    colors={colors}
                  />

                  <GraphDataContainer />
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
Transactions.propTypes = {};

Transactions.defaultProps = {};
export default Transactions;
