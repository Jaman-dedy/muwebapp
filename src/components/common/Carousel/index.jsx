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

  // useEffect(() => {
  //   if (document.querySelector('.my-currencies')) {
  //     document
  //       .querySelector('.my-currencies')
  //       .scrollTo(scrollXPos, 0);
  //   }
  // }, [scrollXPos]);

  // const goBack = () => {
  //   const { offsetWidth = 0 } =
  //     document.querySelector('.my-currencies') || {};
  //   if (scrollXPos < offsetWidth) {
  //     return setScrollXPos(0);
  //   }
  //   return setScrollXPos(scrollXPos - offsetWidth);
  // };

  // const goNext = () => {
  //   const { offsetWidth = 0 } =
  //     document.querySelector('.my-currencies') || {};
  //   const newPos = scrollXPos + offsetWidth;
  //   const { scrollWidth: width = 0 } =
  //     document.querySelector('.my-currencies') || {};

  //   setScrollWidth(width);

  //   if (newPos >= scrollWidth) {
  //     return setScrollXPos(scrollWidth - offsetWidth);
  //   }

  //   return setScrollXPos(newPos);
  // };

  return (
    <div className="content-wrapper">
      {/* <Image
        src={!loading && data.length ? image1 : ''}
        alt=""
        disabled={scrollXPos <= 0}
        className="arrow"
        onClick={goBack}
        width={16}
        height={19}
      /> */}

      <div className="items">
        <CardItem data={data} onItemClick={onItemClick} />
      <div className="clear" />
      </div>
      {/* <Image
        src={!loading && data.length ? image2 : ''}
        alt=""
        disabled={scrollXPos >= scrollWidth}
        className="arrow arrow-end"
        width={16}
        height={19}
        onClick={goNext}
      /> */}
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
