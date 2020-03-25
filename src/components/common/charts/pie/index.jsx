// import React from 'react';
// import {
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Legend,
//   Cell,
//   Tooltip,
// } from 'recharts';
// import PropTypes from 'prop-types';
// import './style.scss';

// const SimplePieChart = ({
//   data,
//   cy,
//   cx,
//   iconType,
//   title,
//   innerRadius,
//   pieChartStyle,
//   iconSize,
//   outerRadius,
//   fill,
//   style,
//   width,
//   paddingAngle,
//   height,
//   maxHeight,
//   showLegend,
//   colors,
//   legendAlign,
// }) => {
//   return (
//     <>
//       <ResponsiveContainer maxHeight={maxHeight} height={250}>
//         <PieChart
//           width={width}
//           height={height}
//           onMouseEnter={() => {}}
//           style={pieChartStyle}
//         >
//           <Pie
//             data={data}
//             style={style}
//             cx={cx}
//             cy={cy}
//             innerRadius={innerRadius}
//             outerRadius={outerRadius}
//             fill={fill}
//             paddingAngle={paddingAngle}
//           >
//             {data.map((entry, index) => (
//               <Cell fill={colors[index % colors.length]} />
//             ))}
//           </Pie>
//           {showLegend && (
//             <Legend
//               verticalAlign="bottom"
//               className="pie-legend"
//               wrapperStyle={{
//                 position: 'relative',
//                 marginTop: '-40px',
//                 marginLeft: '-35%',
//               }}
//               iconType={iconType}
//               iconSize={iconSize}
//             />
//           )}
//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>
//     </>
//   );
// };
// SimplePieChart.propTypes = {
//   cy: PropTypes.number,
//   width: PropTypes.number,
//   height: PropTypes.number,
//   maxHeight: PropTypes.number,
//   cx: PropTypes.number,
//   paddingAngle: PropTypes.number,
//   iconType: PropTypes.string,
//   title: PropTypes.string,
//   iconSize: PropTypes.number,
//   innerRadius: PropTypes.number,
//   outerRadius: PropTypes.number,
//   style: PropTypes.objectOf(PropTypes.string),
//   colors: PropTypes.arrayOf(PropTypes.string),
//   fill: PropTypes.string,
//   data: PropTypes.instanceOf(PropTypes.array).isRequired,
//   pieChartStyle: PropTypes.instanceOf(PropTypes.object),
//   showLegend: PropTypes.bool,
//   legendAlign: PropTypes.string,
// };

// SimplePieChart.defaultProps = {
//   width: 500,
//   cy: 110,
//   maxHeight: 500,
//   showLegend: true,
//   cx: 170,
//   style: { marginTop: '100px' },
//   height: 100,
//   innerRadius: 60,
//   outerRadius: 80,
//   iconType: 'circle',
//   legendAlign: 'top',
//   colors: ['#0984E3', '#55EFC4'],
//   paddingAngle: 0,
//   iconSize: 12,
//   pieChartStyle: { margin: { top: 77 } },
//   fill: '#00C49F',
//   title: 'Paid VS Free',
// };

// export default SimplePieChart;

import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  { name: 'Credit', value: 400 },
  { name: 'Debit', value: 300 },
];

const renderActiveShape = props => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    payload,
    percent,
    value,
  } = props;
  const fill = '#FF4500';
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Total Amount ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const SimplePieChart = ({ colors }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };

  return (
    <PieChart width={300} height={300}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={170}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#00C49F"
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
      <Legend
        verticalAlign="bottom"
        className="pie-legend"
        wrapperStyle={{
          position: 'relative',
          marginTop: '-100px',
        }}
        iconType="circle"
        iconSize="12"
      />
      <Tooltip />
      {data.map((entry, index) => (
        <Cell fill={colors[index % colors.length]} />
      ))}
    </PieChart>
  );
};
export default SimplePieChart;
