import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
} from 'recharts';

import './WalletCharts.scss';
import ConvertCurrency from 'helpers/convertCurrency';

const CustomShapeBarChart = ({ walletList, Currency }) => {
  const [walletData, setWalletData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      return Promise.all(
        walletList.map(
          async ({ AccountNumber, Balance, CurrencyCode }) => {
            const { data } = await ConvertCurrency(
              CurrencyCode,
              Balance.replace(/,/g, ''),
              Currency,
            );
            return {
              AccountNumber,
              Balance:
                data &&
                data.ConvertedAmount &&
                Number(data.ConvertedAmount.replace(/,/g, '')),
            };
          },
        ),
      );
    };

    if (walletList.length > 0) {
      getData().then(data => {
        setWalletData(data);
      });
    }
  }, [Currency, walletList]);

  return (
    <div className="WalletChartsContainer">
      <ResponsiveContainer>
        <BarChart
          width={400}
          height={300}
          data={walletData}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="AccountNumber" />
          <YAxis />
          <Tooltip />
          <Legend
            verticalAlign="top"
            wrapperStyle={{ lineHeight: '40px' }}
          />
          <Bar dataKey="Balance" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

CustomShapeBarChart.propTypes = {
  walletList: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  Currency: PropTypes.string.isRequired,
};

CustomShapeBarChart.defaultProps = {
  walletList: [{}],
};

export default CustomShapeBarChart;
