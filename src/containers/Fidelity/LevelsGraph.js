import React from 'react';
import PropTypes from 'prop-types';
import CustomShapeBarChart from 'components/common/charts/HorizontalBarChart';

const GraphDataContainer = ({ userData }) => {
  const dataX = typeof userData === 'object' &&
    Object.keys(userData || {}).length &&
    !Array.isArray(userData) && [
      {
        name: global.translate('Rookie', 1180),
        points: parseInt(userData.PointsValue0, 10),
      },
      {
        name: global.translate('Explorer', 1181),
        points: parseInt(userData.PointsValue1, 10),
      },
      {
        name: global.translate('Silver', 1182),
        points: parseInt(userData.PointsValue2, 10),
      },
      {
        name: global.translate('Bronze', 1183),
        points: parseInt(userData.PointsValue3, 10),
      },
      {
        name: global.translate('Gold', 1184),
        points: parseInt(userData.PointsValue4, 10),
      },
      {
        name: global.translate('Platinum', 1185),
        points: parseInt(userData.PointsValue5, 10),
      },
      {
        name: global.translate('Ambassador', 1186),
        points: parseInt(userData.PointsValue6, 10),
      },
    ];

  return dataX ? <CustomShapeBarChart data={dataX || []} /> : null;
};

GraphDataContainer.propTypes = {
  userData: PropTypes.instanceOf(Object),
};

GraphDataContainer.defaultProps = {
  userData: null,
};

export default GraphDataContainer;
