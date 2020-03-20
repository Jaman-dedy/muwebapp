import React from 'react';
import './style.scss';
import { Card } from 'semantic-ui-react';
import PREVIOUS_ICON from 'assets/images/back.png';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import DashboardLayout from 'components/common/DashboardLayout';
import SimplePieChart from 'components/common/charts/pie';
import Message from 'components/common/Message';
import LoaderComponent from 'components/common/Loader';
import AppTable from 'components/common/Table';
import { DateInput } from 'semantic-ui-calendar-react';
import GraphDataContainer from 'containers/Dashboard/cumulativeGraph';

const Transactions = ({
  history,
  userData,
  chartData,
  colors,
  walletTransactions: { data, error, loading },
  onChange,
  form,
  getTransactions,
  walletNumber,
}) => {
  return (
    <DashboardLayout>
      <WelcomeBar loading={userData.loading}>
        <span className="lighter">
          {global.translate('Transactions for ')}
          &nbsp;
          <strong>{`Wallet ${walletNumber}`}</strong>
        </span>
      </WelcomeBar>
      {/* <div className="chart-area">
        <div className="last-year-header">
          <p className="sub-title">Last Year Transaction Overview</p>
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

                <GraphDataContainer />
              </div>
            </Card.Content>
          </Card>
        </div>
      </div> */}

      <div className="main-container">
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
          </div>
        </div>
        <div className="all-transactions">
          <div>
            {loading && (
              <LoaderComponent
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
          </div>

          {!error && !loading && (
            <AppTable
              data={data}
              loading={loading}
              headers={[
                { key: 'Date', value: 'Date' },
                {
                  key: 'TransactionNumber',
                  value: 'Transaction Number',
                },
                { key: 'Amount', value: 'Amount' },
                { key: 'TargetAccount', value: 'Target Account' },
                { key: 'Description', value: 'Description' },
              ]}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
Transactions.propTypes = {};

Transactions.defaultProps = {};
export default Transactions;
