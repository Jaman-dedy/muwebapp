import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getUserTransactionHistory from 'redux/actions/users/getUserTransactionHistory';
import CustomShapeBarChart from 'components/common/charts/CustomShapeBarChart';

const GraphDataContainer = () => {
  const {
    transactionHistory,
    userData: { data },
  } = useSelector(state => state.user);

  const dataX = [
    {
      name: global.translate('Rookie', 1180),
      points: 5000,
    },
    {
      name: global.translate('Explorer', 1181),
      points: 10000,
    },
    {
      name: global.translate('Explorer', 1182),
      points: 15000,
    },
    {
      name: global.translate('Bronze', 1183),
      points: 20000,
    },
    {
      name: global.translate('Gold', 1184),
      points: 25000,
    },
    {
      name: global.translate('Platinum', 1185),
      points: 30000,
    },
    {
      name: global.translate('Ambassador', 1186),
      points: 35000,
    },
  ];

  return <CustomShapeBarChart data={dataX} />;
};

GraphDataContainer.propTypes = {};

export default GraphDataContainer;
