import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const LineChartComponent = ({ data, stroke }) => {
  return (
    <ResponsiveContainer minHeight={100}>
      <LineChart
        width={500}
        height={100}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="month" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="amount"
          stroke={stroke}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

LineChartComponent.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  stroke: PropTypes.string,
};

LineChartComponent.defaultProps = {
  data: [
    {
      month: 1,
      amount: 10000,
    },
    {
      month: 2,
      amount: 2000,
    },
    {
      month: 3,
      amount: 30000,
    },
    {
      month: 4,
      amount: 2000,
    },
    {
      month: 5,
      amount: 2181,
    },
    {
      month: 6,
      amount: 2500,
    },
    {
      month: 7,
      amount: 2100,
    },
    {
      month: 8,
      amount: 0,
    },
    {
      month: 9,
      amount: 20000,
    },
    {
      month: 10,
      amount: 2100,
    },
    {
      month: 11,
      amount: 2100,
    },
    {
      month: 12,
      amount: 2100,
    },
  ],
  stroke: '#EA5726',
};

export default LineChartComponent;
