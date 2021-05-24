/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import payOptionImg from 'assets/images/microloan/pay-option.svg';
import payOptionTickedImg from 'assets/images/microloan/pay-option-ticked.svg';
import './style.scss';

const DayMonth = ({ day, onClick, selected }) => {
  return (
    <div
      className="date-box"
      onClick={() => onClick(day)}
      style={selected ? { border: '1px solid #E95927' } : null}
    >
      <Image src={selected ? payOptionTickedImg : payOptionImg} />
      <div>
        <div className="date-number">{day}</div>
        <div>{global.translate('Months')}</div>
      </div>
    </div>
  );
};
DayMonth.propTypes = {
  day: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};

DayMonth.defaultProps = {
  day: '',
  onClick: () => {},
  selected: false,
};

export default DayMonth;
