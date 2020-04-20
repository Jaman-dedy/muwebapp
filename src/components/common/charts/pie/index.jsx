import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const SimplePieChart = ({
  data,
  colors,
  cx,
  cy,
  dataKey,
  nameKey,
  verticalAlign,
}) => {
  return (
    <ResponsiveContainer maxHeight={400} width={300} height={200}>
      <PieChart width={300} height={200}>
        <Pie
          data={data}
          cx={cx}
          cy={cy}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey={dataKey}
          nameKey={nameKey}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign={verticalAlign} />
      </PieChart>
    </ResponsiveContainer>
  );
};

SimplePieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
  cx: PropTypes.number,
  cy: PropTypes.number,
  dataKey: PropTypes.string,
  nameKey: PropTypes.string,
  verticalAlign: PropTypes.string,
};

SimplePieChart.defaultProps = {
  colors: ['#00C49F', '#FF4500'],
  cx: 150,
  cy: 90,
  dataKey: 'value',
  nameKey: 'name',
  verticalAlign: 'top',
};
export default SimplePieChart;
