import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import formatNumber from 'utils/formatNumber';
import './style.scss';

const PriceItem = ({ CurrencyFlag, Currency, Price, Title }) => {
  return (
    <div className="price-item">
      <Image width={32} src={CurrencyFlag} />

      <div className="currency">
        <span>{Currency}</span> &nbsp;
        <span>
          {formatNumber(Price, {
            locales: localStorage.language || 'en',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}{' '}
          &nbsp;
        </span>
      </div>

      <span className="text">{Title}</span>
    </div>
  );
};

PriceItem.propTypes = {
  CurrencyFlag: PropTypes.string.isRequired,
  Currency: PropTypes.string.isRequired,
  Price: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
};

export default PriceItem;
