/* eslint-disable */

import React, { useState, useEffect } from 'react';
import './carousel.scss';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import image1 from 'assets/images/arrowleft.png';
import image2 from 'assets/images/arrowright.png';
import Summation from 'assets/images/summation.png';
import CardItem from './CardItem';
import NetworthContainer from 'containers/Dashboard/networth';
import { Button } from 'semantic-ui-react';

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

      <h3 className="dash-title">
        My total net worth
      </h3>
      <Button
        secondary
        onKeyPress={() => {
          ownFn();
        }}
        onClick={() => ownFn()}
      >
        {global.translate('See net worth')}
      </Button>
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
