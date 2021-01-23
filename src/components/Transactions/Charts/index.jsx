import React from 'react';
import { Segment, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import SimplePieChart from 'components/common/charts/pie';
import periodArrow from 'assets/images/transactions/calendar-arrow.svg';
import './style.scss';

const Charts = ({
  amountChartData,
  chartData,
  currentOption,
  form,
}) => {
  return (
    <Segment className="transaction-over-view">
      <div className="over-view">
        <div className="wallet-data">
          <div className="info-wallet">
            <h4>Transactions overview</h4>
            <div className="wallet-info">
              <div className="wallet-flag-img">
                <Image src={currentOption.Flag} />
              </div>
              <div>
                <div className="wallets-name">
                  {currentOption.AccountName}
                </div>
                <div className="wallets-number">
                  {currentOption.AccountNumber}
                </div>
              </div>
            </div>
          </div>
          <div className="period-details">
            <div className="period-title">Period</div>
            <div className="period-date">
              <div>{moment(form?.fromDate).format('ll')}</div>{' '}
              <Image src={periodArrow} />{' '}
              <div>{moment(form?.toDate).format('ll')}</div>
            </div>
          </div>
        </div>

        <div className="display-chart">
          <div>
            <SimplePieChart data={chartData} />
          </div>
          <div>
            <SimplePieChart data={amountChartData} />
          </div>
        </div>
      </div>
    </Segment>
  );
};

Charts.propTypes = {
  amountChartData: PropTypes.arrayOf(PropTypes.any),
  chartData: PropTypes.arrayOf(PropTypes.any),
  currentOption: PropTypes.objectOf(PropTypes.any),
  form: PropTypes.objectOf(PropTypes.any),
};
Charts.defaultProps = {
  amountChartData: [],
  chartData: [],
  currentOption: {},
  form: {},
};
export default Charts;
