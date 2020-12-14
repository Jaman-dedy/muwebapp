/* eslint-disable */

import React, { useState, useEffect } from 'react';
import './carousel.scss';
import PropTypes from 'prop-types';
import CardItem from './CardItem';
import NetworthContainer from 'containers/Dashboard/networth';

const Carousel = ({ data, onItemClick, ownFn, loading }) => {
  const [scrollXPos, setScrollXPos] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    window.addEventListener('DOMContentLoaded', () => {
      const { scrollWidth: width = 0 } =
        document.querySelector('.my-currencies') || {};
      setScrollWidth(width);
    });
  }, []);

  return (
    <div className="content-wrapper">
      <div className="items">
        <CardItem data={data} onItemClick={onItemClick} />
        <div className="clear" />
      </div>
      <div className="clear" />
      <NetworthContainer scope="WALLET" />
      <br />
      <NetworthContainer scope="TOTAL" />
    </div>
  );
};

Carousel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onItemClick: PropTypes.func,
  ownFn: PropTypes.func,
  loading: PropTypes.bool,
};
Carousel.defaultProps = {
  loading: false,
  ownFn: () => {},
  onItemClick: () => {},
};

export default Carousel;
