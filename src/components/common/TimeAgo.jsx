import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import fromNow from 'utils/fromNow';

const TimeAgo = ({ time, style }) => {
  const {
    language: { preferred },
  } = useSelector(state => state.user);

  return <span style={style}>{fromNow(time, preferred)}</span>;
};

TimeAgo.propTypes = {
  time: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.instanceOf(Object),
};

TimeAgo.defaultProps = {
  time: 0,
  style: {},
};

export default TimeAgo;
