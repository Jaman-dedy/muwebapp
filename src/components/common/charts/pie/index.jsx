import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Cell,
  Tooltip,
} from 'recharts';
import PropTypes from 'prop-types';
import './style.scss';

const SimplePieChart = ({
  data,
  cy,
  cx,
  iconType,
  title,
  innerRadius,
  pieChartStyle,
  iconSize,
  outerRadius,
  fill,
  style,
  width,
  paddingAngle,
  height,
  maxHeight,
  showLegend,
  colors,
  legendAlign,
}) => {
  return (
    <>
      <ResponsiveContainer maxHeight={maxHeight} height={250}>
        <PieChart
          width={width}
          height={height}
          onMouseEnter={() => {}}
          style={pieChartStyle}
        >
          <Pie
            data={data}
            style={style}
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            fill={fill}
            paddingAngle={paddingAngle}
          >
            {data.map((entry, index) => (
              <Cell fill={colors[index % colors.length]} />
            ))}
          </Pie>
          {showLegend && (
            <Legend
              verticalAlign="bottom"
              className="pie-legend"
              wrapperStyle={{
                position: 'relative',
                marginTop: '-40px',
                marginLeft: '-35%',
              }}
              iconType={iconType}
              iconSize={iconSize}
            />
          )}
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};
SimplePieChart.propTypes = {
  cy: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  maxHeight: PropTypes.number,
  cx: PropTypes.number,
  paddingAngle: PropTypes.number,
  iconType: PropTypes.string,
  title: PropTypes.string,
  iconSize: PropTypes.number,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.string),
  colors: PropTypes.arrayOf(PropTypes.string),
  fill: PropTypes.string,
  data: PropTypes.instanceOf(PropTypes.array).isRequired,
  pieChartStyle: PropTypes.instanceOf(PropTypes.object),
  showLegend: PropTypes.bool,
  legendAlign: PropTypes.string,
};

SimplePieChart.defaultProps = {
  width: 500,
  cy: 110,
  maxHeight: 500,
  showLegend: true,
  cx: 170,
  style: { marginTop: '100px' },
  height: 100,
  innerRadius: 60,
  outerRadius: 80,
  iconType: 'circle',
  legendAlign: 'top',
  colors: ['#0984E3', '#55EFC4'],
  paddingAngle: 0,
  iconSize: 12,
  pieChartStyle: { margin: { top: 77 } },
  fill: '#00C49F',
  title: 'Paid VS Free',
};

export default SimplePieChart;
