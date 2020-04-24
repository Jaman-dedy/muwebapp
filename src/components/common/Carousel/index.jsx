/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useState, useEffect } from 'react';
import './carousel.scss';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import image1 from 'assets/images/arrowleft.png';
import image2 from 'assets/images/arrowright.png';
import Summation from 'assets/images/summation.png';
import CardItem from './CardItem';

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

  useEffect(() => {
    if (document.querySelector('.my-currencies')) {
      document
        .querySelector('.my-currencies')
        .scrollTo(scrollXPos, 0);
    }
  }, [scrollXPos]);

  const goBack = () => {
    const { offsetWidth = 0 } =
      document.querySelector('.my-currencies') || {};
    if (scrollXPos < offsetWidth) {
      return setScrollXPos(0);
    }
    return setScrollXPos(scrollXPos - offsetWidth);
  };

  const goNext = () => {
    const { offsetWidth = 0 } =
      document.querySelector('.my-currencies') || {};
    const newPos = scrollXPos + offsetWidth;
    const { scrollWidth: width = 0 } =
      document.querySelector('.my-currencies') || {};

    setScrollWidth(width);

    if (newPos >= scrollWidth) {
      return setScrollXPos(scrollWidth - offsetWidth);
    }

    return setScrollXPos(newPos);
  };

  return (
    <div className="content-wrapper">
      <Image
        src={!loading && data.length ? image1 : ''}
        alt=""
        disabled={scrollXPos <= 0}
        className="arrow"
        onClick={goBack}
        width={16}
        height={19}
      />

      <div className="items my-currencies">
        <CardItem data={data} onItemClick={onItemClick} />
      </div>
      <Image
        src={!loading && data.length ? image2 : ''}
        alt=""
        disabled={scrollXPos >= scrollWidth}
        className="arrow arrow-end"
        width={16}
        height={19}
        onClick={goNext}
      />

      {!loading && data.length !== 0 && (
        <div
          className="summation-container"
          onKeyPress={() => {
            ownFn();
          }}
          onClick={() => {
            ownFn();
          }}
        >
          <img width={25} alt="" src={Summation} />
        </div>
      )}
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
