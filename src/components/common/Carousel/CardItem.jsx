/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const CardItem = React.memo(
  ({ data, onItemClick }) => {
    const [withActiveItems, setWithActiveItems] = useState([]);

    useEffect(() => {
      if (data) {
        setWithActiveItems(
          data.map(({ ...item }) => {
            return { active: false, ...item };
          }),
        );
      }
    }, [data]);

    const setIsActive = it => {
      setWithActiveItems(
        data.map(({ ...item }) => {
          if (item.CurrencyCode === it.CurrencyCode) {
            return { isActive: true, ...item };
          }
          return { isActive: false, ...item };
        }),
      );
    };

    return (
      <>
        {withActiveItems.map(item => (
          <div
            className={item.isActive ? 'currency-card active' : 'currency-card'}
            onClick={() => {
              setIsActive(item);
              onItemClick(item);
            }}
            key={item.CurrencyCode}
          >
            <Image src={item.Flag} className="cardFlag" />
            <div className="countryCode">{item.CurrencyCode}</div>
          </div>
        ))}
      </>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.data !== nextProps.data) {
      return false;
    }
    return true;
  },
);

CardItem.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  onItemClick: PropTypes.func,
};

CardItem.defaultProps = {
  data: [],
  onItemClick: () => {},
};
export default CardItem;
