import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './style.scss';

const DetailHeading = ({ item, selectedCard }) => {
  const newDate = item?.Date.substring(0, 11);
  const displayAmounts = () => {
    if (selectedCard === 1 || selectedCard === 3) {
      return {
        Amount: item.Amount,
        Currency: item.Currency,
      };
    }
    if (selectedCard === 2) {
      return {
        Amount: item.DestAmount,
        Currency: item.DestCurrency,
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
      return 'Pending cash sent details';
    }
    if (selectedCard === 3) {
      return 'Pending voucher details';
    }
    if (selectedCard === 4) {
      return 'External transaction details';
    }
  };
  return (
    <div className="detail-headings">
      <div className="detail-left-side">
        <div className="detail-title">{displayDescription()}</div>
        <span className="date-detail">
          {moment(newDate).format('ll')}
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
