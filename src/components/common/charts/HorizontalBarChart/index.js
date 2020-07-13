import React from 'react';

import {
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';

import PropTypes from 'prop-types';

import './CustomShapeBarChart.scss';

const CustomShapeBarChart = ({ data }) => {
  return (
    <div
      className="custBarChartContainer"
      style={{ height: '300px' }}
    >
      <ResponsiveContainer>
        <ComposedChart
          layout="vertical"
          width={500}
          height={800}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 10,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" tick={false} />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="points"
            barSize={10}
            fill="#ffffff"
            label={{ position: 'top' }}
          >
            <Cell key="cell-0" fill="#2980b9" />
            <Cell key="cell-1" fill="#f39c12" />
            <Cell key="cell-2" fill="#C0C0C0" />
            <Cell key="cell-3" fill="#b08d57" />
            <Cell key="cell-4" fill="#D4AF37" />
            <Cell key="cell-5" fill="#27ae60" />
            <Cell key="cell-6" fill="#c0392b" />
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
CustomShapeBarChart.propTypes = {
  data: PropTypes.instanceOf(Object),
};
CustomShapeBarChart.defaultProps = {
  data: {},
};

CustomShapeBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};
CustomShapeBarChart.defaultProps = {
  data: [],
};

export default CustomShapeBarChart;
