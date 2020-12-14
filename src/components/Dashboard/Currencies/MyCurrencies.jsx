/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './MyCurrencies.scss';
const MyCurrencies = ({ data, onItemClick, ownFn, loading }) => {
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
    <div>
      {data.map(item => (
        <div
          key={item.CurrencyCode}
          className={
            item.isActive ? 'currency-card active' : 'currency-card'
          }
          onClick={() => {
            setIsActive(item);
            onItemClick(item);
          }}
          key={item.CurrencyCode}
        >
          <Image src={item.Flag} className="cardFlag" />
          {item.CurrencyCode}
        </div>
      ))}
      <div className="clear"></div>
    </div>
  );
};

MyCurrencies.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  onItemClick: PropTypes.func,
};

MyCurrencies.defaultProps = {
  data: [],
  onItemClick: () => {},
};
export default MyCurrencies;
