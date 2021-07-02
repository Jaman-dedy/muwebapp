import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './style.scss';
import { formatDate } from 'utils/formatDate';

const DetailHeading = ({ item, selectedCard }) => {
  const displayAmounts = () => {
    if (selectedCard === 1 || selectedCard === 3) {
      return {
        Amount: item.Amount,
        Currency: item.Currency,
      };
    }
    if (selectedCard === 2) {
      return {
        Amount: item.DestAmount || item.AmountSent,
        Currency: item.DestCurrency || '',
      };
    }
    if (selectedCard === 4) {
      return {
        Amount: item.DestAmount,
        Currency: '',
      };
    }
  };
  const displayDescription = () => {
    if (selectedCard === 1) {
      return item.Description;
    }
    if (selectedCard === 2) {
      return global.translate('Pending cash sent details');
    }
    if (selectedCard === 3) {
      return global.translate('Pending voucher details');
    }
    if (selectedCard === 4) {
      return global.translate('External transaction details');
    }
  };
  return (
    <div className="detail-headings">
      <div className="detail-left-side">
        <div className="detail-title">{displayDescription()}</div>
        <span className="date-detail">
          {moment(formatDate(item?.Date?.substr(0, 11))).format('ll')}
        </span>
      </div>
      <div
        className="detail-amount"
        style={
          selectedCard !== 1 || item.OpsType === '-'
            ? { color: '#E01B22' }
            : { color: '#3b9c62' }
        }
      >
        {`${displayAmounts().Amount} ${displayAmounts().Currency}`}
      </div>
    </div>
  );
};
DetailHeading.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  selectedCard: PropTypes.number,
};
DetailHeading.defaultProps = {
  item: {},
  selectedCard: 1,
};
export default DetailHeading;
