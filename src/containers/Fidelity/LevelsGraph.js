import React from 'react';
import PropTypes from 'prop-types';
import CustomShapeBarChart from 'components/common/charts/HorizontalBarChart';

const GraphDataContainer = ({ userData }) => {
  const dataX = typeof userData === 'object' &&
    Object.keys(userData || {}).length &&
    !Array.isArray(userData) && [
      {
        name: global.translate('Rookie'),
        points: parseInt(userData.PointsValue0, 10),
      },
      {
        name: global.translate('Explorer'),
        points: parseInt(userData.PointsValue1, 10),
      },
      {
        name: global.translate('Silver'),
        points: parseInt(userData.PointsValue2, 10),
      },
      {
        name: global.translate('Bronze'),
        points: parseInt(userData.PointsValue3, 10),
      },
      {
        name: global.translate('Gold'),
        points: parseInt(userData.PointsValue4, 10),
      },
      {
        name: global.translate('Platinum'),
        points: parseInt(userData.PointsValue5, 10),
      },
      {
        name: global.translate('Ambassador'),
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
