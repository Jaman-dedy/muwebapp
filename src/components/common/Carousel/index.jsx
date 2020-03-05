import React, { useState, useEffect } from 'react';
import './carousel.scss';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import image1 from 'assets/images/arrowleft.png';
import image2 from 'assets/images/arrowright.png';
import Summation from 'assets/images/summation.png';

const Carousel = ({ data, itemContentAlignment, ownFn, loading }) => {
  const ITEMS_TO_SHOW = 4;

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

  const goBack = () => {
    setPrev(prev - ITEMS_TO_SHOW);
    setlastItemPosition(lastItemPosition - ITEMS_TO_SHOW);
  };
  const goNext = () => {
    setPrev(lastItemPosition);
    setlastItemPosition(lastItemPosition + ITEMS_TO_SHOW);
  };
  return (
    <div className="content-wrapper">
      <Image
        src={!loading && data.length ? image1 : ''}
        alt=""
        disabled={prev === 0}
        className="arrow"
        onClick={
          prev === 0
            ? null
            : e => {
                goBack(e);
              }
        }
        width={16}
        height={19}
      />

      <div className="items" style={{ marginLeft: 16 }}>
        {itemsToShow.map(data => (
          <div
            className="item card"
            key={data.CurrencyCode}
            style={{
              marginRight: '400px',
              display: 'flex',
              flexDirection:
                itemContentAlignment === 'vertical'
                  ? 'row'
                  : 'column',
              justifyContent: 'center',
              height: '50px',
              alignItems: 'center',
              backgroundColor: 'white',
              border: '1px solid rgba(51, 53, 86, 0.11)',
              borderRadius: '5px',
            }}
          >
            <Image src={data.Flag} height={37} />
            <p
              style={{
                fontWeight: 300,
                fontsize: '15px',
                marginLeft: '0.5rem',
                marginRight: '0.5rem',
                color: '#000000',
              }}
            >
              {data.CurrencyCode}
            </p>
          </div>
        ))}
      </div>
      <Image
        src={!loading && data.length ? image2 : ''}
        alt=""
        disabled={lastItemPosition >= data.length}
        className="arrow arrow-end"
        width={16}
        height={19}
        onClick={
          lastItemPosition >= data.length
            ? null
            : e => {
                goNext(e);
              }
        }
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
