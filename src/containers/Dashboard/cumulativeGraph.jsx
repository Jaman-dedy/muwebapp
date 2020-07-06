import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getUserTransactionHistory from 'redux/actions/users/getUserTransactionHistory';
import LineChartComponent from 'components/common/charts/LineChart';

const GraphDataContainer = () => {
  const dispatch = useDispatch();
  const {
    transactionHistory,
    userData: { data },
  } = useSelector(state => state.user);

  const getGraphData = () => {
    if (data) {
      getUserTransactionHistory({
        WalletNumber: data.DefaultWallet,
      })(dispatch);
    }
  };
  useEffect(() => {
    getGraphData();
  }, [data]);

  return <LineChartComponent data={transactionHistory} />;
};

GraphDataContainer.propTypes = {};

export default GraphDataContainer;
