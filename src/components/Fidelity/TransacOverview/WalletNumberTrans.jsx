import React from 'react';
import { Icon } from 'semantic-ui-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Brush,
  ReferenceLine,
} from 'recharts';
import PropTypes from 'prop-types';

import './WalletCharts.scss';

const WalletNumberTrans = ({ data }) => {
  return (
    <div
      className="WalletChartsContainer"
      style={{ position: 'relative' }}
    >
      {data.length > 15 && (
        <>
          <Icon
            name="caret left"
            className="caret-left"
            style={{ position: 'absolute', bottom: 18 }}
          />
          <Icon
            name="caret right"
            className="caret-right"
            style={{ position: 'absolute', bottom: 18 }}
          />
        </>
      )}
      <ResponsiveContainer>
        <BarChart
          width={400}
          height={300}
          data={data}
          margin={{
            top: 0,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="wallet" />
          <YAxis />
          <Tooltip />
          <Legend
            verticalAlign="top"
            wrapperStyle={{ lineHeight: '40px' }}
          />
          <ReferenceLine y={0} stroke="#000" />
          {data.length > 15 && (
            <Brush
              dataKey="name"
              height={15}
              endIndex={15}
              stroke="#8884d8"
            />
          )}
          <Bar dataKey="Credit" fill="#00C49F" />
          <Bar dataKey="Debit" fill="#F93E00" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

WalletNumberTrans.propTypes = {
  data: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
};

WalletNumberTrans.defaultProps = {
  data: [{}],
};

export default WalletNumberTrans;
