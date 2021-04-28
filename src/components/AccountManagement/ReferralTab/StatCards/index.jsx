import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';

const StatCards = ({ title, number, icon }) => {
  return (
    <div className="stat-container">
      <div>
        <div>{title}</div>
        <div className="stat-number">{number}</div>
      </div>
      <div>
        <Image src={icon} />
      </div>
    </div>
  );
};

StatCards.propTypes = {
  title: PropTypes.string,
  number: PropTypes.string,
  icon: PropTypes.string,
};
StatCards.defaultProps = {
  title: '',
  number: '',
  icon: '',
};

export default StatCards;
