import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  YAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const LineChartComponent = ({
  data: { data, loading },
  stroke1,
  stroke2,
}) => {
  const chartData =
    data &&
    data.map(data => {
      return {
        Debit: data.CashOut.replace(/,/gi, ''),
        Credit: data.CashIn.replace(/,/gi, ''),
        Month: data.Month,
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
    <ResponsiveContainer height="100%" width="100%">
      <LineChart
        data={chartData}
        height={200}
        width={300}
        margin={{
          top: 5,
          right: -30,
          left: 30,
          bottom: 5,
        }}
      >
        {!loading && (
          <XAxis
            dataKey="Month"
            tickLine={false}
            stroke="rgba(50, 53, 83, 0.42)"
          />
        )}
        {!loading && (
          <YAxis
            dataKey="Credit"
            tick={false}
            tickLine={false}
            stroke="rgba(50, 53, 83, 0.42)"
          />
        )}
        <Tooltip
          allowEscapeViewBox
          labelFormatter={label => getIntroOfPage(label)}
        />
        <Legend verticalAlign="top" />
        <Line type="monotone" dataKey="Credit" stroke={stroke1} />
        <Line type="monotone" dataKey="Debit" stroke={stroke2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

LineChartComponent.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  stroke1: PropTypes.string,
  stroke2: PropTypes.string,
};

LineChartComponent.defaultProps = {
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

export default LineChartComponent;
