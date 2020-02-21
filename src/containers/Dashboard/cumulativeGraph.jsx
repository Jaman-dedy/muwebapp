import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getUserInfo from 'redux/actions/users/getUserInfo';
import getUserTransactionHistory from 'redux/actions/users/getUserTransactionHistory';
import LineChartComponent from 'components/common/charts/LineChart';

const GraphDataContainer = () => {
  const dispatch = useDispatch();
  const {
    transactionHistory,
    userData: { data },
  } = useSelector(state => state.user);
  useEffect(() => {
    getUserInfo()(dispatch);
  }, []);
  useEffect(() => {
    getUserTransactionHistory({
      WalletNumber: data && data.DefaultWallet,
    })(dispatch);
  }, [data]);

  return <LineChartComponent data={transactionHistory} />;
};

GraphDataContainer.propTypes = {};

export default GraphDataContainer;
