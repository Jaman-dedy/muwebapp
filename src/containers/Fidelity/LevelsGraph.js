import React from 'react';
import CustomShapeBarChart from 'components/common/charts/HorizontalBarChart';

const GraphDataContainer = data => {
  const levelData = data && data.userData;

  const dataX = levelData && [
    {
      name: global.translate('Rookie', 1180),
      points: parseInt(levelData.PointsValue0, 10),
    },
    {
      name: global.translate('Explorer', 1181),
      points: parseInt(levelData.PointsValue1, 10),
    },
    {
      name: global.translate('Silver', 1182),
      points: parseInt(levelData.PointsValue2, 10),
    },
    {
      name: global.translate('Bronze', 1183),
      points: parseInt(levelData.PointsValue3, 10),
    },
    {
      name: global.translate('Gold', 1184),
      points: parseInt(levelData.PointsValue4, 10),
    },
    {
      name: global.translate('Platinum', 1185),
      points: parseInt(levelData.PointsValue5, 10),
    },
    {
      name: global.translate('Ambassador', 1186),
      points: parseInt(levelData.PointsValue6, 10),
    },
  ];

  return <CustomShapeBarChart data={dataX} />;
};

GraphDataContainer.propTypes = {};

export default GraphDataContainer;
