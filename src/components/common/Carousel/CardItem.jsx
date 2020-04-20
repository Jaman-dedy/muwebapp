/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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
            className={
              item.isActive ? 'item card active' : 'item card'
            }
            onClick={() => {
              setIsActive(item);
              onItemClick(item);
            }}
            key={item.CurrencyCode}
          >
            <Image src={item.Flag} className="cardFlag" />
            <p className="countryCode">{item.CurrencyCode}</p>
          </div>
        ))}
      </>
    );
  },
  () => true,
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
