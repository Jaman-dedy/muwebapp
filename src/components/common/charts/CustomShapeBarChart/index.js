import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { scaleOrdinal } from 'd3-scale';

const colors = scaleOrdinal(schemeCategory10).range();

const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y +
  height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x +
  (2 * width) / 3},${y + height} ${x + width}, ${y + height}
          Z`;

const TriangleBar = props => {
  const { fill, x, y, width, height } = props;

  return (
    <path
      d={getPath(x, y, width, height)}
      stroke="none"
      fill={fill}
    />
  );
};

TriangleBar.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

const CustomShapeBarChart = ({ data }) => {
  // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/rnywhbu8/';

  return (
    <div className="custBarChartContainer">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar
          dataKey="points"
          fill="#8884d8"
          shape={<TriangleBar />}
          label={{ position: 'top' }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default CustomShapeBarChart;
