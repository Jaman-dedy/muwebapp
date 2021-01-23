/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';

import arrow from 'assets/images/transactions/arrow.svg';

const CardSummary = ({
  transactionTypeImage,
  title,
  selected,
  onClick,
  card,
  transactionCount,
}) => {
  return (
    <div
      onClick={() => onClick(card)}
      className="summary-container"
      style={
        selected
          ? {
              border: '1px solid #E95927',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.07) ',
            }
          : null
      }
    >
      <div className="transaction-types">
        <Image src={transactionTypeImage && transactionTypeImage} />
      </div>
      <div className="description">
        <div>{title}</div>
        <span>{transactionCount}</span>
      </div>
      <div className="arrow">
        <Image src={arrow} />
      </div>
    </div>
  );
};

CardSummary.propTypes = {
  transactionTypeImage: PropTypes.string,
  title: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  card: PropTypes.number,
  transactionCount: PropTypes.number,
};
CardSummary.defaultProps = {
  transactionTypeImage: '',
  title: '',
  selected: false,
  onClick: () => {},
  card: 1,
  transactionCount: null,
};

export default CardSummary;
