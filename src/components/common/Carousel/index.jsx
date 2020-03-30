import React, { useState, useEffect } from 'react';
import './carousel.scss';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import image1 from 'assets/images/arrowleft.png';
import image2 from 'assets/images/arrowright.png';
import Summation from 'assets/images/summation.png';

const Carousel = ({ data, itemContentAlignment, ownFn, loading }) => {
  const ITEMS_TO_SHOW = 8;
  const [scrollXPos, setScrollXPos] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);

  const [itemsToShow, setItemsToShow] = useState([]);
  const [lastItemPosition, setlastItemPosition] = useState(
    ITEMS_TO_SHOW,
  );
  const [prev, setPrev] = useState(0);
  useEffect(() => {
    const Items = data.filter(
      (item, index) => index >= prev && index < lastItemPosition,
    );
    setItemsToShow(Items);
  }, [lastItemPosition, prev, data]);

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
        {data.map(item => (
          <div className="item card" key={item.CurrencyCode}>
            <Image src={item.Flag} className="cardFlag" />
            <p className="countryCode">{item.CurrencyCode}</p>
          </div>
        ))}
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
          role="button"
          tabIndex={0}
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
  itemContentAlignment: PropTypes.string,
  ownFn: PropTypes.func,
  loading: PropTypes.bool,
};
Carousel.defaultProps = {
  itemContentAlignment: 'vertical',
  loading: false,
  ownFn: () => {},
};

export default Carousel;
