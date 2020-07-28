/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const SimpleLineChart = ({
  data: { data, loading },
  stroke1,
  stroke2,
}) => {
  const key1 = global.translate('Debit');
  const key2 = global.translate('Credit');
  const chartData =
    data &&
    data.map(data => {
      return {
        name: data.Month,
        year: data.Year,
        [key1]: parseFloat(data.CashOut.replace(/,/gi, '')),
        [key2]: parseFloat(data.CashIn.replace(/,/gi, '')),
      };
    });

  const getIntroOfPage = label => {
    if (label === '1') {
      return 'January';
    }
    if (label === '2') {
      return 'February';
    }
    if (label === '3') {
      return 'March';
    }
    if (label === '4') {
      return 'April';
    }
    if (label === '5') {
      return 'May';
    }
    if (label === '6') {
      return 'June';
    }
    if (label === '7') {
      return 'July';
    }
    if (label === '8') {
      return 'August';
    }
    if (label === '9') {
      return 'September';
    }
    if (label === '10') {
      return 'October';
    }
    if (label === '11') {
      return 'November';
    }
    if (label === '12') {
      return 'December';
    }
    return null;
  };
  return (
    <LineChart
      width={240}
      height={180}
      data={chartData}
      margin={{
        top: 2,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      {!loading && (
        <XAxis
          tickLine={false}
          stroke="rgba(50, 53, 83, 0.42)"
            dataKey="name"
        />
      )}
      {!loading && (
        <YAxis width={0} tick={false} stroke="rgba(50, 53, 83, 0.42)" />
      )}
      <Tooltip
        allowEscapeViewBox
        labelFormatter={label => getIntroOfPage(label)}
      />
      <Legend verticalAlign="top" />
      <Line
        type="monotone"
        dataKey={global.translate('Credit')}
        stroke={stroke1}
      />
      <Line
        type="monotone"
        dataKey={global.translate('Debit')}
        stroke={stroke2}
      />
    </LineChart>
  );
};

SimpleLineChart.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  stroke1: PropTypes.string,
  stroke2: PropTypes.string,
};

SimpleLineChart.defaultProps = {
  data: {
    loading: false,
    data: [
      {
        Month: 1,
        CashIn: 10000,
        CashOut: 2400,
      },
      {
        Month: 2,
        Credit: 2000,
        Debit: 2400,
      },
      {
        Month: 3,
        Credit: 30000,
        Debit: 24000,
      },
      {
        Month: 4,
        Credit: 2000,
        Debit: 2400,
      },
      {
        Month: 5,
        Credit: 2181,
        Debit: 4400,
      },
      {
        Month: 6,
        Credit: 2500,
        Debit: 8400,
      },
      {
        Month: 7,
        Credit: 2100,
        Debit: 1400,
      },
      {
        Month: 8,
        Credit: 0,
        Debit: 2900,
      },
      {
        Month: 9,
        Credit: 20000,
        Debit: 2400,
      },
      {
        Month: 10,
        Credit: 2100,
        Debit: 6600,
      },
      {
        Month: 11,
        Credit: 2100,
        Debit: 7400,
      },
      {
        Month: 12,
        Credit: 2100,
        Debit: 1400,
      },
    ],
  },
  stroke2: '#EA5726',
  stroke1: '#57B894',
};

export default SimpleLineChart;
